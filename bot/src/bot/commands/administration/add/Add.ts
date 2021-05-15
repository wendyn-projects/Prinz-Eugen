import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import GuildConfig from '../../../../server/config/GuildConfig'
import AdminRoleAdder from './AdminRole'


export default class extends Interface.ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('add', [
            new AdminRoleAdder(config, message)
        ]);
    }
}