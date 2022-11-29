const discord = require("discord.js");

module.exports = {
    name: "unban",
    description: "Unban a member",
    permission: discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "The member to unban",
            required: true
        }, {
            type: "string",
            name: "reason",
            description: "The reason for unban this member",
            required: false
        }
    ],

    async run(bot, message, args) {
        try {
            let user = args.getUser("member");
            let reason = args.getString("reason");

            if (!user)
                return message.reply("No member to unban !");
            if (!reason)
                reason = "No reason given for the unban.";
            if (!(await message.guild.bans.fetch()).get(user.id))
                return message.reply("This member is not ban.");

            try {await user.sent(`You have been unban from *${message.guild.name}* by *${message.user.tag}* for the reason : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} have been unbanned ${user.tag} for the reason : \`${reason}\``);
            await message.guild.members.unban(user, reason);
        } catch (err) {
            return message.reply("No member to unban !");
        }
    }
}