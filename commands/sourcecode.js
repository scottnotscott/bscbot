exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Scanning my self...");
    msg.edit(`https://github.com/scottnotscott/bscbot`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sc", "source"],
    permLevel: "User"
  };

exports.help = {
    name: "sourcecode",
    category: "System",
    description: "Link to my source.",
    usage: "sourcecode"

};