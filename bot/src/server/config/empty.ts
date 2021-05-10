import appConfig from '../../appConfig'
import { default as GuildConfig } from './GuildConfig'

export default class extends GuildConfig {

    constructor() {
        super(appConfig.bot.defaultPrefix, [], [], null);
    }
}