import * as Discord from 'discord.js'
import * as Interface from '../../../interface'
import GuildConfig from '../../../server/config/GuildConfig'
import SetPrefix from './setters/Prefix'
import SetPreset from './setters/Preset'

export default class extends Interface.ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('set', [
            new SetPrefix(config, message),
            new SetPreset(config, message),
        ]);
    }
}