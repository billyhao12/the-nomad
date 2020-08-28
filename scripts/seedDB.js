const mongoose = require("mongoose")
const db = require("../models")


//CHANGE MONGOOSE DB NAME
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nomad");

const articleSeed = [
    {
  title: "Trump Poised to Add His Voice to GOP Chorus of Biden Broadsides",
  category: "Politics",
  body:"President Donald Trump will ask Americans to return him to office in a speech Thursday closing the Republican convention, arguing that voters can’t trust Joe Biden or the Democratic Party to navigate the coronavirus pandemic or salve the nation’s racial divisions.",
  like: false,
  lat: 0,
  long: 0,
  date: new Date(Date.now())
}
]

db.Article
.remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });