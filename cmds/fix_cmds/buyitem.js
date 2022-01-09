const fs = require("fs");
const { createCanvas, loadImage, Image } = require('canvas')
const CanvasWidth = 1458;
const CanvasHeight = 1015;
const canvas = createCanvas(CanvasWidth, CanvasHeight)
const ctx = canvas.getContext('2d')
const distance = 350;

function compare(a, b) {
  if (a.name > b.name) return 1; // если первое значение больше второго
  if (a.name == b.name) return 0; // если равны
  if (a.name < b.name) return -1; // если первое значение меньше второго
  }


module.exports.run = async (bot, message, args) => {

  console.log(args);  

  if (!args[0]) 
  {
      var image = new Image();
      image.src = "./market.png";
      ctx.drawImage(image, 0, 0, CanvasWidth, CanvasHeight);
      ctx.font = '60px Arial';
      ctx.fillStyle = 'rgba(250, 250, 250, 0.9)';


      ///////
      if(!fs.existsSync("./items/Items.json")) arr = 0;
      else
      {
        let rawdata = fs.readFileSync(`./items/Items.json`);
        arr = JSON.parse(rawdata)['Items'];
        console.log(arr);
      }
      ///////
      var items_count = 1

      arr.forEach(element => {
        image.src = "./items/"+element.ID+".png";
        
       

        //ctx.drawImage(image, 40+182*((items_count-1)%6), 40+(198*Math.floor((items_count-1)/6)));
        ctx.drawImage(image, 70+distance*((items_count-1)%4), 40+(280*Math.floor((items_count-1)/4)));

        ctx.shadowColor = "#333";
        ctx.shadowOffsetX = 2;

        ctx.fillText(element.Name, 70+distance*((items_count-1)%4)-55*Math.floor(element.Name.length/6) , 250+(280*Math.floor((items_count-1)/4)));
        
        ctx.fillText(element.Price, (70+distance*((items_count-1)%4))+10*Math.floor(element.Price.length%4), 310+(280*Math.floor((items_count-1)/4)));

        
        ctx.shadowOffsetX = 0;

        items_count++;
      });

      
      //ctx.fillText(arr[0].Name, 40, 250);

      // image.src = "./Tomato.png";
      // ctx.drawImage(image, 40, 40);
      

      const imgeStream = canvas.toBuffer();
      await message.reply('Вот что продается в магазине', {
                files:
                [
                 imgeStream
                ]
            });

    return;
  }

  var jsonStr = '{"Users":[]}';

  var dir3 = "./GUILDS/"+message.guild.id;
  if(!fs.existsSync(dir3)) fs.mkdirSync(dir3);
  if(!fs.existsSync(dir3+"/Items.json"))
  fs.writeFileSync(dir3+"/Items.json", jsonStr)
  
  let rawdata = fs.readFileSync(`./items/Items.json`);
  obj = JSON.parse(rawdata);
  if(!obj) {
    message.reply("В магазине ничего нет")
  }
  var buyitem = obj['Items'].find( Item => Item.Name.toLowerCase() === args[0].toLowerCase());
  if(!buyitem) {
    message.reply("В магазине нет такого предмета, пожалуйста введите ``!купить``, чтобы глянуть все товары.");
  }

  /////////////////////////////

  rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Score.json`);
  obj2 = JSON.parse(rawdata);
  var Score = obj2['Users'].find( User => User.ID === message.author.id).Score;

  if(Score < buyitem.Price) {
    message.reply("У вас недостаточно Чокочипсиков! Заработайте ещё " +(buyitem.Price-Score)+ " ЧокоЧипсиков!"); return;
  }

  rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Items.json`);
  obj = JSON.parse(rawdata);
  var new_User = obj['Users'].find( User => User.ID === message.author.id)
  if (new_User)
  {
      
      console.log("Help")
      //new_Score = new_User.Score;
      obj['Users'].find( User => User.ID === message.author.id)['Items'].push({'ID': buyitem.ID, 'Name': buyitem.Name})
      //obj['Users'].find( User => User.ID === message.author.id).Date = new Date().getTime();
      message.reply("**"+args[0].toLowerCase()+" успешно куплен!**");
    
  }
  else
  {
    obj['Users'].push({'ID':message.author.id, 'Name':message.author.username, 'Items': [{'ID': buyitem.ID, 'Name': buyitem.Name}]});
    message.reply("**"+args[0]+" успешно куплен!**");
  }
  //console.log(new_Score);
  //
  obj2['Users'].find( User => User.ID === message.author.id).Score = Score - buyitem.Price;
  fs.writeFileSync(dir3+"/Score.json", JSON.stringify(obj2))
  fs.writeFileSync(dir3+"/Items.json", JSON.stringify(obj))

 
}
module.exports.help = {
    name: "купить",
    type: "info",
    desc: "купить предмет в магазине, чтобы посмотреть магазин введите команду без параметров."
}
