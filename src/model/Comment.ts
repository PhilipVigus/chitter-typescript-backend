import PGConnection from "./PGConnection";
import User from "./User";

class Comment {
  private _id: number;

  private _userId: number;

  private _peepId: number;

  private _username: string;

  private _text: string;

  private _timeCreated: Date;

  private constructor(
    id: number,
    userId: number,
    peepId: number,
    username: string,
    text: string,
    timeCreated: Date
  ) {
    this._id = id;
    this._userId = userId;
    this._peepId = peepId;
    this._username = username;
    this._text = text;
    this._timeCreated = timeCreated;
  }

  public static async create(
    userId: number,
    peepId: number,
    text: string
  ): Promise<Comment> {
    const result = await PGConnection.query(
      `INSERT INTO comments (user_id, peep_id, text) VALUES (${userId}, ${peepId}, $$${text}$$) RETURNING id, user_id, peep_id, text, created_at;`
    );
    const newCommentAttributes = result.rows[0];
    const username = (await User.findById(newCommentAttributes.user_id))
      ?.username as string;

    return new Comment(
      newCommentAttributes.id,
      newCommentAttributes.user_id,
      newCommentAttributes.peep_id,
      username,
      newCommentAttributes.text,
      newCommentAttributes.created_at
    );
  }

  public static async allFromPeep(peepId: number): Promise<Comment[]> {
    const result = await PGConnection.query(
      `SELECT comments.id, comments.user_id, comments.peep_id, comments.text, comments.created_at, users.username
      FROM comments, users
      WHERE comments.user_id=users.id AND comments.peep_id=${peepId};`
    );

    const comments = await Promise.all(
      result.rows.map(async (row) => {
        return new Comment(
          row.id,
          row.user_id,
          row.peep_id,
          row.username,
          row.text,
          row.created_at
        );
      })
    );

    return comments;
  }

  public toJSON(): {
    id: number;
    userId: number;
    peepId: number;
    username: string;
    text: string;
    timeCreated: Date;
  } {
    return {
      id: this.id,
      userId: this.userId,
      peepId: this.peepId,
      username: this.username,
      text: this.text,
      timeCreated: this.timeCreated
    };
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get peepId(): number {
    return this._peepId;
  }

  get username(): string {
    return this._username;
  }

  get text(): string {
    return this._text;
  }

  get timeCreated(): Date {
    return this._timeCreated;
  }
}

export default Comment;
