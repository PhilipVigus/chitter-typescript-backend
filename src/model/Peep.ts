import PGConnection from "./PGConnection";

class Peep {
  private _id: number;

  private _text: string;

  private _timeCreated: Date;

  private constructor(id: number, text: string, timeCreated: Date) {
    this._id = id;
    this._text = text;
    this._timeCreated = timeCreated;
  }

  public static async all(): Promise<{ peeps: Peep[] }> {
    const result = await PGConnection.query("SELECT * FROM Peeps;");
    const peeps = result.rows.map((row) => {
      return new Peep(row.id, row.text, row.created_at);
    });
    return { peeps };
  }

  public static async create(text: string): Promise<Peep> {
    const result = await PGConnection.query(
      `INSERT INTO Peeps (text) VALUES ($$${text}$$) RETURNING id, text, created_at;`
    );
    const newPeepAttributes = result.rows[0];

    return new Peep(
      newPeepAttributes.id,
      newPeepAttributes.text,
      newPeepAttributes.created_at
    );
  }

  get text(): string {
    return this._text;
  }

  get timeCreated(): Date {
    return this._timeCreated;
  }
}

export default Peep;
