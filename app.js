const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(request,response){
    const city=request.body.Radhe;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=63182cb2717a1bfeb027ee4d797f96c0&units=metric";
    https.get(url,function(res){
        res.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp1=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            response.write("<h1>The Temperature of  "+city+" is "+temp1+" degree celsius .</h1>");
            response.write("<h2>Weather Description is as following : "+weatherDescription+".</h2>");
            response.write("<img src="+imgurl+">");
            response.send();
        })
    } )
    
})

app.listen(3000,function(){
    console.log("server is running on port : 3000");
})