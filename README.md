# gallery

> Nuxt.js + Netlify CMS project

Visit: https://epic-bhaskara-02f420.netlify.com/

- If the live deploy fails, go to : netlify -> deploys -> trigger deploy -> clear cache and deploy site
- after publishing something from the gui you need to run "git pull" and "npm run serve" to get the changes

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build with server-side rendering for production
# and start server
$ npm run build
$ npm start

# generate static project for production
$ npm run generate
```

See [starter template documentation in the README on GitHub](https://github.com/renestalder/nuxt-netlify-cms-starter-template) for additional usage and configuration.

## Edit content

Access `yourwebsite.com/admin`, e.g. `localhost:3000/admin`.


## Enabling Netlify CMS lm "git lfs"
0. https://git-lfs.github.com/
1. https://www.netlifycms.org/docs/netlify-large-media/
    1.1 https://www.netlifycms.org/docs/update-the-cms-version/
    1.2 https://www.netlifycms.org/docs/authentication-backends/#git-gateway-with-netlify-identity
2. https://www.netlify.com/docs/large-media/
    2.1 https://www.netlify.com/docs/large-media/#enabling-netlify-large-media
        2.1.1 https://www.netlify.com/docs/cli/#authentication
    2.2 https://www.netlify.com/docs/large-media/#large-media-file-tracking-configuration

- To see your config  run "cat .gitattributes"
- netlify cli stores your auth token localy here: "~/.netlify/config.json"




### Ignore Folders:
(They are auto generated)
- node_modules/
- dist/
- .nuxt/