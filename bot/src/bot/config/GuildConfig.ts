import * as MyDiscord from '../../myDiscord';
import Color from '../../formatting/Color'

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


export default abstract class GuildConfig {

    public guildId: MyDiscord.Id;
    public hasUnsavedChanges: boolean = false;

    protected preset?: MessageGroup[];

    constructor(guildId: MyDiscord.Id) {
        this.guildId = guildId;
    }

    public abstract getPrefix(): string;
    public abstract getMessageGroups(): MessageGroup[];
    public getPreset(): MessageGroup[] {
        return this.preset;
    }
} 