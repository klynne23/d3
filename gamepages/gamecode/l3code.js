var disneyData = [
    // { title: "Snow White and the Seven Dwarfs", deaths: 1, year: 1937},
    // { title: "Fantasia", deaths: 4, year: 1940 },
    // { title: "Pinocchio", deaths: 83, year: 1940 },
    // { title: "Bambi", deaths: 81, year: 1942 },
    // { title: "Make Mine Music", deaths: 6, year: 1946 },
    // { title: "Melody Time", deaths: 108, year: 1948 },
    // { title: "Alice in Wonderland", deaths: 16, year: 1951 },
    // { title: "Peter Pan", deaths: 2, year: 1953 },
    // { title: "Lady and the Tramp", deaths: 1, year: 1955 },
    // { title: "Sleeping Beauty", deaths: 2, year: 1959 },
    // { title: "The Rescuers", deaths: 1, year: 1977 },
    // { title: "The Black Cauldron", deaths: 2, year: 1985 },
    // { title: "The Great Mouse Detective", deaths: 4, year: 1986 },
    // { title: "Oliver and Company", deaths: 3, year: 1988 },
    // { title: "The Little Mermaid", deaths: 27, year: 1989 },
    // { title: "Beauty and the Beast", deaths: 1, year: 1991 },
    // { title: "The Lion King", deaths: 1660, year: 1994 },
    // { title: "Pocahontas", deaths: 1, year: 1995 },
    // { title: "Hunchback of Notre Dame", deaths: 47, year: 1996 },
    { title: "Hercules", deaths: 20000, year: 1997 },
    // { title: "Mulan", deaths: 1468, year: 1998 },
    // { title: "Tarzan", deaths: 5, year: 1999 },
    // { title: "Fantasia 2000", deaths: 1, year: 2000 },
    { title: "Dinosaur", deaths: 307143, year: 2000 },
    // { title: "Emperor's New Groove", deaths: 5, year: 2000 },
    { title: "Atlantis", deaths: 35185, year: 2001 },
    // { title: "Treasure Planet", deaths: 1017, year: 2002 },
    // { title: "Brother Bear", deaths: 83, year: 2003 },
    // { title: "Home on the Range", deaths: 304, year: 2004 },
    // { title: "Chicken Little", deaths: 17, year: 2005 },
    // { title: "The Princess and the Frog", deaths: 1, year: 2009 },
    // { title: "Tangled", deaths: 1, year: 2010 },
    // { title: "Wreck-it Ralph", deaths: 1, year: 2012 },
    // { title: "Frozen", deaths: 33, year: 2013 },
    // { title: "Big Hero 6", deaths: 2, year: 2014 },
    // { title: "Moana", deaths: 261, year: 2016 }
  ];


// 2. Use the margin convention practice 
var margin = { top: 50, right: 50, bottom: 50, left: 50 }
    , width = window.innerWidth - margin.left - margin.right // Use the window's width 
    , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = 35;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    // .domain([0, n]) // input // this sets the range of numbers of the x axis
    .domain([1996, 2008])
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([19000, 310000]) // input // this sets the range of the numbers on the y axis
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    // .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
    .x(function (d) { return xScale(d.x); }) // uses the x property to set the x values of the line
    .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
// var dataset = d3.range(n).map(function (d) {
//     // console.log(d);
//     return {
//         "x": d,
//         // "y": d
//         // "y": d3.randomUniform(1, 20)()
//         "y": Math.floor(Math.random() * 20)
//     }
// })
// console.log(dataset);


// parse the data from the disney array and set as the dataset to be used
var dataset = disneyData.map(function (d) {
    // console.log(d);
    return {
        "x": d.year,
        "y": d.deaths
    }
});
console.log(dataset);

// 1. Add the SVG to the page and employ #2
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 3)
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    // .attr("cx", function (d, i) { return xScale(i) })
    .attr("cx", function (d) { return xScale(d.x) })
    .attr("cy", function (d) { return yScale(d.y) })
    .attr("r", 5)
    .on("mouseover", function () {
        console.log(this)
    })
    .on("mouseout", function () { })
