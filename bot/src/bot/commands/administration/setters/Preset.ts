import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import * as MyDiscord from '../../../../myDiscord'
import { Presets, default as GuildConfig } from '../../../../server/config/GuildConfig'
import { CommandNameOption, Response } from '../../interface'

export default class SetPreset extends Interface.ValueAction<Promise<Response>> {

    config: GuildConfig;
    message: Discord.Message;

    static readonly reactions = [ '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟' ];

    constructor(config: GuildConfig, message: Discord.Message) {
        super('preset', [ new CommandNameOption('preset') ]);
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

        let dialog = await this.message.reply(new Discord.MessageEmbed().
            setColor(this.message.guild.me.displayHexColor).
            addField('Please choose a message preset for your server',
                presets.map((value, index) => SetPreset.reactions[index] + ' ' + value).join('\n')
            )
        )

        for(let i = 0; i < presets.length; i++) {
            await dialog.react(SetPreset.reactions[i]);
        }

        let preset;

        await dialog.awaitReactions(this.reactionFilter, { max: 1, time: 10000, errors: ['time'] }).
            then((reactions) => {
                let reaction = reactions.first();
                let index = SetPreset.reactions.indexOf(reaction.emoji.name)
                if(index > -1 && index < presets.length)
                    preset = presets[index];
            }).catch(() => preset = null);

        dialog.delete();

        let response = new Discord.MessageEmbed();

        if(preset) {
            this.config.setPreset(preset);
            response.setAuthor(
                `${this.message.member.displayName} has changed preset to ${this.config.getPreset()}`,
                this.message.author.avatarURL(),
                'https://discord.com/channels/@me/'
            );
            response.setColor(this.message.member.displayHexColor);
        } else {
            response.setAuthor(
                `no preset was set`,
                this.message.guild.me.user.avatarURL(),
                'https://discord.com/channels/@me/'
            );
            response.setColor(this.message.guild.me.displayHexColor);
        }

        return new Response(response);
    }
}