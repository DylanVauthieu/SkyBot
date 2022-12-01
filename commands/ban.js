const discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban a member",
    permission: discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "member",
            description: "The member to ban",
            required: true,
            autocomplete: false,
        }, {
            type: "string",
            name: "reason",
            description: "The reason for ban this member",
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {
        try {
            let user = await bot.users.fetch(args._hoistedOptions[0].value);
            let member = message.guild.members.cache.get(user.id);
            let reason = args.getString("reason");

            if (!user)
                return message.reply("No member to ban !");
            if (!reason)
                reason = "No reason given for the ban.";
            if ((await message.guild.fetchOwner()).id === user.id)
                return message.reply("You can't ban the Owner.");
            if (message.user.id === user.id)
                return message.reply("Why you want to ban yourself ?");
            if (member && !member.bannable)
                return message.reply("I can't ban this user.");
            if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0)
                return message.reply("You can't ban this user.");
            if ((await message.guild.bans.fetch()).get(user.id))
                return message.reply("This user are already ban.");

            try {await user.sent(`You have been ban from *${message.guild.name}* by *${message.user.tag}* for the reason : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} have been banned ${user.tag} for the reason : \`${reason}\``);
            await message.guild.bans.create(user.id, {reason: reason});
        } catch (err) {
            return message.reply("No member to ban !");
        }
    }
}