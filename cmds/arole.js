const Discord = module.require("discord.js")
module.exports.run = async (bot, message, args) => {

var mas = '';
      message.guild.roles.forEach((item, i) => {
          if (!item.name.search(/NSFW.+/g))
          mas += item.name+' '+item.members.size+'\n';
      });
message.channel.send(mas);


}
module.exports.help = {
    name: "frole",
    type: "admin",
    desc: "Показать все роли"   
}
