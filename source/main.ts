import AntiClient from "./utilities/AntiClient";
import { config as _envConfig } from "dotenv";

( async () => {
    _envConfig();
    const client : AntiClient = new AntiClient();
    
    //Use CLIENT_TOKEN as the env variable name for the token
    if ((await client.register() == ''))
        throw new Error("There was an error while logging in.");
    console.info(`Logged in as ${client.user?.tag}`);
})();