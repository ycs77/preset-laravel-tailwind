<p align="center">
  <h1 align="center">Laravel Tailwind CSS - Lucas</h1>
  <p align="center">
    <a href="https://github.com/use-preset/use-preset/releases"><img alt="npx use-preset ycs77/preset-laravel-tailwindcss" src="https://img.shields.io/badge/use--preset-laravel--tailwindcss-blue?style=flat-square"></a>
    &nbsp;
    <a href="https://www.npmjs.com/package/use-preset"><img alt="use-preset version" src="https://img.shields.io/npm/v/use-preset?color=32c854&style=flat-square&label=use-preset"></a>
  </p>
  <br />
  <p align="center">
    <code>use-preset</code> is a scaffolding tool for developers. <a href="https://docs.usepreset.dev/">Read the documentation</a> for more information.
  </p>
  <br />
  <pre align="center">npx use-preset ycs77/preset-laravel-tailwindcss</pre>
  <br />
  <p align="center">See more <a href="https://github.com/ycs77/presets-list">Lucas's Presets</a></p>
<p>

# About

This preset adds [Tailwind CSS](https://tailwindcss.com) to a fresh Laravel application.

It can be the foundation of a preset based on Tailwind CSS, such as the [TALL preset](https://github.com/ycs77/preset-laravel-tall) or the [Inertia one](https://github.com/ycs77/preset-laravel-inertia), or can be used as a standalone preset.

# Installation

This preset is intended to be installed into a fresh Laravel application. Follow the [Laravel installation instructions](https://laravel.com/docs/installation) to ensure you have a working environment before continuing.

**Then, run the following command**:

```bash
npx use-preset ycs77/preset-laravel-tailwindcss
```

# Modifications

This preset gets rid of SASS and uses PostCSS instead. Nesting rules and importing files is still possible. If you are using Tailwind CSS, you really shouldn't need more than that, hence the riddance of SASS.

- Removal of the `sass` and`sass-loader` dependencies
- Removal of the `resources/sass` directory and its content
- Addition of `tailwindcss`, `@tailwindcss/ui`, `@tailwindcss/typography`, `postcss-import` and `postcss-nested`
- Addition of `app.css`, `base.css` and `components.css` in `resources/css`
- Addition of `postcss.config.js` and `tailwind.config.js`
- Modification of `webpack.mix.js`
- Modification of `resources/views/welcome.blade.php`
