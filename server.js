/*const express=require('express');
const request=require('request');

const app=express();

app.get("/",(req,res)=>{

    let city=req.query.city;
    const request = require('request');
    request(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8e1c82d91f9d5ec8342863b399f970e8`,
         function (error, response, body) {

            let data=JSON.parse(body);
            console.log(city);
            //console.log(data.weather[0].description);
        if(response.statusCode===200){
            res.send(`This is the weather condition in you city '${city}' is '${data.weather[0].description}' `)
        }
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
});
    res.send("Hello this is our first projects");
})

app.listen(3000,()=>{
    console.log("server started at port 3000");
})


*/


/*const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = "8e1c82d91f9d5ec8342863b399f970e8";

app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const weatherResponse = await axios.get(weatherUrl);
    res.send(weatherResponse.data);
    console.log(city);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch weather data" });
  }
});

app.listen(3000, () => {
  console.log("Weather API is running on port 3000");
});


*/

/*const express = require('express');
const axios = require('axios');

const app = express();
const API_KEY = '8e1c82d91f9d5ec8342863b399f970e8';
const cities = ["Paris", "London", "New York", "Tokyo", "Berlin", "Rome", "Madrid", "Moscow",
 "Beijing", "Dubai", "Istanbul", "Shanghai", "Mumbai", "São Paulo", "Jakarta", "Seoul", 
 "Kuala Lumpur", "Mexico City", "Lima", "Bangkok", "Tehran", "Cairo", "Riyadh", "Hanoi", "Manila", 
 "Ho Chi Minh City", "Baghdad", "Toronto", "Sydney", "Buenos Aires"] // List of 30 cities

app.get('/weather', async (req, res) => {
  try {
    const weatherData = await Promise.all(
      cities.map(city =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        )
      )
    );

    res.send(
      weatherData.map(data => ({
        city: data.data.name,
        temperature: data.data.main.temp,
        description: data.data.weather[0].description
      }))
    );
  } 
   catch (error) {
     res.status(500).send({ error: 'Failed to retrieve weather data' });
   }
});

app.listen(3000, () => {
  console.log('Weather API listening on port 3000!');
});
*/

/*const express = require('express');
const axios = require('axios');

const app = express();
const API_KEY = '8e1c82d91f9d5ec8342863b399f970e8';
const cities = ["Paris", "London", "New York", "Tokyo", "Berlin", "Rome", "Madrid", "Moscow",
 "Beijing", "Dubai", "Istanbul", "Shanghai", "Mumbai", "São Paulo", "Jakarta", "Seoul", 
 "Kuala Lumpur", "Mexico City", "Lima", "Bangkok", "Tehran", "Cairo", "Riyadh", "Hanoi", "Manila", 
 "Ho Chi Minh City", "Baghdad", "Toronto", "Sydney", "Buenos Aires"] // List of 30 cities
const pageSize = 10;

app.get('/weather', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const weatherData = await Promise.all(
      cities.slice(startIndex, endIndex).map(city =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        )
      )
    );

    res.send({
      data: weatherData.map(data => ({
        city: data.data.name,
        temperature: data.data.main.temp,
        description: data.data.weather[0].description
      })),
      currentPage: page,
      totalPages: Math.ceil(cities.length / pageSize)
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to retrieve weather data' });
  }
});

app.listen(3000, () => {
  console.log('Weather API listening on port 3000!');
});


*/


const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.static('public')); // Serve static files from the "public" directory

const API_KEY = '8e1c82d91f9d5ec8342863b399f970e8';
const cities = ["Paris", "London", "New York", "Tokyo", "Berlin", "Rome", "Madrid", "Moscow",
 "Beijing", "Dubai", "Istanbul", "Shanghai", "Mumbai", "São Paulo", "Jakarta", "Seoul", 
 "Kuala Lumpur", "Mexico City", "Lima", "Bangkok", "Tehran", "Cairo", "Riyadh", "Hanoi", "Manila", 
 "Ho Chi Minh City", "Baghdad", "Toronto", "Sydney", "Buenos Aires"];

// Define the API endpoint to retrieve weather information
app.get('/weather', async (req, res) => {
 try {
    // Use the "Promise.all" method to retrieve weather data for all cities simultaneously
    const weatherData = await Promise.all(
      cities.map(city =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        )
      )
    );

    // Retrieve the query parameters for pagination
    const { page = 1 } = req.query;

    
    // Calculate the starting and ending index of the cities array based on the page number
    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;
    
    if(page < 1 || page > 3) {
      return res.send({error: 'page index out of bounds'})
    }

    // Return the weather information for the selected cities
    res.send(
      weatherData
        .slice(startIndex, endIndex)
        .map(data => ({
          city: data.data.name,
          temperature: data.data.main.temp,
          description: data.data.weather[0].description,
          latitude: data.data.coord.lat,
          longitude: data.data.coord.lon
        }))
    );
  } 
  catch (error) {
    // Return a 500 error if the weather information could not be retrieved
    res.status(500).send({ error: 'Failed to retrieve weather data' });
  }
});


// app.get('/weather', (req, res) => {
//   //res.sendFile(__dirname + '/public/index.html');
// });
// Start the API server
app.listen(3000, () => {
  console.log('Weather API listening on port 3000!');
});
