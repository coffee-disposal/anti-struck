import {Command} from "../structures/Command";
import {Event} from "../structures/Event";
import {Client, Collection} from "discord.js";

export default class AntiClient extends Client {
    public commands = new Collection<string, Command>();
    public events = new Collection<string, Event>();

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

                    this.commands.set(command.name, command);
                }
            }
        }

        if (events) {
            const events = glob.sync("build/events/**/*.js");

            for (let i = 0; i < events.length; i++) {
                // ! Death inducing code ahead ! \\
                const path: string = `..${events[i].replace("build", "")}`,
                    event: Event = require(path),
                    instance: Event = new (event[Object.keys(event)[0]])();

                this.events.set(instance.name, instance);
                this.on(instance.name, instance.execute.bind(instance, this));
            }
        }
    }
}