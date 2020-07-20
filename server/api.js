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

function queryRecipeCreation(transactionClient, queryDescription, querySql, queryValues) {
  logger.info(queryDescription);
  logger.debug(querySql);
  logger.debug(queryValues);
  if (queryValues.length != 0) {
    return transactionClient.query(querySql, queryValues);
  }
  return;
}

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
    "select ARRAY_AGG(name) as tags,type as name from tags GROUP BY type ORDER BY type ASC"
  );
  res.send(results);
});

const flatten = (listOfLists) => {
  return [].concat.apply([], listOfLists);
};

function transformIngredients(ingredients, directions) {
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
  return [...ingredientsWithDirection, ...ingredientWithNoDirection];
}

function insertRecipeSql(transactionClient, recipeMeta) {
  const recipeTitle = recipeMeta.title.toLowerCase();
  const recipeServings = Number.parseInt(recipeMeta.servings);

  const insertRecipeSql = `
  INSERT INTO
    recipes (name, source, servings) 
  VALUES
    ($1, $2, $3)
`;
  const insertRecipeValues = [recipeTitle, recipeMeta.source, recipeServings];

  return queryRecipeCreation(
    transactionClient,
    "Insert Recipe",
    insertRecipeSql,
    insertRecipeValues
  );
}

function insertRecipeTagsSql(transactionClient, recipeMeta) {
  const recipeTitle = recipeMeta.title.toLowerCase();
  const tagSqlData = recipeMeta.tags.map((t) => [t, recipeTitle]);
  const tagTuples = parameterizer.toTuple(tagSqlData, true);
  const tagSql = "INSERT INTO recipe_tags(name, recipe) VALUES" + tagTuples;
  const tagValues = parameterizer.flatten(tagSqlData);

  return queryRecipeCreation(transactionClient, "Insert Tags", tagSql, tagValues);
}

function insertIngredientsSql(transactionClient, ingredients) {
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
  return queryRecipeCreation(
    transactionClient,
    "Insert Ingredients",
    insertIngredientSql,
    ingredientValues
  );
}

function insertRecipeDirectionSql(transactionClient, recipeTitle, directions) {
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

  return queryRecipeCreation(
    transactionClient,
    "Insert Directions",
    insertDirectionsSql,
    directionValues
  );
}

function insertRecipeIngredientsSql(transactionClient, recipeTitle, ingredients, directions) {
  const ingredientsWithStepNumbers = transformIngredients(ingredients, directions);

  const recipeIngredientsSqlData = ingredientsWithStepNumbers.map((i) => [
    Number.parseFloat(i.amount), //amount
    i.unit.toLowerCase(), //unit
    i.item.toLowerCase(), //item
    i.directionIndex != undefined ? Number.parseInt(i.directionIndex) : null, //step_number
    recipeTitle, //recipe
  ]);
  const recipeIngredientsTuples = parameterizer.toTuple(recipeIngredientsSqlData, true);
  const insertRecipeIngredientsSql =
    "INSERT INTO recipe_ingredients(amount, unit, ingredient, step_number, recipe) VALUES" +
    recipeIngredientsTuples;
  const recipeIngredientsValues = parameterizer.flatten(recipeIngredientsSqlData);

  return queryRecipeCreation(
    transactionClient,
    "Insert Recipe Ingredients",
    insertRecipeIngredientsSql,
    recipeIngredientsValues
  );
}

router.postAsync("/recipe", async (req, res) => {
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;
  const recipeMeta = req.body.meta;
  const recipeTitle = recipeMeta.title.toLowerCase();
  const client = await db.getPool().connect();

  try {
    await client.query("BEGIN");
    await insertRecipeSql(client, recipeMeta);
    await insertRecipeTagsSql(client, recipeMeta);
    await insertIngredientsSql(client, ingredients);
    await insertRecipeDirectionSql(client, recipeTitle, directions);
    await insertRecipeIngredientsSql(client, recipeTitle, ingredients, directions);
    await client.query("COMMIT");
    client.release();
    res.send({});
  } catch (e) {
    logger.info("rolling back recipe transaction");
    logger.error(e);
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
