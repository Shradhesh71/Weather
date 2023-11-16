const express = require('express');
const app = express();
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use('/veiws',express.static('veiws'));// for serving static files


app.get('/', (req, res) => {
    res.render("index");
});
// 
app.post('/', (req, res) => {
    const city= req.body.cityname;
    console.log(city);
    const unit = "metric";
    const apikey = "6733ba9e979c6aa66b62ef38a65ac1c6";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+apikey+"&units="+unit;

    https.get(url, (response) => {
        console.log(response.statusCode); 
 
        response.on("data", (data) => {
            console.log(JSON.parse(data));
            // const cityy = city.toUpperCase();
            const weather = JSON.parse(data);
            
            // const temp = weather.main.temp;
            // const weatherdiscription = weather.weather[0].description;
            // const icon = weather.weather[0].icon;
            // const imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            // console.log('Temperature: ',temp,'in celcius');
            // res.write("<h1>"+cityy+" City Weather Discription: "+ weatherdiscription +"</h1>");
            // res.write("<h2>Temperature: "+temp+" in degree celcius</h2>");
            // res.write("<img src="+imageurl+">"); // both img code can work
            // res.send();
            res.render("index",{weather:weather});
        });
    });
});

    // const city = "surat";
    // const unit = "metric";
    // const apikey = "6733ba9e979c6aa66b62ef38a65ac1c6";
    // const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+apikey+"&units="+unit;

    // // https is used for get request from API(server)
    // https.get(url, (response) => {
    //     // console.log(response);
    //     console.log(response.statusCode); // return status code

    //     response.on('data', (data) => {
    //         //console.log(data);  // hexa decimal representation data

    //         const weather = JSON.parse(data);
    //         console.log(weather);
    //         // console.log(JSON.stringify(weather));  // convert json to string
    //         const temp = weather.main.temp;
    //         const weatherdiscription = weather.weather[0].description;
    //         const icon = weather.weather[0].icon;
    //         const imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    //         // console.log('Temperature: ',temp,'in celcius');
    //         res.write("<h1>Current City Weather Discription: "+ weatherdiscription +"</h1>");
    //         res.write("<h2>Temperature: "+temp+" in degree celcius</h2>");
    //         res.write("<img src='"+imageurl+"'/>");
    //         res.write("<img src="+imageurl+">"); // both img code can work
    //         res.send();
    //     });
    // });

app.listen(3000,() => {
    console.log("server listening on 3000");
})