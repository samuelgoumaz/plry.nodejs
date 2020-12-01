# Imperator.package
Strapi CMS, Gatsby website, Gatsby commerce and authentification Application for commercial development.

Author :
<strong>Samuel Goumaz</strong>

## Github Connexion

```
git config user.name "username"
git config user.name
```
***

## Clone Part

```
git clone https://github.com/samuelgoumaz/imperator.package imperator-starter
```
***

## Init Application

```
cd backend
npm install
npm run develop

cd frontend
npm install
gatsby develop
```
***


# 1. Guide d'installation

## 1.1 Install Strapi <sup>requirement</sup>

Install strapi in a folder <strong>backend</strong>.

```
npx create-strapi-app backend --quickstart
strapi develop
npm run develop
```

## 1.2 Install Gatsby <sup>requirement</sup>

Install globally the Gatsby CLI and create au gatsby <strong>frontend</strong> folder.

```
npm install -g gatsby-cli
gatsby new frontend
cd frontend
```

#### Important : <i style="color: red;">Set "find" and "findone" right for public and authentificated user in localhost:1337 for "users" and "content types" that you need.</i>

***


### 1.2.1 Create a path prefix <sup>optional</sup>

<a href="https://www.gatsbyjs.com/docs/path-prefix/">Path Prefix Documentation</a>
Add a `pathPrefix` value to your `gatsby-config.js`.

```js
module.exports = {
  pathPrefix: `/frontend`,
}
```

Use the flag `--prefix-paths` like this :

```gatsby build --prefix-paths
gatsby build --prefix-paths
```

***

### 1.2.2 Create an Asset Prefix <sup>important</sup>

<a href="https://www.gatsbyjs.com/docs/asset-prefix/">Asset Prefix Documentation</a>
Add a assetPrefix value to your `gatsby-config.js`.

```
module.exports = {
  assetPrefix: `http://localhost:1337`,
}
```

Use the flag `--prefix-paths` like this :

```
gatsby build --prefix-paths
```

***

### 1.2.3 Environnement Variables <sup>important</sup>

<a href="https://www.gatsbyjs.com/docs/environment-variables/">Environnement Variables Documentation</a>

Create `.env.development` and `.env.production` file in <strong>frontend</strong> folder.

```
nano .env.development
GATSBY_API_URL=http://localhost:1337
ENABLE_GATSBY_REFRESH_ENDPOINT=true

nano .env.production
GATSBY_API_URL=https://yourdomain.com/admin

//ctr+x for save and quit.
```

Copy/paste this code in head of <strong>gatsby-config.js</strong> :

```
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
```

***

### 1.2.4 Install Gatsby Source Strapi <sup>important</sup>

Sync strapi and gatsby with <strong>gatsby-source-strapi</strong>.

```
npm install --save gatsby-source-strapi
```

Add in `gatsby-config.js` the module <strong>gatsby-source-strapi</strong> and connect this with your global environment.

```
module.exports = {
  {
    resolve: `gatsby-source-strapi`,
    options: {
      apiURL: process.env.GATSBY_API_URL || `http://localhost:1337`,
      contentTypes: [`article`],
      excludedTypes: [`user`],
      singleTypes: [`settings`],
      preprocessNodes: (allEntities) => undefined, // default to null
      queryLimit: 1000, // Default to 100
      loginData: {
        identifier: "samuel@atelierharfang.ch",
        password: "Kenobi1313",
      },
    },
  },
}
```

***

#### Error : <i style="color: red;">gatsby-source-strapi threw an error while running the sourceNodes lifecycle</i>

<strong>PS :</strong> <i style="color: green;">It's probably a problem of strapi Rights on your content type and single type</i>

If you have an error while compiling try to remove .cache in backend and frontend folder :

```
cd backend
rm -rf .cache
npm run develop

cd frontend
rm -rf .cache
gatsby develop
```

Try this <strong>second</strong> if the error persist :

```
cd backend
rm -rf .cache
rm -rf .node_modules
rm -rf package-lock.json
npm rebuild //optional
npm install
npm run develop

cd frontend
rm -rf .cache
rm -rf .node_modules
rm -rf package-lock.json
npm rebuild //optional
npm install
gatsby develop
```

***

### 1.2.5 Manage Image with Gatsby and Strapi <sup>important</sup>

Install `gatsby-transformer-sharp` and `gatsby-plugin-sharp`.

```
npm install --save gatsby-transformer-sharp
npm install --save gatsby-plugin-sharp
npm install --save gatsby-image
```

Add plugin in your `gatsby-config` :

```
module.exports = {
  plugins: [
  	{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images/`,
      },
    },
  ],
}
```

***

### 1.2.5 Multiple Image with Gatsby and Strapi <sup style="color: red;">not resolved</sup>

Install gatsby transformer YAML

```
npm install --save gatsby-transformer-yaml
```

In your `gatsby-config.js`

```
module.exports = {
  plugins: [
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
}
```

# 3. Setup Gatsby Theme

Install packages in your `/frontend` folder.

```
cd frontend
npm install --save node-sass
npm install --save gatsby-plugin-sass
npm install --save underscore
npm install --save typography
npm install --save three
```

Add plugins in `gatsby-config.js`

````
`node-sass`,
`gatsby-plugin-sass`,
`underscore`,
`typography`,
`three`,
````

<strong>PS</strong> : <i style="color: green;">Import library in your `index.js` :</i>

```
import map from "underscore/modules/map.js"
```

## 3.1 Import Style

Add in your `gatsby-browser.js`

```
import "./src/styles/styles.scss"
```

<strong>PS</strong> : <i>Included materialize-css grid.</i>

## 3.2 Import JS

## 3.3 Import THREE

## Deployement

### Nginx Load Balancer
create a `/etc/nginx/conf.d/backend.conf` file in nginx `conf.d` folder.
```
server {
  listen 80;
  server_name  backend.atelierharfang.ch;
  location / {
    proxy_set_header X-Forwarded-Host $host:$server_port;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://10.102.3.211:8080;
  }
}
```

create a `/etc/nginx/conf.d/frontend.conf` file in nginx `conf.d` folder.
```
server {
    listen 185.54.7.11:80;
    server_name  frontend.atelierharfang.ch;
    location / {
        proxy_set_header X-Forwarded-Host $host:$server_port;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://10.102.3.211:80;
    }
}
```

### Nginx Load Balancer Upstrems

### NodeJs Server
#### Strapi
edit your `.env`file.
```
HOST=10.102.12.180
PORT=8080

```

1. Remove `package-lock.json` and `node_modules` folder.
2. Install, build and run strapi with this commands.
```
NODE_ENV=production npm install
NODE_ENV=production npm run build
NODE_ENV=production npm start
```

#### Gatsby
add `--host yourip` argument in your pacakges.json.
```
"scripts": {
  "serve": "gatsby serve --host 0.0.0.0 --port 80",
},
```
and start your server
```
npm run build
npm serve
```
