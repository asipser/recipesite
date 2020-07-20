CREATE TYPE tag_type AS ENUM 
(
  'main',
  'dessert'
);

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
  'bunch',
  'can',
  'teaspoon',
  'tablespoon',
  'gram',
  'pound',
  'ounce',
  'gallon',
  'liter',
  'quart',
  'ml', 
  'unit'
);

CREATE TABLE ingredients (
  name VARCHAR PRIMARY KEY,
  type ingredient_type,
  pantry boolean,
  preferred_store store
);

CREATE TABLE recipes
(
  name VARCHAR PRIMARY KEY,
  source VARCHAR,
  servings FLOAT
);

CREATE TABLE tags
(
  name VARCHAR,
  type tag_type,
  PRIMARY KEY(name, type)
)

CREATE TABLE recipe_ingredients 
(
  id SERIAL PRIMARY KEY,
  ingredient VARCHAR REFERENCES ingredients(name),
  unit quantity_type,
  amount FLOAT,
  recipe VARCHAR REFERENCES recipes(name),
  step_number INTEGER,
   FOREIGN KEY (step_number, recipe) REFERENCES recipe_directions (step_number, recipe)
);

CREATE TABLE recipe_directions 
(
  step_number INTEGER,
  recipe VARCHAR REFERENCES recipes(name),
  contents VARCHAR,
  time INTEGER,
  PRIMARY KEY(recipe, step_number)
);

CREATE TABLE recipe_tags
(
  name VARCHAR REFERENCES tags(name),
  recipe VARCHAR REFERENCES recipes(name)
)