import { radial } from "shared/js/radial";
import * as d3 from "d3"

Promise.all([
	d3.csv(`<%= path %>/penrith.csv`)
	])
	.then((results) =>  {
		radial(results[0], 'river', 'penrith', 200)
		// var to=null
		// var lastWidth = document.querySelector("#graphicContainer").getBoundingClientRect()
		// window.addEventListener('resize', function() {
		// 	var thisWidth = document.querySelector("#graphicContainer").getBoundingClientRect()
		// 	if (lastWidth != thisWidth) {
		// 		window.clearTimeout(to);
		// 		to = window.setTimeout(function() {
		// 			    init(results[0])
		// 			}, 100)
		// 	}
		
		// })

	});