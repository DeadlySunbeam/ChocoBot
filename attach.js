const fs = require('fs');
const https = require('https');
const Discord = module.require("discord.js")
module.exports.run = async (bot, message) => {
var dir = "F:/DiscordBotImages/"+message.guild.name.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
if(!fs.existsSync(dir))  fs.mkdirSync(dir);
  var dir2 = dir+'/'+message.channel.name
  if(!fs.existsSync(dir2))fs.mkdirSync(dir2);
    var dir3 = dir2+'/'+message.author.username.replace(/[^A-Za-zА-Яа-яЁё0-9]/g, "");
    if(!fs.existsSync(dir3)) fs.mkdirSync(dir3);



var file = fs.createWriteStream(dir3+'/'+message.attachments.first().filename);
var request = https.get(message.attachments.first().proxyURL, function(response, err) {
  //console.log(response)
  response.pipe(file);
});
}
