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

  public static async create(userId: number, peepId: number): Promise<Like> {
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
}

export default Like;
