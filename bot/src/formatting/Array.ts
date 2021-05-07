export default class {
    public static createList(list: string[], empty: string = ''): string {
        switch(list.length)
        {
        case 0:
            return empty;
        case 1:
            return list[0];
        case 2:
            return list[0] + ' and ' + list[1];;
        default:
            list = Array.from(list);
            return list.splice(0, list.length - 2).join(', ') + ', ' +
            list[list.length - 2] + ' and ' + list[list.length - 1];
        }
    }
}