import * as Discord from 'discord.js'
import * as Interface from '../../../interface'
import GuildConfig from '../../../server/config/GuildConfig'


export default class extends Interface.ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('show', [

        ]);
    }
}