module.exports = {
    name: 'clear',
    description: 'clears chat X ammount',
    execute(message, args) {
        if (!args[1]) return message.reply("Error - Missing Second Arg.");
        if (args[1] === 'all' || args[1] === '*') {
            for (let index = 0; index < 10; index++) {
                message.channel.bulkDelete('100');
                if (!message.channel.lastMessage) index = 11;
            }
        }
        else {
            message.channel.bulkDelete(args[1]);
        }
    }
}