import * as Discord from 'discord.js'
import GuildConfig from '../../../server/config/GuildConfig'
import { ActionSelector } from '../interface'
import MessageShower from './Messages'


export default class extends ActionSelector {

    constructor(config: GuildConfig, message: Discord.Message) {

        super('show', [
            new MessageShower(config, message)
        ]);
    }
}