exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Bitbucket?");
    msg.edit(`https://bitbucket.org/dashboard/overview`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bb"],
    permLevel: "User"
  };

exports.help = {
    name: "bitbucket",
    category: "Project",
    description: "Returns a link to Bitbucket.",
    usage: "bitbucket"

};