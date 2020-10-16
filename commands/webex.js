exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("You're late aren't you...");
    msg.edit(`https://brightspace.uhi.ac.uk/d2l/common/dialogs/quickLink/quickLink.d2l?ou=103818&type=lti&rcode=7DA70AB5-85D5-400E-9F07-6AB58022125D-245821&srcou=6606&launchFramed=1&framedName=Webex`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["link2class"],
    permLevel: "User"
  };

exports.help = {
    name: "webex",
    category: "Student links",
    description: "Returns a link to the Webex meetings page.",
    usage: "webex"

};