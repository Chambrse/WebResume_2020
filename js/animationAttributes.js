
let test = $('.animateThese').find('*');

$('.animateThese').find('*').each((i, el) => {
    // console.log($(el).text().trim().length);
    // if ()
    addAttributes(el);

});



function addAttributes(element) {
    $(element).attr('data-aos', "fade").attr('data-aos-easing',"ease-out-cubic").attr('data-aos-duration', 500);
}

