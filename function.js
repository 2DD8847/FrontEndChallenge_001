$(document).ready(function(){ 


	//all Surveys from the Mock-Server
	$.getJSON( "http://surveysmock.apiary.io/api/surveys", function( all ) {
 		$.each( all.surveys, function( key, val ) {
    		$( "#content" ).append("<div class='surveybutton' id='" + val.id + "'>" + "<h2>" + val.title + "</h2>" + val.tagline + "</div>");
  		});
	});




});

//click on a button and get the survey from button-id
$(".surveybutton").live('click', function() {
     var id = $(this).attr("id");
     var i = 0;

     $('.surveybutton').remove();

     $.getJSON( "http://surveysmock.apiary.io/api/surveys/" + id , function( single ) {
     		$( "#content" ).append("<h2>" + single.survey.title + "</h2><p>" + single.survey.tagline + "</p>");
     		$( "#content" ).append("<form class='surveyquestions' id='" + single.survey.id + "'>");
 			$.each( single.survey.questions, function( key, val ) {
 				$( "#content" ).append("<label class='questions' id='" + val.id + "'>" + val.title + "</label><br>");

 				$.each( val.options, function() {
 					$( "#content" ).append("<input type='radio' name='" + val.id + "' value='" + val.options[i] + "'>" + val.options[i] + "</br>");
 					i++;	
 				});

				i = 0;
	 		 });

 	 $( "#content" ).append("</form>");
     $( "#content" ).append("<input type='button' value='Back' onClick='window.location.reload()'>");
     $( "#content" ).append("<button type='button'>Submit</button>");
	});

 });
