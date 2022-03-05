const express = require("express");
const axios = require("axios");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(cors());

//GET ALL COMICS
app.get("/comics", async (req, res) => {
    try {
        const skip = Number(req.query.skip) || 1;
        const limit = Number(req.query.limit) || 100;
        const title = req.query.title || "";
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&skip=${(skip-1)*100}&limit=${limit}&title=${title}`)
        res.status(200).json(response.data)
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
});

//GET COMICS RELATEDO CHARACTER 
app.get("/comics/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.API_KEY}`)
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
});

//GET ALL CHARACTERS
app.get("/characters", async (req, res) => {
    try {
        const skip = Number(req.query.skip) || 1;
        const limit = Number(req.query.limit) || 100;
        const name = req.query.name || "";
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&skip=${(skip-1)*100}&limit=${limit}&name=${name}`)
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
});

//GET CHARACTER DETAILS
app.get("/character/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.API_KEY}`)
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
});



app.get("*", (req, res) => {
    res.json("Page not found");
});

app.listen(process.env.PORT, () => {
    console.log(`Server has started on server ${process.env.PORT} ...`)
});