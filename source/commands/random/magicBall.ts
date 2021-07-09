import {Command} from "../../structures/Command";
import { Message, MessageEmbed, PermissionFlags } from "discord.js";
import AntiClient from "../../utilities/AntiClient";
import { StatusColor } from "../../data/colors";

export = new (class MagicBall extends Command {
    constructor() {
        super("magicBall", undefined, [], "Provides a magical response to a question.", [], false);
    }

    public async run(client: AntiClient, message: Message, args: string[]) {
        const fetch = require("node-fetch");
        const prompt = () => {
            return new Promise<any>((resolve, reject) => {
                fetch(`https://8ball.delegator.com/magic/JSON/${args.join(" ")}`)
                    .then(res => res.json())
                    .then(json => resolve(json))
                    .catch(err => {
                        const embed: MessageEmbed = new MessageEmbed({
                            title: "There was an error while executing your command!",
                            description: "I could not fetch a response.",
                            color: StatusColor.ERROR,
                            footer: {
                                text: message.author.tag,
                                icon_url: message.author.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(client.user.discriminator) % 5}.png`,
                            }
                        });

                        message.channel.send(embed);

                        reject(err);
                    });
            });
        }

        let content = await prompt();

        const embed: MessageEmbed = new MessageEmbed({
            title: args.join(" ").substring(0, 255),
            fields: [{
                name: "Response",
                value: content.magic.answer
            }],
            color: StatusColor.INFO,
            footer: {
                text: message.author.tag,
                icon_url: message.author.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(client.user.discriminator) % 5}.png`,
            }
        });

        message.channel.send(embed);
    }
});