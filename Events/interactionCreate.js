const discord = require("discord.js");

module.exports = async (bot, interaction) => {

    if (interaction.type === discord.InteractionType.ApplicationCommand) {

        let command = require(`../commands/${interaction.commandName}`);
        command.run(bot, interaction, command.options)
    }
}