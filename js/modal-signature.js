function Fenetre(){
    var self = this ;

    this.init = function(){
        self.ouvrirReservation();
    }
    
    this.afficherFenetre = function(){
        $("#cadre-signature").css('display','block');
        $("#button-reserver").css('display','none');
    };

    this.ouvrirReservation = function(){
        $("#button-reserver").click(function(event){
            $("#panneau").css('display','none');
            self.afficherFenetre();
        })
    };
}

$(function(){
    var myFenetre = new Fenetre();
    myFenetre.init();
})