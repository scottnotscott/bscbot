const { memeAsync } = require('memejs');
exports.run = async (client, message, args, level) => {
    memeAsync('ProgrammerHumor') // Use memeAsync('subredditname') to filter subreddits
    .then(m => {
        
        message.channel.send('```' + `Title: ` + m.title + '```' + '\n```Author: ' +m.author + '\nRandom meme from /r/ProgrammerHumor```\n' + m.url );
    console.log(m);
})
.catch(e => {
  // Handle the error
  console.log(e);
})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };

exports.help = {
    name: "meme",
    category: "Miscelaneous",
    description: "Generates a meme from /r/ProgrammerHumor",
    usage: "meme"

};