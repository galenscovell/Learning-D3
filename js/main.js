


function pullDataFromCsv(fname) {
    loadedData = d3.csv(fname, function(data) {
        return data;
    });
}


function createRandomData() {
    var dataset = [];
    var numPoints = 50;
    var xRange = Math.random() * 200;
    var yRange = Math.random() * 200;

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
    
    // Construct dataset
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                   11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

    // Construct scales
    var xScale = d3.scale.ordinal()
                            .domain(d3.range(dataset.length))
                            .rangeRoundBands([0, containerWidth], 0.05);
    var yScale = d3.scale.linear()
                            .domain([0, d3.max(dataset)])
                            .range([0, containerHeight]);

    // Construct elements
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


    // Update barchart on button click
    d3.select("#update-barchart").on("click", function() {
        var numValues = dataset.length;
        dataset = [];

        for (var i = 0; i < numValues; i++) {
            var newNum = Math.floor(Math.random() * 25);
            dataset.push(newNum);
        }

        yScale.domain([0, d3.max(dataset)]);

        // Update all rects
        svg.selectAll("rect")
            .data(dataset)
            .transition()
            .delay(function(dval, idx) {
                return idx / dataset.length * 600;
            })
            .duration(300)
            .attr("y", function(dval) {
                return containerHeight - yScale(dval);
            })
            .attr("height", function(dval) {
                return yScale(dval);
            })
            .attr("fill", function(dval) {
                return "rgb(0, 120, " + (dval * 10) + ")";
            });

        svg.selectAll("text")
            .data(dataset)
            .transition()
            .delay(function(dval, idx) {
                return idx / dataset.length * 600;
            })
            .duration(300)
            .text(function(dval) {
                return dval;
            })
            .attr("x", function(dval, idx) {
                return idx * (containerWidth / dataset.length) + barPadding * 9;
            })
            .attr("y", function(dval) {
                return containerHeight - yScale(dval) + 20;
            });
    });
}


function buildScatterplot() {
    var containerWidth = $("#scatterplot").width();
    var containerHeight = $("#scatterplot").height();
    var padding = 30;

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

    // Create elements
    var svg = d3.select("div#scatterplot").append("svg")
                .attr("id", "scatter-svg")
                .attr("width", containerWidth)
                .attr("height", containerHeight);

    svg.selectAll("circle").data(dataset).enter().append("circle")
        .attr("cx", function(dval) {
            return xScale(dval[0]);
        })
        .attr("cy", function(dval) {
            return yScale(dval[1]);
        })
        .attr("r", 5)
        .attr("fill", "rgb(26, 188, 156)");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + (containerHeight - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);


    // Update scatterplot on button click
    d3.select("#update-scatterplot").on("click", function() {
        var numValues = dataset.length;
        var maxRange = Math.random() * 200;
        dataset = [];
        for (var i = 0; i < numValues; i++) {
            var x = Math.floor(Math.random() * maxRange);
            var y = Math.floor(Math.random() * maxRange);
            dataset.push([x, y]);
        }

        // Update scale domains
        xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
        yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

        // Update all circles
        svg.selectAll("circle")
            .data(dataset)
            .transition()
            .duration(300)
            .each("start", function() {
                d3.select(this)
                    .attr("fill", "rgb(231, 76, 60)")
                    .attr("r", 2);
            })
            .attr("cx", function(dval) {
                return xScale(dval[0]);
            })
            .attr("cy", function(dval) {
                return yScale(dval[1]);
            })
            .transition()
            .duration(400)
            .attr("r", 5)
            .attr("fill", "rgb(26, 188, 156)");

        //Update X axis
        svg.select(".x.axis")
            .transition()
            .duration(400)
            .call(xAxis);
        
        //Update Y axis
        svg.select(".y.axis")
            .transition()
            .duration(400)
            .call(yAxis);
    });
}


$(document).ready(function() {
    buildBarchart();
    buildScatterplot();
});
