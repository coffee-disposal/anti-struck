import { Client, Message, PermissionFlags } from "discord.js";

export class Command {
    public name: string;
    public category: string;
    public aliases: string[];
    public description: string;
    public permissions: PermissionFlags[];

    constructor(name: string, category: string, aliases: string[] = [], description: string, permissions: PermissionFlags[]) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.description = description;
        this.permissions = permissions;
    }

    public run(client: Client, message: Message, args: string[]) {
        throw new Error("Command.ts: NotImplementedException: You didn't implement the \"execute\" method.");
    }
}