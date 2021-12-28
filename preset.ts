import { color, Preset } from 'apply'

Preset.setName('Tailwind CSS for Laravel')
Preset.option('init', true)
Preset.option('install', true)
Preset.option('gitignore', false)

Preset.apply('ycs77/preset-laravel')
  .with('--no-interaction')
  .ifOption('init')

Preset.extract('default').withTitle('Extracting templates...')

Preset.edit('webpack.mix.js')
  .withTitle(`Updating ${color.magenta('webpack.mix.js')}...`)
  .update(content => content.replace(/(\.postCss[^\n]+\n)[ \t]+\/\/\r?\n/, '$1'))
  .addAfter('postCss', [
    '  require(\'postcss-import\'),',
    '  require(\'tailwindcss/nesting\'),',
    '  require(\'tailwindcss\'),',
    '  require(\'autoprefixer\'),',
  ])

Preset.edit('.gitignore')
  .withTitle(`Updating ${color.magenta('.gitignore')}...`)
  .ifOption('gitignore')
  .addAfter('node_modules', [
    '/public/css',
    '/public/js',
    '/public/mix-manifest.json',
  ])

Preset.group(preset => {
  preset
    .editNodePackages()
    .addDev('tailwindcss', '^3.0.0')
    .addDev('autoprefixer', '^10.0')
    .addDev('postcss', '^8.3.0')
    .addDev('postcss-import', '^14.0')

  // Sort node dependencies...
  preset.edit('package.json')
    .update(original => {
      let content = JSON.parse(original)
      const indent = original.match(/^{\r?\n([ \t]+)/)[1]
      const sortObject = (unsortObj: object, compareFn?: (a: string, b: string) => number) => Object
        .keys(unsortObj).sort(compareFn).reduce((obj, key) => {
          obj[key] = unsortObj[key]
          return obj
        }, {})
      const sortProps = ['dependencies', 'devDependencies']
      content = sortObject(content, (a, b) => a === sortProps[0] && b === sortProps[1] ? -1 : 1)
      sortProps.forEach(prop => {
        if (!content[prop]) return
        content[prop] = sortObject(content[prop])
      })
      return JSON.stringify(content, null, indent)+'\n'
    })

  preset.installDependencies().ifOption('install')
}).withTitle('Installing dependencies...')

Preset.instruct([
  `Run ${color.magenta('npm run dev')} or ${color.magenta('yarn dev')}`,
  `Docs: ${color.magenta('https://tailwindcss.com')}`,
])
