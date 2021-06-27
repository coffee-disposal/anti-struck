import { Command } from "../structures/Command";
import { Event } from "../structures/Event";
import { Client } from "discord.js";

export default class AntiClient extends Client {
    public commands: Command[] = [];
    public events: Event[] = [];

    constructor(commands: boolean = true, events: boolean = true) {
        super();

        this.load(commands, events);
    }

    private load(commands: boolean = true, events: boolean = true) {
        const glob = require("glob");

        if (commands) {
            const categories = glob.sync("build/commands/*");

            for (let i = 0; i < categories.length; i++) {

                let category = categories[i].replace("build/commands/", "");
                let commands = glob.sync(`${categories[i]}/*.js`);

                for (let j = 0; j < commands.length; j++) {
                    let command = require(`..${commands[j].replace("build", "")}`);
                    command.category = category;

                    this.commands.push(command);
                }
            }
        }

        console.log("Commands Loaded:");
        console.log(this.commands);

        if (events) {

        }
    }
}