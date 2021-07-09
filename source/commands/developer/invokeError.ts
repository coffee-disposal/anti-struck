import AntiClient from "../../utilities/AntiClient";
import { Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";

export = new (class InvokeError extends Command {
    constructor() {
        super("invokeError", undefined, [], "Manually invokes an error for testing purposes.", [], true);
    }

    public async run(client: AntiClient, message: Message, args: string[]) {
        const { title, description, color } = JSON.parse(args[0]);
        const embed: MessageEmbed = new MessageEmbed({
            title: title,
            description: description,
            color: color,
        });

        message.channel.send(embed);
    }
});