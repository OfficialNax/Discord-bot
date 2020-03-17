# Discord-bot
Basic Discord bot with command handler

Requires Node.js,
Uses discord.js, sqrap.js installed 

Has a Command Handler builtIn which is easy to add new commands to with a switch case

Uses sqrap.js to webscrape the 'https://blog.counter-strike.net/index.php/category/updates/' 
to read newest updates and display them in an embed in discord

#NOTE:
  - Within your discord server, #welcome text-chat is advised as being availble (For Welcome Messages)
  - Within your discord server, #csgo text-chat is advised as being availble    (For CS:GO Updates Bot)


Features planning on adding :
  - Per Role commands (eg: clear command only for select roles)
  - User Leveling System (Added Admin Check For Certain Commands)
  - Auto-Roles
  - Settings Menu
  - Music Bot Functionallity
  - Easy Admin Powers
    - Mutes
    - Kicks (Added)
    - Bans  (Added)
 
Current Commands :
  - $csgo
  - $info x
    - Author
    - Version
  - $clear x
  - $spam x
  - $profile
  - $poll x
  - $website
  
  Will Do a welcome message to new people joining the server :
   - This will automatically use a text-channel called 'welcome', 
   if cannot find this channel then will use the 'general' text-channel
  
  
