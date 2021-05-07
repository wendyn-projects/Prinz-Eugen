import * as DotEnv from 'dotenv'
import * as Discord from 'discord.js'
import { default as BotCommand, MessageCommand } from './bot/commands/ActionSelector'
import ServerCommand from './server/commands/ActionSelector'

DotEnv.config();
export const bot = new Discord.Client();
const stdin = process.stdin;

bot.on('message', async (message: any) => {
	console.log(`${message.author.username}: ${message.content}`);

    let command = new BotCommand(message);
    command.execute();
    if(command.usedAction instanceof MessageCommand)
        await message.reply(command.usedAction.response);
});

bot.login(process.env['BOT_TOKEN']);

stdin.on('data', (input: Buffer) => {
    let text = input.toString();
    let command = new ServerCommand(text);
    command.execute();
});

stdin.resume();