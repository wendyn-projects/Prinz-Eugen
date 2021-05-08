import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import GuildConfig from '../../../../server/config/GuildConfig'
import { CommandNameOption, Response } from '../../interface'

export default class extends Interface.ValueAction<Response> {

    message: Discord.Message;
    config: GuildConfig;

    constructor(config: GuildConfig, message: Discord.Message) {
        super('preset', [ new CommandNameOption('preset') ]);
        this.config = config;
        this.message = message;
    }

    protected execution(): Response {

        return new Response(new Discord.MessageEmbed().setAuthor(
                `${this.message.member.displayName} has changed preset to ${this.value.prefix}`,
                this.message.author.avatarURL(),
                'https://discord.com/channels/@me/'
            )
        );
    }
}