const mongoose = require("mongoose");
// const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie')

mongoose.connect('mongodb://localhost/hollywood', {useNewUrlParser: true}, (err)=> {
    if(err) console.log(err)
    else console.log('connected to db')
});


let movieSeed = [
    // {
    //     name: 'Brad Pitt',
    //     occupation: 'American actor',
    //     catchPhrase: 'Do you like dags?'
    // },
    // {
    //     name: 'Samuel L. Jackson',
    //     occupation: 'American actor',
    //     catchPhrase: 'I dare you, I double dare you!'
    // },
    // {
    //     name: 'Sacha Baron Cohen',
    //     occupation: 'British comedian and actor',
    //     catchPhrase: 'In Kazakhstan the favorite hobbies are disco dancing, archery, rape, and table tennis.'
    // }

    {
        title: 'Snatch',
        genre: 'Comedy, Crime',
        plot: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.'
    },
    {
        title: 'Pulp Fiction',
        genre: 'Crime, Drama',
        plot: `The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`
    },
    {
        title: 'Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan',
        genre: 'Comedy',
        plot: 'Kazakh TV talking head Borat is dispatched to the United States to report on the greatest country in the world. With a documentary crew in tow, Borat becomes more interested in locating and marrying Pamela Anderson.'
    }
]

Movie.remove({}, ()=> {
    for(let i = 0; i < movieSeed.length; i++) {
        Movie.create(movieSeed[i]);
}});
