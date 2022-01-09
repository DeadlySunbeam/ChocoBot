const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

var app = express();

var rawdata = fs.readFileSync("./URL/snow_leopard_urls.json");
var file = JSON.parse(rawdata);
var number = 0;


//app.use(express.bodyParser());

var war = app.use(bodyParser.text({ type: 'text/html' }));

var people = app.use(bodyParser.urlencoded({ extended: false }))
var jro = app.use(bodyParser.json());

app.get('/', function (req, res) {
  // res.send('<img src="' + file[0] + '" />');
    res.send(`<!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <h1>`+(number+1)+`|`+(file.length)+`</h1>
        <img width='200' height='200' src='`+file[number]+`'>
        <br>
        <br>
        <input value="Назад" onclick="isEmail(1)" type="button" id='1'>
        <input value="Убрать из списка" onclick="isEmail(2)" type="button" id='2'>
        <input value="Вперед" onclick="isEmail(3)" type="button" id='3'>
        <input value="Сохранить" onclick="isEmail(4)" type="button" id='4'>

        <script type="text/javascript">
          function isEmail(x)
          {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/a');

            xhr.setRequestHeader("Content-Type", "application/json");
            var explo = x;
            if(x == 1)
            xhr.send('{"Hello":1}');
            if(x == 2)
            xhr.send('{"Hello":2}');
            if(x == 3)
            xhr.send('{"Hello":3}');
            if(x == 4)
            xhr.send('{"Hello":4}');
            window.location.href = "/";
          }

        </script>
      </body>
    </html>`);
    //  getClick(res);

    //return res.redirect('/a');
});



app.post('/a', function (req, res) {
    //if(req.body.key == 1) console.log('hello');
    //console.log(req.body);
    var answer = req.body.Hello
    if(answer == 3 && number != file.length-1)
    number++;

    if(answer == 1 && number != 0)
    number--;

    if(answer == 2)
    {
    console.log(number)
    file.splice(number, 1);
    }

    if(answer == 4)
    {
      fs.writeFileSync("./URL/Checked.json", JSON.stringify(file));
    console.log("Сохранено!")

    }

    return res.redirect('/');
});


app.listen(3000, function() {
  console.log("Запущен сервер");

});
