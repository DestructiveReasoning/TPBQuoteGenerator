$(function() {
	$("body").css("backgroundColor", "#444477");
});

//List of background colors to choose from.
var colors = [
	"#444477", "#774444", "#447744", "#444444", "#2e4053", "#235623", "#154360",
	"#7b241c", "#21618c", "#0e6251", "#6e2c00", "#cd5c5c", "#1a237e", "#263238"
];

var quoteData = {}; //Global variable to store quote data, to be retrieved from within QuoteMachine

function getNewQuote() {
	var newData = {};
	$.ajax ({
		url: "../../../newtpb/",
		type: "GET",
		dataType: "json",
	}).done(parseJSONQuote)
	.fail(function() {
		alert("Couldn't get quote");
	});
	return quoteData;
}

function parseJSONQuote(json) {
	console.log("Got quote");
	quoteData = {
		quote: json.quote,
		author: json.author,
	};
}

var QuoteField = React.createClass({
	render: function() {
		return (
			<div className="quotefield">
				<div className="quoteData">
					<div className="quote">
						<h2><i className="fa fa-quote-left"></i> {this.props.quote} <i className="fa fa-quote-right"></i></h2>
					</div>
					<div className="author">
						- {this.props.author}
					</div>
				</div>
			</div>
		);
	},
});

var ButtonField = React.createClass({
	render: function() {
		return (
			<button id="newquote" onClick={this.props.newQuote}>New Quote</button>
		);
	},
});

var QuoteMachine = React.createClass({
	getInitialState: function() {
		$.ajax ({
			url: "../../../newtpb/",
			type: "GET",
			dataType: "json",
		}).done(this.updateQuote)
		.fail(function() {
			alert("Couldn't get quote");
		});
		var interval = setInterval(this.newQuoteClicked,30000); //New quote every 30 seconds
		return {
			quote: quoteData.quote,
			author: quoteData.author,
			intervalID: interval, //Save the intervalID in state to allow it to be reset
		};
	},
	componentDidMount: function() {
		this.newQuoteClicked();
	},
	updateQuote: function(json) {
		this.setState({
			quote: json.quote,
			author: json.author,
		});
	},
	newQuoteClicked: function() {
		var r = Math.floor(Math.random() * colors.length);
		$(".quoteData").css("opacity","0");
		$("body").animate({
			backgroundColor: colors[r],
		}, 1500);
		$(".quoteData").animate({
			opacity: 1,
			color: colors[r]
		}, 1500);
		getNewQuote();
		clearInterval(this.state.intervalID); //Stop timer, set it again within setState
		this.setState({
			quote: quoteData.quote, 
			author: quoteData.author, 
			intervalID: setInterval(this.newQuoteClicked, 30000)
		});
	},
	render: function() {
		return (
			<div className="quotemachine">
				<QuoteField quote={this.state.quote} author={this.state.author} />
				<br />
				<ButtonField newQuote={this.newQuoteClicked} />
			</div>
		);
	},
});

var App = React.createClass({
	render: function() {
		return (
			<div className="funky">
				<QuoteMachine />
			</div>
		);
	},
});

//Set some initial attributes and animation properties with jQuery
$(function() {
	$(".glow").on("mouseover", function() {
		$(this).animate({opacity: 1},500);
	});
	$(".glow").on("mouseout", function() {
		$(this).animate({opacity: 0.5},250);
	});
	$("#reactbtn").on("click", function() {
		window.open("https://facebook.github.io/react/", "__blank");
	});
	$("#bubblesbtn").on("click", function() {
		window.open("https://en.wikiquote.org/wiki/Trailer_Park_Boys", "__blank");
	});
	$("#newquote").on("mouseover", function() {
		$("#newquote").animate({
			opacity: 0.8,
			fontSize: "24px",
		},250);
	});
	$("#newquote").on("mouseout", function() {
		$("#newquote").animate({
			opacity: 0.4,
			fontSize: "16px",
		},125);
	});
});

ReactDOM.render(<App />, document.getElementById("app"));
