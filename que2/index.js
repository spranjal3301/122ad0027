const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config()

const app = express();
const PORT = 8080;
const WINDOW_SIZE = 10;

const windowList = [];
const windowSet = new Set(); 

const baseURL = process.env.API_BASE_URL;
const ID_MAP = {
    p: `${baseURL}/primes`,
    f: `${baseURL}/fibo`,
    e: `${baseURL}/even`,
    r: `${baseURL}/rand`,
};

app.use(cors());



const accessToken = process.env.ACCESS_TOKEN;

const axiosClient = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});



const fetchWithTimeout = async (url, timeout = 500) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout')), timeout);

    axiosClient.get(url)
      .then(res => res.json())
      .then(data => {
        clearTimeout(timer);
        resolve(data);
      })
      .catch(err => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

app.get('/numbers/:id', async (req, res) => {
  const id = req.params.id;
  const url = ID_MAP[id];

  if (!url) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const windowPrevState = [...windowList];
  let apiNumbers = [];

  try {
    const data = await fetchWithTimeout(url);
    apiNumbers = data.numbers || [];
  } catch (err) {
    return res.json({
      windowPrevState,
      windowCurrState: windowList,
      numbers: [],
      avg: calcAverage(windowList)
    });
  }


  const newNumbers = [];
  for (const num of apiNumbers) {
    if (!windowSet.has(num)) {
      newNumbers.push(num);
      windowSet.add(num);
      windowList.push(num);
      if (windowList.length > WINDOW_SIZE) {
        const removed = windowList.shift();
        windowSet.delete(removed);
      }
    }
  }
  //- Responds with the previous state, current state, the fetched numbers,
  return res.json({
    windowPrevState,
    windowCurrState: windowList,
    numbers: apiNumbers,
    avg: calcAverage(windowList)
  });
});

function calcAverage(arr) {
  if (arr.length === 0) return 0.0;
  const sum = arr.reduce((a, b) => a + b, 0);
  return parseFloat((sum / arr.length).toFixed(2));
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
