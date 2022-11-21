const discord = require("discord.js");
const intents = new discord.IntentsBitField(3276799);
const bot = new discord.Client({intents});
const loadCommands = require("./loaders/LoadCommands");
const config = require("./config");

bot.commands = new discord.Collection();

bot.login(config.token);
loadCommands(bot);

bot.on("messageCreate", async message => {

    if (message.content === "!ping") return bot.commands.get("ping").run(bot, message);
});

bot.on("ready", async () => {

    console.log(`${bot.user.tag} est en ligne !`);
});