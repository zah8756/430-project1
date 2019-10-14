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
  l: {
    name: 'l',
    cookTime: '2',
    photo: 'https://cdn.shopify.com/s/files/1/2336/3219/products/shutterstock_77846398eureka2_x850.jpg?v=1554665666',
    description: 'is a lemon',
    origin: 'lemonTree',
    recipeLink: 'https://www.allrecipes.com/recipe/231190/the-best-lemon-tart-ever/',
  },
  e: {
    name: 'e',
    cookTime: '2',
    photo: 'https://cdn.shopify.com/s/files/1/2336/3219/products/shutterstock_77846398eureka2_x850.jpg?v=1554665666',
    description: 'is a lemon',
    origin: 'lemonTree',
    recipeLink: 'https://www.allrecipes.com/recipe/231190/the-best-lemon-tart-ever/',
  },
  m: {
    name: 'm',
    cookTime: '2',
    photo: 'https://cdn.shopify.com/s/files/1/2336/3219/products/shutterstock_77846398eureka2_x850.jpg?v=1554665666',
    description: 'is a lemon',
    origin: 'lemonTree',
    recipeLink: 'https://www.allrecipes.com/recipe/231190/the-best-lemon-tart-ever/',
  },
  o: {
    name: 'o',
    cookTime: '2',
    photo: 'https://cdn.shopify.com/s/files/1/2336/3219/products/shutterstock_77846398eureka2_x850.jpg?v=1554665666',
    description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique ipsum nulla, ac ultrices mi iaculis lacinia. Cras nibh sem, sagittis nec risus id, pulvinar consequat enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam sit amet vulputate mauris, sodales pulvinar lectus. Cras sed tellus pellentesque, aliquam ex ac, ullamcorper nunc. Cras vestibulum pulvinar nisl, id tempus dolor commodo sed. Suspendisse eleifend arcu id nunc hendrerit gravida. Etiam eget dui auctor, pulvinar eros sed, tincidunt magna. Sed ac maximus orci. Suspendisse pellentesque facilisis mauris, sed malesuada turpis aliquet et. Donec varius, nibh non malesuada rhoncus, massa nisi mollis quam, in pretium justo risus eget ligula. Vestibulum semper, neque non euismod consectetur, purus felis cursus massa, sit amet hendrerit mauris urna id sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam at lectus ac dolor facilisis imperdiet.',
    origin: 'lemonTree',
    recipeLink: 'https://www.allrecipes.com/recipe/231190/the-best-lemon-tart-ever/',
  },
  n: {
    name: 'n',
    cookTime: '2',
    photo: 'https://cdn.shopify.com/s/files/1/2336/3219/products/shutterstock_77846398eureka2_x850.jpg?v=1554665666',
    description: 'is a lemon',
    origin: 'lemonTree',
    recipeLink: 'https://www.allrecipes.com/recipe/231190/the-best-lemon-tart-ever/',
  },
  lime: {
    name: 'lime',
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

