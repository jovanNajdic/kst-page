
$(document).ready(function(){
    menu();
    popup();
    offsetTop();
    setInterval(timer,1000);
    $('.button').on('click', function(){
      formValidation();
    });
    scrolling();
    kstFilter();
});

function scrolling() {
    $('a[href^="#"]').on('click', function() {
        $('.container-body').stop().animate({
            scrollTop: $(this.hash).offset().top
        },1020);
    })
}

function offsetTop(){
    $('.container-body').scroll(function() {
        var gOffset = $('#gallery').offset().top;
        if (gOffset < 800){
            $('.to-top').fadeIn(400);
        }else{
            $('.to-top').fadeOut(350);
        }
    });
}

function kstFilter() {
    $('.filter-item').addClass('filtered');
    $('#filters span').on('click', function(e){
        e.preventDefault();
        $(this).parent().addClass('act').siblings().removeClass('act');
        var filteredItems = [];
        var dFilter = $(this).attr('data-filter');
        filteredItems.length = 0;
        $('.filter-item').addClass('filtered');
        if (dFilter == '*') {
            $('.filter-item').removeClass('filtered');
        }else {
            filteredItems.push($('.filter-item').filter('.'+dFilter));
            if(filteredItems[0].length > 0){
                for(var i=0; i < filteredItems[0].length; i++){
                    $(filteredItems[0][i]).removeClass('filtered');
                    $(filteredItems[0][i]).css('transition','all .3s ease');
                }
            }
        }
    })
}

function formValidation() {
    var $ime = $('#firstName').val();
    var $prezime = $('#lastName').val();
    var $fax = $('#fax').val();
    var $mail = $('#mail').val();
    var str = /[a-zA-Z]+/;
    var eMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var space =  /^$/;

    $signup = $('.sign-up-group');
    $signupAll = $('#sign-up');

    if(!str.test($ime)) {
        $('#firstName').val('');
    }

    if(!str.test($prezime)) {
        $('#lastName').val('');
    }

    if(!str.test($fax)) {
        $('#fax').val('');
    }

    if(!eMail.test($mail)) {
        $('#mail').val('');
    }

    if (str.test($ime) && str.test($prezime) && str.test($fax) && eMail.test($mail)) {
        alert("Uspesno ste se prijavili kao: " + $ime + " " + $prezime);
        $signupAll.fadeOut(650);
    }else {
        $('body').addClass('failed');
        setTimeout(function(){
            $('body').removeClass('failed');
        },1100);
    }

}

function menu () {
    var active = false;

    $('.nav-icon').on('click',function(){
        active = !(active);
        $('.side-nav').css('right','0');
        $(this).addClass('active');


        if (!active) {
            $('.side-nav').css('right','-200%');
            $(this).removeClass('active');
        }

        if ($(this).hasClass('active')){
            $('.menu-items a').on('click', function(e){
                e.preventDefault();
            	$('.nav-icon').removeClass('active');
                $('.side-nav').css('right','-200%');
                active = false;
            });
        }

    });
}

function timer() {
    var date = new Date().getTime();
    var finalDate = new Date('Apr 4, 2018 12:00:00').getTime();

    var tillNext = finalDate - date;

    if (tillNext <= 0) {
        $('.timer').hide();
    }else {
        var d = Math.floor(tillNext / (1000*60*60*24));
        var h = Math.floor( tillNext % ((1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        var m = Math.floor((tillNext % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((tillNext % (1000 * 60)) / 1000);

        $('.timer .days').html('<p> dana </p>' +d);
        $('.timer .hours').html('<p> sati </p>' +h);
        $('.timer .mins').html('<p> minuta </p>' +m);
        $('.timer .sec').html('<p> sekundi </p>' +s);
    }
}

function popup() {
    var $image = $('.row img');
    var $popup = $('.popup');
    $image.on('click', function(e){
        $popup.css('display','block');
        console.log(e.target.src);
         $popup.append('<img src='+e.target.src+' class="popup-content" >');
        setTimeout(function(){
            $popup.fadeOut(600, function(){
                $(this).children('img').remove();
            });
        },2500);
    });
}




//***MAP***//

var map = null;

var pos = [{
    x: 44.806758,
    y: 20.477269
}];


google.maps.event.addDomListener(window, 'load', initMap());
google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(new google.maps.LatLng(pos[0].x, pos[0].y ));
});

function initMap() {

    var infowindow = new google.maps.InfoWindow();
    var mapDOM = document.querySelector('.map');
    var mapOPT = {
        zoom: 16,

        center: new google.maps.LatLng(pos[0].x, pos[0].y),

        scrollwheel: false,
        disableDefaultUI: true,
        draggable: true,

        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#00000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#4fcc54"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#2ECC71"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#2ECC71"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };


    map = new google.maps.Map(mapDOM, mapOPT);

    var marker = './img/map-marker-icon.png';
    var PositionMarker = new google.maps.LatLng(pos[0].x, pos[0].y);
    var Marker = new google.maps.Marker({
        position: PositionMarker,
        map: map,
        icon: marker
    });

    google.maps.event.addListener(Marker, 'click', function() {
        infowindow.setContent('<p style="color: #333">Kraljice Marije 16</p><p style="color: #333; text-align: center;">Beograd,Palilula</p>');
        infowindow.open(map,Marker);
    });

}

//***MAP END***//



//***PARTICLES ***//

particlesJS.load('particles-js');

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#2ECC71"
    },
    "shape": {
      "type": "",
      "stroke": {
        "width": 0,
        "color": "#fff"
      },
      "polygon": {
        "nb_sides": 5
      },

    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#2ECC71",
      "opacity": 0.6,
      "width": 1.2
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

//***PARTICLES END***//
