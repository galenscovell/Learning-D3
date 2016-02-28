

function fromCsv(fname) {
    loadedData = d3.csv(fname, function(data) {
        console.log(data);
    });
}

function buildBarChart() {
    var containerWidth = $("#barchart").width();
    var containerHeight = $("#barchart").height();
    var barPadding = 2;
    
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

    var svg = d3.select("div#barchart")
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
            return idx * (containerWidth / dataset.length) + barPadding * 9;
        })
        .attr("y", function(dval) {
            return containerHeight - (dval * 10) + 20;
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "Roboto")
        .attr("font-size", "14px")
        .attr("fill", "#f3f3f3")
}


function buildScatterplot() {
    var containerWidth = $("#scatterplot").width();
    var containerHeight = $("#scatterplot").height();
    var padding = 40;

    var xScale = d3.scale.linear()
                            .domain([0, 580])
                            .range([padding, containerWidth - padding])
    var yScale = d3.scale.linear()
                            .domain([0, 200])
                            .range([containerHeight - padding, padding])
    var rScale = d3.scale.linear()
                            .domain([0, 580])
                            .range([6, 60])

    var dataset = [
                  [1, 40],
                  [500, 20],
                  [10, 20],
                  [480, 90],
                  [250, 70],
                  [100, 200],
                  [330, 95],
                  [410, 120],
                  [475, 44],
                  [530, 55],
                  [550, 10],
                  [480, 20],
                  [580, 90],
                  [25, 67],
                  [85, 21],
                  [220, 88],
                  [30, 100],
                  [200, 60],
                  [80, 140]
              ];

    var svg = d3.select("div#scatterplot")
                .append("svg")
                .attr("width", containerWidth)
                .attr("height", containerHeight);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(dval) {
            return xScale(dval[0]);
        })
        .attr("cy", function(dval) {
            return yScale(dval[1]);
        })
        .attr("r", function(dval) {
            return rScale(dval[1]);
        })
        .attr("fill", function(dval) {
            return "rgba(0, 100, 100, " + (dval[1] / 100) + ")";
        });
}


$(document).ready(function() {
    buildBarChart();
    buildScatterplot();
});