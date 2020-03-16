module.exports = {
    name: 'info',
    description: 'Shows info',
    execute(message, args, Version){
        if (args[1] === 'Author') {
            message.channel.send("  *Author - Josh 'Nax'* ");
          }
        else if (args[1] === 'Version') {
            message.channel.send("*Current Bot Version - " + Version + "*");
        }
        else {
            message.channel.send("Command - 'info' - Takes a Arg Command: ");
            message.channel.send("  info  - Author ");
            message.channel.send("  info  - Version ");
        }
        
    }
}