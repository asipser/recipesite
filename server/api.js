/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

const logger = require("pino")(); // import pino logger

// import models so we can interact with the database
const db = require("./db");

//add error handling to async endpoints
const { decorateRouter } = require("@awaitjs/express");

// api endpoints: all these paths will be prefixed with "/api/"
const router = decorateRouter(express.Router());

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.getAsync("/testdb", async (req, res, next) => {
  logger.info("Bitch");
  const { rows } = await db.query("select * from ingredients");
  res.send(rows);
});

router.getAsync("/example", async (req, res, next) => {
  logger.info("Log Hello World");
  res.send({ hello: "world" });
});

const flatten = (listOfLists) => {
  return [].concat.apply([], listOfLists);
};

router.postAsync("/recipe", async (req, res, next) => {
  logger.info("Log Hello World");
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;
  const recipeMeta = req.body.meta;
  const newModelIngredients = flatten(
    directions.map((direction, directionIndex) => {
      return direction.ingredients.map((ingredientIndex) => {
        const oldIngredient = ingredients[ingredientIndex];
        return {
          //TODO: fill here
        };
      });
    })
  );
  const newModelDirections = {}; // TODO: fill here
  res.send({ hello: "world" });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  logger.warn(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
