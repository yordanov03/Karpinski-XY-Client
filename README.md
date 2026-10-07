# DizoNg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Server rendering and prerendering

Run `npm run prerender` to build and prerender the homepage and public informational/listing pages. The generated files are written to `dist/dizo-ng/`, with route pages such as `about/index.html` and `paintings/index.html`. Deploy the full output directory so these pre-rendered pages, assets, `robots.txt`, and `sitemap.xml` are available.

The Docker image builds and runs the Angular Universal server, which renders requested pages—including painting and exhibition details—on the server. It listens on port 4000 by default; configure the hosting platform to route web traffic to that port.

For local checks, run `npm run build:ssr` and then `npm run serve:ssr`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
