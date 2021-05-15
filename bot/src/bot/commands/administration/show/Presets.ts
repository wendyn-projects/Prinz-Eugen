import * as Discord from 'discord.js'
import { Presets } from '../../../../server/config/GuildConfig'
import { ValueAction, Response } from '../../interface'

export default class extends ValueAction<Response> {

    message: Discord.Message;

    constructor(message: Discord.Message) {
        super('presets', []);
        this.message = message;
    }

    protected execution(): Response {

        return new Response(new Discord.MessageEmbed().addField(
                `${this.message.member.displayName} asked to show available presets`,
                Object.values(Presets.values).map((preset: string) => 
                    '`' + preset + '`').join(' ')
            ).setColor(this.message.guild.me.displayHexColor)
        );
    }
}