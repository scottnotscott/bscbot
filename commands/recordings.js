exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Hm. Let us hope they're uploaded...");
    msg.edit(`https://brightspace.uhi.ac.uk/d2l/le/content/103818/viewContent/1411733/View`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rec"],
    permLevel: "User"
  };

exports.help = {
    name: "recordings",
    category: "Student links",
    description: "Returns a link to the Past Lesson Recordings page.",
    usage: "recordings"

};