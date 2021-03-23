import { radial } from "shared/js/radial";
import * as d3 from "d3"

var selected = 'port-mac'
var animationSpeed = 200

Promise.all([
	d3.csv(`<%= path %>/port-mac.csv`)
	])
	.then((results) =>  {
		radial(results[0], 'rain', 'port-mac', 200)
		d3.select(".rain #loadingContainer").style("display","none")
	});

var to=null
var lastWidth = document.querySelector(".rain #graphicContainer").getBoundingClientRect()

// window.addEventListener('resize', function() {
// 		var thisWidth = document.querySelector(".river #graphicContainer").getBoundingClientRect()
// 		if (lastWidth != thisWidth) {
// 			window.clearTimeout(to);
// 			to = window.setTimeout(function() {
// 				    radial(results[0], 'river', selected, animationSpeed)
// 				}, 100)
// 		}
	
// 	})

var rainfall = [
{"id":"port-mac", "text":"Port Macquarie, Mid North Coast", "animationSpeed":200, "notes":"Combines data from BoM sites: 060168, 060139 and 60026.", "years":"1900 to 2020"},
{"id":"katoomba", "text":"Katoomba, Blue Mountains", "animationSpeed":200, "years":"1900 to 2020", "notes":""}
]

var selector = d3.select(".rain #rainSelector")

rainfall.forEach(function (d) {
		selector.append("option")
			.attr("value",d.id)
			.text(d.text)	
})


selector.on("change", function() {
		d3.select(".rain #loadingContainer").style("display","block")
		selected = d3.select(this).property('value')
		var currentRiver = rainfall.find(d => d.id == selected)
		animationSpeed = currentRiver['animationSpeed']
		console.log(currentRiver)
		// d3.select(".rain #yearsNote").text(currentRiver.years)
		d3.select(".rain #footnote").text(currentRiver.notes)
		// d3.select(".river #subTitle").text(currentRiver.subtitle)

		console.log(selected, animationSpeed)

		Promise.all([
		d3.csv(`<%= path %>/${selected}.csv`)
		])
		.then((results) =>  {
			d3.select(".rain #loadingContainer").style("display","none")
			radial(results[0], 'rain', selected, animationSpeed)
		});

});