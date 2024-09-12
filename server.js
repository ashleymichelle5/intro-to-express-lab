const express = require('express');
const app = express();

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPrice = parseFloat(req.query['min-price']);
    const maxPrice = parseFloat(req.query['max-price']);
    const type = req.query.type;

    let filteredShoes = shoes; 
    if(isNaN(minPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (isNaN(maxPrice)) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.send(filteredShoes);
})

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:index', (req,res) => {
    const index = parseInt(req.params.index, 10);
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        res.send(`This item is not yet in stock. Check back soon!`)
    }
    const item = collectibles[index];
    const responseMessage = `So you want the ${item.name}? For the ${item.price.toFixed(2)}, it can be yours!`
    res.send(responseMessage);
})

app.get('/roll/:num', (req, res) => {
    if (isNaN(req.params.num)) {
        res.send (`You must specify a number.`); 
        return 
    } 
    const number = parseInt(req.params.num);
    const rolledNumber = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${rolledNumber}`);
});

app.get('/greetings/:name', (req,res) => {
    res.send(`What a delight it is to see you once more, ${req.params.name}!!`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
});
