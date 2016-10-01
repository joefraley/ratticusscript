import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

// This will be needed to implement an automated webmention sending service...
// But I really don't want to implement one in Node
// and I REALLY don't want to use one in php...
import cheerio from 'cheerio'

const paths = fs.readdirSync(path.resolve('../../src/posts'))

const fetchWebMentions = postName => {
  const target = `https://ratticusscript.firebaseapp.com/posts/${ postName }`
  return fetch(`http://webmention.io/api/mentions?target=${ target }`)
    .then(response => response.json())
    .then(json => {
      return json
    })
}

const saveWebMentions = () => {
  paths.forEach(post => {
    const name = post.split('.')[0]
    fetchWebMentions(name)
      .then(results => {
        const data = JSON.stringify(results, null, '\t')
        fs.writeFileSync(`posts/${ name }.json`, data)
      })
  })
}

saveWebMentions()