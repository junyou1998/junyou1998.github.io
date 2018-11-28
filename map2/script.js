var leftUp, rightDown
var left1, left2
var right1, right2
var arr
var center1, center2

var scaleLineControl = new ol.control.ScaleLine({
  units: "metric",
  target: document.getElementById("scale-line")
})

var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([120.6705642, 24.145209]),
    zoom: 17
  }),
  controls: ol.control.defaults().extend([scaleLineControl])
})

setInterval(function () {
  var view = map.getView()
  arr = view.calculateExtent(map.getSize())
  //���W(�n,�g)
  leftUp = ol.proj.transform([arr[0], arr[3]], "EPSG:3857", "EPSG:4326");
  // console.log(leftUp)
  left1 = leftUp[1]
  left2 = leftUp[0]
  // console.log(left1)
  //�k�U(�n,�g)
  rightDown = ol.proj.transform([arr[2], arr[1]], "EPSG:3857", "EPSG:4326");
  // console.log(rightDown)
  right1 = rightDown[1]
  right2 = rightDown[0]

  center1 = Math.round((left1 + right1) / 2 * 1000000) / 1000000
  // console.log(center1)
  center2 = Math.round((left2 + right2) / 2 * 1000000) / 1000000
  // console.log(center2)

  document.getElementById("centerValue").innerHTML = "(" + center1 + "," + center2 + ")"


  document.getElementById("position1").value = left1
  document.getElementById("position2").value = left2
  document.getElementById("position3").value = right1
  document.getElementById("position4").value = right2
  document.getElementById("scale").value = document.getElementById(
    "scale-line"
  ).innerText
}, 500)

document.getElementById("export-png").addEventListener("click", function () {
  map.once("rendercomplete", function (event) {
    var canvas = event.context.canvas
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(canvas.msToBlob(), "map.png")
    } else {
      canvas.toBlob(function (blob) {
        saveAs(blob, "map.png")
      })
    }
  })
  map.renderSync()
})
var index = 0
function slide(){
  if(index==0){
    document.getElementById("sidebar").style.backgroundColor = "#EDF0F5"
    document.getElementById("sidebar").style.width = "250px"
    index = index+1
  }
  else if(index==1){
    document.getElementById("sidebar").style.backgroundColor = "white"
    document.getElementById("sidebar").style.width = "40px"
    index = index-1
  }
}