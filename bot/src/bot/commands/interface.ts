import * as Discord from 'discord.js'
import * as Interface from '../../interface'

export abstract class MessageCommand extends Interface.Action {

    public response: Discord.StringResolvable|Discord.APIMessage;
}

export abstract class DialogCommand extends MessageCommand {

    public dialog: Discord.StringResolvable|Discord.APIMessage;
}