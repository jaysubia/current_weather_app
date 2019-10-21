 // Create an event listener
 document.getElementById("buttonW").addEventListener("click", loadWeather);
 //  document.getElementById("buttonW2").addEventListener("click", loadWeathers);

 ///////////////THIS IS PART OF THE loadWeathers///////////////////////////////////////////////////////////////////////////////////////////

 function getCity(locations) {

   for (let i = 0; i < locations.length; i++) {

   }
   return locations;
 }


 function loadWeathers() {
   let xhr2 = new XMLHttpRequest();
   const cities = [
     "5368361",
     "4173495",
     "4335045",
     "4887398",
     "5128638",
     "4684888"
   ];
   const base_path2 =

     "http://api.openweathermap.org/data/2.5/group?id=" + getCity(cities) + "&APPID=b0cc16bac7c725efe8359a22b9f51cef";



   xhr2.open("GET", base_path2, true);

   xhr2.onload = function () {

     if (this.status == 200) {
       let cityWeathers2;
       try {
         cityWeathers2 = JSON.parse(this.responseText);
       } catch (e) {
         // JSON not valid, show error message
       }
       console.log(cityWeathers2)


       //      //add weather info
       for (let i = 0; i < cities.length; i++) {

         let result2 = '';



         result2 +=
           `<div class="col-md-4">
            <div class="card mb-4 box-shadow">
                    <div class="card-body">
                    <h5 class="card-title">${cityWeathers2.list[i].name}</h5>
                    <p class="card-text">Here are some weather details for your City</p>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Weather: ${cityWeathers2.list[i].weather[0].main} <img class="card-img-top weather-icon" src="${getIconURL(cityWeathers2.list[i].weather[0].icon)}" alt="Card image cap"></li>
                    <li class="list-group-item">Temperature: ${convertKtoF(cityWeathers2.list[i].main.temp) }&deg; </li>
                    <li class="list-group-item">Wind Speed: ${convertMPStoMPH(cityWeathers2.list[i].wind.speed) } </li>
                    <li class="list-group-item">Geo Location: ${cityWeathers2.list[i].coord.lat} , ${cityWeathers2.list[i].coord.lon}</li>
                  </ul>
             </div>`

         //  console.log(result2)


         document.querySelector("#weathers").innerHTML += result2;
       }
     }

   }

   xhr2.send();

 }


 function loadWeather() {
   // console.log(city);
   let xhr = new XMLHttpRequest();

   const city = document.getElementById("city").value;
   const base_path =
     "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=b0cc16bac7c725efe8359a22b9f51cef";





   xhr.open("GET", base_path, true);



   xhr.onload = function () {
     //   const city = document.getElementById("city").value;

     if (this.status == 200) {
       let cityWeathers;
       try {
         cityWeathers = JSON.parse(this.responseText);
       } catch (e) {
         // JSON not valid, show error message
       }



       const result =

         `<div class="card" style="width: 18rem;">
              
              <div class="card-body">
                <h5 class="card-title">${cityWeathers.name}</h5>
                <p class="card-text">Here are some weather details for your City</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Weather: ${cityWeathers.weather[0].main} <img class="card-img-top weather-icon" src="${getIconURL(cityWeathers.weather[0].icon)}" alt="Card image cap"></li>
                <li class="list-group-item">Temperature: ${convertKtoF(cityWeathers.main.temp) }&deg; </li>
                <li class="list-group-item">Wind Speed: ${convertMPStoMPH(cityWeathers.wind.speed) } </li>
                <li class="list-group-item">Geo Location: ${cityWeathers.coord.lat} , ${cityWeathers.coord.lon}</li>
              </ul>
         </div>`;


       document.getElementById("weather").innerHTML = result;
     }

   }



   xhr.send();

 }


 // Convert from Kelvins to Fahrenheit
 function convertKtoF(kelvin) {
   return Math.round((kelvin - 273.15) * 1.8);
 }

 // Convert from Meters Per Second to Miles Per Hour
 function convertMPStoMPH(mps) {
   return (Math.round(10 * mps * 2.2369362920544) / 10) + " mph";
 }
 // Weather icon
 function getIconURL(icon) {
   return "https://openweathermap.org/img/w/" + icon + ".png";
 }