var carrousel = {

	nbSlide : 0,
	nbCurrent : 1,
	elemCurrent : null,
	elem: null,
	timer : null,

	init : function(elem){
		this.nbSlide = elem.find(".slide").length;

		//Création de la pagination
		elem.find("#prev").click(function(){carrousel.prev($(this).text());})
		elem.find("#next").click(function(){carrousel.next($(this).text());})

		//Init carrousel//
		this.elem = elem;
		this.elem.find(".slide").hide();
		this.elem.find(".slide:first").show();
		this.elemCurrent = elem.find(".slide:first");

		this.play();
		this.evenement();
	},

	gotoSlide : function(num){
		if(num==this.nbCurrent){return false; }
		this.elemCurrent.fadeOut();
		this.elem.find("#slide"+num).fadeIn();
		this.nbCurrent = num;
		this.elemCurrent = this.elem.find("#slide"+num);
	},

	next : function(){
		var num = this.nbCurrent + 1;
		if(num >this.nbSlide){
			num = 1;
		}
		carrousel.gotoSlide(num);
	},

	prev : function(){
		var num = this.nbCurrent - 1;
		if(num < 1){
			num = this.nbSlide;
		}
		carrousel.gotoSlide(num);
	},

	stop : function(){
		window.clearInterval(carrousel.timer);
	},

	play : function(){
		window.clearInterval(carrousel.timer);
		carrousel.timer = window.setInterval("carrousel.next()",3000);
	},

	evenement : function(){
		$("#carrousel").mouseover(carrousel.stop);
		$("#carrousel").mouseout(carrousel.play);

		$(document).keydown(function(e){
			switch (e.which){
				case 37: // fleche gauche
					carrousel.prev();
					break;
				case 39: // fleche droite
					carrousel.next();
					break;
			}
		});

	},
}

$(function(){
	carrousel.init($("#carrousel"));
});