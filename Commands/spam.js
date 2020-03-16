module.exports = {
    name: 'spam',
    description: 'spams chat',
    execute(message, args){
        if (!args[1]) return message.reply("Error - Missing Second Arg.");
        for (let index = 0; index < args[1]; index++) {
          message.channel.send("Spamm.");
        }
    }
}