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

  private static peeps = [
    { text: "First peep", timeCreated: 1594030856065 },
    { text: "Second peep", timeCreated: 1494030856065 }
  ];

  public static all(): {
    text: string;
    timeCreated: number;
  }[] {
    return this.peeps;
  }

  public static async create(text: string): Promise<Peep> {
    PGConnection.open();
    const result = await PGConnection.query(
      `INSERT INTO Peeps (text) VALUES ($$${text}$$) RETURNING id, text, created_at;`
    );
    PGConnection.close();
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
