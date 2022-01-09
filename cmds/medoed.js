var cheerio = require("cheerio");
var request = require("request");
const Discord = module.require("discord.js")
var show = require("../modules/show.js");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports.run = async (bot, message, args) => {
let embed = new Discord.MessageEmbed();
embed = await show.run('honey', getRandomInt(2));
await message.channel.send({embeds:[embed]});
}
module.exports.help = {
    name: "медоед",
    type: "image",
    desc: "Прислать картинку медоеда"
}
