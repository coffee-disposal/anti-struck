import AntiClient from "./utilities/AntiClient";
import { config as _envConfig } from "dotenv";

_envConfig();

const client: AntiClient = new AntiClient();

client.login(process.env.TOKEN).catch(err => {
    throw new Error("There was an error while logging in.\n" + err);
});

console.info(`Logged in as ${client.user}`);
