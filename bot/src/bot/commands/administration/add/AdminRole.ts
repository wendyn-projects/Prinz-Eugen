import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import ArrayFormatter from '../../../../formatting/Array'
import GuildConfig from '../../../../server/config/GuildConfig'
import { CommandNameOption, Response } from '../../interface'

export default class extends Interface.ValueAction<Response> {

    message: Discord.Message;
    config: GuildConfig;

    constructor(config: GuildConfig, message: Discord.Message) {
        super('rights', []);
        this.config = config;
        this.message = message;
    }

    protected validation(): boolean {
        return this.message.mentions.roles.size > 0;
    }

    protected execution(): Response {
        this.message.mentions.roles.forEach((role: Discord.Role) => this.config.addAdminRole(role.id));

        return new Response(
            (this.message.mentions.roles.size > 1?
                (ArrayFormatter.createList(this.message.mentions.roles.map((role: Discord.Role) => role.toString())) + ' roles were'): 
                (this.message.mentions.roles.first() + ' role was')
            )+
            ' given administrative permissions by ' + 
            this.message.member
        );
    }
}