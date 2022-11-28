const discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "mute",
    description: "Mute a member",
    permission: discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "The member to mute",
            required: true
        }, {
            type: "string",
            name: "time",
            description: "The time for the mute",
            required: true
        }, {
            type: "string",
            name: "reason",
            description: "The reason for mute this member",
            required: false
        }
    ],

    async run(bot, message, args) {
        let user = args.getUser("member");
        let member = message.guild.members.cache.get(user.id);
        let reason = args.getString("reason");
        let time = args.getString("time");

        if (!user)
            return message.reply("No member to mute !");
        if (!member)
            return message.reply("No member to mute.");
        if (!time)
            return message.reply("Add a time please");
        if (!reason)
            reason = "No reason given for the mute.";
        if (isNaN(ms(time)))
            return message.reply("Not the good time format.");
        if (ms(time) > 2419200000)
            return message.reply("The mute can't be more than 28 days.");
        if ((await message.guild.fetchOwner()).id === user.id)
            return message.reply("You can't mute the Owner.");
        if (message.user.id === user.id)
            return message.reply("Why you want to mute yourself ?");
        if (member && !member.moderatable)
            return message.reply("I can't mute this user.");
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0)
            return message.reply("You can't mute this user.");
        if (member.isCommunicationDisable())
            return message.reply("This member is already mute.");

        try {await user.sent(`You have been mute from *${message.guild.name}* by *${message.user.tag}* for *${time}* for the reason : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} have mute ${user.tag} for ${time} for the reason : \`${reason}\``);
        await member.timeout(ms(time), reason);
    }
}