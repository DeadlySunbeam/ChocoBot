const fs = require("fs");
const Discord = module.require("discord.js")
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have manage messages.");
  let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage("You did not specific mention or ID");


  let role = message.guild.roles.find(r => r.name === "Muted");

  if (!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");
  await toMute.removeRole(role);

  delete bot.mutes[toMute.id];

  fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err =>{
    if(err) throw err;
    console.log(`I have unmuted ${toMute.user.tag}.`)
  });
  //return message.channel.sendMessage("I have unmuted them.");
}
module.exports.help = {
    name: "unmute",
    type: "moderation",
    desc: "Команда помощи"
}
