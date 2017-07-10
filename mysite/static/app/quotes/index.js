function getNewQuote() {
	$.ajax({
		url: "../../../newtpb/",
		type: "GET",
		dataType: "json",
	})
	.done(function(json) {
		$("<h3>").text(json.quote).appendTo("body");
	})
	.fail(function(xhr,status,errorThrown) {
		console.log(errorThrown + ": ");
		console.log(xhr);
	});
}

$(function() {
	$("body").css("backgroundColor", "#444477");
	$("#newquote").on("click", function() {
		getNewQuote();
	});
});

console.log("Hello, Newman");
