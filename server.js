const express = require('express');
const path = require('path');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static('./dist'));
const PORT = process.env.PORT || 4200;

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.listen(PORT, () => {
    console.log(`Server started : ${PORT}`)
});