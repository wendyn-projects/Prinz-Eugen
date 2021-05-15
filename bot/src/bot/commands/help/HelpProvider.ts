import * as Discord from 'discord.js'
import { Option, Action, ActionSelector } from '../../../formatting/HelpFormatting'
import { ValueAction, Response } from '../interface'
import { MessageGroup, default as GuildConfig } from '../../../server/config/GuildConfig'
import formatter from './formatter'

class MsgSender extends Action  {
    constructor(msgs: MessageGroup) {
        super(msgs.getName(), [], true, msgs.description, formatter);
    }
}

class MessageSelector extends ActionSelector {
    constructor(name: string, msgs: Array<MsgSender>) {
        super(name, msgs, true,
            'used for sending a random message from a variety of selections\n' +
            'use ALL CAPS for role specific messages (!WiP!)',
            formatter
        );
    }
}

class Messages {
    available: MsgSender[] = [];
    unavailable: MsgSender[] = [];
}

export class HelpGroup {

    public title: string;
    public arguments: Option[];

    constructor(title: string, args: Option[]) {
        this.title = title;
        this.arguments = args;
    }
}

export default class extends ValueAction<Response> {

    message: any;
    config: GuildConfig;

    constructor(message: any, config: GuildConfig) {
        super('help', []);
        this.message = message;
        this.config = config;
    }

    protected execution(): Response {
        let embed = new Discord.MessageEmbed();
        embed.setAuthor(
            `${this.message.member.displayName} asked for help`,
            this.message.author.avatarURL(),
            'https://discord.com/channels/@me/'
        );

        let msgs = this.config.getMessageGroups().reduce(
                (accumulator: Messages, messageGroup: MessageGroup) => {
                    if(messageGroup.isAvailable(this.message.member.roles.cache.map((role: Discord.Role) => role.id))) {
                        accumulator.available.push(new MsgSender(messageGroup));
                    } else {
                        accumulator.unavailable.push(new MsgSender(messageGroup));
                    }
                    return accumulator;
        }, new Messages());

        embed.setColor(this.message.member.displayHexColor);

        if(msgs.available.length > 0) {
            let msgSelector = new MessageSelector(this.config.getPrefix(), msgs.available);
            embed.addField('**Message Templates Available to You**', msgSelector.toString());
        }
        if(msgs.unavailable.length > 0) {
            let msgSelector = new MessageSelector(this.config.getPrefix(), msgs.unavailable);
            embed.addField('**Other Message Templates**', msgSelector.toString());
        }
        let otherCommands = new ActionSelector(this.config.getPrefix(), [
            new Action('help', [], true, '\nShows availablle commands', formatter)
        ], true, formatter);
        embed.addField('**Other Commands**', otherCommands.toString());

        return new Response(embed);
    }
}