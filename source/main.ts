import AntiClient from "./utilities/AntiClient";
import {config as _envConfig} from "dotenv";

(async () => {
    _envConfig();

    const client: AntiClient = new AntiClient();

    await client.login(process.env.TOKEN).catch(err => {
        throw new Error("There was an error while logging in.\n" + err);
    });

    console.info(`Logged in as ${client.user.tag}`);
})();


