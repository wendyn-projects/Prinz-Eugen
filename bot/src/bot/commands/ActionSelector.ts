import * as Discord from 'discord.js'
import * as Interface from '../../interface'
import { MessageGroup, Presets, default as GuildConfig } from '../../server/config/GuildConfig'
import ImageSender from './ImageSender'
import HelpProvider from './help/HelpProvider'
import AdminSetters from './administration/setters/Set'
import AdminAdder from './administration/add/Add'
import AdminShowers from './administration/show/Show'
import Shower from './show/Show'

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

        if(config.hasAdminRights(message.member)) {
            let adminCommands: Interface.ValueAction[] = [
                new AdminSetters(config, message),
                new AdminAdder(config, message),
                new AdminShowers(config, message),
                new Shower(config, message)
            ];
            commands = commands.concat(adminCommands);
        }
        let prefix = config.getPrefix();
        super(prefix,
            commands.concat(imgNames.map((name: string) => new ImageSender(config, message, name))),
            prefix.length > 0
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