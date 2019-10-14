// setups preloaded recipes
const users = {
  pizza: {
    name: 'Pizza',
    cookTime: '12',
    photo: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg',
    description: 'simple pizza recipe',
    origin: 'italy',
    recipeLink: 'https://www.tasteofhome.com/recipes/homemade-pizza/',
  },
  lemon: {
    name: 'Lemon',
    cookTime: '35',
    photo: 'https://cdn.shopify.com/s/files/1/2336/3219/products/shutterstock_77846398eureka2_x850.jpg?v=1554665666',
    description: 'is a lemon tart',
    origin: 'france',
    recipeLink: 'https://www.allrecipes.com/recipe/231190/the-best-lemon-tart-ever/',
  },
  instantRamen: {
    name: 'Instant Ramen',
    cookTime: '5',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Mama_instant_noodle_block.jpg',
    description: 'simple instant ramen for 3 am',
    origin: 'japan',
    recipeLink: 'https://en.wikipedia.org/wiki/Instant_noodle',
  },
  upgradedRame: {
    name: 'Upgraded Ramen',
    cookTime: '10',
    photo: 'https://static01.nyt.com/images/2018/05/01/dining/01COOKING-PERFECTINSTANTRAMEN1/01COOKING-PERFECTINSTANTRAMEN1-articleLarge.jpg',
    description: 'an upgrade to regular ramen still quick though',
    origin: 'japan',
    recipeLink: 'https://cooking.nytimes.com/recipes/1016583-perfect-instant-ramen',
  },
  buffaloWings: {
    name: 'buffalo wings',
    cookTime: '50',
    photo: 'https://cafedelites.com/wp-content/uploads/2017/08/Crispy-Buffalo-Chicken-WIngs-IMAGE-9.jpg',
    description: 'backed buffalo wings recipe for when you have time and HUNGER',
    origin: 'america',
    recipeLink: 'https://cafedelites.com/crispy-buffalo-chicken-wings-baked/',
  },
  roastBeefSandwitch: {
    name: 'Roast Beef Sandwiche',
    cookTime: '50',
    photo: 'https://images-gmi-pmc.edge-generalmills.com/2da9324c-1fdc-449e-8cb7-db71608a4f47.jpg',
    description: 'Roast beef sandwitches on garlic bread. BUT THATS NOT ALL FOLKS, this sandwitch has carmalizied oninons,and provolone chese',
    origin: 'america',
    recipeLink: 'https://www.bettycrocker.com/recipes/roast-beef-sandwiches-with-caramelized-onions/730eb163-cf70-42f6-957b-952543b578c6',
  },
  pinapleFRice: {
    name: 'Pinaple Fried Rice',
    cookTime: '25',
    photo: 'https://cookieandkate.com/images/2015/02/thai-pineapple-fried-rice-1-550x757.jpg',
    description: 'Chicken fried rice mixed with pinaple',
    origin: 'thailand',
    recipeLink: 'https://cookieandkate.com/thai-pineapple-fried-rice-recipe/',
  },
};

// makes it easier to handle json code
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// helps us get data for our head requests
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// returns all recipes as JSON code
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};


const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);


// adds a recipe to the api
const addUser = (request, response, body) => {
  const responseJSON = {};

  // checks to see if all inputs have been filled out
  if (!body.name || !body.cookTime || !body.photo || !body.description
     || !body.origin || !body.recipeLink) {
    responseJSON.message = 'All boxes need to be filled.';
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }


  let responseCode = 201;

  // updates the recipe if it has the same name is nput
  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  // append all my data to my recipe
  users[body.name].name = body.name;
  users[body.name].cookTime = body.cookTime;
  users[body.name].photo = body.photo;
  users[body.name].description = body.description;
  users[body.name].origin = body.origin;
  users[body.name].recipeLink = body.recipeLink;


  if (responseCode === 201) {
    responseJSON.message = 'New recpie created successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

// returns a 404 code if the request canot be found
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

// exports our fuctions to other files
module.exports = {
  getUsers,
  addUser,
  notFound,
  getUsersMeta,
  notFoundMeta,
};
