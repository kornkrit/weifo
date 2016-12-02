/**
 * Created by kornkritsupayanant on 11/23/2016 AD.
 */
$(document).ready(function(){

    /**
     * This object controls the nav bar. Implement the add and remove
     * action over the elements of the nav bar that we want to change.
     *
     * @type {{flagAdd: boolean, elements: string[], add: Function, remove: Function}}
     */
    var myNavBar = {

        flagAdd: true,

        elements: [],

        init: function (elements) {
            this.elements = elements;
        },

        add : function() {
            if(this.flagAdd) {
                this.flagAdd = false;
                for(var i=0; i < this.elements.length; i++) {
                    document.getElementById(this.elements[i]).className += " navbar-fixed-top";
                }

            }
        },

        remove: function() {
            for(var i=0; i < this.elements.length; i++) {
                document.getElementById(this.elements[i]).className =
                    document.getElementById(this.elements[i]).className.replace( /(?:^|\s)navbar-fixed-top(?!\S)/g , '' );
            }
            this.flagAdd = true;
        }

    };

    /**
     * Init the object. Pass the object the array of elements
     * that we want to change when the scroll goes down
     */
    myNavBar.init(  [
        "header-main",
        "header-container",
        "top-bar"
    ]);


    var fistBackgroud = {

        flagAdd: true,

        elements: [],

        init: function (elements) {
            this.elements = elements;
        },

        add : function() {
            if(this.flagAdd) {
                this.flagAdd = false;
                for(var i=0; i < this.elements.length; i++) {
                    document.getElementById(this.elements[i]).className += " first-section";
                }

            }
        },

        remove: function() {
            for(var i=0; i < this.elements.length; i++) {
                document.getElementById(this.elements[i]).className =
                    document.getElementById(this.elements[i]).className.replace( /(?:^|\s)first-section(?!\S)/g , '' );
            }
            this.flagAdd = true;
        }

    };

    /**
     * Init the object. Pass the object the array of elements
     * that we want to change when the scroll goes down
     */
    fistBackgroud.init(  [
        "first"
    ]);


    /**
     * Function that manage the direction
     * of the scroll
     */
    function offSetManager(){
        var p = $('#header-container');
        var position = p.offset();
        var yOffset = position.top;
        var currYOffSet = window.pageYOffset;

        if(yOffset < currYOffSet) {
            myNavBar.add();
            fistBackgroud.add();
        }
        else if(currYOffSet == 0){
            myNavBar.remove();
            fistBackgroud.remove();
        }

    }

    /**
     * bind to the document scroll detection
     */
    window.onscroll = function(e) {
        offSetManager();
    }

    /**
     * We have to do a first detectation of offset because the page
     * could be load with scroll down set.
     */
    offSetManager();

    //$('#first-section').css("background-image", "url(./img/header.jpg)");

   setInterval(function(){
        $('#first-section').animate(4000, function(){
            $(this).css("background-image", "url(./img/header.jpg)");
        });
       $('#first-section').animate(4000, function(){
           $(this).css("background-image", "url(./img/portfolio/fullsize/1.jpg)");
       });
       $('#first-section').animate(4000, function(){
           $(this).css("background-image", "url(./img/portfolio/fullsize/2.jpg)");
       });

    } ,4000);


    // Slider of product

    $('#myCarousel').carousel({
        interval: 10000
    })
    $('.fdi-Carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
        }
        else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });

});