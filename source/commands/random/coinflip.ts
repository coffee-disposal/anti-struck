import {Command} from "../../structures/Command";
import { Message, MessageEmbed, PermissionFlags } from "discord.js";
import AntiClient from "../../utilities/AntiClient";
import { StatusColor } from "../../data/colors";

export = new (class Coinflip extends Command {
    constructor() {
        super("coinflip", undefined, [], "Flips a balanced coin.", [], false);
    }

    public async run(client: AntiClient, message: Message, args: string[]) {
        const sides: string[] = ["heads", "tails"];
        const embed: MessageEmbed = new MessageEmbed({
            title: sides[Math.floor(Math.random() * sides.length)],
            color: StatusColor.INFO,
            footer: {
                text: message.author.tag,
                icon_url: message.author.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(client.user.discriminator) % 5}.png`,
            }
        });

        message.channel.send(embed);
    }
});