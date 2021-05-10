import appConfig from '../../appConfig'
import { Presets, default as GuildConfig } from './GuildConfig'

export default class extends GuildConfig {

    constructor() {
        super(appConfig.bot.defaultPrefix, [], [], Presets.values.anime);
    }
}