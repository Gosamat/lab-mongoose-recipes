const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made

    // Iteration 2 - Create a recipe and Console.log the Title
    let recipeOne = {
      title: "choco frito", cuisine: "tuga"};
    let recipeOneDb = await Recipe.create(recipeOne);
    // console.log(recipeOneDb.title);
    
    // Iteration 3 - Insert multiple recipes and print the title of each recipe
    let allRecipesDb = await Recipe.insertMany(data);

    allRecipesDb.forEach((element)=>{
      // console.log(element.title)
    });

    // Iteration 4 - Update recipe
    let rigatoni = { title: 'Rigatoni alla Genovese' };

    let recipeUpdate = await Recipe.findOneAndUpdate(rigatoni, {duration: 100});
    let findrigatoni = await Recipe.find(rigatoni);

    console.log(findrigatoni);

    // Iteration 5 - Remove a recipe

    let carrotCake = { title: 'Carrot Cake' };
    let deleteCarrotCake = await Recipe.deleteOne(carrotCake);
    let updatedRecipeDb = await Recipe.find({});
    console.log (updatedRecipeDb);

    // Iteration 6 - Close the Database
    const dbConnectionStop = mongoose.connection.close(MONGODB_URI);

  } 
  
  catch (error) {
    console.log(error);
  }
};

manageRecipes();




//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */

  