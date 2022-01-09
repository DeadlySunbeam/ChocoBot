const { createCanvas, loadImage, Image } = require('canvas')
const CanvasWidth = 1500;
const CanvasHeight = 810;
const canvas = createCanvas(CanvasWidth, CanvasHeight)
const ctx = canvas.getContext('2d')
const express = require('express')
var cheerio = require("cheerio");
var path = require('path')
const fs = require("fs");


function find(array, value) { //Эту функцию я нашел на каком-то ресурсе. Она ищет повторяющиеся значения в массиве. А-ля search_array() в php
    if (array.indexOf) {
        return array.indexOf(value);
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return i;
    }

    return -1;
}

  var a = fs.readFile("result.txt", "utf8",
             function(error,data){
               var arr = data.toString();
               arr = arr.split(" ");
               console.log(arr[3]);
               return arr[2];
});


arr = fs.readFileSync("result.txt", "utf8");
arr2 = fs.readFileSync("OLD/result.txt", "utf8");
//arr = arr.match(/[А-я]+ /g);
arr = arr.toString();
arr2 = arr2.toString();

arr = arr.split(",");
arr2 = arr2.split(",");

    var bak = new Image();
    bak.src = "bak.png";
    var NewIcon = new Image();
    NewIcon.src = "image/NEW_icon.png";
    var image = new Image();
    image.src = "image/OwO2.png";
    ctx.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);
    ctx.globalAlpha = 0.2
    ctx.fillStyle = ctx.createPattern(bak, "repeat");
    ctx.fillRect(0, 0, 1800, 1000);
        ctx.globalAlpha = 1;
    var x = 0;
    var y = 0;
   ctx.shadowColor = "#000";
   ctx.shadowOffsetX = 5;
   ctx.shadowBlur = 5;
    ctx.font = '20px Impact'
  ctx.fillStyle = 'rgba(250, 250, 250, 0.8)'



    arr.forEach( function (value, i){

    if(i%25==0 & i!=0) {y=0; x++;};

        ctx.rotate(0);
        if ( find(arr2, arr[i]) == -1 )
        {
          ctx.globalAlpha = 0.8
            ctx.drawImage(NewIcon, 30+(320*x)-35, 30+(30*y), 50, 25);
            ctx.globalAlpha = 1
        }
        ctx.fillText(value, 50+(320*x), 50+(30*y));

            y++;
        })

        var now = new Date();
        ctx.shadowOffsetX = 0;
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#000000";
          ctx.globalAlpha = 0.2
        ctx.fillRect(0, CanvasHeight-30, CanvasWidth, 1000);
          ctx.fillStyle = "#FFFFFF";
            ctx.globalAlpha = 0.8
        ctx.fillText(now, CanvasWidth-207, CanvasHeight-10);


    //res.send('Hello ')


//app.listen(3000, () => console.log('Aw'))
canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'text.png')))
