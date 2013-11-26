$(document).ready(function(){ 


	//all Surveys from the Mock-Server
	$.getJSON( "http://surveysmock.apiary.io/api/surveys", function( all ) {
 		$.each( all.surveys, function( key, val ) {
    		$( "#content" ).append("<section class='surveybutton' id='" + val.id + "'>" + "<h2>" + val.title + "</h2>" + val.tagline + "</section>");
  		});
	});

});

	//click on a button and get the survey from button-id
$(".surveybutton").click(function(){
     var id = this.id;
     var i = 0;

     $('.surveybutton').fadeOut(5000);
     $('.surveybutton').remove();

     $.getJSON( "http://surveysmock.apiary.io/api/surveys/" + id, function( single ) {
     		$( "#content" ).append("<h2>" + single.survey.title + "</h2><br><p>" + single.survey.tagline + "</p>");
     		$( "#content" ).append("<form id='" + single.survey.id + "'>");
 			$.each( single.survey.questions, function( key, val ) {
 				$( "#content" ).append("<label id='" + val.id + "'>" + val.title + "</label><br>");

 				$.each( val.options, function() {
 					$( "#content" ).append("<input type='radio' name='" + val.options[i] + "' value='" + val.options[i] + "'>" + val.options[i] + "</br>");
 					i++;	
 				});

				i = 0;
	 		 });

 	  		$( "#content" ).append("</form>");
		});

 });





