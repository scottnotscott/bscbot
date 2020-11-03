const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
    try {
        const yesEmoji = '✅'
        const noEmoji = '🚫'
        const input = message.content.split(`¬poll `)
    
        const embed = new Discord.MessageEmbed()
          .setTitle('🗳 Poll')
          .addField(`React with either ✅ or 🚫 to vote.`, input, true)
          .setTimestamp()
    
        if (args.length === 0) {
          message.channel.send(`You need to specify the contents of the poll.\nE.g, \`poll Does pineapple belong on pizza?\``)
        } else {
          message.delete()
          message.channel.send(embed).then(message => {
            message.react(yesEmoji)
              .then(() => message.react(noEmoji))
          })
        }
      } catch (err) {
        // console.log(client.errors.genericError + err.stack).catch();
        console.log(err)
      }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ask', '?'],
    permLevel: "User"
  };

exports.help = {
    name: "poll",
    category: "Tools",
    description: "Start a poll.",
    usage: "poll <q>"

};