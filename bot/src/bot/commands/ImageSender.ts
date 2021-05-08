import * as Discord from 'discord.js'
import * as MyDiscord from '../../myDiscord'
import TextFormatter from '../../formatting/TextFormatter'
import ArrayFormatter from '../../formatting/Array'
import Presets from '../../server/config/Presets'
import { MessageGroup, Image, default as GuildConfig } from '../../server/config/GuildConfig'
import { MessageCommand, Response } from './interface'

class MsgFormatInput {

    public from: string;
    public to: string;

    constructor(from: string, to: string) {
        this.from = from;
        this.to = to;
    }
}

export default class extends MessageCommand {

    config: GuildConfig;
    message: Discord.Message;
    userRoles: MyDiscord.Id[];
    messageGroup: MessageGroup;
    presetGroup: MessageGroup;

    constructor(config: GuildConfig, message: Discord.Message, name: string) {
        super(name, []);
        this.config = config;
        this.message = message;
        this.userRoles = message.member.roles.cache.map((role: Discord.Role) => role.id);
    }

    protected validation(input: string[]): boolean {

        let preset = Presets.get(this.config.getPreset());
        if(preset)
            this.presetGroup = preset.find((group: MessageGroup) => group.getName() === this.name);

        let group: MessageGroup = this.config.getMessageGroups().find(
            (group: MessageGroup) => group.getName() === this.name)

        if(group && group.images.some((image: Image) =>
                image.roles.length === 0 ||
                image.canBeUsedByAnyRole(this.userRoles)
        )) {
            this.messageGroup = group;
        } else {
            this.messageGroup = this.presetGroup;
            this.presetGroup = null;
        }
        
        return this.messageGroup && super.validation(input);
    }

    protected execution(): Response {

        let images = this.messageGroup.images.filter((image: Image) =>
            image.roles.length === 0 ||
            image.canBeUsedByAnyRole(this.userRoles)
        );

        if(this.presetGroup)
            images.concat(this.presetGroup.images);

        let image: Image = images[Math.floor(Math.random() * this.messageGroup.images.length)];
        let texts: string[] = image.texts;

        if(image.usesDefaultTexts) {
            texts = texts.concat(this.messageGroup.defaultTexts);
            if(this.presetGroup)
                texts = texts.concat(this.presetGroup.defaultTexts)
        }

        let text: string = texts.length > 0?
            new TextFormatter(texts[Math.floor(Math.random() * texts.length)]).
                toString(new MsgFormatInput(
                    this.message.author.username, 
                    ArrayFormatter.createList(this.message.mentions.members.array().map(
                        (member: Discord.GuildMember) =>
                            this.message.author.id == member.id?
                                'themself':
                                member.displayName
                        ),
                        'you'
                    ))):
            '';


        let embed = new Discord.MessageEmbed();
        embed.setAuthor(
            text,
            this.message.author.avatarURL(),
            'https://discord.com/channels/@me/'
        );

        embed.setColor(
            image.getColor() ??
            this.messageGroup.getColor() ??
            this.presetGroup?.getColor() ??
            this.message.member.displayHexColor
        );

        embed.setImage(image.link);

        return new Response(embed);
    }
}