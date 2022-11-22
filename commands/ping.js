const discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Show the actual ping",
    permission: "No need",
    dm: "true",

    async run(bot, message) {

        await message.reply(`Ping : \`${bot.ws.ping}\``);
    }
}