  
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
    try {
        message.channel.send(`***Pick a challenger or type exit to cancel***`)
          .then(() => {
            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 30000,
                errors: ['time'],
              })
              .then((obj1) => {
                if (!obj1) return;
                obj1 = obj1.array()[0];
                message.channel.send(`***Now enter the rival.***`)
                  .then(() => {
                    message.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                      })
                      .then((obj2) => {
                        if (!obj2) return;
                        obj2 = obj2.array()[0];
                        if (obj2.content == obj1.content) return message.channel.send(`Can't choose between the same thing.`);
                        let random = Math.floor(Math.random() * 100);
                        //let random1 = Math.floor(Math.random() * 100);
                        let obj1chance = 100 - random;
                        let obj2chance = 100 - obj1chance;
                        if (obj1chance > obj2chance) {
                          let embed = new MessageEmbed()
                            .setTimestamp()
                            .addField(`Chance to win ${obj1.content}:`, `${obj1chance}%`)
                            .addField(`Chance to win ${obj2.content}:`, `${obj2chance}%`)
                            .setThumbnail('https://64.media.tumblr.com/6e761ef747df1f1f59bee210e0b6641e/tumblr_nkhxxemP791rpwm80o1_250.jpg');
                            // .setThumbnail(client.user.avatarURL);
                          message.channel.send(embed);
                        } else if (obj1chance < obj2chance) {
                          let embed = new MessageEmbed()
                            .setTimestamp()
                            .addField(`Chance to win ${obj1.content}:`, `${obj1chance}%`)
                            .addField(`Chance to win ${obj2.content}:`, `${obj2chance}%`)
                            .setThumbnail('https://64.media.tumblr.com/6e761ef747df1f1f59bee210e0b6641e/tumblr_nkhxxemP791rpwm80o1_250.jpg');
                          message.channel.send(embed);
                        } else {
                          let embed = new MessageEmbed()
                            .setTimestamp()
                            .setDescription(`It was a tie! They drew`)
                            .addField(`Chance to win ${obj1.content}:`, `${obj1chance}%`)
                            .addField(`Chance to win ${obj2.content}:`, `${obj2chance}%`)
                            .setThumbnail('https://64.media.tumblr.com/6e761ef747df1f1f59bee210e0b6641e/tumblr_nkhxxemP791rpwm80o1_250.jpg');
                          message.channel.send(embed);
                        }
                      })
                      .catch((e) => {
                        console.log(e);
                        message.channel.send(`Time has expired.`);
                      });
                  });
              })
              .catch((e) => {
                console.log(e);
                message.channel.send(`Time has expired.`);
              });
          });
    } catch (e) {
      console.error;
      message.channel.send(`Oh no! An error occurred! \`${e.message}\`.`);
    }


};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };

exports.help = {
    name: "chance",
    category: "Miscelaneous",
    description: "Opens chance interface",
    usage: "chance"

};