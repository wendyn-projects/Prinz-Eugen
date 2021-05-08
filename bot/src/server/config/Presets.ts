import { MessageGroup } from '../config/GuildConfig'
import anime from './presets/anime'


export default class Presets {
    public static readonly anime = 'anime';

    private static presets = new Map<string, Array<MessageGroup>>([
        [Presets.anime, anime]
    ]);

    public static get(preset: string): MessageGroup[] {
        return this.presets.get(preset);
    }
}