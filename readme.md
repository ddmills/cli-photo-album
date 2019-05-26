# CLI Photo Album SDK

Currently, it only supports the ability to list all of the photos for a given album id

```
$ npm start 12
Album 12 contains 50 photos
[551] eveniet debitis nihil
[552] odit culpa optio nesciunt
[553] doloribus illo aperiam ut ducimus
...
```

### Requirements
- git
- node `v10.15.3`*
- npm `6.4.1`*

**Easily switch node and npm versions using `nvm`*

### Usage
1. Clone the repository
    - `$ git clone git@github.com:ddmills/cli-photo-album.git`
    - `$ cd cli-photo-album`
2. Install dependencies
    - `$ npm ci`
3. Build the code
    - `$ npm run build`
3. Lookup photos by album id (`4`)
    - `$ npm start 4`

### Development

**npm run build**

Run the code through babel (code is output to `lib`)

**npm test**

Run all tests (unit and integration)

**npm run test:unit**

Run unit tests

**npm run test:integration**

Run integration tests

**npm run test:integration**

Run integration tests

**npm run prettier**

Force the code to follow "prettier" standards

**npm run prettier:check**

Verify code is up to "prettier" standards

**npm run verify**

Ensures the code can be built, runs all tests, and checks that the code matches "prettier" standards
