exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("The current weekly Algorithm task?");
    msg.edit(`https://i.gyazo.com/a4b6cb75191818752cb99069c1804f89.png`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };

exports.help = {
    name: "task",
    category: "Rolling requirements",
    description: "Returns a link to the weekly Algo task.",
    usage: "task"

};