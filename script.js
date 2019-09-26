const aqiUrl = 'https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json'
const lists = document.querySelector('.lists')
const card = document.querySelector('.card')
const search = document.querySelector('#search')
const timestamp = document.querySelector('.timestamp')
let aqiData = []
let find = 0
let userLat 
let userLong
let nearby=1000000000000
let nearLat
let nearLong

fetch(aqiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (wholeData) {
        aqiData = wholeData
        console.log(aqiData)
        timestamp.innerHTML = `最後更新時間:${wholeData[0].PublishTime}`


        navigator.geolocation.getCurrentPosition(function(position) {

            userLat = position.coords.latitude
            userLong = position.coords.longitude


            console.log(userLat,userLong)

            aqiData.forEach(data=>{

                // console.log('緯度差的平方:',Math.pow(userLat - data.Latitude,2))
                // console.log('經度差的平方:',Math.pow(userLong - data.Longitude,2))
                
                let distance = Math.sqrt(Math.pow(userLat - data.Latitude,2)+Math.pow(userLong - data.Longitude,2))
                // console.log('兩地的距離',distance)

                if(distance<nearby){
                    nearby = distance
                    nearLat= data.Latitude
                    nearLong = data.Longitude
                    
                }
                else{
                    
                }
                

            })

            console.log(nearby)
            console.log('緯度:',nearLat)
            console.log('經度:', nearLong)


            aqiData.forEach(data=>{
                if(nearLat == data.Latitude && nearLong == data.Longitude){
                    console.log('i find you',data.Latitude,data.Longitude)

                    card.innerHTML = `
                    <h1>${data.SiteName}</h1>
                    <div class="status good">${data.Status}</div>
                    <div class="aqi">AQI指數 : ${data.AQI}</div>
                    `

                }
            })
        });



        aqiData.forEach(data => {
            // console.log(data.Latitude,data.Longitude)
            


            let aqicolor = ""
            switch (data.Status) {
                case '良好':
                    aqicolor = "good";
                    break;
                case '普通':
                    aqicolor = 'notbad';
                    break;
                case '對敏感族群不健康':
                    aqicolor = 'bad-1';
                    break;
                case '對所有族群不健康':
                    aqicolor = 'bad-2';
                    break;
                case '非常不健康':
                    aqicolor = 'bad-3';
                    break;
                default:
                    aqicolor = "danger";
            }
            lists.innerHTML +=
                `
            <li class="list ${aqicolor}">
                <span class="location">${data.SiteName}</span>
                <span class="status">${data.Status}</span>
                <span class="aqi">AQI : ${data.AQI}</span>
            </li>
            `
            // console.log(data.AQI, data.Pollutant)
        })
    });



let area
let tempData


search.onkeyup = function () {

    area = search.value
    console.log(area)

    aqiData.forEach(data => {

        if (data.SiteName == area) {
            tempData = data
            console.log(tempData)
            find += 1

        }
        else {
            find += 0
        }
    })

    if (find != 0) {
        let aqicolor = ""
        switch (tempData.Status) {
            case '良好':
                aqicolor = "good";
                break;
            case '普通':
                aqicolor = 'notbad';
                break;
            case '對敏感族群不健康':
                aqicolor = 'bad-1';
                break;
            case '對所有族群不健康':
                aqicolor = 'bad-2';
                break;
            case '非常不健康':
                aqicolor = 'bad-3';
                break;
            default:
                aqicolor = "danger";
        }

        lists.innerHTML =
            `
            <li class="list ${aqicolor}">
                <span class="location">${tempData.SiteName}</span>
                <span class="status">${tempData.Status}</span>
                <span class="aqi">AQI : ${tempData.AQI}</span>
            </li>
            `
    }
    else{
        lists.innerHTML = ""
        aqiData.forEach(data => {
            let aqicolor = "ss"
            switch (data.Status) {
                case '良好':
                    aqicolor = "good";
                    break;
                case '普通':
                    aqicolor = 'notbad';
                    break;
                case '對敏感族群不健康':
                    aqicolor = 'bad-1';
                    break;
                case '對所有族群不健康':
                    aqicolor = 'bad-2';
                    break;
                case '非常不健康':
                    aqicolor = 'bad-3';
                    break;
                default:
                    aqicolor = "danger";
            }
            
            lists.innerHTML +=
                `
            <li class="list ${aqicolor}">
                <span class="location">${data.SiteName}</span>
                <span class="status">${data.Status}</span>
                <span class="aqi">AQI : ${data.AQI}</span>
            </li>
            `
        })
    }
    find = 0
}



$('#search').focus(
    function () {
        $(this).parent('div').addClass('searchFocus');
    }).blur(
        function () {
            $(this).parent('div').removeClass('searchFocus');
        });




