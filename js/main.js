

function fromCsv(fname) {
    loadedData = d3.csv(fname, function(data) {
        console.log(data);
    });
}


$(document).ready(function() {
    var containerWidth = $("#main-container").width();
    var containerHeight = $("#main-container").height();
    var barPadding = 4;
    
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

    var svg = d3.select("div#main-container")
                .append("svg")
                .attr("width", containerWidth)
                .attr("height", containerHeight);

    svg.selectAll("rect")  // Get all rects in svg -- none exist yet! returns empty selection
        .data(dataset)     // Check the dataset for number of entries
        .enter()           // Hand datapoints to enter()
        .append("rect")    // Create and insert rect for each datapoint
        .attr("x", function(dval, idx) { 
            return idx * (containerWidth / dataset.length);  // Set each bar start x
        })
        .attr("y", function(dval) {
            return containerHeight - (dval * 10);            // Set each bar start y (starting from top)
        })
        .attr("width", containerWidth / dataset.length - barPadding)  // Set each bar width
        .attr("height", function(dval) {
            return dval * 10;                                         // Set each bar height
        })
        .attr("fill", function(dval) {
            return "rgb(0, 120, " + (dval * 10) + ")";  // Set bar colors depending on datapoint value
        });

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(dval) {
            return dval;
        })
        .attr("x", function(dval, idx) {
            return idx * (containerWidth / dataset.length) + barPadding * 4;
        })
        .attr("y", function(dval) {
            return containerHeight - (dval * 10) + 20;
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "Roboto")
        .attr("font-size", "14px")
        .attr("fill", "#f3f3f3")
});