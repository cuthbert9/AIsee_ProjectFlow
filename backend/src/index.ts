import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", router);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("This Route is working !");
});

app.listen(PORT, () => {
  console.log("Server Fine running at 3000");
});
