export function tokenize(input: string) : string[] {
    //space/quote separating RegEx tokenizer
    const tokenizer = /[^\s^\"^\']+|(?:")([^\"]*)(?:")|(?:')([^\']*)(?:')/gm;
    let tokenVals: string[] = [];
    let token: RegExpExecArray;
    let tokenVal: string;
    //RegEx.exec is...
    while(token = tokenizer.exec(input)) {
        tokenVal = null;
        for(let i = 1; i < token.length; i++) {
            if(token[i]) {
                tokenVal = token[i];
                break;
            }
        }
        tokenVals.push(tokenVal ?? token[0]);
    }
    return tokenVals;
}

export abstract class OptionBase<T> {

    protected unparsed?: string[];
    public name: string;
    public isValid: boolean;
    public value?: T;

    constructor(name: string) {
        this.name = name;
    }

    public abstract getTokensUsed(): number;

    protected abstract validation(input: string[]): boolean;

    public validate(input: string[]): void {
        this.isValid = this.validation(input);
    }

    public abstract parse(): void;
}

export abstract class Option<T> extends OptionBase<T> {

    public getTokensUsed(): number {
        return 1;
    }

    public validate(input: string[]): void {
        this.unparsed = input;
        super.validate(input);
    }

    protected abstract parser(input: string[]) : T;

    public parse(): void {
        if(this.isValid)
            this.value = this.parser(this.unparsed);
    }
}

export class NumberOption extends Option<number> {

    protected validation(input: string[]): boolean {
        let output = Number(input[0]);
        if(isNaN(output)) {
            return false
        } else {
            this.value = output;
            return true;
        }
    }

    protected parser(): number {
        return this.value;
    }
}

export class StringOption extends Option<string> {

    protected validation(input: string[]): boolean {
        return true;
    }

    protected parser(): string {
        return this.unparsed[0];
    }
}

export class ActionResult extends Array<ActionResult|any> {
    [key: string]: ActionResult|any;
}

export abstract class ValueAction<T> extends OptionBase<T> {

    public usesName: boolean = true;
    private tokensUsed: number;
    public options: OptionBase<any>[];
    public unparsed: ActionResult;

    constructor(name: string, options: OptionBase<any>[], usesName: boolean = true) {
        super(name);
        this.options = options;
        this.usesName = usesName;
        this.tokensUsed = options.reduce(
            (accumulator: number, option: OptionBase<any>) => accumulator + option.getTokensUsed(), usesName? 1: 0);
    }

    public getTokensUsed(): number {
        return this.tokensUsed;
    }

    protected nameCheck(): boolean {
        return this.unparsed[0] === this.name;
    }

    protected validation(input: string[]): boolean {

        let isValidTmp = true;
        let tokenId = 0;

        for(let i = 0; i < this.options.length && tokenId < input.length; i++) {

            this.options[i].validate(input.slice(tokenId));

            tokenId +=  this.options[i].getTokensUsed();
            isValidTmp &&= this.options[i].isValid;

            if(!isValidTmp)
                break;
        }

        return isValidTmp && tokenId <= input.length;
    }

    public validate(input: string[]): void {
        this.unparsed = input;
        this.isValid = 
            (!this.usesName || this.nameCheck()) && 
            this.validation(this.usesName? input.slice(1): input);
    }

    protected abstract parser(input: ActionResult) : T;

    public parse() {

        for(let i = 0; i < this.options.length; i++) {
            this.options[i].parse();
            this.unparsed[this.options[i].name] = this.options[i].value;
        }

        this.value = this.parser(this.unparsed);
    }

    protected abstract execution(): void;

    public execute(input?: string[]): void {
        if(input) {
            this.validation(input);
            this.parse();
        }
        if(this.isValid)
            this.execution()
    }
}

export abstract class Action extends ValueAction<ActionResult> {

    protected parser(input: ActionResult) : ActionResult {
        return input;
    }
}

export enum SelectionMode {
    FIRST = 0,
    LAST,
    BEST_MATCH_FIRST,
    BEST_MATCH_LAST,
}

export class ActionSelector extends Action {

    public options: ValueAction<any>[];
    public usedAction: ValueAction<any>;
    public select: SelectionMode;

    constructor(name: string, options: ValueAction<any>[], usesName: boolean = true, select: SelectionMode = SelectionMode.FIRST) {
        super(name, options, usesName);
        this.usedAction = null;
        this.select = select;
    }

    protected validation(input: string[]): boolean {

        let action;
        let prevTokenCount = -1;
        let tokenCount;

        switch(this.select) {
        case SelectionMode.LAST:
            for(let i = 0; i < this.options.length; i++) {
                action = this.options[i];
                action.validate(input)
                if(action.isValid)
                    this.usedAction = action;
            }
            break;
        case SelectionMode.BEST_MATCH_FIRST:
            for(let i = 0; i < this.options.length; i++) {
                action = this.options[i];
                action.validate(input)
                if(action.isValid && (tokenCount = action.getTokensUsed()) > prevTokenCount) {
                    this.usedAction = action;
                    prevTokenCount = tokenCount;
                }
            }
            break;
        case SelectionMode.BEST_MATCH_FIRST:
            for(let i = 0; i < this.options.length; i++) {
                action = this.options[i];
                action.validate(input)
                if(action.isValid && (tokenCount = action.getTokensUsed()) >= prevTokenCount) {
                    this.usedAction = action;
                    prevTokenCount = tokenCount;
                }
            }
            break;
        default:
            for(let i = 0; i < this.options.length; i++) {
                action = this.options[i];
                action.validate(input)
                if(action.isValid) {
                    this.usedAction = action;
                    break;
                }
            }
            break;
        }

        return this.usedAction? true: false;
    }

    protected parser(input?: ActionResult) : ActionResult {
        this.usedAction.parse();
        return this.usedAction.value;
    }

    public parse() {
        if(this.isValid)
            this.value = this.parser();
    }

    protected execution(): void {
    }

    public execute(input: string[]): void {

        this.validate(input);
        this.parse();
        if(this.isValid) {
            this.usedAction.execute();
            this.execution()
        }
    }
}