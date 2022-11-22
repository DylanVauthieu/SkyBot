const discord = require("discord.js");

module.exports = async bot => {

    let command = [];

    bot.commands.forEach(commands => {
        let slashCommand = new discord.SlashCommandBuilder()
        .setName(command.setName)
        .setDescription(command.setDescription)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission === "No need" ? null : command.permission);

        if (command.options?.lenght >= 1) {
            for (let i = 0; i < command.options.lenght; i++) {
                slashCommand[`add${command.options[i].type.slice(0, 1).tolowerCase() + command.options[i].type.slice(1, command.options[i].type.lenght)}option`]
                (option => options.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required));
            }
        }


        await commands.push(slashCommand);
    });

    
}