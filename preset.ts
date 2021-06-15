import { color, Preset } from 'apply'

Preset.setName('Tailwind CSS for Laravel')
Preset.option('init', true)
Preset.option('install', true)
Preset.option('gitignore', false)

Preset.apply('ycs77/preset-laravel')
  .with(['--no-interaction', '--no-install'])
  .ifOption('init')

Preset.extract('default').withTitle('Extracting templates...')

Preset.edit('webpack.mix.js')
  .withTitle(`Updating ${color.magenta('webpack.mix.js')}...`)
  .update(content => {
    return content.replace(/(\.postCss[^\n]+\n)[ \t]+\/\/\r?\n/, '$1')
  })
  .addAfter('postCss', [
    '  require(\'postcss-import\'),',
    '  require(\'tailwindcss\'),',
    '  require(\'postcss-nested\'),',
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

Preset.group((preset) => {
  preset
    .editNodePackages()
    .addDev('tailwindcss', '^2.1.0')
    .addDev('autoprefixer', '^10.0')
    .addDev('postcss', '^8.3.0')
    .addDev('postcss-import', '^14.0')
    .addDev('postcss-nested', '^5.0')
  preset.installDependencies().ifOption('install')
}).withTitle('Installing dependencies...')

Preset.instruct([
  `Run ${color.magenta('npm run dev')} or ${color.magenta('yarn dev')}`,
  `Docs: ${color.magenta('https://tailwindcss.com')}`,
])
