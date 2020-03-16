const Discord = require('discord.js'); //Use Discord.js
module.exports = {
    name: 'poll',
    description: 'Creates Poll',
    execute(message, args, prefix){
        const PollEmned = new Discord.MessageEmbed()
        .setColor(0xFFFAA)
        .setTitle("Initiate Poll")
        .setDescription(`Use (${prefix}poll Poll Text) to create a poll`);
      if (!args[1]) {
        message.channel.send(PollEmned);
        return;
      }
      let pollArgs = args.slice(1).join(" ");
      message.delete().catch(console.error);

      message.channel.send("📋 **" + pollArgs + "** @everyone").then(messageReaction => {
        messageReaction.react("👍");
        messageReaction.react("👎");
      })
    }
}