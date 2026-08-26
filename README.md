# Conference website

This directory contains the standalone Jekyll website for AI4Mesh 2026, the
International Workshop on Geometry and Topology for AI-Driven Mesh Generation
and Simulations.

## Run locally

Ruby 2.7 or newer is required.

```sh
export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
bundle install
bundle exec jekyll serve
```

Then open <http://127.0.0.1:4000>.

For a production deployment, set `url` (and `baseurl` when the site is hosted
below a subpath) in `_config.yml` before building.

## Deploy to GitHub Pages

This directory is an independent Git repository. The workflow in
`.github/workflows/pages.yml` builds and deploys the Jekyll site whenever the
`main` branch is pushed.

1. Create an empty GitHub repository and keep its default branch as `main`.
2. Add that repository as the local `origin` and push `main`.
3. In the GitHub repository, open **Settings → Pages** and select
   **GitHub Actions** as the deployment source.

The workflow reads the repository-specific Pages base path automatically, so
the site works both as a user site and as a project site under `/repository/`.

## Content updates

Conference facts and page copy live in `_data/conference.yml`. Sponsor,
speaker, registration-link, accommodation, and contact information remain
marked as pending because they were not supplied in the source document.

### Carousel images

Carousel order and image metadata are configured in `_data/carousel.yml`.
Place the image files in `assets/images/carousel/`, then add, remove, reorder,
or disable entries in the YAML file. The template automatically generates the
slides and matching navigation dots.

Each slide supports `image`, `alt`, `label`, `position`, `width`, `height`, and
`enabled`. Use `position` to adjust how an image is cropped, and set `enabled`
to `false` to hide a slide without deleting its configuration.
