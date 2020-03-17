module.exports = {
    name: 'clearcsgo',
    description: 'clears chat X ammount',
    execute(message, args, channel, embed) {
        if (!args[1]) return message.reply("Error - Missing Second Arg.");
        if (args[1] === 'all' || args[1] === '*') {
            for (let index = 0; index < 10; index++) {
                channel.bulkDelete('100');
                if (!channel.lastMessage) index = 11;
            }
        }
        else {
            channel.bulkDelete(args[1]);
        }
        channel.send(embed);
    }
}