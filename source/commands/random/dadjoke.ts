import {Command} from "../../structures/Command";
import { Message, MessageEmbed, PermissionFlags } from "discord.js";
import AntiClient from "../../utilities/AntiClient";
import { StatusColor } from "../../data/colors";

export = new (class DadJoke extends Command {
    constructor() {
        super("dadJoke", undefined, [], "Fetches a random dad joke.", [], false);
    }

    public async run(client: AntiClient, message: Message, args: string[]) {
        const fetch = require("node-fetch");
        const prompt = () => {
            return new Promise<any>((resolve, reject) => {
                fetch("https://icanhazdadjoke.com/slack")
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
            title: "Here's a fresh dad joke.",
            description: content.attachments[0].text,
            color: StatusColor.INFO,
            footer: {
                text: message.author.tag,
                icon_url: message.author.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(client.user.discriminator) % 5}.png`,
            }
        });

        message.channel.send(embed);
    }
});