// Mapa
function initMap() {
  let latitudeCoord, longitudeCoord, marker;
  // Coordenadas lab
  let coordinate = {lat: -12.1191427, 
    lng: -77.0349046};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: coordinate
  });
  
  // Autocompletado
  let inputOrigin = document.getElementById('origin');
  let inputDestination = document.getElementById('destination');
  
  new google.maps.places.Autocomplete(inputOrigin);
  new google.maps.places.Autocomplete(inputDestination);
  
  // Encuéntrame


  // Trazar ruta
  let myUbication = function(positionF) {
    latitudeCoord = positionF.coords.latitude;
    longitudeCoord = positionF.coords.longitude;
    
    // Variable que encierra la dirección del marcador
    let iconBase = {
      url: 'http://www.mobipalma.mobi/wp-content/uploads/2016/03/iconos-14.png',
      scaledSize: new google.maps.Size(30, 32)
    };

    // Muestra la posicion segun las coordenadas mencionadas
    marker = new google.maps.Marker({
      position: {lat: latitudeCoord,
        lng: longitudeCoord},
      map: map,
      icon: iconBase,
      draggable: true,
      animation: google.maps.Animation.BOUNCE
    });
    map.setZoom(18);
    map.setCenter({lat: latitudeCoord,
      lng: longitudeCoord});
  };
  let error = function(error) {
    window.alert('Tu navegador no soporta la API de geolocalizacion');
  };

  function findMe(event) {
    event.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(myUbication, error);
    }
  }

  // Trazando ruta
  let startPoint = document.getElementById('origin');
  let endPoint = document.getElementById('destination');
  new google.maps.places.Autocomplete(startPoint);
  new google.maps.places.Autocomplete(endPoint);

  let direccionService = new google.maps.DirectionsService;
  let direccionDisplay = new google.maps.DirectionsRenderer;

  let calcRoute = function(direccionService, direccionDisplay) {
    let request = {
      origin: startPoint.value,
      destination: endPoint.value,
      travelMode: 'DRIVING'
    };
    direccionService.route(request, function(result, status) {
      if (status === 'OK') {
        direccionDisplay.setDirections(result);
      }
    });
    direccionDisplay.setMap(map);
    marker.setMap(null);
  };

  // window.addEventListener('load', findRoute);
  window.addEventListener('load', findMe);

  document.getElementById('btn-route').addEventListener('click', function(event) {
    event.preventDefault();
    calcRoute(direccionService, direccionDisplay);
  });

  document.getElementById('btn-find').addEventListener('click', function(event) {
    event.preventDefault();
    findMe(event);
  });
}
