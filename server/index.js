const app = require("./app");

const db = require("./config/config");

const PORT = 3000;

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
