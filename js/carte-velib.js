function initMap() {

	var self = this ;

	this.marqueur = null;

	this.mapStation = null;

	this.iconStation = {
		ouverte: 'icon/station-ouverte.png',
		ouverteVeloIndispo: 'icon/station-ouverte-velo-indispo.png',
		fermee: 'icon/station-fermee.png'
	};

	this.optionsCarte = {
		zoom: 16,
		center: {
			lat: 48.866667,
			lng: 2.333333
		}
	};

	this.stationChoisit = null;

	this.infoStation = null;

	this.optionsMarqueur = {
		map: null,
		position: null,
		icon : null,
	};

	this.init = function(){
		self.googleMap();
		self.marqueursEtStation();
	};

	this.googleMap = function(){
		
		self.mapStation = new google.maps.Map(document.getElementById('station-google'),self.optionsCarte);
		
		if(sessionStorage.getItem("dateFinReservation") != null){
	    	$("#reservation").css('display','block');
		};
	};

	this.marqueursEtStation = function(){
		$.get("https://api.jcdecaux.com/vls/v1/stations?contract=Paris&apiKey=1cb9cc22a398aa9b959be1b6794b2a2d85d748a2", function(data){
			$.each(data, function(key, item) {

				var nomStation = item.name ;

				var adressStation = item.adress;

				var statusStation = item.status;

				var capaciteStation = item.bike_stands;

				var placesStation = item.available_bike_stands;

				var velosStation = item.available_bikes;

				var latitude = item.position.lat;

				var longitude = item.position.lng;


				if((statusStation === "OPEN") && (velosStation > 0)){
					self.optionsMarqueur.icon = self.iconStation.ouverte;
				}else if((statusStation === "OPEN") && (velosStation === 0)){
					self.optionsMarqueur.icon = self.iconStation.ouverteVeloIndispo;
				}else{
					self.optionsMarqueur.icon = self.iconStation.fermee;
				}

				self.optionsMarqueur.map = self.mapStation;
				self.optionsMarqueur.position = new google.maps.LatLng ( latitude, longitude);
				self.marqueur = new google.maps.Marker (self.optionsMarqueur )

				self.marqueur.addListener('click',function(){

					$("#panneau").css('display','block');

					if((statusStation === "OPEN") && (velosStation > 0)){
						$('#reserver').css('display' , 'block');
					}
					else{	
						$('#reserver').css('display' , 'none');
					}

					$('#button-reserver').css('display','block');
					$("#cadre-signature").css('display','none');

					sessionStorage.setItem("nomStation",nomStation);
					sessionStorage.setItem("velosStation",velosStation);

					var nomStationL = sessionStorage.getItem("nomStationL",nomStationL);
					var velosStationL = sessionStorage.getItem("velosStationL",velosStationL);

					if((sessionStorage.getItem("dateFinReservation") != null)&&(nomStation === nomStationL )){
	    				$("#station-available-bikes").text(velosStationL-1);
					}
					else{
						$("#station-available-bikes").text(velosStation);
					}

					$("#station-name").text(item.name);
					$("#station-status").text(item.status);
					$("#station-address").text(item.address);
					$("#station-capacity").text(item.bike_stands);
					$("#station-available-bike-stands").text(item.available_bike_stands);
				});
			});
		});
	};
}

$(function(){
    var maMap = new initMap();
    maMap.init();
})