const discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick a member",
    permission: discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "member",
            description: "The member to kick",
            required: true
        }, {
            type: "string",
            name: "reason",
            description: "The reason for kick this member",
            required: false
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("member");
        let member = message.guild.members.cache.get(user.id);
        let reason = args.getString("reason");

        if (!user)
            return message.reply("No member to kick !");
        if (!member)
            return message.reply("No member to kick.");
        if (!reason)
            reason = "No reason given for the kick.";
        if ((await message.guild.fetchOwner()).id === user.id)
            return message.reply("You can't kick the Owner.");
        if (message.user.id === user.id)
            return message.reply("Why you want to kick yourself ?");
        if (member && !member.kickable)
            return message.reply("I can't kick this user.");
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0)
            return message.reply("You can't kick this user.");

        try {await user.sent(`You have been kick from *${message.guild.name}* by *${message.user.tag}* for the reason : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} have been kicked ${user.tag} for the reason : \`${reason}\``);
        await member.kick(reason);
    }
}