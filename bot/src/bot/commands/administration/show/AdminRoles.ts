import * as Discord from 'discord.js'
import * as Interface from '../../../../interface'
import * as MyDiscord from '../../../../myDiscord'
import { default as GuildConfig } from '../../../../server/config/GuildConfig'
import { Response } from '../../interface'

export default class extends Interface.ValueAction<Response> {

    config: GuildConfig;
    message: Discord.Message;

    constructor(config: GuildConfig, message: Discord.Message) {
        super('rights', []);
        this.config = config;
        this.message = message;
    }

    protected execution(): Response {
        
        let roles = this.config.getAdminRoles();
        return new Response(roles.length > 0?
            `**Admnistrative roles:**\n${this.message.guild.roles.cache.filter((role: Discord.Role) => 
                roles.some((adminRole: MyDiscord.Id) => adminRole = role.id)).map((role: Discord.Role) => role).join(' ')
            }`: '_no administrative roles_'
        );
    }
}