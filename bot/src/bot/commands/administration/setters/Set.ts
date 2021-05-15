import * as Discord from 'discord.js'
import GuildConfig from '../../../../server/config/GuildConfig'
import { ActionSelector } from './../../interface'
import SetPrefix from './Prefix'
import SetPreset from './Preset'

export default class extends ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('set', [
            new SetPrefix(config, message),
            new SetPreset(config, message),
        ]);
    }
}