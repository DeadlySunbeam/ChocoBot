const Discord = module.require("discord.js")
const fs = require('fs');
module.exports.run = async (bot, message, args) => {

var Users = message.channel.guild.roles;
var RoleList = new Discord.Collection();
Users.forEach((item, i) => {
  if (!item.name.search(/FURS.+/g))
  {
    //console.log("Роль "+item.name+" имеют "+item.members.size+" пользователей");
    RoleList.set(item.name, item.members.size);
    //console.log(RoleList);
  }
});

RoleList = RoleList.sort()
console.log(RoleList);
console.log(RoleList.lastKey(3))


fs.writeFileSync('./roleee.json', RoleList);

}
module.exports.help = {
    name: "users",
    type: "admin",
    desc: "Посмотреть"
}
