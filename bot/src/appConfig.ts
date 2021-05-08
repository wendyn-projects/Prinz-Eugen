import * as path from 'path'

export default {
    bot: {
        defaultPrefix: "prinz"
    },
    server: {
        guildConfigsDir: path.dirname(require.main.filename)
    }
}