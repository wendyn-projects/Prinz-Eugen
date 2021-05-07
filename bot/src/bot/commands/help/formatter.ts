import { Option, Action, ActionSelector, ActionFormatter } from '../../../formatting/HelpFormatting'

class HelpFormatter extends ActionFormatter {

    protected getFormattedName(option: Option, indent: string): string {
        return indent === ''?
            option.name: (
                option instanceof Action && option.usesName?
                    (option.options.length > 0? `.${option.name}`: `#${option.name}`):
                    `"${option.name}"`
            );
    }

    protected getFormattedDescription(option: Option, indent: string): string {

        const SPACE = ActionFormatter.SPACE;
        const POINT = '* ';
        const NL_REGEX = ActionFormatter.NL_REGEX;
        const QUOTE_REGEX = /\"/gm;
        const LINE_REGEX = /.+(?:$)/gm;
        let descNL = ActionFormatter.NL + indent;
        if(option instanceof Action && option.options.length > 0) {
            let output: string = '/*' + descNL;
            if(option.description)
                output += SPACE + POINT + option.description.replace(NL_REGEX, descNL + SPACE + POINT) + descNL;
            return output + ' */';
        } else {
            return option.description.
                replace(QUOTE_REGEX, "'").
                    replace(LINE_REGEX, (match: string) => '"' + match + '"').
                        replace(NL_REGEX, descNL) + ';';
        }
    }

    protected getActionList(selector: ActionSelector, separator: string = '|'): string {
        return `${super.getActionList(selector, separator)}`;
    }

    public stringify(option: Option, indent: string = ''): string {

        const SPACE = ActionFormatter.SPACE;
        const NL = ActionFormatter.NL;
        const TAB = ActionFormatter.TAB;
        let output: string = indent + this.getFormattedName(option, indent);
        if(option instanceof Action && option.options.length > 0) {
            output += SPACE + 
                this.getOptionList(option) +
                NL +
                this.getOptions(option, indent);

            if(option.description) {
                output += NL + indent + TAB +
                    this.getFormattedDescription(option, indent + TAB);
            }
        } else if(option.description) {
            output += ': ' + this.getFormattedDescription(option, indent + TAB);
        }
        return indent === ''?
            `\`\`\`css\n${output}\n\`\`\``:
            output;
    }
}

export default new HelpFormatter();