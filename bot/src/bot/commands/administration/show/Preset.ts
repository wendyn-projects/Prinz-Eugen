import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import GuildConfig from '../../../../server/config/GuildConfig'
import { Response } from '../../interface'

export default class extends Interface.ValueAction<Response> {

    config: GuildConfig;
    message: Discord.Message;

    constructor(config: GuildConfig, message: Discord.Message) {
        super('preset', []);
        this.config = config;
        this.message = message;
    }

    protected execution(): Response {

        let preset = this.config.getPreset();
        return new Response(new Discord.MessageEmbed().setDescription(preset?
                `Current preset is \`${preset}\``:
                'no preset is set'
            ).setColor(this.message.guild.me.displayHexColor)
        );
    }
}