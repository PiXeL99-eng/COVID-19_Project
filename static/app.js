mapboxgl.accessToken = 'pk.eyJ1IjoiZGlwYXlhbmRhczM2MCIsImEiOiJja3Fybm1xZXUxMWFjMzJuYnlqeDhkYjJtIn0.kqhXRux7wwHsaj9rOL3v_w';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 3.2,
  center: [80, 22],
  minZoom: 4,


});
var geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
map.addControl(geocoder);

fetch('https://api.covid19india.org/v2/state_district_wise.json')
  .then((response) => {
    return response.json()
  })
  .then((content) => {
    content.forEach(element => {
      element.districtData.forEach(districtData => {
        fetch('https://raw.githubusercontent.com/dipayandas2002/udemy/main/exp/longlat.json')
          .then((response) => {
            return response.json()
          })
          .then((pos) => {

            // console.log(pos[2].District);

            pos.forEach(posElement => {
              // var index =  pos.indexOf(districtData.district)
              if (districtData.district == posElement.district) {

                map.on('load', function () {

                  var da = districtData.active;

                  if (da > 11400) {
                    var colour = "#5d3fd3";
                  }
                  else if (da > 7800) {
                    var colour = "#00ff00";
                  }
                  else if (da > 3500) {
                    var colour = "#bdb742";
                  }
                  else if (da > 1000) {
                    var colour = "#2b9401";
                  }
                  else if (da > 400) {
                    var colour = "#c42929";
                  }
                  else if (da > 280) {
                    var colour = "#2ae860";
                  }
                  else if (da > 110) {
                    var colour = "#2ae8b8";
                  }
                  else if (da > 45) {
                    var colour = "#10a39c";
                  }
                  else {
                    var colour = "#ffc0cb";
                  }


                  marker = new mapboxgl.Marker({
                    color: colour,
                    draggable: false,
                    scale: 0.6

                  }).setLngLat([posElement.longitude, posElement.latitude])

                    .setPopup(new mapboxgl.Popup().setHTML(`<div>INFO</div><div><strong>State</strong>  :  ${element.state}</div>
                    <div><strong>District</strong>  :  ${districtData.district}</div>
                    <div><strong>Confirmed</strong>  :  ${districtData.confirmed}</div>
                    <div><strong>Recovered</strong>  :  ${districtData.recovered}</div>
                    <div><strong>Active</strong>  :  ${districtData.active}</div>
                    `))
                    .addTo(map);

                })

              }


            })

          })
          .catch((err) => {
            console.log(err);
          })
      })
    })
  })
  .catch((err) => {
    console.log(err);
  })
