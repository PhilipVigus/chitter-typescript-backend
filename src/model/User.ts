import PGConnection from "./PGConnection";

class User {
  private _id: number;

  private _username: string;

  private constructor(id: number, username: string) {
    this._id = id;
    this._username = username;
  }

  public static async create(
    username: string,
    password: string
  ): Promise<User | null> {
    if (await this.isNameTaken(username)) {
      return null;
    }

    const result = await PGConnection.query(
      `INSERT INTO Users (username, password) VALUES ($$${username}$$, $$${password}$$) RETURNING id, username;`
    );
    const newUserAttributes = result.rows[0];

    return new User(newUserAttributes.id, newUserAttributes.username);
  }

  private static async isNameTaken(name: string): Promise<boolean> {
    const result = await PGConnection.query(
      `SELECT * FROM Users WHERE username='${name}';`
    );

    return result.rowCount !== 0;
  }

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }
}

export default User;
