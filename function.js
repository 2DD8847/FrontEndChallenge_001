$(document).ready(function(){ 


	//all Surveys from the Mock-Server
	$.getJSON( "http://surveysmock.apiary.io/api/surveys", function( data ) {
 		$.each( data.surveys, function( key, val ) {
    		$( "#content" ).append("<section class='surveybutton' id='" + val.id + "'>" + "<h2>" + val.title + "</h2>" + val.tagline + "</section>");
  		});
	});
});







