exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Reading list?");
    msg.edit(`https://brightspace.uhi.ac.uk/d2l/le/content/103818/viewContent/1241003/View`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rl"],
    permLevel: "User"
  };

exports.help = {
    name: "readinglist",
    category: "Study",
    description: "Returns a link to the Reading List.",
    usage: "readinglist"

};