import { color, Preset } from 'apply'

Preset.setName('Tailwind CSS for Laravel')
Preset.option('init', true)
Preset.option('install', true)
Preset.option('gitignore', false)

Preset.apply('ycs77/preset-laravel-init')
  .ifOption('init')

Preset.group((preset) => {
  preset.extract('default')
}).withTitle('Extracting templates...')

Preset.edit('webpack.mix.js')
  .withTitle(`Updating ${color.magenta('webpack.mix.js')}...`)
  .update(content => {
    return content
      .replace(
        '.postCss(\'resources/css/app.css\', \'public/css\', [\n    //',
        '.postCss(\'resources/css/app.css\', \'public/css\', [\n    require(\'postcss-import\'),\n    require(\'tailwindcss\'),\n    require(\'postcss-nested\'),\n    require(\'autoprefixer\'),'
      )
  })

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
  `Docs: ${color.magenta('https://tailwindcss.com/docs/guides/laravel')}`,
])
