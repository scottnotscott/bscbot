exports.run = async (client, message, args, level) => {
    const msg = await message.channel.send("Ah. The fabled Learning Outcomes...");
    msg.edit(`https://brightspace.uhi.ac.uk/d2l/le/content/103818/viewContent/1154476/View\n\n&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n\nhttps://asd.uhi.ac.uk/portal/wp-admin/admin.php?page=uhi_asd_stu_dashboard_show`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["lo"],
    permLevel: "User"
  };

exports.help = {
    name: "learningoutcomes",
    category: "Student links",
    description: "Returns a link to the Learning Outcomes Portal page.",
    usage: "learningoutcomes"

};