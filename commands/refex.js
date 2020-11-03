exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Reflection Example?");
    msg.edit(`https://i.gyazo.com/64337f39888ba6833b5b0e44ac6d0fd0.png`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["reflectionexample", "refexample"],
    permLevel: "User"
  };

exports.help = {
    name: "refex",
    category: "Study",
    description: "Returns an image of reflection example by Tom McCallum: 20/10/2020",
    usage: "refex"

};