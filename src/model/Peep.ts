class Peep {
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
}

export default Peep;
