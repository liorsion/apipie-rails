$(document).ready(function() {
  if (typeof prettyPrint == 'function') {
    $('pre.ruby').addClass('prettyprint lang-rb');
    prettyPrint();
  }
});

function execute() {
	var valid = true;
	var collected_data = {};

  $.each( $("input[data-role]='parameter'"), function( key, value ) {
  	if (value.required && !$(value).val()) {
  		valid = false;
  		$(value).parents('td').addClass('warning');
  	}
  	collected_data[value.id] = $(value).val();
  	
  });

  if (!valid) {
  	alert('Not valid');
  	return;
  }
  url = $("#method-data").data("url");
  method = $("#method-data").data("method");
  $.ajax({ url: url,
  	       type: method,
  	       data: collected_data,
  	     }).done(function(data, textStatus, jqXHR) {
  	     		$('#executer_response_status').html(textStatus);
  	     		if (jqXHR.getResponseHeader("Content-Type").indexOf("json") != 0) {
  	     			$('#executer_response').html(JSON.stringify(data));
  	     		} else {
  	     			$('#executer_response').html(data);
  	     		}
  	     }).fail(function(jqXHR, textStatus) {
  	     		alert("Error: " + textStatus);
  	     })
}