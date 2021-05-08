import * as Discord from 'discord.js'
import * as Interface from '../../interface'
import { MessageGroup, default as GuildConfig } from '../../server/config/GuildConfig'
import Presets from '../../server/config/Presets'
import HelpProvider from './help/HelpProvider'
import ImageSender from './ImageSender'
import AdminSetters from './administration/Set'

export default class extends Interface.ActionSelector {

    message: Discord.Message;

    constructor(config: GuildConfig, message: Discord.Message) {

        let commands: Interface.ValueAction<any>[] = [
            new HelpProvider(message, config),
        ];

        let imgNames = config.getMessageGroups().map((messageGroup: MessageGroup) => messageGroup.getName());
        Presets.get(config.getPreset())?.forEach((group: MessageGroup) => {
            let name: string = group.getName();
            if(imgNames.indexOf(name) === -1)
                imgNames.push(name)
        });

        if(true || config.hasAdminRights(message.member)) {
            let adminCommands: Interface.ValueAction[] = [
                new AdminSetters(config, message)
            ];
            commands = commands.concat(adminCommands);
        }

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