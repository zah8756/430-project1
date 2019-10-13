const users = {
  pizza: {
    name: 'pizza',
    cookTime: '12',
    photo: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg',
    description: 'is pizza',
    origin: 'pizza tree',
    recipeLink: 'https://www.tasteofhome.com/recipes/homemade-pizza/',
  },
  lemon: {
    name: 'lemon',
    cookTime: '2',
    photo: 'https://cdn.shopify.com/s/files/1/2336/3219/products/shutterstock_77846398eureka2_x850.jpg?v=1554665666',
    description: 'is a lemon',
    origin: 'lemonTree',
    recipeLink: 'https://www.allrecipes.com/recipe/231190/the-best-lemon-tart-ever/',
  },
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};


const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

const addUser = (request, response, body) => {
  const responseJSON = {};

  if (!body.name || !body.cookTime || !body.photo || !body.description || !body.origin || !body.recipeLink) {
    responseJSON.message = 'All boxes need to be filled.';
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }


  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {

    users[body.name] = {};
  }


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

const notFound = (request, response) => {

  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};


module.exports = {
  getUsers,
  addUser,
  notFound,
  getUsersMeta,
  notFoundMeta,
};

