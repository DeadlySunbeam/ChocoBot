const { createCanvas, loadImage, Image } = require('canvas')
const CanvasWidth = 1458;
const CanvasHeight = 1015;
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

module.exports.run = async (bot, message, args) => {

  let toGet = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  MES_ID = message.author.id;
  MES_USER = message.author;

  if(toGet) {
    MES_ID = toGet.id;
    MES_USER = toGet;
  }

  if (message.channel.guild === undefined) { message.channel.send("Пожалуйста открывайте сумку на сервере"); return;}
  let msg = await message.channel.send("Заглядываем в сумку..."); 

  var score = 0;
  let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Score.json`);
  obj = JSON.parse(rawdata);
  var new_User = obj['Users'].find( User => User.ID === MES_ID);
  var dir3 = "./GUILDS/"+message.guild.id;
  

  if(!fs.existsSync(dir3+"/Items.json")) arr2 = 0;
  else
  {
    let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Items.json`);
    Member = JSON.parse(rawdata)['Users'].find(User => User.ID === MES_ID);
    if(Member)
    arr2 = JSON.parse(rawdata)['Users'].find(User => User.ID === MES_ID)['Items'];
    else arr2 = 0;
  }

  if(new_User) score = new_User.Score;

  var score_p = score;
  var score_d = 0;


  while (score_p > 9)
  {
    score_p = score_p / 10;
    score_d++;
  }

  var align = score_d * 30;
  console.log(align);

    function compare(a, b) {
  if (a.name > b.name) return 1; // если первое значение больше второго
  if (a.name == b.name) return 0; // если равны
  if (a.name < b.name) return -1; // если первое значение меньше второго
  }

  async function Draw(startPos, currentItemCount) {

    var NewIcon = new Image();
      NewIcon.src = "./modules/RoleList/image/NEW_icon.png";
      
      var image = new Image();
      var image2 = new Image();
      

      
    
      
      image2.src = "./items/chip.png";
      //image3.src = `https://mdn.mozillademos.org/files/5397/rhino.jpg`;
      
      //console.log(image3.src)
      image.src = "./inventary.jpg";
      ctx.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);


      items_count = 1;

      //console.log("awaw");

      if(arr2)
      for (iCount = 0, iPosition = currentItemCount ; iCount+iPosition < arr2.length+1; iCount++)
      {
        image2.src = "./items/"+arr2[iCount+iPosition-1].ID+".png";
        ctx.drawImage(image2, 40+182*((iCount)%6), 40+(198*Math.floor((iCount)/6)))
        items_count++;  
      }
      // arr2.forEach( (element,index = 2) => {
      
      // image2.src = "./items/"+element.ID+".png";
      // ctx.drawImage(image2, 40+182*((index)%6), 40+(198*Math.floor((index)/6)))
      // items_count++;  
      // });


      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40, 40);

      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40+182, 40);

      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40+182+182, 40);

      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40+182+182+182, 40);

      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40+182+182+182+182, 40);

      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40+182+182+182+182+182, 40);

      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40, 40+195);

      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40, 40+195+195);

      //ctx.globalAlpha = 0.1
      //ctx.fillStyle = ctx.createPattern(bak, "repeat");
      //ctx.fillRect(0, 0, 1800, 1000);
          ctx.globalAlpha = 1;
      var x = 0;
      var y = 0;
     ctx.shadowColor = "#000";
     ctx.shadowOffsetX = 0;
     ctx.shadowBlur = 0;
     ctx.font = '100px Mono';
     ctx.fillStyle = 'rgba(250, 250, 250, 0.9)';
     ctx.fillText(score, 1260 - align, 515)
      ctx.font = '30px ';
    ctx.fillStyle = 'rgba(250, 250, 250, 0.9)';
    ctx.fillText("Всего ЧокоЧипсиков:", 1120, 410)

    MES_REPLY = "";

    if (MES_ID == message.author.id) MES_REPLY = "Ваша сумка"
    else
      MES_REPLY = "Сумка " + MES_USER.user.username;
  const imgeStream = canvas.toBuffer();
  let aMessage = await message.reply( 
		{content:MES_REPLY,
            files:
            [
             imgeStream
            ]
        });

				if (startPos > 29) 
				{
						aMessage.react("<:left_arrow:855459246200193024>");
				}


  if (items_count > 30) 
  {
     aMessage.react("<:right_arrow:855459223763943424>");
  }
    
 

   aMessage.react("<:close:855470010947993631>");

	 const filter = (reaction, user) => {
		return (reaction.emoji.name === 'right_arrow' || reaction.emoji.name === 'left_arrow' || reaction.emoji.name === 'close') && user.id === message.author.id;
	};


  aMessage.awaitReactions({filter,  max: 1})
  .then(collected => {
		const reaction = collected.first();
    


    if(reaction.emoji.name === 'left_arrow')
    {
      Draw(startPos-30,currentItemCount-30);
    }

    if(reaction.emoji.name === 'right_arrow')
    {
      Draw(startPos+30,currentItemCount+30);
    }

    aMessage.delete(); 
    

  })
  .catch(console.error);



  
  
  return aMessage;
  }

let MyMessage = await Draw(1,1);
  
console.log(arr2.length + " размер таблицы");





await msg.delete();
//await message.delete();
}
module.exports.help = {
    name: ["сумка","рюкзак","мешок","инвентарь","вещи"],
    type: "info",
    desc: "Посмотреть в свою или чужую сумку"
}
