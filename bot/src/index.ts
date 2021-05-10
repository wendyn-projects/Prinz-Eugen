import * as DotEnv from 'dotenv'

import * as Discord from 'discord.js'
import GuildConfig from './server/config/GuildConfig'
import GuildConfigs from './server/config/Configs'
import BotCommand from './bot/commands/ActionSelector'
import { Response } from './bot/commands/interface'

import ServerCommand from './server/commands/ActionSelector'

DotEnv.config();
export const bot = new Discord.Client();
const stdin = process.stdin;

bot.on('message', async (message: any) => {
    if(!message.author.bot && message.member && message.member !== message.guild.me.id) {
        console.log(`${message.author.username}: ${message.content}`);

        let config: GuildConfig = await GuildConfigs.getOrCreate(message.guild.id);

        let command = new BotCommand(config, message);
        command.execute();
        let result = await command.result;
        if(result instanceof Response)
            await message.reply(result.response);
    }
});

bot.login(process.env['BOT_TOKEN']);

stdin.on('data', async (input: Buffer) => {
    let text = input.toString();
    let command = new ServerCommand(text);
    await command.execute();
});

stdin.resume();