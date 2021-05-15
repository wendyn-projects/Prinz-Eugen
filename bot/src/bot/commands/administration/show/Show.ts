import * as Discord from 'discord.js'
import GuildConfig from '../../../../server/config/GuildConfig'
import { ActionSelector } from '../../interface'
import PresetShower from './Preset'
import PresetsShower from './presets'
import AdminRolesShower from './AdminRoles'


export default class extends ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('show', [
            new PresetShower(config, message),
            new PresetsShower(message),
            new AdminRolesShower(config, message)
        ]);
    }
}