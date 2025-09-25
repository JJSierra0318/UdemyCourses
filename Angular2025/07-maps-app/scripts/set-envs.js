// THIS IS SCRIPT ISN'T USED AS MAPLIBRE IS BEING USED
// INSTEAD OF MAPBOX, SO NO API KEY IS NEEDED
// IF IT WERE TO BE USED, UNCOMMENT AND ADD THE SCRIPT
// TO THE package.json FILE AND UPDATE README.MD

/* const { writeFileSync, mkdirSync } = require('fs')

require('dotenv').config()

const targetPath = './src/environments/environment.ts'
const targetPathDev = './src/environments/environment.development.ts'

const mapboxKey = process.env['MAPBOX_KEY']

if (!mapboxKey) { 
  throw new Error('No MAPBOX_KEY defined')
}

const envFileContent = `
export const environment = {
  mapboxKey: '${mapboxKey}',
};
`

mkdirSync('./src/environments', { recursive: true })
writeFileSync(targetPath, envFileContent)
writeFileSync(targetPathDev, envFileContent) */