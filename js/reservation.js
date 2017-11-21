function Reservation() {
	var self = this;


	this.init = function(){

		$("#valider-reservation").click(function(){
			self.decompte();
		});

		this.annulerReservation();
	};

	this.annulerReservation = function(){
		$("#button-annuler").click(function(){
        	

        	var velosStationL = sessionStorage.getItem("velosStationL",velosStationL);
        	$("#station-available-bikes").text(velosStationL);

			sessionStorage.removeItem("dateFinReservation");
			
			$("#reservation").css('display','none');
		})
	}

	this.decompte = function(){

		var dateFinReservation = new Date(sessionStorage.getItem("dateFinReservation"));
		var time = parseInt(dateFinReservation.getTime() / 1000);
		var aujourdhui = new Date();
		this.time_tmp = parseInt(aujourdhui.getTime() / 1000);
		this.restant = time - this.time_tmp;
		
		this.jour = parseInt((this.restant / (60 * 60 * 24)), 10);
		this.heure = parseInt((this.restant / (60 * 60) - this.jour * 24), 10);
		this.minute = parseInt((this.restant / 60 - this.jour * 24 * 60 - this.heure * 60), 10);
		this.seconde = parseInt((this.restant - this.jour * 24 * 60 * 60 - this.heure * 60 * 60 - this.minute * 60), 10);
		
		var nomStationL = sessionStorage.getItem("nomStationL",nomStationL);

		$("#stationS").text(nomStationL);
		$('#minutes').text(minute);
		$('#secondes').text(seconde);
		
		if (time_tmp < time){
			setTimeout(self.decompte, 1000);
		}
		else
		{
			sessionStorage.removeItem("dateFinReservation");
			sessionStorage.removeItem("nomStation");

			$('#minutes').text(0);
			$('#secondes').text(0);
			$("#reservation-timer").css('display','none');
			$("#expiration").css('display','block');
		}
	}
setTimeout(self.decompte, 1000);
}

$(function(){
    var maReservation = new Reservation();
    maReservation.init();
})


