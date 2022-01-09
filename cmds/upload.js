var cheerio = require("cheerio");
var request = require("request");
const Discord = module.require("discord.js")
var show = require("../modules/upload.js");
const fs = require('fs');


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function something(url, message) {
  for (var i = 1; i < 10; i++) {
  await show.run(message, i);
  }

  var objects = fs.readFileSync(url);
  console.log("DONEDONEDONEDONEDONEDONEDONEDONEDONEDONEDONE");
  objects = objects.toString().replace('][',',');
  fs.writeFile(url, (objects));

}

module.exports.run = async (bot, message, args) => {
//let embed = new Discord.RichEmbed();
let url = "";

url = show.run(message, 1);
//console.log(omg+"oleg");
setTimeout(function () {
  something(url,message);
}, 5000);


//await message.channel.send({embeds:[embed]});
}
module.exports.help = {
    name: "upload",
    type: "moderation",
    desc: "Команда помощи"
}
