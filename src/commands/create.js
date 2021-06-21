module.exports = {
  name: 'create',
  description: 'Create a new file for a given subject',
  run: (args, {
    Alerts,
    fs: { mkdirSync, existsSync, writeFileSync },
    ejs,
    path,
    getTemplates
  }) => {
    Alerts.info('[1/3] capturing information')
    const params = args.reduce((acc, arg, key) => {
      if (arg.includes('--')) {
        return {
          ...acc,
          [arg.replace('--', '')]: args[key + 1]
        }
      }
      return acc
    }, {})
    if (!params.name || !params.file) {
      return Alerts.error('Please define the name for the job and show us which file you want')
    }
    const template = getTemplates(params.file)

    if (template.length) {
      return Alerts.error("We didn't find this file")
    }

    Promise.resolve((() => {
      Alerts.info('[2/3] creating folders')
      switch (template.isFolderTemplate) {
        case true: {
          if (!existsSync(template.url)) {
            mkdirSync(template.url)
            Alerts.success(`${template.url} created`)
          }
          if (!existsSync(`${template.url}/${params.name}`)) {
            mkdirSync(`${template.url}/${params.name}`)
            return Alerts.success(`${template.url}/${params.name} created`)
          }
          return Alerts.info(`${template.url}/${params.name} exists`)
        }
        default: {
          if (!existsSync(template.url)) {
            mkdirSync(template.url)
            return Alerts.success(`${template.url} created`)
          }
          return Alerts.info(`${template.url} exists`)
        }
      }
    })())
      .then(() => {
        Alerts.info('[3/3] creating file')
        if (!template.template) return Alerts.warning('This file not have template')
        const templateRender = ejs.render(template.template, params)
        const templateName = `${params.name}.${template.name}.js`
        const templateUrl = path.join(template.url, templateName)
        if (!existsSync(templateUrl)) {
          writeFileSync(templateUrl, templateRender)
          return Alerts.success(`${templateName} created`)
        }
        return Alerts.info(`${templateName} exists`)
      })
      .then(() => {
        console.log('\n')
        Alerts.done('Done!')
      })
  }
}
