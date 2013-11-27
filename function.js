$(document).ready(function(){ 


	//all Surveys from the Mock-Server
	$.getJSON( "http://surveysmock.apiary.io/api/surveys", function( all ) {
 		$.each( all.surveys, function( key, val ) {
    		$( "#content" ).append("<div class='surveybutton' id='" + val.id + "'>" + "<h2>" + val.title + "</h2>" + val.tagline + "</div>");
  		});
	});

//click on a button and get the survey from button-id
	$(".surveybutton").live('click', function() {
    	 var id = $(this).attr("id");
    	 var i = 0;

    	 $('.surveybutton').fadeOut(100).remove();

    	 $.getJSON( "http://surveysmock.apiary.io/api/surveys/" + id , function( single ) {
    	 		$( "#content" ).append("<h2>" + single.survey.title + "</h2><p>" + single.survey.tagline + "</p>");
     			$( "#content" ).append("<form class='surveyquestions' id='" + single.survey.id + "'>");
 				$.each( single.survey.questions, function( key, val ) {
 					$( "form" ).append("<br /><label class='questions' id='" + val.id + "'>" + val.title + "</label>");

 					$.each( val.options, function() {
 						$( "label#" + val.id ).append("<br /><input type='radio' name='" + val.id + "' value='" + val.options[i] + "'>" + val.options[i] + "");
 						i++;	
 					});

					i = 0;
	 			 });

   		 $( "form" ).append("<br /><input type='submit' value='Submit'>");
 	 	$( "#content" ).append("</form>");

		});

 	});


	//submit the form and send it with post to server
	$("form").live('submit',function(e) {
		e.preventDefault();
		var completion = [];
		var surveyID = $(this).attr("id");

		$("input[type='radio']:checked").each(function() {
        	var questionID = $(this).attr("name");
        	var radioValue = $(this).attr("value");
        	item = {};
        	item["questionID"] = questionID;
        	item["radioValue"] = radioValue;

        	/*Serialize the values for the json string*/
        	jsonString = JSON.stringify(item);

        	/*put the latest clicked item in the array*/
        	completion.push(jsonString);  

    	});

		/*here is the POST function, after success, remove the html tags*/
		$.ajax ({
  			type:"POST",
  			contentType: "application/json",
  			url:"http://surveysmock.apiary.io/api/surveys/" + surveyID + "/completions",
  			dataType: "json",
  			async: false,
  			data: completion,
  			success: function(){ 
  				$('h2').fadeOut(100).remove();
  				$('p').fadeOut(100).remove();
  				$( "form" ).fadeOut(100).remove();
  				$( "#content" ).append("<p>Thanks for answering the survey!</p>");
 				$( "#content" ).append("<br /><input type='button' value='Back' onClick='window.location.reload()'>");

  			},

  			error: function(){ alert("error")}
		});



	});
});
