const discord = require("discord.js");
const bot = new discord.Client({intents: 3276799});
const config = require("./config");

bot.login(config.token);

bot.on("ready", async () => {

    console.log(`${bot.user.tag} est en ligne !`);
})