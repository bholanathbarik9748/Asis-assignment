const express = require('express');
const axios = require('axios');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/search', async (req, res) => {
    const searchQuery = req.body.searchQuery;
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=75d9040c&s=${searchQuery}`);
        const movies = response.data.Search || [];
        res.render('index', { movies });
    } catch (error) {
        console.error(error);
        res.render('index', { movies: [] });
    }
});

app.post('/favorite', async (req, res) => {
    const { title, year, type, poster } = req.body;
    try {
        const query = 'INSERT INTO favorites (title, year, type, poster) VALUES (?, ?, ?, ?)';
        await db.query(query, [title, year, type, poster]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

app.get('/favorites', async (req, res) => {
    try {
        const favorites = await db.query('SELECT * FROM favorites');
        res.render('favorites', { favorites });
    } catch (error) {
        console.error(error);
        res.render('favorites', { favorites: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
