/**
 * Created by kornkritsupayanant on 11/23/2016 AD.
 */
$(window).load(function() {
    var i =0;
    var images = ['./img/header.jpg','./img/portfolio/fullsize/1.jpg','./img/portfolio/fullsize/2.jpg'];
    var image = $('#first-section');
    //Initial Background image setup
    image.css('background-image', 'url(./img/header.jpg)');
    //Change image at regular intervals
    setInterval(function(){
            image.css('background-image', 'url(' + images [i++] +')');
            image.css('transition','background 1s linear');
            image.fadeIn(1000);

        if(i == images.length)
            i = 0;
    }, 4000);

});

$(document).ready(function(){
    // Call Product Element
    $.getJSON('products.json', function(datas) {
        var sliderObj = [];
        var productObj = [];
        var productItemTmp = "";
        if(datas.products.length > 0){
            for(var i = 0 ; i < datas.products.length; i++){
                var data = datas.products[i];
                var imagePath  = datas.products[i].img;
                var title = datas.products[i].title;
                var subtitle = datas.products[i].subtitle;
                //var detail = datas.products[i].detail;
                var indimension = datas.products[i].inDimension;
                var outdimension = datas.products[i].outDimension;
                var volumes = datas.products[i].volume;
                var numFloors = datas.products[i].numFloor;

                sliderObj.push("<div> <img class='product-item' src= \"" +imagePath+ "\"><span class='text-center product-title'><h3>"+ title +"</h3></span></div>");
                productItemTmp = "";
                productItemTmp = productItemTmp + "<div class='item  col-xs-4 col-lg-4' onclick = 'gg(" + JSON.stringify(data) + ");' ><div class='thumbnail'><img class='group list-group-image' src= '"+imagePath+"'>";
                productItemTmp = productItemTmp + "<div class='caption'><h4 class='group inner list-group-item-heading'> รุ่น "+title+"</h4><p class='group inner list-group-item-text'>ภายใน :  "+ indimension +" <br> ภายนอก : "+ outdimension +" <br> ความจุ "+ volumes +" ลิตร จำนวนชั้น "+ numFloors +" ชั้น " + "</p>";
                productItemTmp = productItemTmp + "<div class='row'><div class='col-xs-12 col-md-6'>";
                productItemTmp = productItemTmp + " </div></div></div></div></div>";
                productObj.push(productItemTmp);
            }


            $('#productsSlider').append(sliderObj);
            $('#products').append(productObj);



            // Slider of products control
            $('.center').slick({
                centerMode: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                centerPadding: '60px',
                slidesToShow: 3,
                swipe:true,
                speed: 500,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }]
            });


        }
    });





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

    // Product List and Grid
        $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
        $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});



});