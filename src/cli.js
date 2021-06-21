const Tools = require('./tools')

function run (args) {
  if (!args[0]) {
    return Tools.Alerts.error('Invalid command')
  }
  const basePath = Tools.path.join(__dirname, '/commands')
  const commands = Tools.fs.readdirSync(basePath).map(file => require(`${basePath}/${file}`))
  const command = commands.find(cmd => cmd.name === args[0])
  if (!command) {
    return Tools.Alerts.error('Command not found')
  }
  Tools.Alerts.debug(`run ${command.name}`)
  command.run(args.filter((_arg, key) => key > 0), Tools)
}

module.exports = {
  run
}
