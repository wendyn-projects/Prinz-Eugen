import * as Discord from 'discord.js'
import GuildConfig from '../../../../server/config/GuildConfig'
import { ActionSelector } from '../../interface'
import AdminRoleAdder from './AdminRole'


export default class extends ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('add', [
            new AdminRoleAdder(config, message)
        ]);
    }
}