const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/relation")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect to mongodb"));

const bookSchema = new mongoose.Schema({
  title: String,
  pages: Number,
});

const Book = mongoose.model("Book", bookSchema);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    book: bookSchema,
  })
);

async function createUser(first_name, last_name, book_id) {
  const user = new User({
    first_name,
    last_name,
    book: book_id,
  });
  const result = await user.save();
  console.log(result);
}

async function getUsers() {
  const users = await User.find();
  console.log(users);
}

async function updateUser(userId) {
  const user = await User.findById(userId);
  user.book.title = "React programming";
  await user.save();
}

// createUser(
//   "test",
//   "test123",
//   new Book({ title: "Node.js programming", pages: 100 })
// );
// getUsers();
updateUser("63c30afa76e4802c3d4424bf");
