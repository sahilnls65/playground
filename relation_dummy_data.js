const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const { faker } = require("@faker-js/faker");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "rel_order" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "rel_review" }],
});

const categorySchema = new mongoose.Schema({
  name: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "rel_category" },
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "res_user" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "rel_product" },
  rating: Number,
  comment: String,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "res_user" },
  total: Number,
});

const orderProductSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "rel_order" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "rel_product" },
  quantity: Number,
});

// Define Models
const User = mongoose.model("rel_user", userSchema);
const Category = mongoose.model("rel_category", categorySchema);
const Product = mongoose.model("rel_product", productSchema);
const Review = mongoose.model("rel_review", reviewSchema);
const Order = mongoose.model("rel_order", orderSchema);
const OrderProduct = mongoose.model("rel_orderProduct", orderProductSchema);

// Seed Data Function
async function seedDatabase() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});
    await OrderProduct.deleteMany({});

    const users = [];
    const categories = [];
    const products = [];
    const reviews = [];
    const orders = [];

    // Create 10 categories
    for (let i = 0; i < 100; i++) {
      const category = new Category({
        name: faker.commerce.department(),
      });
      categories.push(await category.save());
    }

    // Create 30 products and assign to random categories
    for (let i = 0; i < 500; i++) {
      const product = new Product({
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        category: categories[Math.floor(Math.random() * categories.length)]._id,
      });
      products.push(await product.save());
    }

    // Create 20 users
    for (let i = 0; i < 1000; i++) {
      const user = new User({
        name: faker.internet.userName(),
        email: faker.internet.email(),
      });
      users.push(await user.save());
    }

    // Create 50 reviews, randomly assign to users and products
    for (let i = 0; i < 2000; i++) {
      const review = new Review({
        user: users[Math.floor(Math.random() * users.length)]._id,
        product: products[Math.floor(Math.random() * products.length)]._id,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: faker.lorem.sentence(),
      });
      reviews.push(await review.save());
    }

    // Create 40 orders, each with random products and users
    for (let i = 0; i < 800; i++) {
      const order = new Order({
        user: users[Math.floor(Math.random() * users.length)]._id,
        total: 0, // Total will be calculated from the products in the next step
      });

      const savedOrder = await order.save();
      orders.push(savedOrder);

      // Now, create entries in the OrderProduct join table for the current order
      const numProducts = Math.floor(Math.random() * 5) + 1; // 1 to 5 products per order
      let total = 0;

      for (let j = 0; j < numProducts; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 3) + 1; // 1 to 3 quantity

        // Create an OrderProduct entry
        const orderProduct = new OrderProduct({
          order: savedOrder._id,
          product: product._id,
          quantity: quantity,
        });

        await orderProduct.save();

        // Update total price for the order
        total += product.price * quantity;
      }

      // Update the total amount for the order after adding all products
      savedOrder.total = total;
      await savedOrder.save();
    }

    // Link reviews and orders to users and products
    for (const user of users) {
      user.reviews = reviews
        .filter((r) => r.user.toString() === user._id.toString())
        .map((r) => r._id);
      user.orders = orders
        .filter((o) => o.user.toString() === user._id.toString())
        .map((o) => o._id);
      await user.save();
    }

    for (const product of products) {
      product.reviews = reviews
        .filter((r) => r.product.toString() === product._id.toString())
        .map((r) => r._id);
      await product.save();
    }

    console.log("Database seeded successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seed function
seedDatabase();

// [
//   {
//     $limit: 15,
//   },
//   {
//     $lookup: {
//       from: "rel_orders",
//       localField: "_id",
//       foreignField: "user",
//       as: "rel_orders",
//     },
//   },
//   {
//     $unwind: {
//       path: "$rel_orders",
//       preserveNullAndEmptyArrays: true,
//     },
//   },
//   {
//     $lookup: {
//       from: "rel_orderproducts",
//       localField: "rel_orders._id",
//       foreignField: "order",
//       as: "rel_orderproducts",
//     },
//   },
//   {
//     $unwind: {
//       path: "$rel_orderproducts",
//       preserveNullAndEmptyArrays: true,
//     },
//   },
//   {
//     $lookup: {
//       from: "rel_products",
//       localField: "rel_orderproducts.product",
//       foreignField: "_id",
//       as: "rel_prodcuts",
//     },
//   },
//   {
//     $unwind: {
//       path: "$rel_prodcuts",
//       preserveNullAndEmptyArrays: true,
//     },
//   },
// ];
