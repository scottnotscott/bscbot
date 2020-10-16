exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Brightspace you ask?");
    msg.edit(`https://brightspace.uhi.ac.uk/d2l/home`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };

exports.help = {
    name: "brightspace",
    category: "Student links",
    description: "Returns a link to the Brightspace page.",
    usage: "brightspace"

};