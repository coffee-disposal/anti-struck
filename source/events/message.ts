import {Event} from "../structures/Event";
import {Client} from "discord.js";

export class Message extends Event {
    constructor() {
        super("message");
    }

    execute(client: Client, ...args) {
        console.log(args[0].content, args[0].channel.id);
    }
}