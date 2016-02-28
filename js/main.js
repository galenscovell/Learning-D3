

var barchartPresent = false;
var scatterplotPresent = false;


$("#update-barchart").on("click", function(e) {
    if (barchartPresent) {
        d3.select("#barchart-svg").remove();
    }
    buildBarchart();
    barchartPresent = true;
});


$("#update-scatterplot").on("click", function(e) {
    if (scatterplotPresent) {
        d3.select("#scatter-svg").remove();
    }
    buildScatterplot();
    scatterplotPresent = true;
});


function pullDataFromCsv(fname) {
    loadedData = d3.csv(fname, function(data) {
        return data;
    });
}


function createRandomData() {
    var dataset = [];
    var numPoints = 50;
    var xRange = Math.random() * 1000;
    var yRange = Math.random() * 1000;

    for (var i = 0; i < numPoints; i++) {
        var x = Math.floor(Math.random() * xRange);
        var y = Math.floor(Math.random() * yRange);
        dataset.push([x, y]);
    }

    return dataset;
}


function buildBarchart() {
    var containerWidth = $("#barchart").width();
    var containerHeight = $("#barchart").height();
    var barPadding = 2;
    
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                   11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

    var svg = d3.select("div#barchart").append("svg")
                .attr("id", "barchart-svg")
                .attr("width", containerWidth)
                .attr("height", containerHeight);

    svg.selectAll("rect").data(dataset).enter().append("rect")
        .attr("x", function(dval, idx) { 
            return idx * (containerWidth / dataset.length);
        })
        .attr("y", function(dval) {
            return containerHeight - (dval * 10);
        })
        .attr("width", containerWidth / dataset.length - barPadding)
        .attr("height", function(dval) {
            return dval * 10;
        })
        .attr("fill", function(dval) {
            return "rgb(0, 120, " + (dval * 10) + ")";
        });

    svg.selectAll("text").data(dataset).enter().append("text")
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

    // Create dataset
    var dataset = createRandomData();

    // Construct scales
    var xScale = d3.scale.linear()
                            .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                            .range([padding, containerWidth - padding * 2]);
    var yScale = d3.scale.linear()
                            .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                            .range([containerHeight - padding, padding]);
    var rScale = d3.scale.linear()
                            .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                            .range([2, 10]);

    // Construct axes
    var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("bottom")
                        .ticks(5);
    var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left")
                        .ticks(5);

    var svg = d3.select("div#scatterplot").append("svg")
                .attr("id", "scatter-svg")
                .attr("width", containerWidth)
                .attr("height", containerHeight);

    // Create elements
    svg.selectAll("circle").data(dataset).enter().append("circle")
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

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, " + (containerHeight - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);
}


$(document).ready(function() {
    
});
