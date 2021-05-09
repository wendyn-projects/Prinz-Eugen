import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import GuildConfig from '../../../../server/config/GuildConfig'
import { CommandNameOption, Response } from '../../interface'

export default class extends Interface.ValueAction<Response> {

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
            ).setColor(this.message.member.displayHexColor)
        );
    }
}