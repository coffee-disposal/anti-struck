import {Event} from "../structures/Event";
import AntiClient from "../utilities/AntiClient";

export class Message extends Event {
    constructor() {
        super("message");
    }

    execute(client: AntiClient, ...args) {
        console.log(args[0].content, args[0].channel.id);
    }
}