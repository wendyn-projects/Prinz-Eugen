import * as Discord from 'discord.js';
import * as MyDiscord from '../../myDiscord';
import Color from '../../formatting/Color'
import appConfig from '../../appConfig';

export class Image {

    public link: string;
    public texts: string [];
    public usesDefaultTexts: boolean;
    public roles: MyDiscord.Id[];
    private color?: string;

    constructor(link: string, texts: string[] = [], defaultTexts: boolean = true, roles: MyDiscord.Id[] = [], color?: string) {
        this.link = link;
        this.texts = texts;
        this.usesDefaultTexts = defaultTexts;
        this.roles = roles;
        this.color = color;
    }

    public canBeUsedByAnyRole(inputRoles: MyDiscord.Id[]) {
        return this.roles.some((role: MyDiscord.Id) => 
            inputRoles.some((inputRole: MyDiscord.Id) =>
                inputRole === role
        ));
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): boolean {
        if(Color.validateHex(color)) {
            this.color = color;
            return true;
        }
        return false;
    }
}

export class MessageGroup {

    private name: string;
    public defaultTexts: string [];
    public images: Image[];
    public description?: string;
    private color?: string;

    constructor(name: string, texts: string[] = [], images: Image[] = [], description?: string, color?: string) {
        this.name = name;
        this.defaultTexts = texts;
        this.images = images;
        this.description = description;
        this.setColor(color);
    }

    public getName(): string {
        return this.name.toLocaleLowerCase();
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): boolean {
        if(Color.validateHex(color)) {
            this.color = color;
            return true;
        }
        return false;
    }

    public hasAnyRole(inputRoles: MyDiscord.Id[]): boolean {
        return this.images.some((image: Image) => image.canBeUsedByAnyRole(inputRoles));
    }

    public isAvailable(inputRoles: MyDiscord.Id[]) {
        return this.images.some((image: Image) =>
            image.roles.length === 0 ||
            image.canBeUsedByAnyRole(inputRoles));
    }
}

import anime from './presets/anime'

export class Presets {

    public static readonly values = {
        anime: 'anime'
    }

    private static presets = new Map<string, Array<MessageGroup>>([
        [Presets.values.anime, anime]
    ]);

    public static get(preset: string): MessageGroup[] {
        return Presets.presets.get(preset);
    }
}


export default abstract class {

    public _hasUnsavedChanges: boolean = false;
    public _uses: Map<string, number> = new Map<string, number>();

    private prefix: string;
    private adminRoles: MyDiscord.Id[];
    private messageGroups: MessageGroup[];
    private preset?: string;

    constructor(prefix: string = appConfig.bot.defaultPrefix, adminRoles: MyDiscord.Id[] = [], messageGroups: MessageGroup[] = [], preset?: string) {
        this.prefix = prefix;
        this.adminRoles = adminRoles;
        this.messageGroups = messageGroups;
        this.preset = preset;
    }

    protected markForSave() {
        this._hasUnsavedChanges = true;
    }

    public getPrefix(): string {
        return this.prefix;
    }

    public setPrefix(value: string) {
        this.prefix = value;
        this.markForSave();
    }

    public getAdminRoles(): MyDiscord.Id[] {
        return this.adminRoles;
    }

    public addAdminRole(role: MyDiscord.Id) {
        this.adminRoles.push(role);
        this.markForSave();
    }

    public getMessageGroups(): MessageGroup[] {
        return this.messageGroups;
    }

    public getPreset(): string {
        return this.preset;
    }

    public setPreset(value?: string): boolean {
        if(Object.values(Presets.values).some((presetName: string) => presetName === value)) {
            this.preset = value;
            this.markForSave();
            return true;
        }
        return false;
    }

    public hasAdminRights(member: Discord.GuildMember): boolean {
        return member.hasPermission(['ADMINISTRATOR', 'MANAGE_GUILD']) ||
            member.roles.cache.some((role: Discord.Role) => 
                this.adminRoles.some((adminRoleId: MyDiscord.Id) => adminRoleId === role.id));
    }
} 