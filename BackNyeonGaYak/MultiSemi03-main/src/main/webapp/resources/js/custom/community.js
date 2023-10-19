$(document).ready(function(){
    $('.tag').click(function(){
        $('.tag').not(this).removeClass('bg-light').addClass('bg-faded-info');
        $(this).removeClass('bg-faded-info').addClass('bg-light shadow');
    });
});