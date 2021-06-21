module.exports = {
  name: '-h',
  description: 'Help',
  run: (_args, {
    fs: { readdirSync },
    path,
    Table
  }) => {
    const commands = readdirSync(__dirname).map(cmd => require(path.join(__dirname, cmd)))
    const table = new Table({
      chars: {
        top: '',
        'top-mid': '',
        'top-left': '',
        'top-right': '',
        bottom: '',
        'bottom-mid': '',
        'bottom-left': '',
        'bottom-right': '',
        left: '',
        'left-mid': '',
        mid: '',
        'mid-mid': '',
        right: '',
        'right-mid': '',
        middle: ' '
      },
      style: { 'padding-left': 0, 'padding-right': 0 }
    })
    table.push(...commands.reduce((acc, cmd) => {
      acc = [
        ...acc,
        [cmd.name, cmd.description]
      ]
      return acc
    }, []))
    console.log(table.toString())
    console.log('\n')
  }
}
