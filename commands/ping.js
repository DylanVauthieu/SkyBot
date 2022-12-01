const discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Show the actual ping",
    permission: "none",
    dm: true,
    category: "Utilities",

    async run(bot, message, args) {

        await message.reply(`Ping : \`${bot.ws.ping}\``);
    }
}