let nearby = 0.05
var userLat, userLong
let apiUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR2c7Nn8AHmd6cOhhFvs7bRxNA62G2Dc3F9p7iuPdkZ3-LA3Rea9m-oz2VI'




var map = L.map('map',{attributionControl: false}).setView([24.1618329, 120.6446744], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

var pinIcon = L.icon({
    iconUrl: 'pin.png',
    iconSize: [30, 35],
    iconAnchor: [14, 35],
    popupAnchor: [0, -35]
})
getData(24.1618329,120.6446744)

function getData(userLat,userLong){
    fetch(apiUrl).then(res => res.json())
        .then(data => {
            console.log(data)
            data.features.forEach(data => {
                var geo = data.geometry
                var proper = data.properties
                var lat = geo.coordinates[1]
                var long = geo.coordinates[0]
                var name = proper.name
                var address = proper.address
                var adult = proper.mask_adult
                var child = proper.mask_child
                var update = proper.updated

                let distance = Math.sqrt(Math.pow(userLat - lat, 2) + Math.pow(userLong - long, 2))

                if (update == '') {
                    update = "未更新"
                }
                if (distance < nearby) {
                    L.marker([lat, long], {
                            icon: pinIcon
                        }).addTo(map)
                        .bindPopup(`<h4>${name}</h3><br>成人口罩:${adult}<br>小孩口罩${child}<br>地址:<a target="_blank" href="https://www.google.com.tw/maps/place/${name}">${address}</a><br>更新時間: ${update}`)

                } else {

                }

            });


        })
}

L.marker([23, 120.2], {
    icon: pinIcon
}).addTo(map)
.bindPopup(`123`)

navigator.geolocation.getCurrentPosition(function (pos) {
    userLat = pos.coords.latitude
    userLong = pos.coords.longitude

    map.panTo(new L.LatLng(userLat, userLong));
    getData(userLat,userLong)
    
    $('#reset').click(function () {
        navigator.geolocation.getCurrentPosition(function (pos) {
            userLat = pos.coords.latitude
            userLong = pos.coords.longitude
            map.panTo(new L.LatLng(userLat,userLong));
        })
    })
})