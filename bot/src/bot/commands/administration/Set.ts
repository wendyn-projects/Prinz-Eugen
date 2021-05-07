import * as Discord from 'discord.js'
import Configs from '../../config/Configs'
import GuildConfig from '../../config/GuildConfig'
import * as Interface from '../../../interface'

export default class extends Interface.ActionSelector {

    message: Discord.Message;

    constructor(message: Discord.Message) {
        let config: GuildConfig = Configs.get(message.guild?.id);

        super(config.getPrefix(),
            command
        );

        this.message = message;
    }

    public execute(input?: string[]) {
        if(input) {
            super.execute(input);
        } else {
            this.execute(Interface.tokenize(this.message.content));
        }
    }
}