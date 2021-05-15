import * as Discord from 'discord.js'
import * as Interface from '../../../interface'
import { MessageGroup, Image, Presets, default as GuildConfig } from '../../../server/config/GuildConfig'
import { Response } from '../interface'

export default class extends Interface.ValueAction<Response> {

    config: GuildConfig;
    message: Discord.Message;

    constructor(config: GuildConfig, message: Discord.Message) {
        super('messages', []);
        this.config = config;
        this.message = message;
    }

    protected execution(): Response {

        let preset = this.config.getPreset();
        let fields: Discord.EmbedFieldData[] = this.config.getMessageGroups().filter(
            (group: MessageGroup) => group.isAvailable(
                this.message.member.roles.cache.map((role: Discord.Role) => role.id)
            )
        ).map(
            (messageGroup: MessageGroup) => { 
                return { name: messageGroup.getName(), value: messageGroup.description } 
            }
        );
        Presets.get(preset)?.forEach((group: MessageGroup) => {
            let name: string = group.getName();
            let existingMessage: Discord.EmbedFieldData = fields.find(
                (message: Discord.EmbedFieldData) => message.name === name
            );
            if(existingMessage) {
                existingMessage.value ??= group.description ?? name;
            } else {
                fields.push({ name: name, value: group.description });
            }
        });
        return new Response(new Discord.MessageEmbed().setTitle('Messages available to you').
            addFields(fields).
            setColor(this.message.guild.me.displayHexColor)
        );
    }
}