exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Rolling a d6...");
    var roll = (Math.floor(Math.random()*6)+1);
    msg.edit(`*You rolled: ${roll}*`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };

exports.help = {
    name: "d6",
    category: "Miscelaneous",
    description: "Rolls a 6 sided dice",
    usage: "d6"

};