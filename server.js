const express = require('express');
const app = express();

// middleware to parse json from post requests
app.use(express.json())

let entries = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

app.get('/api/persons', (req,res) => {
  res.json(entries);
})

app.get('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id);
  const entry = entries.find(e => e.id === id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).end();
  }
})

app.get('/info', (req,res) => {
  const numberOfEntries = entries.length;
  const currentDate = new Date();
  const date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
  const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  const dateTime = date + ' ' + time;

  res.send(`Phonebook has info for ${numberOfEntries} people. <br/><br/> Date of request: ${dateTime}`);
})

app.post('/api/persons', (req,res) => {
  const body = req.body;

  if (!body.name || !body.number){
    return res.status(404).json({error: 'body of request is missing either name or body key'});
  } else if (entries.some(n => n.name.toLowerCase() === body.name.toLowerCase())){
    return res.status(404).json({error: 'name must be unique'})
  } else{
    const newId = Math.ceil(Math.random() * 5000);
    entries = entries.concat({
      id: newId,
      name: body.name,
      number: body.number,
    })
    res.json(entries);
  }
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id);

  if (entries.some(o => o.id === id)){
    entries = entries.filter(n => n.id !== id);
    res.json(entries);
  } else {
    res.status(404).end();
  }
})

// app.get('/api/notes/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const note = notes.find(note => note.id === id);
//     
//     if (note) {
//         res.json(note);
//     } else {
//         res.statusMessage = "No note with corresponding ID found."
//         res.status(404).end();
//     }
// })
// 
// app.post('/api/notes', (req,res) => {
//   const body = req.body;
// 
//   if (!body.content) {
//     // return to stop execution of post request
//     return res.status(400).json({
//       error: 'content missing'
//     })
//   }
// 
//   const note = {
//     content: body.content,
//     important: Boolean(body.important) || false,
//     id: generateId(),
//   }
// 
//   notes = notes.concat(note);
// 
//   console.log(note)
// 
//   res.json(note);
// })
// 
// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id);
//     notes = notes.filter(note => note.id !== id);
//   
//     response.status(204).end();
//   })
// 
// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
// 
//   return maxId + 1;
// }

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
