class Peep {
  private _text: string;

  private _timeCreated: number;

  private constructor(text: string, timeCreated: number) {
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

  public static create(text: string, timeCreated: number): Peep {
    return new Peep(text, timeCreated);
  }

  get text(): string {
    return this._text;
  }

  get timeCreated(): number {
    return this._timeCreated;
  }
}

export default Peep;
