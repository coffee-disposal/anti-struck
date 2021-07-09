import AntiClient from "../../utilities/AntiClient";
import { Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import { StatusColor } from "../../data/colors";

export = new (class VibeCheck extends Command {
    constructor() {
        super("vibecheck", undefined, [], "Checks your vibe.", [], false);
    }

    public async run(client: AntiClient, message: Message, args: string[]) {
        const rating: number = (Math.floor(Math.random() * 10) + 1);

        const embed: MessageEmbed = new MessageEmbed({
            title: rating > 5 ? "You have passed the vibe check." : "You have failed the vibe check.",
            color: StatusColor.INFO,
            footer: {
                text: message.author.tag,
                icon_url: message.author.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(client.user.discriminator) % 5}.png`,
            }
        });

        message.channel.send(embed);
    }
});