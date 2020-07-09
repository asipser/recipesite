CREATE TYPE ingredient_type AS ENUM 
(
  'produce',
  'meat',
  'fish',
  'baking',
  'spice',
  'bread',
  'dairy',
  'other'
);

CREATE TYPE store AS ENUM 
(
  'whole foods',
  'trader joes',
  'hmart',
  'other'
);

CREATE TYPE quantity_type AS ENUM 
(
  'cup',
  'tablespoon',
  'gram',
  'pound',
);

CREATE TABLE "ingredients" (
  "name" VARCHAR,
  "type" ingredient_type,
  "common" boolean,
  "preferred_store" store
);

CREATE TABLE "recipe" 
(
  "name" VARCHAR,
  "original_link" VARCHAR,
  "servings" FLOAT,
  "notes" VARCHAR,
  "time" FLOAT
)


CREATE TABLE "recipe_ingredient" 
(
  recipe BIGINTEGER,
  quantity quantity_type,
  unit FLOAT,
  ingredients BIGINTEGER
)

