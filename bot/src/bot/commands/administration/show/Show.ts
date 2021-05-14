import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import GuildConfig from '../../../../server/config/GuildConfig'
import PresetShower from './Preset'
import PresetsShower from './presets'
import AdminRolesShower from './AdminRoles'


export default class extends Interface.ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('show', [
            new PresetShower(config, message),
            new PresetsShower(message),
            new AdminRolesShower(config, message)
        ]);
    }
}