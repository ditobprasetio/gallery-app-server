const cors = require("cors");
const jsonServer = require("json-server");
const app = jsonServer.create();
const photosDb = require("./db.json");
const router = jsonServer.router(photosDb);
const port = 3001;

const middlewares = (req, res, next) => {
  if (req.method === "POST") {
    const { secret } = req.body;
    if (secret === "password") {
      next();
    } else {
      res.status(403).json({ error: "You are not authorized" });
    }
  } else {
    next();
  }
};

app.use(cors());
app.use(jsonServer.bodyParser);
app.use(middlewares);
app.use(router);
app.listen(port, () => {
  console.log("JSON Server is running on port: " + port);
});

module.exports = app