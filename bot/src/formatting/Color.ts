export default class {
    public static validateHex(hex?: string): boolean {
        const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
        return hex? (hex.match(HEX_COLOR_REGEX)? true: false): false;
    }
}