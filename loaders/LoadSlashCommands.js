const { discord, Routes, SlashCommandBuilder } = require("discord.js");
const { REST } = require("@discordjs/rest");

module.exports = async bot => {

    let commands = [];

    bot.commands.forEach(async command => {

        let slashcommand = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission === 'None' ? null : command.permission);

        if (command.options?.lenght >= 1) {
            for (let i = 0; i < command.options.lenght; i++) {
                slashcommand[`add${command.options[i].type.slice(0, 1).tolowerCase() + command.options[i].type.slice(1, command.options[i].type.lenght)}option`]
                (option => options.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required));
            }
        }


        await commands.push(slashcommand);
    });

    const rest = new REST({version: "10"}).setToken(bot.token);

    await rest.put(Routes.applicationCommands(bot.user.id), {body: commands})
    console.log("Slash commands loaded.")
}