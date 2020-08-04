import PGConnection from "./PGConnection";
import User from "./User";

class Like {
  private _id: number;

  private _userId: number;

  private _peepId: number;

  private _username: string;

  private constructor(
    id: number,
    userId: number,
    peepId: number,
    username: string
  ) {
    this._id = id;
    this._userId = userId;
    this._peepId = peepId;
    this._username = username;
  }

  public static async create(
    userId: number,
    peepId: number
  ): Promise<Like | null> {
    const existingLikes = await PGConnection.query(
      `SELECT * FROM likes WHERE peep_id=${peepId} AND user_id=${userId};`
    );

    if (existingLikes.rowCount !== 0) {
      return null;
    }

    const result = await PGConnection.query(
      `INSERT INTO likes (user_id, peep_id) VALUES (${userId}, ${peepId}) RETURNING id, user_id, peep_id;`
    );
    const newLikeAttributes = result.rows[0];
    const username = (await User.findById(newLikeAttributes.user_id))
      ?.username as string;

    return new Like(
      newLikeAttributes.id,
      newLikeAttributes.user_id,
      newLikeAttributes.peep_id,
      username
    );
  }

  public static async allFromPeep(peepId: number): Promise<Like[]> {
    const result = await PGConnection.query(
      `SELECT likes.id, likes.user_id, likes.peep_id, users.username
      FROM likes, users
      WHERE likes.user_id=users.id AND likes.peep_id=${peepId};`
    );

    const likes = await Promise.all(
      result.rows.map(async (row) => {
        return new Like(row.id, row.user_id, row.peep_id, row.username);
      })
    );

    return likes;
  }

  public static async delete(userId: number, peepId: number): Promise<void> {
    PGConnection.query(
      `DELETE FROM likes WHERE user_id=${userId} AND peep_id=${peepId};`
    );
  }

  public toJSON(): string {
    return this._username;
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
}

export default Like;
