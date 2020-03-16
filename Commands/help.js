const Discord = require('discord.js'); //Use Discord.js
module.exports = {
    name: 'help',
    description: 'Shows help',
    execute(message, args, prefix){
        const HelpEmbed = new Discord.MessageEmbed()
        .setTitle("Help Information")
        .setColor(0xFFFAA)
        .setDescription("Make Sure To Use The Help Command To get Commands!")
        .addField("Commands", `Current Prefix:  ${prefix}`)
        .addField("csgo", "Gets Most Recent Csgo Update")
        .addField("website", "Authors Website")
        .addField("info", "Shows Info: Extra Args - Author, Version")
        .addField("clear", "Clears Chat: Extra Args - Amount, all / *")
        .addField("spam", "Spams Chat: Extra Args - Amount")
        .addField("profile", "Displays User Profile");
      message.author.send(HelpEmbed);
    }
}