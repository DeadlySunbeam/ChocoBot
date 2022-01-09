const Discord = module.require("discord.js")
module.exports.run = async (bot, message, args) => {

console.log(message.guild.emojis);
message.guild.emojis.forEach((item, i) => {

});


}
module.exports.help = {
    name: "реакции",
    type: "moderation",
    desc: "Команда помощи"
}
