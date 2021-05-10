import { MessageGroup, Image } from '../GuildConfig'

class Bonks extends MessageGroup {
    constructor(images: Image[]) {
        super(
            'bonk', [
                '${from} bonks ${to}',
                '${to} got bonked by ${from}',
                '${from} is giving ${to} a bonk',
                '${from} is giving ${to} a big bonk',
            ], 
            images,
            '\nEnough! Now prepare to get bonked 🔨'
        );
    }
}

class BeatUps extends MessageGroup {
    constructor(images: Image[]) {
        super('beatup', ['${from} started beating up ${to}'], images, "\nYou did what? -__-");
    }
}

class Tickles extends MessageGroup {
    constructor(images: Image[]) {
        super('tickle', [
                '${from} tickles ${to}',
                '${from} tickles ${to} to death',
                '${to} is being tickled by ${from}',
                'I wonder how ticklish are you ¬‿¬',
                "Let's try how much you can take...",
            ], 
            images, 
            '\nAre you ticklish?' +
            '\nNo?' +
            "\nLet's try it anyway shall we? \\`•ᴗ•́ _Ψ"
        );
    }
}

class Teases extends MessageGroup {
    constructor(images: Image[]) {
        super('tease', [
                "So... It's gonna be like that you say...",
                'Sooooo...',
                '${to} is getting teased by ${from}'
            ], images, "\nYou like that, don't you? ¬‿¬");
    }
}

class Laughs extends MessageGroup {
    constructor(images: Image[]) {
        super('laughat', [
                '${from} laughs at ${to}',
                '${from} is loosing it',
                "I'm loosing it... I can't baAahaHaA-"
            ], images, "\nYou are so funny senpai XD");
    } 
}

class Bullies extends MessageGroup {
    constructor(images: Image[]) {
        super('bully', [
                '${from} bullies ${to}',
                'Oh my, what do we have here ¬‿¬',
                'What a sorry thing is that?..'
            ], images, "\nNaughty, are we? ꓶ‿ꓶ");
    }
}

class Boobas extends MessageGroup {
    constructor(images: Image[]) {
        super('booba', [
                "Huge, aren't they?  ¬‿¬",
                'Look how they can bounce (ﾉ ﾟ ▽ ﾟ)ﾉ'
            ], images, "\nHuge, aren't they? ¬‿¬");
    } 
}

export default [
    new Bonks([
        new Image('https://thumbs.gfycat.com/BelovedFancyDuck-size_restricted.gif'), //JJK - Nobara 
        new Image('https://media1.tenor.com/images/2a4b5698e09013d6e4c94d4c0d9debb2/tenor.gif'), //Overlord - Nabe Gama
        new Image('https://media1.tenor.com/images/bc8d9395166b82df05d590459f184f2d/tenor.gif'), //RWBY - Neopolitan
        new Image('https://i.imgur.com/FN0aYXh.gif'),
        new Image('https://64.media.tumblr.com/0a6d1c364a8b6f716b925e2288240484/26c589a8e9a95819-41/s400x600/340482c16f30b11843740984f1572a9fd911957f.gif'),
        new Image('https://i.imgur.com/V0xUOxi.gif')
    ]),
    new BeatUps([
        new Image('https://thumbs.gfycat.com/HatefulSilverIndochinesetiger-size_restricted.gif'), //Kaguya-sama wa Kokurasetai - Chika
        new Image('https://media1.tenor.com/images/c95f9a729a3a866cbc559b008aaeb2ed/tenor.gif?itemid=17024567'), //Kaguya-sama wa Kokurasetai - Chika
        new Image('https://64.media.tumblr.com/8a5d544e8fd7fcc0edffa2517099029d/tumblr_n1vvwjzLh91tnrr0fo1_500.gif'),
        new Image('https://i.imgur.com/5YyCxFx.gif', ['snap out of it']),
        new Image('https://i.imgur.com/wdnMWGD.gif', ['snap out of it']), //Hitsugime no Chaika
        new Image('https://media2.giphy.com/media/kErrCYo6dOfC9KEkxV/giphy.gif', ['snap out of it']), //Toradora (slap?)

    ]),
    new Tickles([
        new Image('https://media1.tenor.com/images/fcbded4ce66ab01317ee009a1aa44404/tenor.gif'),
        new Image('https://media1.tenor.com/images/ae7fc8d4dffe5ca4dea5eaeee5fb8abd/tenor.gif'),
        new Image('https://78.media.tumblr.com/ba913c0d21916e57b846e93b783cab39/tumblr_o505jxtnWk1vpbklao4_500.gif'),
        new Image('https://i.imgur.com/VD8nvU5.gif'), //Toradora
        new Image('https://78.media.tumblr.com/345313d8ba3c9128a03bd3e350cee44f/tumblr_inline_pd97s5xBcN1vrbftj_540.gif'), //Toradora
        new Image('https://64.media.tumblr.com/f998ef7b597536621c5aaa1d73dea5cd/128c7ac960733209-1a/s400x600/aaaf750a96c861fe86eaf3fbb437cbc47f2b8e98.gif'), //Azur Lane
        new Image('https://thumbs.gfycat.com/DaringGrossJellyfish-size_restricted.gif'), //Urara Meirochou
        new Image('https://64.media.tumblr.com/b94bf58f13b4fbbfd7b56bc8e7b1c311/tumblr_ocf8z5BhRG1vpbklao4_r1_500.gif'),
        new Image('https://media.giphy.com/media/2RtHSNy8ieTexlEwAq/giphy.gif'), //Soukou Musume Senki (LBX Girls)
        new Image('https://64.media.tumblr.com/bd95255f8b65c651dff3f3e1d5b0d86c/73d95236cb90aeac-86/s500x750/5f99685061cb82e0bd042989ca19440eed8c7eb1.gif'),
        new Image('https://64.media.tumblr.com/07bd3e63980e22333ebb40b8718524f6/tumblr_ocf8z5BhRG1vpbklao1_500.gif')
    ]),
    new Teases([
        new Image('https://media1.tenor.com/images/c33f9eb207d87ec44a72207120985b8d/tenor.gif'), //Nagatoro
        new Image('https://64.media.tumblr.com/c70d2e2b8ef340f5d27b1520dffc92c3/tumblr_mpgubnjLpb1rrzwfeo1_400.gif'), //Rozen Maiden - suigintou
    ]),
    new Laughs([
        new Image('https://i.imgur.com/x8UOj7u.gif'), //Nagatoro
        new Image('https://i.imgur.com/W3q8qqp.gif', ['Oh my... What do we have here ¬‿¬'], false), //Kobayashi - Tohru
        new Image('https://i.imgur.com/n3lBcLb.gif', ["Heh.. AahaAhahhh- I just can't..."], false), //Konosuba - Aqua
        new Image('https://i.imgur.com/lKp36T8.gif'), //Konosuba - Aqua
        new Image('https://i.imgur.com/QBqupzo.gif', ['Pffff- really?'], false), //Evangelion
        new Image('https://static.tumblr.com/c36fc2595f59df28ce876970332df8b6/utm1oo4/Dltp8zx53/tumblr_static_filename_2048_v2.gif', ['Heh.. bAAaahaaAAhahhh-'],false), //DITF - 02
    ]),
    new Bullies([
        new Image('https://thumbs.gfycat.com/SilkyResponsibleGemsbuck-size_restricted.gif'),
        new Image('https://i.gifer.com/78nU.gif'),
        new Image('https://64.media.tumblr.com/1f042c0e66456bc9ff3dcc645709a393/tumblr_o4hx8yQijn1su8acao2_400.gif'), //Konosuba - Kazuma/Megumin
        new Image('https://64.media.tumblr.com/4c463c7bf7dfc8c932f51528f1d8f6c7/tumblr_o31c8y0bUY1u6zbi9o2_400.gif'), //Konosuba - Kazuma/Megumin
        new Image('https://pa1.narvii.com/5812/28a21e935edecce130da6a2b08ba1fb26929eb5d_hq.gif'),
        new Image('https://lordbordenblog.files.wordpress.com/2018/09/omake-gif-anime-saekano-episode-10-michiru-body-hold.gif'),
        new Image('https://media1.tenor.com/images/e01d7830c5a457aaba21667997448ab3/tenor.gif'), //Kakegurui
    ]),
    new Boobas([
        new Image('https://64.media.tumblr.com/f51f4852bbe8ee27c43dbbcaf91363ff/tumblr_pul8fpNn4s1yofbauo1_500.gif'), //Kobayashi - Kobayashi/Tohru
        new Image('https://64.media.tumblr.com/29733b5cbcd265fc8b1356973f331010/tumblr_nf2t25E2be1t0g0dno1_400.gif'),
        new Image('https://i.pinimg.com/originals/81/de/c4/81dec4de86e9c87ecde04cec59c524b8.gif'), //Konosuba Chomosuke/Wiz
        new Image('https://i.imgur.com/GTtAOf1.gif'), //Steinsgate
    ])
];