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
  'ml'
);

CREATE TABLE ingredients (
  name VARCHAR PRIMARY KEY,
  type ingredient_type,
  pantry boolean,
  preferred_store store
);

CREATE TABLE recipes
(
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  source VARCHAR,
  servings FLOAT,
)

CREATE TABLE recipe_ingredients 
(
  id SERIAL PRIMARY KEY,
  ingredient VARCHAR REFERENCES ingredients(name),
  quantity quantity_type,
  unit FLOAT,
  recipe INTEGER REFERENCES recipes(id),
  direction INTEGER REFERENCES recipe_directions(id),
)

CREATE TABLE recipe_directions 
(
  id SERIAL PRIMARY KEY,
  step_number INTEGER,
  recipe INTEGER REFERENCES recipes(id),
  contents VARCHAR,
  time INTEGER
)