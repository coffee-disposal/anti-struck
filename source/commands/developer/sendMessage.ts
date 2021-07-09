import AntiClient from "../../utilities/AntiClient";
import { Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";

export = new (class SendMessage extends Command {
    constructor() {
        super("sendMessage", undefined, [], "Sends a message in a channel as the bot.", [], true);
    }

    public async run(client: AntiClient, message: Message, args: string[]) {
        message.channel.delete();
        message.channel.send(args.join(" "));
    }
});