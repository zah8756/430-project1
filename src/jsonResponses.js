const users = {
  "piza":{
    name:"pizza",
    age:"22",
    photo:"https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg",
  }
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
  const responseJSON = {
    message: 'Name, Age, and a Photo are required.',
    
  };

  if (!body.name || !body.age || !body.photo) {
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
  users[body.name].age = body.age;
  users[body.name].photo = body.photo;


  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  responseJSON.photo = body.photo;
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

