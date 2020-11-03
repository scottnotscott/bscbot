const Discord = require('discord.js')
const rhyme = require('rhyme')

exports.run = async (client, message, args, level) => {
    try {
        if (!args[0]) return message.channel.send('You need to input the word to rhyme!')
    
        const msg = await message.channel.send(
          new Discord.MessageEmbed()
            .setDescription('Finding rhymes...')
            .setFooter('RHYME',
              'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
        )
    
        rhyme(async (rl) => {
            let rhymes = ''
              const words = rl.rhyme(args.join(' '))
    
              words.forEach(word => {
                rhymes += word.toProperCase() + ', '
              })
    
              rhymes = rhymes.slice(0, -2)
    
          const embed = new Discord.MessageEmbed()
            .setTitle(`${args[0]}`)
            .setDescription(`${rhymes || 'None Found.'}`)
            .setFooter('RHYME',
              'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')
    
          msg.edit(embed)
        })
      } catch (err) {
        console.log(err)
      }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };

exports.help = {
    name: "rhyme",
    category: "Fun",
    description: "Rhymes whatever you give it.",
    usage: "rhyme <word>"

};