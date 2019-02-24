const express = require('express');
const app = express();
const Celebrity = require('../models/celebrity');

app.get('/celebrities', (req, res) => {
    Celebrity.find({}, (err, celebritiesData) => {
        if(err) res.status(500).send(err)
        res.render('celebrities/index', {celebritiesData})
    })
})

app.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new')
})

app.post('/celebrities', (req, res) => {
    const celebData = req.body;
    var newCeleb = {
        name: celebData.name,
        occupation: celebData.occupation,
        catchPhrase: celebData.catchPhrase
    }
    
    Celebrity.create(newCeleb, (err) => {
        if(err) res.render('celebrities/new')
        else res.redirect('/celebrities')
    })
})

app.get('/celebrities/:id', (req, res) => {
    Celebrity.findById(req.params.id, (err, celebrities) => {
        if(err) res.status(500).send(err)
        res.render('celebrities/show', {celebrities})
    })
})

app.post('/celebrities/:id/delete', (req, res) => {
    Celebrity.findByIdAndRemove(req.params.id, (err) => {
        if(err) res.status(500).send(err)
        else res.redirect('/celebrities')
    })
})

app.get('/celebrities/:id/edit', (req, res) => {
    Celebrity.findById(req.params.id, (err, celebs) => {
        if(err) res.status(500).send(err)
        else res.render('celebrities/edit', {celebs})
    })
})

app.post('/celebrities/:id', (req, res) => {
    const celebData = req.body;
    var newCeleb = {
        name: celebData.name,
        occupation: celebData.occupation,
        catchPhrase: celebData.catchPhrase
    }
    Celebrity.findByIdAndUpdate(req.params.id, newCeleb, (err) => {
        if(err) res.status(500).send(err)
        else res.redirect('/celebrities')
    })
})


module.exports = app;