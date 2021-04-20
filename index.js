const express = require ('express');
const app = express();
const fs = require('fs');
const path = require('path');
let PORT;
if (process.env.PORT){
    PORT = process.env.PORT 
}else{
    PORT = 5000;
};

app.set('view engine', 'ejs');
app.set('/views', 'views');
app.use(express.json());

app.get('/', (req, res)=>{
    fs.readFile('./json/qoute.json', 'utf8', (err, data) => {
        console.log(data);
        var quotesArray = JSON.parse(data);
        const maxVal = quotesArray.length - 1;
        const randomInt = getRandomIntInclusive(0, maxVal);
        const randomQuote = quotesArray[randomInt];
        // res.send(readData[1]);
         res.render("template", {
            qoute: randomQuote});
    })
})
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

 

app.listen (PORT, () => {
    console.log('app is running');
});