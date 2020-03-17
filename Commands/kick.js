module.exports = {
    name: 'kick',
    description: 'kicks person',
    execute(message, args){
        if (!args[1]) return message.reply("Error - Missing Second Arg.");
        const Target = message.mentions.users.first();
        if (Target) {
          const member = message.guild.member(Target);
          if (member) {
            member.kick('Kicked From Server').then(() => {
              message.reply(`Successfully Kicked ${Target.tag}`);
            }).catch(err => {
              message.reply('Kick Failed...');
              console.log(err);
            });
          } else {
            message.reply(`User - ${Target.tag} - Isnt In This Disord`);
          }
        } else {
          message.reply(`Please Speciify person`);
        }
    }
}