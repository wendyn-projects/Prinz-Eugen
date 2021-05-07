import * as Discord from 'discord.js'
import * as Interface from '../../interface'
import { MessageGroup, default as GuildConfig } from '../config/GuildConfig'
import Configs from '../config/Configs'
import HelpProvider from './help/HelpProvider'
import ImageSender from './ImageSender'

export default class extends Interface.ActionSelector {

    message: Discord.Message;

    constructor(message: Discord.Message) {
        let config: GuildConfig = Configs.get(message.guild?.id);
        let commands: Interface.ValueAction<any>[] = [
            new HelpProvider(message, config),
        ];

        let imgNames = config.getMessageGroups().map((messageGroup: MessageGroup) => messageGroup.getName());
        config.getPreset()?.forEach((group: MessageGroup) => {
            let name: string = group.getName();
            if(imgNames.indexOf(name) === -1)
                imgNames.push(name)
        });

        super(config.getPrefix(),
            commands.concat(imgNames.map((name: string) => new ImageSender(config, message, name)))
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