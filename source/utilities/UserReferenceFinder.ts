import {User} from "discord.js";
import AntiClient from "./AntiClient";
import regexes from "./UserReferenceRegexes";

export class UserReferenceFinder {
    private _strings: string[];
    private _client: AntiClient;

    constructor(client: AntiClient, args: string[]) {
        this._strings = args;
        this._client = client;
    }

    public findMemberReferences(): User[] {
        const EMPTY_USER = new User(this._client, {});
        const users: User[] = [];

        this._strings.forEach(arg => {
            if (this.returnReferenceIn(arg))
                users.push(this.returnReferenceIn(arg) || EMPTY_USER);
        });

        return users || null;
    }

    public returnReferenceIn(memberString: string): User | undefined {
        if (regexes.USER_TAG.test(memberString)) {
            return this._client.users.cache.find(user => user.tag == memberString);
        }

        if (regexes.USER_MENTION.test(memberString)) {
            return this._client.users.cache.find(user => [`<@${user.id}>`, `<@!${user.id}>`].includes(memberString));
        }

        if (regexes.USER_ID.test(memberString)) {
            return this._client.users.cache.get(memberString);
        }

        return null;
    }
}