// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");

// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const config = require("./config.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`,
// or `bot.something`, this is what we're referring to. Your client.
const client = new Discord.Client({
  ws: {
    intents: config.intents
  }
});

// Here we load the config file that contains our token and our prefix values.
client.config = config
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require("./modules/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);

// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.
client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome EnMap module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({name: "settings"});

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
  });

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

// End top-level async/await function.
};

init();

// const Discord = require("discord.js");
// const client = new Discord.Client();
// const config = require("./config.json");
// const SQLite = require("better-sqlite3");
// const sql = new SQLite('./scores.sqlite');
// var WikiFakt = require('wikifakt');
// var chance = require('chance').Chance();
// const { meme } = require('memejs');


// client.on("ready", () => {
// 	console.log(`...Algobot is live...\n with ${client.users.cache.size} users\n in ${client.channels.cache.size} channels\n of ${client.guilds.cache.size} guilds. \n`)
// 	client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);

// 	client.on("guildCreate", guild => {
// 		// This event triggers when the bot joins a guild.
// 		console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
// 		client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
// 	  });
	  
// 	  client.on("guildDelete", guild => {
// 		// this event triggers when the bot is removed from a guild.
// 		console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
// 		client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
// 	  });
//   // Check if the table "points" exists.
//   const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
//   if (!table['count(*)']) {
//     // If the table isn't there, create it and setup the database correctly.
//     sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
//     // Ensure that the "id" row is always unique and indexed.
//     sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
//     sql.pragma("synchronous = 1");
//     sql.pragma("journal_mode = wal");
//   }

//   // And then we have two prepared statements to get and set the score data.
//   client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
//   client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
// });


//   if (command === "r100") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')
// 	  var roll = (Math.floor(Math.random()*100)+1);
// 	  if (roll <= 50) {
// 		  message.reply(`Rolling between 1-100... \n\nSorry you lost... You rolled: ${roll}` )
// 		  console.log(`${message.author.username} r100 & got ${roll}` + '\n');
		  
// 	  } else {
// 		  message.reply(`Rolling between 1-100... \n\nOh wow! you won, you rolled: ${roll}`)
// 		  console.log(`${message.author.username} played r100 and won! Their roll: ${roll}` + '\n');
// 	  }
//   }
//   if (command === "r1000") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')
// 	var roll = (Math.floor(Math.random()*1000)+1);
// 	if (roll <= 500) {
// 		message.reply(`Rolling between 1-1000... \n\nSorry you lost... You rolled: ${roll}`)
// 		console.log(`${message.author.username} played r1000 & got ${roll}` + '\n');
		
// 	} else {
// 		message.reply(`Rolling between 1-1000... \n\nOh wow! you won, you rolled: ${roll}`)
// 		console.log(`${message.author.username} played r1000 and won! Their roll: ${roll}` + '\n');
// 	}
// }

// }
//   if (command === "8ball") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')
//     message.channel.send(doMagic8BallVoodoo())
//     return;
//   }
//   if (command === "flip") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')
//     message.channel.send(coinToss())
//     // message.delete().catch(O_o=>{});
//     return;
//   }
//   if (command === "rngfact") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')
// 	WikiFakt.getRandomFact().then(function(fact) {
// 		message.channel.send(fact);
// 		WikiFakt.preload = false;
// 	})
//   }
//   if (command === "rngname") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')
// 	  WikiFakt.getRandomArticleTitle().then(function(title) {
// 		message.channel.send(title);
// 	  });
//   }
//   if (command === "domain") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')

// 	let domain = chance.domain()
// 	message.channel.send(domain)
// 	console.log(userName + ` resulted in ` + domain);
//   }
//   if (command === "domaincom") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')

// 	let domain = chance.domain({tld: 'com'})
// 	message.channel.send(domain)
// 	console.log(userName + ` resulted in ` + domain);
//   }
//   if (command === "domainnet") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')

// 	let domain = chance.domain({tld: 'net'})
// 	message.channel.send(domain)
// 	console.log(userName + ` resulted in ` + domain);
//   }
//   if (command === "domaingg") {
// 	let userName = message.author.username;
// 	let userId = message.author.id;
// 	let cmdcontent = message.content;
// 	console.log(`✅ ` + userName + ' Invoked command: '+ cmdcontent + '\nUserId: ' + userId + '\n')

// 	let domain = chance.domain({tld: 'gg'})
// 	message.channel.send(domain)
// 	console.log(userName + ` resulted in ` + domain);
//   }
//   if(command === "say"){
// 	let text = args.join(" ");
// 	message.delete();
// 	message.channel.send(text);
//   }
 
  

  
  



// });

// function doMagic8BallVoodoo() {
//     var rand = [':8ball: Absolutly. :8ball:', ':8ball: Absolutly not. :8ball:', ':8ball: It is true. :8ball:', ':8ball: Impossible. :8ball:', ':8ball: Of course. :8ball:', ':8ball: I do not think so. :8ball:', ':8ball: It is true. :8ball:', ':8ball: It is not true. :8ball:', ':8ball: I am very undoubtful of that. :8ball:', ':8ball: I am very doubtful of that. :8ball:', ':8ball: Sources point to no. :8ball:', ':8ball: Theories prove it. :8ball:', ':8ball: Reply hazy, try again. :8ball:', ':8ball: Ask again later... :8ball:', ':8ball: Better not tell you now... :8ball:', ':8ball: Cannot predict now... :8ball:', ':8ball: Concentrate and ask again... :8ball:'];

//     return rand[Math.floor(Math.random()*rand.length)];
// }

// function coinToss() {
//     var rand = [':moneybag: You flipped the coin, it lands on tails. :moneybag:', ':moneybag: I flipped the coin, it lands on tails. :moneybag:', ':moneybag: You flipped the coin, it lands on heads. :moneybag:', ':moneybag: I flipped the coin, it lands on heads. :moneybag:'];
//     return rand[Math.floor(Math.random()*rand.length)];
// }

// client.login(config.token);