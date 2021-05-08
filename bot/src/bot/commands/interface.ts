import * as Discord from 'discord.js'
import * as Interface from '../../interface'

export class CommandNameOption extends Interface.StringOption {
    protected parser(): string {
        return this.unparsed[0].toLowerCase().replace(/[^a-z0-9]/g, '_');
    }
}

export class Response {

    response: Discord.StringResolvable|Discord.APIMessage;

    constructor(response: Discord.StringResolvable|Discord.APIMessage) {
        this.response = response;
    } 
}

export abstract class DialogCommand<T = any> extends Interface.ValueAction<T> {

}