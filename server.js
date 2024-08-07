// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const DataSchema = new mongoose.Schema({
  field1: { type: String, required: true },
  field2: { type: Number, required: true },
  field3: { type: Boolean, default: false }
});

const Data = mongoose.model('Data', DataSchema);

mongoose.connect(
  'mongodb://127.0.0.1:27017/mydatabase', 
  {useNewUrlParser: true, useUnifiedTopology: true,}
)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

  app.post('/api/data', async (req, res) => {
    const { field1, field2, field3 } = req.body;
  
    // Validate the incoming data
    if (!field1 || !field2) {
      return res.status(400).send('Field1 and Field2 are required');
    }
  
    const newData = new Data({
      field1,
      field2,
      field3
    });
  
    try {
      await newData.save();
      res.status(201).send('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(400).send('Failed to save data');
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
