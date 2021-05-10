import appConfig from '../../appConfig'
import { default as GuildConfig } from './GuildConfig'

class EmptyConfig extends GuildConfig {

    constructor() {
        super(appConfig.bot.defaultPrefix, [], [], null);
    }
}

export default new EmptyConfig();