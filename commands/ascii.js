var figlet = require('figlet');

exports.run = async (client, message, args, level) => {
    var maxLen = 100 // Kendiniz en y�ksek harf sayisini ayarlayabilirsiniz
  
  if(args.join(' ').length > maxLen) return message.channel.send(`The max length is ${maxLen}!`) 
  
  if(!args[0]) return message.channel.send('Please enter some text.');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('k...');
          console.dir(err);
          return;
      }
      
      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });
}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["aa"],
    permLevel: "User"
  };

exports.help = {
    name: "ascii",
    category: "Miscelaneous",
    description: "Generates art from input",
    usage: "ascii"

};