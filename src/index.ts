import dotenv from "dotenv";
import app from "./server";

dotenv.config();

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
