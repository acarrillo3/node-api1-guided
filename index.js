// import express from 'express'; // ES2015 Modules
const express = require("express"); //CommondJS Modules //<<<<<<npm i express

const Hubs = require("./data/hubs-model.js"); //<< new line

const server = express();

// Teaches express how to read JSON from the body
server.use(express.json()); // needed for POST AND PUT/PATCH

server.get("/", (req, res) => {
  res.json({ hello: "Web 26" });
});

// view a list of hubs
server.get("/api/hubs", (req, res) => {
  // got and get the hubs from the database
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "oops" });
    });
});

//add a hub
server.post("/api/hubs", (req, res) => {
  //axios.post(url, data, options); the data will be in body of the request
  const hubInfo = req.body;
  // validate the data, and if the data is valid save it

//   console.log('body', req.body)
  Hubs.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "oops" });
    });
});

//delete 
server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;
    
    Hubs.remove(req.params.id).then(removed => {
        res.status(200).json(removed);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "oops" });
      });
} )
const port = 5000;
server.listen(port, () => console.log("\n** API on port ${port} \n"));
