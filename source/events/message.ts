import AntiClient from "../utilities/AntiClient";
import { StatusColor } from "../data/colors";
import { Event } from "../structures/Event";
import { Message, MessageEmbed } from "discord.js";
import { table } from "quick.db";

export class MessageEvent extends Event {
    constructor() {
        super("message");
    }

    public async execute(client: AntiClient, ..._args): Promise<any> {
        const message: Message = _args[0];
        const settings: table = new (await import('quick.db')).table("settings"),
              prefix = settings.get("prefix") || "sudo >>";

        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const { developers } = (await import("../data/permissions"));
        const [name, ...args] = message.content.slice(prefix.length).trim().split(/\s+/);

        const command = client.commands.get(name);

        if (command) {
            if (command.developer && !developers.includes(message.author.id)) {
                const embed: MessageEmbed = new MessageEmbed({
                    title: "There was an error while executing your command!",
                    description: "You do **not** have the `Developer` permission.",
                    color: StatusColor.ERROR,
                    footer: {
                        text: message.author.tag,
                        icon_url: message.author.displayAvatarURL() || `https://cdn.discordapp.com/embed/avatars/${Number(client.user.discriminator) % 5}.png`,
                    }
                });

                return message.channel.send(embed);
            }

            command.run(client, message, args);
        }
    }
}