import * as Interface from '../../interface'
import { bot } from '../../index';
import Configs from '../config/Configs'

export class Exit extends Interface.ValueAction {

    constructor() {
        super('exit', []);
    }
    
    protected execution() {
        bot.destroy();
        Configs.saveChanges().then(() => process.exit());
    }
}