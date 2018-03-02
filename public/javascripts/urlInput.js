$('.submit').click(function(){// when submit is clicked function is called
$.ajax('http://localhost:3000/',{
  method:'POST',
  crossDomain:true,
  headers: {
    'Access-Control-Origin-Allow': '*'
  },
  data:{
    url:$('#Url').val() // long url
  },
  success: function(data){
  $( '#urlHolder' ).empty();
  $('#urlHolder').append('http://localhost:3000/'+ data );
  //$('#urlHolder').append('<a target="_blank" href=" + "http://localhost:3000/"'+ data + >hello there<a/>);
  if ( $( ".sliderDown" ).is( ":hidden" ) ) {
    $( ".sliderDown" ).slideDown(250);
  } else {
    $( ".sliderDown" ).hide();
  }
  }
});


});
