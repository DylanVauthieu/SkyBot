const discord = require("discord.js");

module.exports = async (bot, message) => {

    let prefix = "+";
    let messageArray = message.content.split(" ");
    let commandName = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);
    let commandFile = bot.commands.get(commandName);

    if (!message.content.startsWith(prefix)) return;
    if (!commandFile) return message.reply(`The command \`${commandName}\` doesn't exist.`)

    commandFile.run(bot, message, args);
}