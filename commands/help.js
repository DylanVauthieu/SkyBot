const discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Show the help",
    permission: "none",
    dm: false,
    category: "Informations",
    options: [
        {
            type: "string",
            name: "commands",
            description: "More infos in one commands ?",
            required: false
        }
    ],

    async run(bot, message, args) {
        let command;

        if (args.getString("commands")) {
            command = bot.commands.get(args.getString("commands"));
            if (!command)
                return message.reply("No commands found !");
        }
        if (!command) {
            let categories = [];
            let Embed = new discord.EmbedBuilder;

            bot.commands.forEach(command => {
                if (!categories.includes(command.category)) categories.push(command.category);
            });

            Embed.setColor(bot.color);
            Embed.setTitle(`Bots commands:`);
            Embed.setThumbnail(bot.user.displayAvatarURL({dynamic: true}));
            Embed.setDescription(`Actual commands : \`${bot.commands.size}\`\nActual categories : \`${categories.length}\``);
            Embed.setTimestamp();
            Embed.setFooter({text: "Help commands !"});

            await categories.sort().forEach(async cat => {
                let commands = bot.commands.filter(cmd => cmd.category === cat);

                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`});
            })

            await message.reply({embeds: [Embed]});

        } else {
            let Embed = new discord.EmbedBuilder;

            Embed.setColor(bot.color);
            Embed.setTitle(`Commands ${command.name}:`);
            Embed.setThumbnail(bot.user.displayAvatarURL({dynamic: true}));
            Embed.setDescription(`Name : \`${command.name}\`
            Description : \`${command.description}\`
            Permissions :\`${typeof command.permission !== "bigint" ? command.permission : new discord.PermissionsBitField(command.permission).toArray(false)}\`
            Can be use in DM ? : \`${command.dm ? "Yes" : "No"}\`
            Category : \`${command.category}\``);
            Embed.setTimestamp();
            Embed.setFooter({text: "Help commands !"});

            await message.reply({embeds: [Embed]});
        }
    }
}