const fetch = require('node-fetch');
const fs = require('fs');

const NODE_ENV = process.env.NODE_ENV || 'production';

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
  `.env.${NODE_ENV}.local`,
  `.env.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `.env.local`,
  '.env',
].filter(Boolean);
// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

fetch(`${process.env.REACT_APP_API_URL}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    result.data.__schema.types = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    fs.writeFile('./src/utils/fragmentTypes.json', JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
