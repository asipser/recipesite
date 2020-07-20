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

const parameterizer = require("pg-parameterize");

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

const unnestTypes = (objs) => {
  return objs.map((obj) => obj.unnest);
};

const transformIngredientModel = (ingredient) => {
  return {
    item: ingredient.name,
    store: ingredient.preferred_store,
    type: ingredient.type,
    checkPantry: ingredient.pantry,
  };
};

router.getAsync("/ingredients-meta", async (req, res, next) => {
  const unitsPromise = db.query("select unnest(enum_range(null, null::quantity_type))");
  const storesPromise = db.query("select unnest(enum_range(null, null::store))");
  const typesPromise = db.query("select unnest(enum_range(null, null::ingredient_type))");
  const ingredientsPromise = db.query("select * from ingredients");

  const [
    { rows: units },
    { rows: stores },
    { rows: types },
    { rows: ingredients },
  ] = await Promise.all([unitsPromise, storesPromise, typesPromise, ingredientsPromise]);
  res.send({
    units: unnestTypes(units),
    stores: unnestTypes(stores),
    types: unnestTypes(types),
    ingredients: ingredients.map(transformIngredientModel),
  });
});

router.getAsync("/tags", async (req, res, next) => {
  const { rows: results } = await db.query(
    "select ARRAY_AGG(name) as tags,type as name from recipe_tag GROUP BY recipe_tag.type ORDER BY type ASC"
  );
  res.send(results);
});

const flatten = (listOfLists) => {
  return [].concat.apply([], listOfLists);
};

router.postAsync("/recipe", async (req, res) => {
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;
  const recipeMeta = req.body.meta;
  const recipeTitle = recipeMeta.title.toLowerCase();
  const recipeServings = Number.parseInt(recipeMeta.servings);
  const client = await db.getPool().connect();

  const ingredientsWithDirection = flatten(
    directions.map((direction, directionIndex) => {
      return direction.ingredients.map((ingredientIndex) => {
        const oldIngredient = ingredients[ingredientIndex];
        return {
          amount: oldIngredient.amount,
          unit: oldIngredient.unit,
          item: oldIngredient.item,
          store: oldIngredient.store,
          type: oldIngredient.type,
          checkPantry: oldIngredient.checkPantry,
          directionIndex: directionIndex,
        };
      });
    })
  );

  const ingredientWithNoDirection = ingredients.filter(
    (ingredient, ingredientIndex) =>
      directions.filter((dir) => dir.ingredients.includes(ingredientIndex)).length == 0
  );

  const insertRecipeSql = `
  INSERT INTO
    recipes (name, source, servings) 
  VALUES
    ($1, $2, $3)
`;
  const insertRecipeValues = [recipeTitle, recipeMeta.source, recipeServings];

  const ingredientSqlData = ingredients.map((i, num) => [
    i.item.toLowerCase(), //name
    i.type.toLowerCase(), //type
    i.checkPantry, //pantry
    i.store.toLowerCase(), //store
  ]);

  const ingredientTuples = parameterizer.toTuple(ingredientSqlData, true);
  const insertIngredientSql =
    "INSERT INTO ingredients(name, type, pantry, preferred_store) VALUES" +
    ingredientTuples +
    " ON CONFLICT (name) DO NOTHING";
  const ingredientValues = parameterizer.flatten(ingredientSqlData);

  const directionSqlData = directions.map((dir, num) => [
    recipeTitle, //recipe
    Number.parseInt(num), //step_number
    dir.contents, //contents
    Number.parseInt(dir.time), //time
  ]);
  const directionTuples = parameterizer.toTuple(directionSqlData, true);
  const insertDirectionsSql =
    "INSERT INTO recipe_directions(recipe, step_number, contents, time) VALUES" + directionTuples;
  const directionValues = parameterizer.flatten(directionSqlData);

  const recipeIngredientsSqlData = [...ingredientsWithDirection, ...ingredientWithNoDirection].map(
    (i) => [
      Number.parseFloat(i.amount), //amount
      i.unit.toLowerCase(), //unit
      i.item.toLowerCase(), //item
      i.directionIndex != undefined ? Number.parseInt(i.directionIndex) : null, //step_number
      recipeTitle, //recipe
    ]
  );

  logger.info(ingredientsWithDirection);

  const recipeIngredientsTuples = parameterizer.toTuple(recipeIngredientsSqlData, true);
  const insertRecipeIngredientsSql =
    "INSERT INTO recipe_ingredients(amount, unit, ingredient, step_number, recipe) VALUES" +
    recipeIngredientsTuples;
  const recipeIngredientsValues = parameterizer.flatten(recipeIngredientsSqlData);

  try {
    await client.query("BEGIN");

    const recipeQuery = await client.query(insertRecipeSql, insertRecipeValues);
    const ingredientQuery = await client.query(insertIngredientSql, ingredientValues);
    if (ingredientsWithDirection.length != 0) {
      const directionsQuery = await client.query(insertDirectionsSql, directionValues);
    }
    const recipeIngredientsQuery = await client.query(
      insertRecipeIngredientsSql,
      recipeIngredientsValues
    );
    await client.query("COMMIT");
    client.release();
    res.send({});
  } catch (e) {
    logger.info("rolling back recipe transaction");
    logger.error(e);
    logger.warn("\ninsert recipe SQL");
    logger.warn({ sql: insertRecipeSql, values: insertRecipeValues });
    logger.warn("\ninsert ingredients SQL");
    logger.warn({ sql: insertIngredientSql, values: ingredientValues });
    logger.warn("\ninsert directions SQL");
    logger.warn({ sql: insertDirectionsSql, values: directionValues });
    logger.warn("\ninsert recipes SQL");
    logger.warn({ sql: insertRecipeIngredientsSql, values: recipeIngredientsValues });
    await client.query("ROLLBACK");
    throw new Error("couldn't insert recipe, check logs");
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  logger.warn(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
