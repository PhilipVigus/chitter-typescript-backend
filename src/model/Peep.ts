import PGConnection from "./PGConnection";
import User from "./User";

class Peep {
  private _id: number;

  private _userId: number;

  private _username: string;

  private _text: string;

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
    this._timeCreated = timeCreated;
  }

  public static async all(): Promise<{ peeps: Peep[] }> {
    const result = await PGConnection.query("SELECT * FROM Peeps;");
    const peeps = await Promise.all(
      result.rows.map(async (row) => {
        return new Peep(
          row.id,
          row.user_id,
          (await User.findById(row.user_id))?.username as string,
          row.text,
          row.created_at
        );
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

    return new Peep(
      newPeepAttributes.id,
      newPeepAttributes.user_id,
      username,
      newPeepAttributes.text,
      newPeepAttributes.created_at
    );
  }

  public static async findById(id: number): Promise<Peep | null> {
    const result = await PGConnection.query(
      `SELECT * FROM Peeps WHERE id=${id};`
    );

    const peepData = result.rows[0];

    return new Peep(
      peepData.id,
      peepData.user_id,
      (await User.findById(peepData.user_id))?.username as string,
      peepData.text,
      peepData.created_at
    );
  }

  public toJSON(): {
    id: number;
    userId: number;
    username: string;
    text: string;
    timeCreated: Date;
  } {
    return {
      id: this._id,
      userId: this._userId,
      username: this._username,
      text: this._text,
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

  get timeCreated(): Date {
    return this._timeCreated;
  }
}

export default Peep;
