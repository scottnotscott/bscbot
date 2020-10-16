exports.run = async (client, message, args, level) => {
        const msg = await message.channel.send("Jira?");
        msg.edit(`https://uhi.atlassian.net/secure/BrowseProjects.jspa?selectedProjectType=software`)
    };

    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: "User"
      };

    exports.help = {
        name: "jira",
        category: "Project",
        description: "Returns a link to Jira.",
        usage: "jira"

    };