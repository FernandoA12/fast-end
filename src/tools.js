const logSymbols = require('console-symbols')
exports.fs = require('fs')
exports.symbols = logSymbols
exports.path = require('path')
exports.Alerts = {
  message: msg => logSymbols.log(`${msg}`),
  info: msg => logSymbols.info(msg),
  error: msg => logSymbols.error(`\x1b[31m${msg}\x1b[0m`),
  warning: msg => logSymbols.warn(`\x1b[33m${msg}\x1b[0m`),
  done: msg => logSymbols.ok(`\x1b[32m${msg}\x1b[0m`),
  success: msg => logSymbols.ok(`${msg}`),
  debug: msg => logSymbols.log(`\x1b[1;30m${msg}\x1b[0m`)
}
exports.env = process.env
exports.ejs = require('ejs')
exports.getTemplates = template => {
  const templates = [
    {
      name: 'root',
      url: this.env.PATH_ROOT || 'src'
    },
    {
      name: 'main',
      url: this.path.join(this.env.PATH_ROOT || 'src', this.env.PATH_APP || 'app')
    },
    {
      name: 'route',
      url: this.path.join(this.env.PATH_ROOT || 'src', this.env.PATH_APP || 'app', this.env.PATH_ROUTES || 'routes'),
      template: this.fs.readFileSync(this.path.join(__dirname, 'templates', 'routes.ejs')).toString()
    },
    {
      name: 'controller',
      url: this.path.join(this.env.PATH_ROOT || 'src', this.env.PATH_APP || 'app', this.env.PATH_CONTROLLERS || 'controllers'),
      template: this.fs.readFileSync(this.path.join(__dirname, 'templates', 'controllers.ejs')).toString()
    },
    {
      name: 'entity',
      url: this.path.join(this.env.PATH_ROOT || 'src', this.env.PATH_APP || 'app', this.env.PATH_ENTITIES || 'entities'),
      template: this.fs.readFileSync(this.path.join(__dirname, 'templates', 'entities.ejs')).toString()
    },
    {
      name: 'repository',
      url: this.path.join(this.env.PATH_ROOT || 'src', this.env.PATH_APP || 'app', this.env.PATH_REPOSITORIES || 'repositories'),
      template: this.fs.readFileSync(this.path.join(__dirname, 'templates', 'repositories.ejs')).toString()
    },
    {
      name: 'useCases',
      url: this.path.join(this.env.PATH_ROOT || 'src', this.env.PATH_APP || 'app', this.env.PATH_USECASES || 'useCases'),
      isFolderTemplate: true
    },
    {
      name: 'test',
      url: this.path.join(this.env.PATH_TESTS || '__tests__'),
      template: this.fs.readFileSync(this.path.join(__dirname, 'templates', 'tests.ejs')).toString()
    }
  ]
  const file = templates.find(file => file.name === template)
  if (!file) {
    return templates
  }
  return file
}
exports.Table = require('cli-table')
