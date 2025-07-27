//  Import Mongoose to interact with MongoDB
const mongoose = require('mongoose');

//  Import Faker to generate fake but realistic product data
const faker = require('faker');

//  Connect to MongoDB
// Note: Use environment variables for DB URL in production
mongoose.connect('mongodb://localhost:27017/catalogdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//  Define Mongoose schema to structure the product documents
const productSchema = new mongoose.Schema({
  name: String,                // Product name (e.g., "Nike Air Max")
  description: String,         // Product description
  price: Number,               // Product price
  imageUrl: String,            // Image URL (fake)
  brand: String,               // Brand name (e.g., "Samsung")
  categories: [String],        // Categories the product belongs to
  attributes: {                // Nested object for product attributes
    color: String,             // Color (e.g., "Red")
    size: String,              // Size (S, M, L, XL)
    material: String,          // Material (Cotton, Polyester)
    rating: Number             // Product rating (1.0 - 5.0)
  }
});

//  Create a model from the schema
const Product = mongoose.model('Product', productSchema);

//  Sample brand and category data
const brands = ["Sony", "Samsung", "Nike", "HP", "Apple", "LG", "Adidas"];
const categoriesList = ["Electronics", "Books", "Apparel", "Home", "Kitchen", "Fitness"];

//  Async function to seed the database with 1200 products
async function seed() {
  //  Clean the collection to avoid duplicates
  await Product.deleteMany({});

  const products = [];

  //  Generate 1200 fake product objects
  for (let i = 0; i < 1200; i++) {
    products.push({
      name: faker.commerce.productName(), // Fake product name
      description: faker.lorem.sentences(2), // Fake short description
      price: parseFloat(faker.commerce.price()), // Random price
      imageUrl: faker.image.imageUrl(), // Random image URL
      brand: faker.random.arrayElement(brands), // Random brand from list
      categories: faker.random.arrayElements(
        categoriesList,
        faker.datatype.number({ min: 1, max: 3 }) // Assign 1–3 categories randomly
      ),
      attributes: {
        color: faker.commerce.color(), // Random color
        size: faker.random.arrayElement(["S", "M", "L", "XL"]), // Random size
        material: faker.random.arrayElement(["Cotton", "Polyester", "Leather"]), // Random material
        rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }) // Random rating between 1.0 and 5.0
      }
    });
  }

  //  Insert all generated products into MongoDB
  await Product.insertMany(products);

  //  Log success message and disconnect from DB
  console.log(' Inserted 1200 demo products.');
  mongoose.disconnect();
}

//  Run the seed function
seed();
