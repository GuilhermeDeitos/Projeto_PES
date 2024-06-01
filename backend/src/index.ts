import express from "express";
import env from "dotenv";
import { connect } from "./db";
import { CreateTables } from "./Models/createTables";
import bodyParser from "body-parser";
import router from "./routes";
import cors from "cors";
env.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
const PORT = process.env.PORT || 3000;
const CreatedTables = new CreateTables(connect());
CreatedTables.createAllTables();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
