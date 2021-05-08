import appConfig from '../../appConfig'
import GuildConfig from './GuildConfig'
import Presets from './Presets'

class DefaultConfig extends GuildConfig {

    constructor() {
        super(appConfig.bot.defaultPrefix, [], [], Presets.anime);
    }
}

export default new DefaultConfig();