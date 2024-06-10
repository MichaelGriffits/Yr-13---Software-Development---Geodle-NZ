const express = require('express');
const app = express();
const port = 2000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

app.get('/font', (req, res) => {
    res.sendFile(__dirname + "/public/Lexend/Lexend-VariableFont_wght.ttf")})

app.get('/styles', (req, res) => {
    res.sendFile(__dirname + "/public/style.css")
});

app.get('/script', (req, res) => {
    res.sendFile(__dirname + "/public/index.js")
});

app.listen(port, () => {
    console.log(`testing on ${port}`);
})