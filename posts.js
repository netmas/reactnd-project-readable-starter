const clone = require('clone')

let db = {}

const defaultData = {
  "6ni6ok3ym7mf1p33lne6": {
    id: '6ni6ok3ym7mf1p33lne6',
    timestamp: 1468479767190,
    title: 'Redux-Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  "8xf0y6ziyjabvozdd253n7": {
    id: '8xf0y6ziyjabvozdd253n7',
    timestamp: 1467166872634,
    title: 'React-Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false 
  },
  "8xf0y6ziyjabvozdd253n8": {
    id: '8xf0y6ziyjabvozdd253n8',
    timestamp: 1467166872634,
    title: 'Udacity-Udacity is the best place to learn React3',
    body: 'Everyone says so after all many times.',
    author: 'thingthree',
    category: 'udacity',
    voteScore: 6,
    deleted: false 
  },
  "8xf0y6ziyjabvozdd253n9": {
    id: '8xf0y6ziyjabvozdd253n9',
    timestamp: 1467166872634,
    title: 'Redux - Number 2',
    body: 'Everyone says so after all many times.',
    author: 'thingthree',
    category: 'redux',
    voteScore: 6,
    deleted: false 
  },
  "8xf0y6ziyjabvozdd25310": {
    id: '8xf0y6ziyjabvozdd25310',
    timestamp: 1467166872634,
    title: 'React - Udacity is the best place to learn React 2',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false 
  },
  "8xf0y6ziyjabvozdd25311": {
    id: '8xf0y6ziyjabvozdd25311',
    timestamp: 1467166872634,
    title: 'Udacity - Udacity is the best place to learn React3 2',
    body: 'Everyone says so after all many times.',
    author: 'thingthree',
    category: 'udacity',
    voteScore: 6,
    deleted: false 
  },
  "8xf0y6ziyjabvozdd25312": {
    id: '8xf0y6ziyjabvozdd25312',
    timestamp: 1467166872634,
    title: 'Redux-Udacity is the best place to learn React3 3',
    body: 'Everyone says so after all many times.',
    author: 'thingthree',
    category: 'redux',
    voteScore: 6,
    deleted: false 
  },
  "8xf0y6ziyjabvozdd25313": {
    id: '8xf0y6ziyjabvozdd25313',
    timestamp: 1467166872634,
    title: 'React-Udacity is the best place to learn React 3',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false 
  },
  "8xf0y6ziyjabvozdd25314": {
    id: '8xf0y6ziyjabvozdd25314',
    timestamp: 1467166872634,
    title: 'Udacity-Udacity is the best place to learn React3 3',
    body: 'Everyone says so after all many times.',
    author: 'thingthree',
    category: 'udacity',
    voteScore: 6,
    deleted: false 
  },
  "8xf0y6ziyjabvozdd25315": {
    id: '8xf0y6ziyjabvozdd25315',
    timestamp: 1467166872634,
    title: 'React - Udacity is the best place to learn React3 4',
    body: 'Everyone says so after all many times.',
    author: 'thingthree',
    category: 'react',
    voteScore: 6,
    deleted: false 
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted 
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts.deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)
    
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }
     
    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}