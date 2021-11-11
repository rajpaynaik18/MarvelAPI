const characterRoutes = require("./marvel");

const constructorMethod = (app) => {
  app.use("/", characterRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found." });
  });
};

module.exports = constructorMethod;
