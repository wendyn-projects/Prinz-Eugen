import * as Discord from 'discord.js'
import GuildConfig from '../../../../server/config/GuildConfig'
import { MessageCommand, CommandNameOption, Response } from '../../interface'

export default class extends MessageCommand {

    message: Discord.Message;
    config: GuildConfig;

    constructor(config: GuildConfig, message: Discord.Message) {
        super('prefix', [ new CommandNameOption('prefix') ]);
        this.config = config;
        this.message = message;
    }

    protected execution(): Response {
        this.config.setPrefix(this.value.prefix)

        return new Response(new Discord.MessageEmbed().setAuthor(
                `${this.message.member.displayName} has changed preffix to ${this.value.prefix}`,
                this.message.author.avatarURL(),
                'https://discord.com/channels/@me/'
            )
        );
    }
}