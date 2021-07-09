import {Command} from "../../structures/Command";
import {PermissionFlags} from "discord.js";

/* export */ class Test extends Command {
    constructor(name: string, category: string, aliases: string[] = [], description: string, permissions: PermissionFlags[], developer: boolean) {
        super(name, category, aliases, description, permissions, developer);
    }
}