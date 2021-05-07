import * as Interface from '../../interface'
import { bot } from '../../index';

export class Exit extends Interface.Action {
    constructor() {
        super('exit', []);
    }
    protected execution() {
        bot.destroy();
        process.exit();
    }
}