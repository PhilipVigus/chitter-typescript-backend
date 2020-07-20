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
  ): Promise<User> {
    const result = await PGConnection.query(
      `INSERT INTO Users (username, password) VALUES ($$${username}$$, $$${password}$$) RETURNING id, username;`
    );
    const newUserAttributes = result.rows[0];

    return new User(newUserAttributes.id, newUserAttributes.username);
  }

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }
}

export default User;
