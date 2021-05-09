import * as fs from 'fs';
import * as path from 'path'
import appConfig from '../../appConfig'
import * as MyDiscord from '../../myDiscord';
import GuildConfig from './GuildConfig'
import defaultConfig from './default'

export default class Configs {
    private static guilds: Map<MyDiscord.Id, GuildConfig> = new Map<string, GuildConfig>();

    protected static async get(guildId: MyDiscord.Id): Promise<GuildConfig>{
        let config: GuildConfig = this.guilds.get(guildId);
        if(config) {
            return this.guilds.get(guildId)
        } else {
            let guildConfigDir = path.join(appConfig.server.guildConfigsDir, guildId.toString(), '.json');
            return fs.existsSync(guildConfigDir)?
                Object.setPrototypeOf(JSON.parse(await fs.promises.readFile( guildConfigDir, "utf8")), GuildConfig.prototype):
                null;
        }
    }

    protected static async create(guildId: MyDiscord.Id, template: GuildConfig = defaultConfig): Promise<GuildConfig> {
        let config: GuildConfig = Object.setPrototypeOf({ ...template, hasUnsavedChanges: false }, GuildConfig.prototype);
        await fs.promises.writeFile(
            path.join(appConfig.server.guildConfigsDir, guildId.toString() + '.json'), 
            JSON.stringify(template, (key, value) => key === 'hasUnsavedChanges'? undefined: value)
        );
        this.guilds.set(guildId, config);
        return config;
    }

    public static async getOrCreate(guildId: MyDiscord.Id): Promise<GuildConfig> {
        return await this.get(guildId) ?? await this.create(guildId);
    }

    public static async saveChanges() {
        await Promise.all(Array.from(this.guilds).map(async ([guildId, config]: [MyDiscord.Id, GuildConfig]) => {
            if(config.hasUnsavedChanges)
                await fs.promises.writeFile(
                    path.join(appConfig.server.guildConfigsDir, guildId.toString() + '.json'), 
                    JSON.stringify(config, (key, value) => key === 'hasUnsavedChanges'? undefined: value)
                );
        }))
    }
}