const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');



const app = express();
app.use(bodyParser.json());


app.get('/', (req,res) => {
  res.status(200).send({message:"under construction"})
})

app.get('/posts', async (req,res) => {
  const {page,limit} = req.query;
  if(page && limit){
    const result = [];
    const index = (page * limit) - limit !== 0 ?  (page * limit) - limit : 1;
    const limitIndex = parseInt(index) + parseInt(limit)
    for(let i=index; i<limitIndex; i++){
      const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${i}`)
      result.push(data)
    }
    return res.status(200).send(result)
  }
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
  res.status(200).send(data)
})

app.get('/posts/:id', async (req,res) => {
  const {id} = req.params;
  const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  res.status(200).send(data)
})

app.get('/post', async (req,res) => {
  const {title} = req.query
  if(title){
    const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    const result = data.find(post => post.title === title)
    if(result){
      return res.status(200).send(result)  
    }
  }
  res.status(200).send({message:"post title unvalid"})
})




app.get('*', (req,res) => {
  res.sendStatus(404);
})


app.listen(5000, () => console.log(`running on 50000`))
