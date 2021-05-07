export class OptionFormatter {

    public static readonly SPACE = ' ';
    public static readonly NL = '\n';
    public static readonly NL_REGEX = /\n/gm;
    public static readonly TAB = '\t';

    protected getFormattedName(option: Option, indent: string): string {
        return option.name;
    }

    protected getFormattedDescription(option: Option, indent: string): string {

        return option.description.replace(OptionFormatter.NL_REGEX, OptionFormatter.NL + indent);
    }

    public stringify(option: Option, indent: string = ''): string {

        return indent + this.getFormattedName(option, indent) + 
            OptionFormatter.SPACE + 
            this.getFormattedDescription(option, indent);
    }
}

export class ActionFormatter extends OptionFormatter {
    
    protected formatListAction(action: Action) {
        return action.usesName? 
            action.name:
            `"${action.name}"`;
    }

    protected formatListArg(option: Option): string {
        return option instanceof Action? 
            this.formatListAction(option):
            `[${option.name}]`;
    }

    protected getActionList(selector: ActionSelector, separator: string = '|'): string {
        return `${selector.options.map((action: Action) => 
                this.formatListAction(action)).join(separator)}`
    }

    protected getOptionList(action: Action): string {
        if(action instanceof ActionSelector) {
            return this.getActionList(action);
        } else {
            return action.options.map((option: Option) => 
                this.formatListArg(option)).join(' ');
        }
    }

    protected getOptions(action: Action, indent: string): string {
        return action.options.map((option: Option) => 
            option.toString(indent + OptionFormatter.TAB)).join(OptionFormatter.NL);
    }

    public stringify(option: Option, indent: string = ''): string {

        const SPACE = OptionFormatter.SPACE;
        const NL = OptionFormatter.NL;
        const TAB = OptionFormatter.TAB;
        let output: string = indent + this.getFormattedName(option, indent);
        if(option instanceof Action && option.options.length > 0) {
            output += SPACE + 
                this.getOptionList(option) +
                NL +
                this.getOptions(option, indent);

            if(option.description) {
                output += NL +
                    this.getFormattedDescription(option, indent + TAB);
            }
        } else if(option.description) {
            output += this.getFormattedDescription(option, indent + TAB);
        }
        return output;
    }
}

export class Option {

    public name: string;
    public description?: string;
    public formatter: OptionFormatter;

    constructor(name: string, arg2?: string|OptionFormatter, arg3?: string|OptionFormatter) {
        this.name = name;

        if(typeof arg2 === 'string')
            this.description = arg2;
        else if(typeof arg3 === 'string')
            this.description = arg3;

        if(arg3 instanceof OptionFormatter) 
            this.formatter = arg3;
        else if(arg2 instanceof OptionFormatter)
            this.formatter = arg2;

        this.formatter = this.formatter ?? new OptionFormatter();
    }

    public toString(indent: string = '') {
        return this.formatter.stringify(this, indent);
    }
}

export class Action extends Option {

    public formatter: ActionFormatter;
    public options: Option[];
    public usesName: boolean = true;

    constructor(name: string, options: Option[], usesName: boolean = true, arg4?: string|ActionFormatter, arg5?: string|ActionFormatter) {
        super(name, 
            typeof arg4 === 'string'? 
                arg4: 
                (typeof arg5 === 'string'? arg5: null),
            arg5 instanceof ActionFormatter?
                arg5:
                (arg4 instanceof ActionFormatter? arg4: new ActionFormatter())
        );

        this.options = options;
        this.usesName = usesName;
    }
}

export class ActionSelector extends Action {
    public options: Action[];

    constructor(name: string, args: Option[], usesName: boolean = true, arg4?: string|ActionFormatter, arg5?: string|ActionFormatter) { 
        super(name, args, usesName, arg4, arg5);
    }
}