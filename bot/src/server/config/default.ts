import appConfig from '../../appConfig'
import { Presets, default as GuildConfig } from './GuildConfig'

class DefaultConfig extends GuildConfig {

    constructor() {
        super(appConfig.bot.defaultPrefix, [], [], Presets.values.anime);
    }
}

export default new DefaultConfig();