const discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "unmute",
    description: "Unmute a member",
    permission: discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "member",
            description: "The member to unmute",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "reason",
            description: "The reason for unmute this member",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("member");
        let member = message.guild.members.cache.get(user.id);
        let reason = args.getString("reason");
        let time = args.getString("time");

        if (!user)
            return message.reply("No member to unmute !");
        if (!member)
            return message.reply("No member to unmute.");
        if (!reason)
            reason = "No reason given for the unmute.";
        if (!member.moderatable)
            return message.reply("I can't unmute this user.");
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0)
            return message.reply("You can't unmute this user.");
        if (!member.isCommunicationDisabled())
            return message.reply("This member is already unmute.");

        try {await user.sent(`You have been unmute from *${message.guild.name}* by *${message.user.tag}* for the reason : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} have unmute ${user.tag} for the reason : \`${reason}\``);
        await member.timeout(null, reason);
    }
}