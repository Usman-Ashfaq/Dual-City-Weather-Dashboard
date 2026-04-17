let API_KEY = "d8386f28aa88c28942ddce7f82336e2c";

$("#searchBtn").click(function () {

    let city1 = $("#city1").val();
    let city2 = $("#city2").val();

    fetchCity(city1, "#card1");
    fetchCity(city2, "#card2");
});

function fetchCity(city, cardId) {

    $.ajax({
        url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
        method: "GET"
    })

    .done(function (data) {

        if (data.length === 0) {
            showError("City not found");
            return;
        }

        let lat = data[0].lat;
        let lon = data[0].lon;

        getWeather(lat, lon, cardId);
        getAir(lat, lon, cardId);
    })

    .fail(function () {
        showError("API Error");
    });
}

function getWeather(lat, lon, cardId) {

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    })

    .done(function (data) {

        let temp = data.main.temp;
        let humidity = data.main.humidity;

        $(cardId).find(".temp").text(temp + " °C");
        $(cardId).find(".humidity").text(humidity + " %");
    });
}

function getAir(lat, lon, cardId) {

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    })

    .done(function (data) {

        let pm25 = data.list[0].components.pm2_5;
        let aqi = data.list[0].main.aqi;

        $(cardId).find(".pm25").text(pm25);

        // Background color
        if (aqi == 1) $(cardId).css("background", "lightgreen");
        else if (aqi == 2) $(cardId).css("background", "yellow");
        else $(cardId).css("background", "red");
    });
}

function showError(msg) {
    $(".alert").show().text(msg);
}