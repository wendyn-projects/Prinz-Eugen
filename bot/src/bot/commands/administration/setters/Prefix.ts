import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import GuildConfig from '../../../../server/config/GuildConfig'
import { CommandNameOption, ValueAction, Response } from '../../interface'

export default class extends ValueAction<Response> {

    message: Discord.Message;
    config: GuildConfig;

    constructor(config: GuildConfig, message: Discord.Message) {
        super('prefix', [ new CommandNameOption('prefix') ]);
        this.config = config;
        this.message = message;
    }

    protected execution(): Response {
        this.config.setPrefix(this.value.prefix)

        return new Response(new Discord.MessageEmbed().setDescription(
                this.message.member.displayName + (
                    this.value.prefix.length !== 0?
                        ' has changed preffix to ' + 
                        Interface.separateByPipe(this.value.prefix).map((prefix: string) => '`' + prefix + '`').join('|'):
                        ' has removed the prefix'
                )
            ).setColor(this.message.guild.me.displayHexColor)
        );
    }
}