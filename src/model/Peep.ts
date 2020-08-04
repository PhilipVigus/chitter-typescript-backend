import PGConnection from "./PGConnection";
import User from "./User";
import Comment from "./Comment";
import Like from "./Like";

class Peep {
  private _id: number;

  private _userId: number;

  private _username: string;

  private _text: string;

  private _comments: Array<Comment>;

  private _likes: Array<Like>;

  private _timeCreated: Date;

  private constructor(
    id: number,
    userId: number,
    username: string,
    text: string,
    timeCreated: Date
  ) {
    this._id = id;
    this._userId = userId;
    this._username = username;
    this._text = text;
    this._comments = [];
    this._likes = [];
    this._timeCreated = timeCreated;
  }

  public static async all(): Promise<{ peeps: Peep[] }> {
    const result = await PGConnection.query("SELECT * FROM Peeps;");
    const peeps = await Promise.all(
      result.rows.map(async (row) => {
        const peep = new Peep(
          row.id,
          row.user_id,
          (await User.findById(row.user_id))?.username as string,
          row.text,
          row.created_at
        );

        peep.comments = await Comment.allFromPeep(peep.id);
        peep.likes = await Like.allFromPeep(peep.id);

        return peep;
      })
    );

    return { peeps };
  }

  public static async create(userId: number, text: string): Promise<Peep> {
    const result = await PGConnection.query(
      `INSERT INTO Peeps (user_id, text) VALUES (${userId}, $$${text}$$) RETURNING id, user_id, text, created_at;`
    );
    const newPeepAttributes = result.rows[0];
    const username = (await User.findById(newPeepAttributes.user_id))
      ?.username as string;

    const peep = new Peep(
      newPeepAttributes.id,
      newPeepAttributes.user_id,
      username,
      newPeepAttributes.text,
      newPeepAttributes.created_at
    );

    peep.comments = await Comment.allFromPeep(peep.id);
    peep.likes = await Like.allFromPeep(peep.id);

    return peep;
  }

  public static async findById(id: number): Promise<Peep | null> {
    const result = await PGConnection.query(
      `SELECT peeps.id, peeps.user_id, peeps.text, peeps.created_at, users.username 
      FROM users, peeps 
      WHERE users.id = peeps.user_id AND peeps.id=${id};`
    );

    if (result.rowCount === 0) {
      return null;
    }

    const peepData = result.rows[0];

    const peep = new Peep(
      peepData.id,
      peepData.user_id,
      peepData.username,
      peepData.text,
      peepData.created_at
    );

    peep.comments = await Comment.allFromPeep(peep.id);
    peep.likes = await Like.allFromPeep(peep.id);

    return peep;
  }

  public toJSON(): {
    id: number;
    userId: number;
    username: string;
    text: string;
    comments: {
      id: number;
      userId: number;
      peepId: number;
      username: string;
      text: string;
      timeCreated: Date;
    }[];
    likes: string[];
    timeCreated: Date;
  } {
    return {
      id: this._id,
      userId: this._userId,
      username: this._username,
      text: this._text,
      comments: this._comments.map((comment) => {
        return comment.toJSON();
      }),
      likes: this.likes.map((like) => {
        return like.toJSON();
      }),
      timeCreated: this._timeCreated
    };
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get username(): string {
    return this._username;
  }

  get text(): string {
    return this._text;
  }

  get comments(): Comment[] {
    return this._comments;
  }

  set comments(newComments: Comment[]) {
    this._comments = newComments;
  }

  get likes(): Like[] {
    return this._likes;
  }

  set likes(newLikes: Like[]) {
    this._likes = newLikes;
  }

  get timeCreated(): Date {
    return this._timeCreated;
  }
}

export default Peep;
