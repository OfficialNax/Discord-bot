const Discord = require('discord.js'); //Use Discord.js
module.exports = {
    name: 'profile',
    description: 'Shows user profile',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        .setTitle('Player Information')
        .setColor(0xF1C40F)
        .addField('Player', message.author.username)
        .addField('Player Level', Math.imul(message.author.username.length, Math.random() * 5))
        .addField('Current Server', message.guild.name)
        .setThumbnail(message.author.avatarURL)
        .setFooter(message.author.username + "'s Profile");
      message.channel.send(embed);
    }
}