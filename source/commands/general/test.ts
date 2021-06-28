import { Command } from "../../structures/Command";
import { PermissionFlags } from "discord.js";

export class Test extends Command {
    constructor(name: string, category: string, aliases: string[], description: string, permissions: PermissionFlags[]) {
        super(name, category, aliases, description, permissions);
    }
}