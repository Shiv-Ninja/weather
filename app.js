const timeE=document.querySelector('.dnt .time');
const dateE=document.querySelector('.dnt .date ');
const weathericon=document.querySelector('.icon');
const dayNight= -1;

setInterval(() => {
    let now= new Date();
    console.log(now.date);
    console.log(now);
    const hours= now.getHours();
    const min=now.getMinutes();
    const hoursin24=hours>=13?hours%12 :hours
    const ampm=hours>=12?'PM':'AM'
    timeE.innerHTML=hoursin24+":"+min + ' '+'<span id="am-pm">'+ampm+'</span>';
    const month=now.getMonth();
    const year=now.getFullYear();
    const date=now.getDate();
    dateE.innerHTML =date+"/"+( month+1) + "/"+year ;
    if(ampm==="PM"){
      if(dayNight==0 || dayNight== -1){
        document.body.style.backgroundImage = "url('night.jpg')";
        dayNight=1;
      }
    }
    else if(ampm==="AM"){
      if(dayNight==1 || dayNight== -1 ){
        document.body.style.backgroundImage = "url('day.jpg')";
        dayNight=0;
      }
    }
   
}, 100);
// our place



async function getweather(){
  navigator.geolocation.getCurrentPosition((sucess)=>{
    let{latitude,longitude}=sucess.coords;
    const capi="https://api.openweathermap.org/data/2.5/weather?";
    const coordi="lat="+latitude+"&lon="+longitude;
    const key="&appid=4eac8d3b7f1c69d437fd3c863f169d5a";
const unit="&units=metric";
fetch(capi+coordi+key+unit).then(res=>res.json()).then(data=>{
    console.log(data)
    const temp=data.main.temp;
    document.querySelector('.own .temp').innerHTML= " "+ temp+" ℃";
    const wind=data.wind.speed;
    const city=data.name
    document.querySelector('.own .city').innerHTML=" "+city;
    document.querySelector('.own .wind').innerHTML= " "+wind+"  Km/h";
    const humidity=data.main.humidity;
    document.querySelector('.own .humidity').innerHTML=" "+ humidity + "   % ";
    })
  })
    }
getweather();


// search
const api="https://api.openweathermap.org/data/2.5/weather?q=";

const key="&appid=4eac8d3b7f1c69d437fd3c863f169d5a";
const unit="&units=metric";

async function checkWeather(city){
    const response =await fetch(api+city+key+unit);
    if(response.status == 400){
        document.querySelector(' .error').style.display='block';
        document.querySelector('.weather').style.visibility='hidden';
    }
    else if(response.status == 404){
        document.querySelector(' .error').style.display='block';
        document.querySelector('.weather').style.visibility='hidden';
    }
    else{
        var data=await response.json();
    
        if(data.weather[0].main=='Clouds'){
          weathericon.src='clouds.png';
        }
        else if(data.weather[0].main=='Clear'){
          weathericon.src='clear.png';
        }
        else if(data.weather[0].main=='Rain'){
          weathericon.src='rain.png';
        }
        else if(data.weather[0].main=='Drizzle'){
          weathericon.src='drizzle.png';
        }
        else if(data.weather[0].main=='Mist'){
          weathericon.src='mist.png';
        }
      
          const temp=data.main.temp;
          document.querySelector('.weather .temp').innerHTML=temp+" ℃";
          const wind=data.wind.speed;
          document.querySelector('.weather .city').innerHTML=city;
          document.querySelector('.weather .wind').innerHTML= " "+wind+"  Km/h";
          const humidity=data.main.humidity;
          document.querySelector('.weather .humidity').innerHTML= humidity + "   % ";
          document.querySelector('.weather').style.visibility='visible';
          document.querySelector('.error').style.display='none';
    }
  
}

const cityname=document.querySelector('.box2 #city');
const searchbtn=document.querySelector('.box2 .btn');

searchbtn.addEventListener("click",()=>{
  
    checkWeather(cityname.value);
})

