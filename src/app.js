const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/views");
const partialsPath = path.join(__dirname, "/views/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("/", (request, response) => {
  response.render("index", {
    title: "Weather",
    name: "Yago de Matos",
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "About",
    name: "Yago de Matos",
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    text: "If you need help, contact me",
    name: "Yago de Matos",
  });
});

app.get("/weather", (request, response) => {
  const address = request.query.address;

  if (!address) {
    return response.send({
      error: "You must provide a address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return response.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return response.send({ error });
      }

      response.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (request, response) => {
  response.render("404", {
    title: "404",
    text: "Help article not found.",
    name: "Yago de Matos",
  });
});

app.get("*", (request, response) => {
  response.render("404", {
    title: "404",
    text: "Page not found.",
    name: "Yago de Matos",
  });
});

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
