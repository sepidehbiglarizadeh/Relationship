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
    books: [bookSchema],
  })
);

async function createUser(first_name, last_name, book) {
  const user = new User({
    first_name,
    last_name,
    books: book,
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

async function addBook(userId, book) {
  const user = await User.findById(userId);
  user.books.push(book);
  await user.save();
}

async function removeBook(userId,bookId){
  const user= await User.findById(userId);
  const book= user.books.id(bookId);
  book.remove();
  await user.save();
}

// createUser(
//   "test",
//   "test123",
//   new Book({ title: "Node.js programming", pages: 100 })
// );
// getUsers();
// updateUser("63c30afa76e4802c3d4424bf");
// createUser('test00','test333', [
//   new Book({title:'Vue.js',pages:200}),
//   new Book({title:'Angular',pages:250}),
//   new Book({title:'JavaScript',pages:300}),
// ])
// addBook('63c30c81c2624496387f0ff6', new Book({title:'mongodb',pages:150}));

removeBook('63c30c81c2624496387f0ff6','63c30d9da1a28229dcd092db');