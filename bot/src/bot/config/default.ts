import * as appConfig from '../../appConfig.json'
import { MessageGroup, default as GuildConfig } from './GuildConfig'
import animePreset from './presets/anime'

class DefaultConfig extends GuildConfig {

    constructor() {
        super(null);
        this.preset = animePreset;
    }

    public getPrefix(): string {
        return appConfig.bot.defaultPrefix;
    }

    public getMessageGroups(): MessageGroup[] {
        return [];
    }
}

export const defaultConfig = new DefaultConfig();