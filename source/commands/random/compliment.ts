import {Command} from "../../structures/Command";
import { Message, MessageEmbed, PermissionFlags } from "discord.js";
import AntiClient from "../../utilities/AntiClient";
import { StatusColor } from "../../data/colors";
import { UserReferenceFinder } from "../../utilities/UserReferenceFinder";

export = new (class Compliment extends Command {
    constructor() {
        super("compliment", undefined, [], "Flatters you like you deserve to be.", [], false);
    }

    public async run(client: AntiClient, message: Message, args: string[]) {
        const fetch = require("node-fetch");
        const prompt = () => {
            return new Promise<any>((resolve, reject) => {
                fetch("https://complimentr.com/api")
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

        let target = new UserReferenceFinder(client, args).returnReferenceIn(args[0]);

        const embed: MessageEmbed = new MessageEmbed({
            title: "A compliment for the deserving!",
            description: `${target ? target : message.author}, ${content.compliment}`,
            color: StatusColor.INFO,
            footer: {
                text: message.author.tag,
                icon_url: message.author.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(client.user.discriminator) % 5}.png`,
            }
        });

        message.channel.send(embed);
    }
});