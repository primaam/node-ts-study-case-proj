import express from "express";
import { handleLogging } from "./utils/logging";
import { userData } from "./utils/fakeData";
const app = express();
const port = 3300;

app.get("/", (req, res) => {
  handleLogging("masuk get", req.url);
  res.send("test dari get");
});

app.get("/test-param/:nama", (req, res) => {
  handleLogging("masuk test param", req.url);
  const nama = req.params.nama;
  res.send(`dapat nama dari ${nama}`);
});

app.get("/user/:id", (req, res) => {
  try {
    handleLogging("masuk test user id", req.url);
    const id = Number(req.params.id);

    const selectedUser = userData.find((p) => p.id === id);
    if (selectedUser) {
      res.json({
        success: true,
        data: selectedUser,
        message: "User found",
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(port, () => {
  console.log(`app is running at port : ${port}`);
});
