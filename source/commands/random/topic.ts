import {Command} from "../../structures/Command";
import { Message, MessageEmbed, PermissionFlags } from "discord.js";
import AntiClient from "../../utilities/AntiClient";
import { StatusColor } from "../../data/colors";

export = new (class Topic extends Command {
    constructor() {
        super("topic", undefined, [], "Provides a random topic to initiate conversation about.", [], false);
    }

    public async run(client: AntiClient, message: Message, args: string[]) {
        const fetch = require("node-fetch");
        const prompt = () => {
            return new Promise<string>((resolve, reject) => {
                fetch("https://www.conversationstarters.com/random.php")
                    .then(res => res.text())
                    .then(text => resolve(text.replace("<img src=bullet.gif width=17 height=16>", "")))
            });
        }

        let content = await prompt();

        const embed: MessageEmbed = new MessageEmbed({
            title: content,
            color: StatusColor.INFO,
            footer: {
                text: message.author.tag,
                icon_url: message.author.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(client.user.discriminator) % 5}.png`,
            }
        });

        message.channel.send(embed);
    }
});