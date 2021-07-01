import AntiClient from "../utilities/AntiClient";

export class Event {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    execute(client: AntiClient, ...args: any) {
        throw new Error("Event.ts: NotImplementedException: You didn't implement the \"execute\" method.");
    }
}