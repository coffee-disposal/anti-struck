import { Client } from "discord.js";


// Use this in place of Client class 
export default class AntiClient extends Client {
    constructor () {
        super();
    }
    public async register () : Promise<string> {
        return process.env.CLIENT_TOKEN?.length ? this.login(process.env.CLIENT_TOKEN) : "";
    }
}