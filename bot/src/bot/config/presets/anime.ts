import { MessageGroup, Image } from '../GuildConfig'

class Bonks extends MessageGroup {
    constructor(images: Image[]) {
        super('bonk', ['${from} bonks ${to}'], images, '\nEnough! Now prepare to get bonked 🔨');
    }
}

class BeatUps extends MessageGroup {
    constructor(images: Image[]) {
        super('beatup', [ '${from} started beating up ${to}'], images, "\nYou did what? -__-");
    }
}

class Tickles extends MessageGroup {
    constructor(images: Image[]) {
        super('tickle', [
                '${from} tickles ${to}',
                '${from} tickles ${to} to death'
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
                "So... It's gonna be like that you say..."
            ], images, "\nYou like that, don't you? ¬‿¬");
    }
}

class Laughs extends MessageGroup {
    constructor(images: Image[]) {
        super('laughat', [
                "${from} laughs at ${to}"
            ], images, "\nYou are so funny senpai XD");
    } 
}

class Bullies extends MessageGroup {
    constructor(images: Image[]) {
        super('bully', [
                "${from} bullies ${to}"
            ], images, "\nNaughty, are we? ꓶ‿ꓶ");
    }
}

class Baddies extends MessageGroup {
    constructor(images: Image[]) {
        super('bad', [
                "Bad ${to}... `︿´"
            ], images, "\nBad senpai `︿´");
    }
}

class Boobas extends MessageGroup {
    constructor(images: Image[]) {
        super('booba', [
                "Huge, aren't they?  ¬‿¬"
            ], images, "\nHuge, aren't they? ¬‿¬");
    } 
}

export default [
    new Bonks([
        new Image('https://thumbs.gfycat.com/BelovedFancyDuck-size_restricted.gif'), //JJK - Nobara 
        new Image('https://media1.tenor.com/images/2a4b5698e09013d6e4c94d4c0d9debb2/tenor.gif'), //Overlord - Nabe Gama
        new Image('https://media1.tenor.com/images/bc8d9395166b82df05d590459f184f2d/tenor.gif'), //RWBY - Neopolitan
        new Image('https://i.imgur.com/FN0aYXh.gif'),
    ]),
    new BeatUps([
        new Image('https://thumbs.gfycat.com/HatefulSilverIndochinesetiger-size_restricted.gif'), //Kaguya-sama wa Kokurasetai - Chika
        new Image('https://media1.tenor.com/images/c95f9a729a3a866cbc559b008aaeb2ed/tenor.gif?itemid=17024567'), //Kaguya-sama wa Kokurasetai - Chika
        new Image('https://64.media.tumblr.com/8a5d544e8fd7fcc0edffa2517099029d/tumblr_n1vvwjzLh91tnrr0fo1_500.gif'),
    ]),
    new Tickles([
        new Image('https://media1.tenor.com/images/fcbded4ce66ab01317ee009a1aa44404/tenor.gif'),
        new Image('https://media1.tenor.com/images/ae7fc8d4dffe5ca4dea5eaeee5fb8abd/tenor.gif'),
        new Image('https://78.media.tumblr.com/ba913c0d21916e57b846e93b783cab39/tumblr_o505jxtnWk1vpbklao4_500.gif'),
        new Image('https://i.imgur.com/VD8nvU5.gif'),
        new Image('https://78.media.tumblr.com/345313d8ba3c9128a03bd3e350cee44f/tumblr_inline_pd97s5xBcN1vrbftj_540.gif'), //Toradora
        new Image('https://64.media.tumblr.com/f998ef7b597536621c5aaa1d73dea5cd/128c7ac960733209-1a/s400x600/aaaf750a96c861fe86eaf3fbb437cbc47f2b8e98.gif'), //Azur Lane
    ]),
    new Teases([
        new Image('https://media1.tenor.com/images/c33f9eb207d87ec44a72207120985b8d/tenor.gif'), //Nagatoro
        new Image('https://media1.tenor.com/images/e01d7830c5a457aaba21667997448ab3/tenor.gif'), //Kakegurui
    ]),
    new Laughs([
        new Image('https://i.imgur.com/x8UOj7u.gif'), //Nagatoro
        new Image('https://i.imgur.com/W3q8qqp.gif', ['Oh my... What do we have here ¬‿¬'], false), //Kobayashi - Tohru
        new Image('https://i.imgur.com/n3lBcLb.gif', ["Heh.. AahaAhahhh- I just can't..."], false), //Konosuba - Aqua
        new Image('https://i.imgur.com/lKp36T8.gif'), //Konosuba - Aqua
        new Image('https://i.imgur.com/QBqupzo.gif', ['Pffff- really?'], false),
    ]),
    new Bullies([
        new Image('https://thumbs.gfycat.com/SilkyResponsibleGemsbuck-size_restricted.gif'),
        new Image('https://i.gifer.com/78nU.gif'),
        new Image('https://64.media.tumblr.com/1f042c0e66456bc9ff3dcc645709a393/tumblr_o4hx8yQijn1su8acao2_400.gifv'), //Konosuba - Kazuma/Megumin
        new Image('https://64.media.tumblr.com/4c463c7bf7dfc8c932f51528f1d8f6c7/tumblr_o31c8y0bUY1u6zbi9o2_400.gifv'), //Konosuba - Kazuma/Megumin
        new Image('https://pa1.narvii.com/5812/28a21e935edecce130da6a2b08ba1fb26929eb5d_hq.gif'),
        new Image('https://lordbordenblog.files.wordpress.com/2018/09/omake-gif-anime-saekano-episode-10-michiru-body-hold.gif'),
    ]),
    new Baddies([
        new Image('https://media1.tenor.com/images/347f852d3dfa48502406fa949fcc1449/tenor.gif')
    ]),
    new Boobas([
        new Image('https://64.media.tumblr.com/f51f4852bbe8ee27c43dbbcaf91363ff/tumblr_pul8fpNn4s1yofbauo1_500.gif'), //Kobayashi - Kobayashi/Tohru
        new Image('https://i.imgur.com/x1JX5ov.gif'),
        new Image('https://i.pinimg.com/originals/81/de/c4/81dec4de86e9c87ecde04cec59c524b8.gif'), //Konosuba Chomosuke/Wiz
    ])
];