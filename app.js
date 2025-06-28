let apiKey = "e3c0da006e7a389060759ecd83ed5b03";

let locationInput = document.getElementById("location");
let btn = document.getElementById("btn");
let weatherInfo = document.querySelector(".weatherinfo");

btn.addEventListener("click", async () => {
  let query = locationInput.value.trim();

  if (query === "") {
    weatherInfo.innerHTML = `
      <div class="bg-red-500/90 text-white px-4 py-3 rounded-xl shadow text-center">
        ⚠️ Please enter a location.
      </div>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (response.ok) {
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      weatherInfo.innerHTML = `
        <div class="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl text-white space-y-4">

          <div class="text-center">
            <h2 class="text-2xl font-bold text-cyan-300">${data.name}, ${data.sys.country}</h2>
            <img src="${iconUrl}" alt="${data.weather[0].description}" class="w-24 mx-auto my-2 drop-shadow-xl" />
            <p class="text-4xl font-extrabold text-white">${data.main.temp}°C</p>
            <p class="capitalize text-md text-gray-300">${data.weather[0].description}</p>
          </div>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="bg-slate-800/50 p-3 rounded-xl shadow border border-slate-600">
              <p class="text-gray-400">Max Temp</p>
              <p class="font-semibold text-white">${data.main.temp_max}°C</p>
            </div>
            <div class="bg-slate-800/50 p-3 rounded-xl shadow border border-slate-600">
              <p class="text-gray-400">Min Temp</p>
              <p class="font-semibold text-white">${data.main.temp_min}°C</p>
            </div>
            <div class="bg-slate-800/50 p-3 rounded-xl shadow border border-slate-600">
              <p class="text-gray-400">Humidity</p>
              <p class="font-semibold text-white">${data.main.humidity}%</p>
            </div>
            <div class="bg-slate-800/50 p-3 rounded-xl shadow border border-slate-600">
              <p class="text-gray-400">Wind</p>
              <p class="font-semibold text-white">${data.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      `;
    } else {
      weatherInfo.innerHTML = `
        <div class="bg-red-500/90 text-white px-4 py-3 rounded-xl shadow text-center">
          ❌ City not found.
        </div>`;
    }
  } catch (err) {
    console.error(err);
    weatherInfo.innerHTML = `
      <div class="bg-red-500/90 text-white px-4 py-3 rounded-xl shadow text-center">
        ⚠️ Could not fetch weather data.
      </div>`;
  }
});
