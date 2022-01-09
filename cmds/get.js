const Discord = module.require("discord.js")
const fs = require('fs');
var https = require('https');
module.exports.run = async (bot, message, args) => {

console.log(message.content)
if(message.attachments.size == 1)
{
  //console.log(message.attachments)
  var file = fs.createWriteStream("./DiscordBotImages/"+message.attachments.first().filename);
  var request = https.get(message.attachments.first().proxyURL, function(response) {
    //console.log(response)
    response.pipe(file);
  });
}
console.log(message.channel.id)


}
module.exports.help = {
    name: "get",
    type: "admin",
    desc: "Команда помощи"
}
