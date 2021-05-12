import * as Interface from '../../interface'
import Configs from '../config/Configs'

export default class extends Interface.ValueAction {

    constructor() {
        super('save', []);
    }
    
    protected async execution() {
        await Configs.saveChanges();
        console.log('guild config changes saved');
    }
}