const express = require('express');
const app = express();
const Movie = require('../models/movie');

app.get('/movies', (req, res) => {
    Movie.find({}, (err, moviesData) => {
        if(err) res.status(500).send(err)
        res.render('movies/index', {moviesData})
    })
})

app.get('/movies/new', (req, res) => {
    res.render('movies/new')
})

app.post('/movies', (req, res) => {
    const movieData = req.body;
    var newMovie = {
        title: movieData.title,
        genre: movieData.genre,
        plot: movieData.plot
    }

    Movie.create(newMovie, (err) => {
        if(err) res.render('movies/new')
        else res.redirect('/movies')
    })
})

app.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id, (err, movies) => {
        if(err) res.status(500).send(err)
        res.render('movies/show', {movies})
    })
})

app.post('/movies/:id/delete', (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (err) => {
        if(err) res.status(500).send(err)
        else res.redirect('/movies')
    })
})

app.get('/movies/:id/edit', (req, res) => {
    Movie.findById(req.params.id, (err, movies) => {
        if(err) res.status(500).send(err)
        else res.render('movies/edit', {movies})
    })
})

app.post('/movies/:id', (req, res) => {
    const movieData = req.body;
    var newMovie = {
        title: movieData.title,
        genre: movieData.genre,
        plot: movieData.plot
    }
    Movie.findByIdAndUpdate(req.params.id, newMovie, (err) => {
        if(err) res.status(500).send(err)
        else res.redirect('/movies')
    })
}) 

module.exports = app;