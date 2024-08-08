import { execFile } from "child_process";
import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/process", (req, res) => {
  const inputJson = JSON.stringify(req.body);
  execFile(
    "./build/Release/TagCombinationFinder.exe",
    [inputJson],
    (error, stdout, stderr) => {
      if (error) {
        //console.error(`Error: ${error.message}`);
        //return res.status(500).send("Internal Server Error error");
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).send("Internal Server Error stderr");
      }
      res.send(stdout);
    },
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
