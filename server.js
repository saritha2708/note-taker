const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
console.log("Hi");

app.listen(PORT, () => console.log(`Server running on PORT http://localhost:${PORT}`));