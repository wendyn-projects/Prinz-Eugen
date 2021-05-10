import * as Interface from '../../interface'
import { bot } from '../../index';
import Configs from '../config/Configs'

export class Exit extends Interface.ValueAction {

    constructor() {
        super('exit', []);
    }
    
    protected async execution() {
        bot.destroy();
        await Configs.saveChanges();
        process.exit()
    }
}