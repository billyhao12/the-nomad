const mongoose = require('mongoose')
const db = require('../models')


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nomad');

const userSeed = [
  {
    name: "Trenton Creamer ",
    email: "seed@gmail.com",
    password: "123456789",
    date: new Date(Date.now()),
  },
  {
    name: "Billy Chris  ",
    email: "billychris@gmail.com",
    password: "123456789",
    date: new Date(Date.now()),
  },
];

const articleSeed = [
  {
    title: "Seattle police clear CHOP protest zone",
    category: ["Politics"],
    body:
      "But the tents, the graffitied barricades, and the co-op shops that have marked the Capitol Hill Organized Protest (CHOP) — or the Capitol Hill Autonomous Zone, aka CHAZ, as it was named at the start of the occupation — were gone. After about 3 1/2 weeks, after the protest zone became the subject of heated national debate and the scene of violence and tragedy, Seattle police and other agencies swept in early Wednesday with heavily equipped officers and tactical vehicles, clearing the area with threats to arrest anyone who stayed behind.",
    like: [],
    lat: 34,
    long: 118,
    image:
      "https://static.seattletimes.com/wp-content/uploads/2020/07/07012020_SPD-Returns-to-CHOP_173219-1536x1089.jpg",
    date: new Date(Date.now()),
  },
  {
    title: "Behave yourself while backpacking",
    category: ["Travel"],
    body:
      "I don't know what it is about cheaper beach backpacking areas that brings out the lunatics in the younger backpacking group but for some reason everyone seems to think the world just became their playground and that you can just do whatever you want. In many situations you actually can get away with this attitude but I am one of those people that knows that certain areas are already borderline anti-backpacker because of the low amount of money that they tend to spend (which is the entire idea behind backpacking, don't think I am calling anyone stingy) but when people spend no money and also act like fools in public, the local community starts to loathe their presence and I hate to see this.",
    like: [],
    lat: 47,
    long: 122,
    image:
      "https://steemitimages.com/640x0/https://wobblybloggy.files.wordpress.com/2019/02/trav-1-copy.jpg?w=514&h=602",
    date: new Date(Date.now()),
  },
  {
    title: "Trump Poised to Add His Voice to GOP Chorus of Biden Broadsides",
    category: ["Politics"],
    body:
      "President Donald Trump will ask Americans to return him to office in a speech Thursday closing the Republican convention, arguing that voters can’t trust Joe Biden or the Democratic Party to navigate the coronavirus pandemic or salve the nation’s racial divisions.",
    like: [],
    lat: 34,
    long: 118,
    image:
      "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/isCPhnrGifW0/v0/1000x-1.jpg",
    date: new Date(Date.now()),
  },
  {
    title: "An Extremely Strange Burger. What's Inside?",
    category: ["Food", "Travel"],
    body:
      "Imagine a burger with mashed potatoes, mushrooms and chicken with sour-cream. That's exactly the mixture which i found in this very burger, guys. It looks like Russian food. We have a traditional Russian dish like that stuff!",
    like: [],
    lat: 34,
    long: 118,
    image:
      "https://steemitimages.com/640x0/https://cdn.steemitimages.com/DQmU9NeoukfUXb73exFqD9AJFd3agHMEVBxV8nGjoYsHcmb/IMG_20200803_115841.jpg",
    date: new Date(Date.now()),
  },
  {
    title: "Biden Says He Will Travel to Key States During Fall Campaign",
    category: ["Politics"],
    body:
      "Democratic presidential nominee Joe Biden said Thursday he plans to campaign in person during the final two months before Election Day, after months staying close to his Delaware home out of concerns about the coronavirus.",
    like: [],
    lat: 47,
    long: 122,
    image:
      "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iOg4.g98ME1o/v1/1000x-1.jpg",
    date: new Date(Date.now()),
  },
  {
    title: "Vega Shoreline APA",
    category: ["Food"],
    body:
      "Hop aromatic taste with clear bitterness, hints of passion fruit, grapefruit, apricot, honey, lime and light bread. Served at 8-10 ° C as a companion drink or with dishes of lamb and beef.",
    like: [],
    lat: 47,
    long: 122,
    image:
      "https://steemitimages.com/1280x0/https://cdn.steemitimages.com/DQmUyKyXn3SamFMvG1vWhoUgs4SPtb5cmxZRFtb4b51pkcM/image.png",
    date: new Date(Date.now()),
  },
];

const commentSeed = [
  {
    user: "",
    content: 'Wow, what a well written article!',
    like: [],
    date: new Date(Date.now()),
  },
  {
    author: 'codesvillain',
    content: 'It\'s magical not just minimal!',
    like: [],
    date: new Date(Date.now()),
  },
  {
    author: 'georgecrispy',
    content: 'Let me take a nap... great colour, anyway.',
    like: [],
    date: new Date(Date.now()),
  },
  {
    author: 'startleeavesdrop',
    content: 'Minimal mate I like the use of playfulness and typography!',
    like: [],
    date: new Date(Date.now()),
  },
  {
    author: 'choopybreath',
    content: 'I think I\'m crying. It\'s that admirable.',
    like: [],
    date: new Date(Date.now()),
  },
];

// on the user.then function create the createSeedArticles 
// runseedfunction 

// Clear 
// Get
// Insert 

function createUserSeed(){
  db.User.remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then((data) => {
      //db.articles.find push them into the comment data
      console.log(data.result.n + " records inserted!");
      console.log(data);
      //console.log(data._id)
      return createSeedArticles();
    })
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
createUserSeed();

async function createSeedArticles(){

  const users = await db.User.find({})
  
console.log(users)

  return db.Article.remove({})
    .then(() =>
      db.Article.collection.insertMany(
        // const userIds = users.map( user =>user._id)
        // const get RandomUserId(){
          //return userIds[Math.floor(Natg.random() * userIds.length)]
          //const articleSeed = [];
          //articleSeed.map (article => ({...artcle, user: getRandomUserId()}))
        //}
        // map over article seed data and insert a random user id - articleSeed.map 
        articleSeed
      )
    )
    .then((data) => {
      console.log(data.result.n + " records inserted!");
      return createCommentSeed();

      //access to all of the article ids here
    })
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

}

function createCommentSeed(){
  db.Comment
  .remove({})
  .then(() => db.Comment.collection.insertMany(commentSeed))
  .then((data) => {
    //db.articles.find push them into the comment data 
 
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

}

