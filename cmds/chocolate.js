var cheerio = require("cheerio");
var request = require("request");
const Discord = module.require("discord.js")
var show = require("../modules/show.js");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports.run = async (bot, message, args) => {

    var mentioned_user = message.mentions.members.first();

    if (mentioned_user) {

      if (!mentioned_user.roles.cache.find(role =>  role.name === 'Чипированный'))
      {
        await message.channel.send(`Проверил ${mentioned_user}, cледов шоколада не обнаружено`);
      }
      else {
        await message.channel.send(`${mentioned_user} ошоколаден на `+getRandomInt(100)+"%");
      }
      
      return;
    }

  if (message.member.roles.cache.find(role =>  role.name === 'Чипированный'))
  {
    await message.channel.send("Вы ошоколадены на "+getRandomInt(100)+"%");
  }
  else {
    await message.channel.send("Следов шоколада не обнаружено");
  }
}
module.exports.help = {
    name: "шоколад",
    type: "info",
    desc: "Посмотреть насколько пользователь ошоколаден"
}
