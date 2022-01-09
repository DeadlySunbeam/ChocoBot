const Discord = module.require("discord.js")
const fs = require('fs');
var https = require('https');
module.exports.run = async (bot, message, args) => {
bot.user.setActivity('YouTube', { type: 'WATCHING' });
  message.guild.fetchInvites()
    .then(invites => console.log(`Fetched ${invites.size} invites
      `+invites.forEach((item, i) => {
        console.log(item.code+" "+item.uses);
      })
      ))
    .catch(console.error);

}
module.exports.help = {
    name: "i_info",
    type: "admin",
    desc: "Команда помощи"
}
