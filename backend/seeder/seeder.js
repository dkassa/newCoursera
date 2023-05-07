require("dotenv").config();
const connectDB = require("../config/db");
connectDB();

//const categoryData = require("./categories");
const dishData = require("./dishes");
//const reviewData = require("./reviews");
const promtionData = require("./promotions");
const leadersData = require("./leaders");

//const Category = require("../models/CategoryModel");
const Dish = require("../models/dishes");
const Leader = require("../models/leaders");
//const User = require("../models/UserModel");
const Promotion = require("../models/promotions");

const importData = async () => {
  try {
    await Leader.collection.dropIndexes();
    await Dish.collection.dropIndexes();

    await Leader.collection.deleteMany({});
    await Dish.collection.deleteMany({});
    //await Review.collection.deleteMany({});
    await Promotion.collection.deleteMany({});
    //await Order.collection.deleteMany({});

    if (process.argv[2] !== "-d") {
      await Leader.insertMany(leadersData);
      //const reviews = await Review.insertMany(reviewData);
      
      await Dish.insertMany(dishData);
      await Promotion.insertMany(promtionData);
      //await Order.insertMany(orderData);

      console.log("Seeder data imported successfully");
      process.exit();
      return
    }
    console.log("Seeder data deleted successfully");
    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};
importData();
