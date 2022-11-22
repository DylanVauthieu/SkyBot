const discord = require("discord.js");
const intents = new discord.IntentsBitField(3276799);
const bot = new discord.Client({intents});
const loadCommands = require("./loaders/LoadCommands");
const loadEvents = require("./loaders/LoadEvents");
const config = require("./config");

bot.commands = new discord.Collection();

bot.login(config.token);
loadCommands(bot);
loadEvents(bot);
