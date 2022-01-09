const Discord = module.require("discord.js")
const fs= module.require("fs");
module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have manage messages.");
  //if(message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"));
  let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage("You did not specific mention or ID");

  if(toMute.id === message.author.id) return message.channel.sendMessage("You can't mute yourself!");
  if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("You can't mute person with this role.");

  let role = message.guild.roles.find(r => r.name === "Muted");
  if(!role)
  {try {
    role = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions: []
    });

    message.guild.channels.forEach(async (channel, id) => {
      await channel.overwritePermissions(role, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });
  } catch(e){
    console.log(e.stack)
  }
}
  if (toMute.roles.has(role.id)) return message.channel.sendMessage("This user is already muted!");

  bot.mutes[toMute.id] = {
    guild: message.guild.id,
    time: Date.now() + parseInt(args[1]) * 1000
  }
  await toMute.addRole(role);

  fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
  if(err) throw err;

    message.channel.send("I have muted this user");
  })


  //message.channel.sendMessage("I have muted them.");
  //return message.reply(toMute.username || toMute.user.username)
  //Check f command executor has the right permission to do this command.
  //If the mutee has the same or a higher role.
}
module.exports.help = {
    name: "mute",
    type: "moderation",
    desc: "Команда помощи"
}
