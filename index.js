const card = document.querySelector(".card")
const search = document.querySelector(".search")
const weatherBox = document.querySelector(".weather")
const weatherDetails = document.querySelector(".detail")
const error404 = document.querySelector(".not-found")



search.addEventListener("click", () => {
    const APIKey = "502aca5b00ba2ea3459840c0723269c2"
    const city = document.querySelector('.search input').value

    if (city === "")
    return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(responese => responese.json())
        .then(json => {

            if (json.cod === "404"){
                card.style.height = '450px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector(".weather img")
            const temperature = document.querySelector(".weather .temp")
            const description = document.querySelector(".weather .description")
            const humidity = document.querySelector(".humidity")
            const wind = document.querySelector(".wind")
            const cityName = document.querySelector(".cityName")

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "images/clear.png"
                    break;

                case "Rain":
                    image.src = 'images/rain.png'
                    break;

                case "Snow":
                    image.src = 'images/snow.png'
                    break;

                case "Clouds":
                    image.src = 'images/cloud.png'
                    break;

                case "Haze":
                    image.src = 'images/mist.png'
                    break;
            
                default:
                    image.src = ""
            }

            cityName.innerHTML = `${json.name}`
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
            

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            card.style.height = '700px';

        })
})