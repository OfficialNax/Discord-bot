const Discord = require('discord.js'); //Use Discord.js
const Bot = new Discord.Client(); //Create new instance of discord client for bot
const fs = require('fs');
var commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);

  commands.set(command.name, command);
}

const Token = ''; //Login Token For Bot
const prefix = '$';

var Version = '1.1.1';
var init = true;
var initPass = 0;
var MessagesNeeded = 10;
const sqrap = require('sqrap');
var CsgoDevChannel = '';
var updated = false;

var Members = [];
var levels = [];
var MessagesSent = [];

const csgoLogo = 'http://media.steampowered.com/apps/csgo/blog/images/fb_image.png?v=5';
const csgoPageUrl = 'https://blog.counter-strike.net/index.php/category/updates';
var Page = '';
var PageAll = '';
var NewPage = '';
const selectors = { //Csgo page selectors
  title: [{
    selector: 'h2',
    text: 'true'
  }],
  all: [{
    selector: 'div[class="inner_post"]',
    text: 'true'
  }],
  date: [{
    selector: 'p',
    text: 'true'
  }]
};

sqrap(csgoPageUrl, {
  selectors
}).then(result => {
  console.log("Bot - Updated CSGO update log");
  Page = result;
  PageAll = result.all.substring(Page.title.length + Page.date.length * 2).split('–'); //csgo page parcer
}).catch(console.log);

Bot.on('ready', () => {
  console.log('Bot Online'); //In Console verification that bot works / is online
  Bot.user.set
})

Bot.on('message', message => {

  sqrap(csgoPageUrl, {
    selectors
  }).then(result => {
    console.log("Bot - Updated CSGO update log");
    NewPage = result;
    //PageAll = result.all.substring(Page.title.length + Page.date.length * 2).split('–');  //csgo page parcer
  }).catch(console.log);

  if (NewPage.title != Page.title) {
    message.channel.send('$botcsgo');
    Page = NewPage;
  }

  var MessageName = message.author.id;
  if(MessageName === undefined){
    MessageName = "Bitch Boi";
  }

  if (message.author.username != "Bitch Boi") {

    if (Members.includes(MessageName)) {
      var index = Members.indexOf(MessageName);
      
      MessagesSent[index] += 1;

      

      if (MessagesSent[index] % MessagesNeeded === 0) {
        levels[index] += 1;
        if(levels[index] === 69){
          var LevelUpEmbed = new Discord.MessageEmbed()
          .setColor(0xFFFAA)
          .setThumbnail(message.author.avatarURL)
          .setTitle(`${message.author.username} Leveled Up!`)
          .setDescription(`${message.author.username} Leveled Up To Level ${levels[index]} ( ͡° ͜ʖ ͡°)`);
          message.reply(LevelUpEmbed);
        }
        else{
        var LevelUpEmbed = new Discord.MessageEmbed()
        .setColor(0xFFFAA)
        .setThumbnail(message.author.avatarURL)
        .setTitle(`${message.author.username} Leveled Up!`)
        .setDescription(`${message.author.username} Leveled Up To Level ${levels[index]}`);
        message.reply(LevelUpEmbed);
        console.log(`Bot - Member Leveled Up  -  ${MessageName}  | Level: ${levels[index]}`);
        }
      }

    } else {
      Members.push(MessageName);
      levels.push(0);
      MessagesSent.push(0);
      console.log(`Bot - Added Member: ${MessageName}`);
    }
  }

  if (!(message.content.charAt(0) === prefix)) return; //Check That String Uses Correct Prefix 

  let args = message.content.substring(prefix.length).split(" "); //Splits string into array of strings by ' '

  switch (args[0]) { //args[0] means if $ping ip   args[0] = ping, args[1] = ip


    case 'settings':
      if (!message.member.permissions.has('ADMINISTRATOR', true)) return message.channel.send(`${message.author}, You're not an Admin!`);
      
      if(!args[1]){
        var SettingsEmbed = new Discord.MessageEmbed()
        .setTitle("Settings Menu")
        .setDescription("Settings Options - Command | Description")
        .setColor(0xFFFAA)
        .addField("***$levelupamount***", "Amount of messages Needed to level up", true);

        message.channel.send(SettingsEmbed);

      }
      else if(args[1] === 'levelupamount'){
        if(!args[2]){
          message.reply("Error: Missing New Amount...");
        }else{
          MessagesNeeded = args[2];
          message.reply(`Changed Messages Needed To ${MessagesNeeded}`);
          console.log("Bot - Setting Changed : Messages Needed To level up");
        }
      }
                    //Add More Settings Options
      break;


    case 'kick':
      if (!message.member.permissions.has('ADMINISTRATOR', true)) return message.channel.send(`${message.author}, You're not an Admin!`);
      commands.get('kick').execute(message, args);
      break;

    case 'ban':
      if (!message.member.permissions.has('ADMINISTRATOR', true)) return message.channel.send(`${message.author}, You're not an Admin!`);
      commands.get('ban').execute(message, args);
      break;

    case 'poll':
      commands.get('poll').execute(message, args, prefix);
      break;

    case 'botcsgo':
      sqrap(csgoPageUrl, {
        selectors
      }).then(result => {
        Page = result;
        PageAll = result.all.substring(Page.title.length + Page.date.length * 2).split('–');
      });

      CsgoDevChannel = message.guild.channels.cache.find(CsgoDevChannel => CsgoDevChannel.name === "csgo");
      console.log("Channel Found - " + CsgoDevChannel);
      if (!CsgoDevChannel) CsgoDevChannel = message.guild.channels.cache.find(CsgoDevChannel => CsgoDevChannel.name === "general");
      console.log("Channel Found - " + CsgoDevChannel);;
      if (!CsgoDevChannel) return;

      const csgoUpdateBot = new Discord.MessageEmbed()
        .setTitle(Page.title)
        .setThumbnail(csgoLogo)
        .setColor(0xcee61e);
      csgoUpdateBot.addField("Updates", "**" + PageAll.join("\n\n") + "**");
      csgoUpdateBot.addField("View Update At", csgoPageUrl);
      message.delete().catch(console.error);
      if (init) {
        commands.get('clearcsgo').execute(message, args = ['clear', 'all'], CsgoDevChannel, csgoUpdateBot);
        initPass++;
        if (initPass === 2) {
          init = false;
        }
      } else {
        CsgoDevChannel.send(csgoUpdateBot);
      }
      break;

    case 'csgo': //Doesnt work as a command in seperate file, would have to be formatted differently
      sqrap(csgoPageUrl, {
        selectors
      }).then(result => {
        Page = result;
        PageAll = result.all.substring(Page.title.length + Page.date.length * 2).split('–');
      });

      CsgoDevChannel = message.guild.channels.cache.find(CsgoDevChannel => CsgoDevChannel.name === "csgo");
      console.log("Channel Found - " + CsgoDevChannel);
      if (!CsgoDevChannel) CsgoDevChannel = message.guild.channels.cache.find(CsgoDevChannel => CsgoDevChannel.name === "general");
      console.log("Channel Found - " + CsgoDevChannel);;
      if (!CsgoDevChannel) return;


      const csgoUpdate = new Discord.MessageEmbed()
        .setTitle(Page.title)
        .setThumbnail(csgoLogo)
        .setColor(0xcee61e);
      csgoUpdate.addField("Updates", "**" + PageAll.join("\n\n") + "**");
      csgoUpdate.addField("View Update At", csgoPageUrl);
      CsgoDevChannel.send(csgoUpdate);
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
      if (!message.member.permissions.has('ADMINISTRATOR', true)) return message.channel.send(`${message.author}, You're not an Admin!`);
      commands.get('clear').execute(message, args);
      break;

    case 'spam':
      if (!message.member.permissions.has('ADMINISTRATOR', true)) return message.channel.send(`${message.author}, You're not an Admin!`);
      commands.get('spam').execute(message, args);
      break;

    case 'profile':
      commands.get('profile').execute(message, args);
      break;

    default:
      message.channel.send(`${message.author} , $ ${message.content.substring(prefix.length).split(" ")[0]} Isn't A Valid Command`);

  }

  console.log(`Bot - Responded To Message By: ${message.author.username} - Given Command: ${args[0]}`);

  /*
  if(msg.content === 'Hello'){
    msg.reply(' Hello Fucker!');  //Basic Responce To Message
  }
  */
})

Bot.on('guildMemberAdd', member => {

  const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
  console.log("Channel Found - " + channel);
  if (!channel) channel = member.guild.channels.cache.find(channel => channel.name === "general");
  console.log("Channel Found - " + channel);;
  if (!channel) return;
  const embed = new Discord.MessageEmbed()
    .setTitle(`Welcome ${member.displayName} To ${member.guild.name}!`)
    .setColor(0xFFFAA)
    .setDescription(`Welcome To ${member.guild.name}!`)
    .setFooter("Enjoy Your Stay!");
  channel.send(embed);

  Members.push(member.id);
  levels.push(0);
  MessagesSent.push(0);
  console.log(`Bot - Added Member ${member.id}`);
})

Bot.login(Token); //Login To bot on Client With our bot token