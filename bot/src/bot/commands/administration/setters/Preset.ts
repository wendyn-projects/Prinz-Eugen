import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import { Presets, default as GuildConfig } from '../../../../server/config/GuildConfig'
import { CommandNameOption, Response, MessageDialog } from '../../interface'

export default class SetPreset extends Interface.ValueAction<Promise<Response>> {

    config: GuildConfig;
    message: Discord.Message;

    static readonly reactions = [ '❌', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟' ];

    constructor(config: GuildConfig, message: Discord.Message) {
        super('preset', []);
        this.config = config;
        this.message = message;
    }

    reactionFilter = (reaction: any, user: Discord.User) => {
        return SetPreset.reactions.includes(reaction.emoji.name) && user.id === this.message.author.id;
    }

    protected async execution(): Promise<Response> {

        let presets = Object.values(Presets.values);
        if(presets.length > SetPreset.reactions.length)
            presets.slice(0, SetPreset.reactions.length);

        presets = [''].concat(presets);

        let dialog = await this.message.reply(new Discord.MessageEmbed().
            setColor(this.message.guild.me.displayHexColor).
            addField('Please choose a message preset for your server',
                presets.map((value, index) => SetPreset.reactions[index] + ' ' + value).join('\n')
            )
        )

        let preset = await MessageDialog.create(
            dialog,
            MessageDialog.optionsFromArrays(SetPreset.reactions, presets),
            this.message.author.id
        );

        dialog.delete();

        let response = new Discord.MessageEmbed();

        if(preset !== null) {
            if(preset) {
                this.config.setPreset(preset);
                response.setDescription(`${this.message.member.displayName} has changed guild's preset to ${this.config.getPreset()}`);
            } else {
                this.config.setPreset(null);
                response.setDescription(`${this.message.member.displayName} has removed guild's preset`);
            }
        } else {
            response.setDescription('no preset was set');
        }
        response.setColor(this.message.guild.me.displayHexColor);

        return new Response(response);
    }
}