const discord = require("discord.js");
const LoadSlashCommands = require("../loaders/LoadSlashCommands");

module.exports = async bot => {

    await LoadSlashCommands(bot);
    console.log(`${bot.user.tag} est en ligne !`);
}