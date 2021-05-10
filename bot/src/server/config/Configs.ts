import * as fs from 'fs';
import * as path from 'path'
import appConfig from '../../appConfig'
import * as MyDiscord from '../../myDiscord';
import GuildConfig from './GuildConfig'
import defaultConfig from './default'
import EmptyConfig from './empty'

export default class Configs {
    private static guilds: Map<MyDiscord.Id, GuildConfig> = new Map<string, GuildConfig>();

    private static getConfigPath(guildId: MyDiscord.Id): string {
        return path.join(appConfig.server.guildConfigsDir, guildId.toString() + '.json');
    }

    protected static async get(guildId: MyDiscord.Id): Promise<GuildConfig>{
        let config: GuildConfig = this.guilds.get(guildId);
        if(!config) {
            let guildConfigPath = Configs.getConfigPath(guildId);
            if(fs.existsSync(guildConfigPath)) {
                config = Object.assign(new EmptyConfig(), JSON.parse(await fs.promises.readFile(guildConfigPath, "utf8")));
                this.guilds.set(guildId, config);
            }
        }
        return config;
    }

    protected static async create(guildId: MyDiscord.Id, template: GuildConfig = new defaultConfig()): Promise<GuildConfig> {
        let config: GuildConfig = Object.setPrototypeOf({ ...template }, GuildConfig.prototype);
        await fs.promises.writeFile(
            Configs.getConfigPath(guildId), 
            JSON.stringify(template, (key, value) => key[0] === '_'? undefined: value)
        );
        this.guilds.set(guildId, config);
        return config;
    }

    public static async getOrCreate(guildId: MyDiscord.Id): Promise<GuildConfig> {
        return await this.get(guildId) ?? await this.create(guildId);
    }

    public static async saveChanges() {
        return Promise.all(Array.from(this.guilds).
            filter(([guildId, config]: [MyDiscord.Id, GuildConfig]) => config._hasUnsavedChanges).
            map(([guildId, config]: [MyDiscord.Id, GuildConfig]) => fs.promises.writeFile(
                path.join(appConfig.server.guildConfigsDir, guildId.toString() + '.json'), 
                JSON.stringify(config, (key, value) => key[0] === '_'? undefined: value)
            ))
        );
    }
}