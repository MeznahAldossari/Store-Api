import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import db_parameters from "./db";
import dotenv from "dotenv";
import Routers from "./routes";

const app: express.Application = express();
const address: string = "127.0.0.1:9466";

/*console.log(db_parameters);
db_parameters.connect().then((client) => {
  return client.query("SELECT NOW()").then((res) => {
    client.release();
    console.log(res.rows);
  });
})*/

app.use(bodyParser.json());

app.use("/api", Routers);
/*app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});*/

app.listen(9466, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
