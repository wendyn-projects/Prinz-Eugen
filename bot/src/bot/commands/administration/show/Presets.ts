import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import { Presets, default as GuildConfig } from '../../../../server/config/GuildConfig'
import { Response } from '../../interface'

export default class extends Interface.ValueAction<Response> {

    message: Discord.Message;

    constructor(message: Discord.Message) {
        super('presets', []);
        this.message = message;
    }

    protected execution(): Response {

        return new Response(new Discord.MessageEmbed().setAuthor(
                `${this.message.member.displayName} asked to show available presets`,
                this.message.author.avatarURL(),
                'https://discord.com/channels/@me/'
            ).addField('Available Presets', Object.values(Presets.values).map((preset: string) => 
                '`' + preset + '`').join(' ')
            ).setColor(this.message.member.displayHexColor)
        );
    }
}