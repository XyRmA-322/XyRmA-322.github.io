$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick slick-prev"></button>',
        nextArrow: '<button type="button" class="slick slick-next"></button>',
        responsive:[
            {
                breakpoint: 991.97,
                settings: {
                    draggable: true,
                }
            },{
                breakpoint: 576.97,
                settings: {
                    arrows: false,  
                    draggable: true,
                }
            }
                
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(clas){
        $(clas).each(function(i){
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    
            })       
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__link-list');

    /* --------------modal-------- */

    $('[data-modal="consultation"]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('[data-model="buy"]').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    $('[data-model="confirm"]').on('click', function(){
        $('#thx').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thx, #order').fadeOut('slow');
    });
    
    function validateForms(form){
        $(form).validate({
            rules: {
                username: "required",
                tel: "required",
                email: {
                  required: true,
                  email: true
                }
              },
            messages:{
                username: "Пожалуйста, введите ваше имя",
                tel: "Пожалуйста, введите свой номер телефона",
                email:{
                    required:"Введите свою почту",
                    email:"Неправильно введен адрес почты",
                }
    
            }
            
        });
    };

    validateForms('#consultation-form')
    validateForms('#order-form')
    validateForms('#consultation form')


  });  



