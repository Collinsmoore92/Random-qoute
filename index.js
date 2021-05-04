const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
let PORT;
if (process.env.PORT) {
    PORT = process.env.PORT
} else {
    PORT = 2000;
};

app.set('view engine', 'ejs');
app.set('/views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    fs.readFile('./json/qoute.json', 'utf8', (err, data) => {
        console.log(data);
        var quotesArray = JSON.parse(data);
        const maxVal = quotesArray.length - 1;
        const randomInt = getRandomIntInclusive(0, maxVal);
        const randomQuote = quotesArray[randomInt];
        // res.send(readData[1]);
        res.render("template", {
            qoute: randomQuote
        });
    })
})

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


app.get("/api/qoute", (req, res) => {
    fs.readFile('./json/qoute.json', 'utf8', (err, data) => {
        let json = JSON.parse(data);
        res.send(json);
    });
});

app.post("/api/qoute", (req, res) => {
    //console.log(req.body);

    let newQuote = req.body.qoute;

    fs.readFile('./json/qoute.json', 'utf8', (err, data) => {
        let arr = JSON.parse(data);
        arr.push(newQuote);

        let stringArr = JSON.stringify(arr);
        console.log(stringArr);

        fs.writeFile('./json/qoute.json', stringArr, 'utf8', (err) => {
            if (err) throw err;

            res.send(arr);

        });
    });
});

app.delete("/api/qoute", (req, res) => {
    fs.readFile('./json/qoute.json', 'utf8', (err, content) => {
        // if err throw err;
        let contentData = JSON.parse(content);
        let qouteId = req.body.id;
        let newId = parseInt(qouteId);
        contentData.splice(newId, 1);
        let contentString = JSON.stringify(contentData);

        fs.writeFile('./json/qoute.json', contentString, 'utf8', (err) => {
            res.send(contentData);
        })
    })
})

app.put("/api/qoute", (req, res) =>{
    fs.readFile('./json/qoute.json', 'utf8', function(err, change){
        let update = JSON.parse(change);
        let qouteReplace = req.body.qoute;
        let integer = req.body.id;
        let int = parseInt(integer);
        update.splice(int, 0, qouteReplace);
        let updated = JSON.stringify(update);

        fs.writeFile('./json/qoute.json', updated, 'utf8', (err) =>{
            res.send(update);
        }) 
        

    })
})


app.listen(PORT, () => {
    console.log('server is running');
});