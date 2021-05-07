export default class TextFormatter {
    
    private static readonly regex = /(?:\$\{ *)([^ ]*)(?: *\})/gm;
    public format: string;

    constructor (format: string) {
        this.format = format;
    }

    public toString(object?: any, empty: string = ''): string {
        if(object) {
            return this.format.replace(TextFormatter.regex, 
                (match: string, name: string) => object[name] ?? empty);
        } else {
            return this.format;
        }
    }

    public getKeys(checkDuplicity: boolean = false): string[] {
        let keys: string[] = [];
        let result: RegExpExecArray;
        while((result = TextFormatter.regex.exec(this.format)) !== null) {
            if(!checkDuplicity || !keys.some(key => key === result[1]))
            keys.push(result[1]);
        }
        return keys;
    }

    public static key(name: string): string {
        return `\${${name}}`;
    }
}

export class HelpFormatter {
    
}