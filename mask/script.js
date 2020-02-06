let nearby=0.05
var userLat, userLong
navigator.geolocation.getCurrentPosition(function (pos) {
    userLat = pos.coords.latitude
    userLong = pos.coords.longitude



    var map = L.map('map').setView([userLat, userLong], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'`
    }).addTo(map);

    fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR2c7Nn8AHmd6cOhhFvs7bRxNA62G2Dc3F9p7iuPdkZ3-LA3Rea9m-oz2VI').then(res => res.json())
        .then(data => {
            console.log(data)
            data.features.forEach(element => {
                var lat = element.geometry.coordinates[1]
                var long = element.geometry.coordinates[0]
                var name = element.properties.name
                var address = element.properties.address
                var adult = element.properties.mask_adult
                var child = element.properties.mask_child
                let distance = Math.sqrt(Math.pow(userLat - lat,2)+Math.pow(userLong - long,2))

                console.log(element.properties.mask_adult)
                // console.log(distance)
                if(distance<nearby){
                    L.marker([lat, long]).addTo(map)
                    .bindPopup(`<h4>${name}</h3><br>成人口罩:${adult}<br>小孩口罩${child}<br>地址:<a target="_blank" href="https://www.google.com.tw/maps/place/${name}">${address}<a>`)

                }
                else{
                    
                }
                
            });

    
        })
})

$('#fresh').click(function () {
    

})
