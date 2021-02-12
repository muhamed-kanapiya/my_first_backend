// подключение express
const express = require("express");
const basicAuth = require('express-basic-auth');

// создаем объект приложения
const app = express();
const port = 8080;


// определяем обработчик для маршрута "/"
app.get("/", function (request, response) {
    var randomSong = Math.floor(Math.random() * 20) + 1;
    var songs = ["All By Myself", "Carolina in the Morning", "Day by Day", "All My Tomorrows", "All I Do Is Dream of You", "Falling In Love with Love",
        "Fly Me to the Moon", "The Girl That I Marry", "Goodnight My Love", "I Can't Stop Loving You", "I Couldn't Sleep a Wink Last Night",
        "I Dream of You", "I Left My Heart in San Francisco", "I See Your Face Before Me", "I Wish I Were in Love Again", "On a Little Street in Singapore", "Our Love Affair",
        "P.S. I Love You", "The Second Time Around", "Somethin' Stupid"
    ];

    // отправляем ответ
    response.send(songs[randomSong]);
});
app.get("/birth_date", function (request, response) {

    response.send("December 12, 1915");
})
app.get("/birth_city", function (request, response) {

    response.send("Frank Sinatra was born to Italian immigrants in Hoboken, New Jersey");
})
app.get("/wives", function (request, response) {

    response.send("<ul>wife1: Nancy Barbato </ul> <ul>wife2: Ava Gardner </ul> <ul>wife3: Mia Farrow </ul><ul>wife4: Barbara Marx</ul>");
})

app.get("/picture", function (request, response) {

    response.send("<img src = https://upload.wikimedia.org/wikipedia/commons/a/af/Frank_Sinatra_%2757.jpg>");

})

app.get("/public", function (request, response) {
    response.send("Everybody can see this page");
})



app.use(basicAuth({
    users: {
        admin: 'admin'
    },
    challenge: true, // <--- needed to actually show the login dialog!
    realm: 'foo',
    unauthorizedResponse: () => {
        return "401 Not authorized"
    }

}));
app.get("/protected", function (request, response) {
    response.send("Welcome, authenticated client");
})

app.use(function (request, response) {
    response.status(404).send('404 page not found');
});

app.use(function (err, request, response) {
    console.error(err.stack);
    response.status(500).send('Something broke!');
});

// начинаем прослушивать подключения на 8080 порту
app.listen(port, () => {
    console.log("Server listining on port  8080")
})