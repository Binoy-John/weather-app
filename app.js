const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

        res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log("post recieved");
    const query=req.body.cityName;
    const api_key="c79f8ebb8bccf4d6f2937330e79b4124";
    const unit = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api_key+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDesc = weatherData.weather[0].description;
            console.log(weatherDesc);
            var output = "<h1>The temperature in Chennai is "+temp+" degrees celcius</h1>";
            output = output + "<h1>The weather description is : "+weatherDesc+"</h1>";
            var icon = weatherData.weather[0].icon;
            icon_url = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>The temp is "+temp+" degrees celcius</h1>");
            res.write("<h1>the weather description is "+weatherDesc+"</h1>");
            res.write("<img src="+icon_url+">")

            
            res.send();
           
        

        });

        });
});





app.listen(3000,function(){
    console.log("Server has started!");
    
})

