const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB (replace 'mongodb://localhost:27017/mydb' with your MongoDB connection string)
mongoose.connect('mongodb://ec2-34-227-190-90.compute-1.amazonaws.com:27017/MyDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for the data you want to store
const itemSchema = new mongoose.Schema({
  name: String,
});

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // You can use a template engine like EJS
app.set('views', path.join(__dirname, 'views'));

// Define a route to display a form for user input
app.get('/', (req, res) => {
  res.render('index');
});

// Define a route to handle form submissions
app.post('/add', (req, res) => {
  const newItem = new Item({ name: req.body.item });
  newItem.save((err) => {
    if (err) {
      console.error('Error saving item: ' + err);
    } else {
      console.log('Item saved to the database');
    }
    res.redirect('/');
  });
});

// Define a route to display the stored items
app.get('/items', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.error('Error fetching items: ' + err);
    } else {
      res.render('items', { items });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
