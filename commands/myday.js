exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Myday you ask?");
    msg.edit(`https://myday.uhi.ac.uk/dashboard/students`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };

exports.help = {
    name: "myday",
    category: "Student links",
    description: "Returns a link to the Myday page.",
    usage: "myday"

};