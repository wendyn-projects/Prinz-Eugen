import * as Interface from '../../interface'
import Exit from './Exit'
import Save from './Save'

export default class ActionSelector extends Interface.ActionSelector {

    input: string;

    constructor(input: string) {

        super('', [
            new Save(),
            new Exit()
        ], false);

        this.input = input;
    }

    public execute(input?: string[]) {
        if(input) {
            super.execute(input)
        } else {
            this.execute(Interface.tokenize(this.input));
        }
    }
}