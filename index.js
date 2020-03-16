const Discord = require('discord.js'); //Use Discord.js
const Bot = new Discord.Client(); //Create new instance of discord client for bot
const fs = require('fs');
var commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./Commands/${file}`);

    commands.set(command.name, command);
}

const Token = 'Njg4NTMxMTYxNzgxMzcxMDMy.Xm1qrA.rJeAEF7WModlKGurhQNFkUQ-kQM'; //Login Token For Bot
const prefix = '$';

var Version = '1.0.5';

const sqrap = require('sqrap');

const csgoLogo = 'http://media.steampowered.com/apps/csgo/blog/images/fb_image.png?v=5';
const csgoPageUrl = 'https://blog.counter-strike.net/index.php/category/updates';
var Page = '';
var PageAll = '';

const selectors = { //Csgo page selectors
  title: [
    {
      selector: 'h2',
      text: 'true'
    }
  ],
  all: [
    {
      selector: 'div[class="inner_post"]',
      text: 'true'
    }
  ],
  date: [
    {
      selector: 'p',
      text: 'true'
    }
  ]
};

/*
sqrap(csgoPageUrl, { selectors }).then(result => {
  console.log(result);
  Page = result;
  PageAll = result.all.substring(Page.title.length + Page.date.length * 2).split('–');  //csgo page parcer example
})
  .catch(console.log);
*/

Bot.on('ready', () => {
  console.log('Bot Online'); //In Console verification that bot works / is online
})

Bot.on('message', message => {

  if (!(message.content.charAt(0) === prefix)) return; //Check That String Uses Correct Prefix 

  let args = message.content.substring(prefix.length).split(" "); //Splits string into array of strings by ' '

  switch (args[0]) { //args[0] means if $ping ip   args[0] = ping, args[1] = ip

    case 'poll':
      commands.get('poll').execute(message, args, prefix);
      break;

    case 'csgo':   //Doesnt work as a command in seperate file, would have to be formatted differently
      sqrap(csgoPageUrl, { selectors }).then(result => {
        Page = result;
        PageAll = result.all.substring(Page.title.length + Page.date.length * 2).split('–');
        });

      const csgoUpdate = new Discord.MessageEmbed()
        .setTitle(Page.title)
        .setThumbnail(csgoLogo)
        .setColor(0xcee61e);
        csgoUpdate.addField("Updates", "**"+PageAll.join("\n\n") + "**");
      csgoUpdate.addField("View Update At", csgoPageUrl);
      message.channel.send(csgoUpdate);
      break;

    case 'help':
      commands.get('help').execute(message, args, prefix);
      break;

    case 'website':
          commands.get('website').execute(message, args);
      break;

    case 'info':
      commands.get('info').execute(message, args, Version);
      break;

    case 'clear':
      commands.get('clear').execute(message, args);
      break;

    case 'spam':
      commands.get('spam').execute(message, args);
      break;

    case 'profile':
      commands.get('profile').execute(message, args);
      break;

    default:
      message.channel.send(`${message.author} , $ ${message.content.substring(prefix.length).split(" ")[0]} Isn't A Valid Command`);
  }



  /*
  if(msg.content === 'Hello'){
    msg.reply(' Hello Fucker!');  //Basic Responce To Message
  }
  */
})

Bot.on('guildMemberAdd', member => {

  const channel = member.guild.channels.cache.find(channel => channel.name === "welcome"); console.log("Channel Found - " + channel);
  if (!channel) channel = member.guild.channels.cache.find(channel => channel.name === "general"); console.log("Channel Found - " + channel);;
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(`Welcome ${member.displayName} To ${member.guild.name}!`)
    .setColor(0xFFFAA)
    .setDescription(`Welcome To ${member.guild.name}!`)
    .setFooter("Enjoy Your Stay!");
  channel.send(embed);

  
})

Bot.login(Token); //Login To bot on Client With our bot token
