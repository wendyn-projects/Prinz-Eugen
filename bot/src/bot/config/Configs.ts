import * as MyDiscord from '../../myDiscord';
import GuildConfig from './GuildConfig'
import { defaultConfig } from './default'

export default class Configs {
    private static guilds: Map<MyDiscord.Id, GuildConfig> = new Map<string, GuildConfig>();

    public static get(guildId?: MyDiscord.Id): GuildConfig {
        return guildId? 
            this.guilds.get(guildId) ?? defaultConfig: 
            defaultConfig;
    }
}