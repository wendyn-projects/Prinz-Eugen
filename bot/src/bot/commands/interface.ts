import * as Discord from 'discord.js'
import * as Interface from '../../interface'
import * as MyDiscord from '../../myDiscord'

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

export class MessageDialog {

    public static async create(message: Discord.Message, options: Map<string, any>, author?: MyDiscord.Id, timeout: number = 10000): Promise<any> {
        let result;

        //can't await map.forEach
        for(let emojiName of Array.from(options.keys()))
            await message.react(emojiName)

        await message.awaitReactions((reaction: any, user: Discord.User) => {
                console.log(user.id,message.author.id);
                return options.has(reaction.emoji.name) && (!author || user.id === author)
            }, 
            { max: 1, time: timeout, errors: ['time'] }
        ).then((reactions) => {
            let reaction = reactions.first();
            result = options.get(reaction.emoji.name);
        }).catch(() => result = null);
        return result;
    }

    public static optionsFromArrays(emojiNames: string[], values: any[]): Map<string, any> {
        let result = new Map<string, any>();
        let count = Math.min(emojiNames.length, values.length);
        for(let i = 0; i < count; i++) {
            result.set(emojiNames[i], values[i]);
        }
        return result;
    }

    public static optionsBoolean() {
        return new Map<string, any>([ [ '✅', true ], [ '❌', false ] ])
    }
}