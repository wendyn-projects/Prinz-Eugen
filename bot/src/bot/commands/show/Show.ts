import * as Discord from 'discord.js'
import * as Interface from '../../../interface'
import GuildConfig from '../../../server/config/GuildConfig'
import MessageShower from './Messages'


export default class extends Interface.ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('show', [
            new MessageShower(config, message)
        ]);
    }
}