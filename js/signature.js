function myCanvas(){

    var self = this ;
    this.clickX = new Array();
    this.clickY = new Array();
    this.clickDrag = new Array();
    this.paint = null;
    this.canvas = $("#canvasInAPerfectWorld");
    this.context = this.canvas[0].getContext("2d");

    this.init = function(){
      
      self.canvas.mousedown(function(e){
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;
    
      self.paint = true;
      self.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      self.redraw();
      });

      $('#canvasInAPerfectWorld').mousemove(function(e){
        if(self.paint === true){
          self.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
          self.redraw();
        }
      });

      $('#canvasInAPerfectWorld').mouseup(function(e){
      self.paint = false;
      });

      $('#canvasInAPerfectWorld').mouseleave(function(e){
      self.paint = false;
      });

      self.canvas.bind("touchstart", function(e) {

      		e.preventDefault();
                self.paint = true;
                self.addClick(e.changedTouches[0].pageX - this.offsetLeft, e.changedTouches[0].pageY - this.offsetTop);
                self.redraw();
            
        });

        self.canvas.bind("touchmove", function(e) {
            e.preventDefault();
            
                if( self.paint === true ) {
                    self.addClick(e.changedTouches[0].pageX - this.offsetLeft, e.changedTouches[0].pageY - this.offsetTop, true);
                    self.redraw();
                }
            
        });

        self.canvas.bind("touchend", function(e){
            e.preventDefault();
            self.paint = false;
        });

        self.canvas.bind("touchcancel", function(e){
            e.preventDefault();
            self.paint = false;
        });

      self.validerSignature();
      this.annulerSignature();
    }

    self.addClick = function (x, y, dragging){
      self.clickX.push(x);
      self.clickY.push(y);
      self.clickDrag.push(dragging);
    };

    this.effacerSignature = function(){
      self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height); // Efface le canvas
      this.clickX = [];
      this.clickY = [];
      this.clickDrag = [];
    };

    this.annulerSignature = function(){
      $("#annuler-reservation").click(function(event){
        $("#cadre-signature").css('display', 'none');
        $("#button-reserver").css('display','block');
        $("#panneau").css('display','block');

        self.effacerSignature();
      });
    }

    this.validerSignature = function(){
      $("#valider-reservation").click(function(){

        if(self.clickX.length === 0){
          alert("Veuillez signer avant de valider votre réservation");
          $("#cadre-signature").css('display','block');
        }
        else{

          var dateFinReservation = new Date();
          dateFinReservation.setMinutes(dateFinReservation.getMinutes() + 20);
          sessionStorage.setItem("dateFinReservation",dateFinReservation);
          
          var nomStation = sessionStorage.getItem("nomStation",nomStation);
          var nomStationL = nomStation ;
          sessionStorage.setItem("nomStationL",nomStationL);

          var velosStation = sessionStorage.getItem("velosStation",velosStation);
          var velosStationL = velosStation; 
          sessionStorage.setItem("velosStationL",velosStationL);
          $("#station-available-bikes").text(velosStationL-1);

          self.effacerSignature();
          $("#button-reserver").css('display','block');
          $("#cadre-signature").css('display','none');
          $("#reservation").css('display','block');
          $("#reservation-timer").css('display','block');
          $("#expiration").css('display','none');
          $("#panneau").css('display','block');
        }
      });
    };

    self.redraw = function (){
    self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height); // Clears the canvas
  
    self.context.strokeStyle = "black";
    self.context.lineJoin = "round";
    self.context.lineWidth = 5;
      
    for(var i=0; i < self.clickX.length; i++) {    
      self.context.beginPath();
        if(self.clickDrag[i] && i){
          self.context.moveTo(self.clickX[i-1], self.clickY[i-1]);
        }
        else{
        self.context.moveTo(self.clickX[i]-1, self.clickY[i]);
        }
        self.context.lineTo(self.clickX[i], self.clickY[i]);
        self.context.closePath();
        self.context.stroke();
      }
    }
}

$(function(){
    var canvas = new myCanvas();
    canvas.init();
})