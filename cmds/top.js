
var path = require('path')
const fs = require("fs");
const Discord = require("discord.js");
const { O_NONBLOCK } = require('constants');







function find(array, value) { //Эту функцию я нашел на каком-то ресурсе. Она ищет повторяющиеся значения в массиве. А-ля search_array() в php
    if (array.indexOf) {
        return array.indexOf(value);
    }

    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) return i;
    }

    return -1;
}

function compareScore(a, b) {
    return b.Score - a.Score;
  }

module.exports.run = async (bot, message, args) => {


   


      let rawdata = fs.readFileSync(`./GUILDS/`+message.guild.id+`/Score.json`);
      obj = JSON.parse(rawdata);
      obj["Users"].sort(compareScore)
      

      top_text = "";
      for(i = 0; i < 10 && i < obj["Users"].length; i++)
      {
          top_text+= "**"+(i+1)+". "+obj["Users"][i].Name + "** - " + obj["Users"][i].Score + "<:Chipsik:847169552386359327>" + "\n\n"; 
      }
 

    let embed = new Discord.MessageEmbed()
    //.setAuthor(message.author.username, message.author.avatarURL())
    .setDescription(top_text)

    //.setThumbnail(message.author.image)
    .setColor('#4169E1')
    .setTitle("Статистика по ЧокоЧипсикам")
    //.setImage(message.author.avatarURL())
    .setFooter("Кусь за бочок от "+bot.users.cache.get("241850808960811008").username, bot.users.cache.get("241850808960811008").avatarURL())
    //.setImage(message.author.image);
    message.channel.send({embeds:[embed]});



//await msg.delete();
await message.delete();
}
module.exports.help = {
    name: "топ",
    type: "info",
    desc: "Показать топ участников по ЧокоЧипсикам"
}
