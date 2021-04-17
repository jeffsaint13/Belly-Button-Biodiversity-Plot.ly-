// Applying the filter method to create a custom filtering fuction
// that returns the demographic info
function getData(data) {

// Fetching the JSON data and then console log it
// Console.log each activity
d3.json("data/samples.json").then (biodivdata =>{
    console.log(biodivdata)
    var data = biodivdata.samples[0].otu_ids;
    console.log(data)
    var otuLabels =  biodivdata.samples[0].otu_labels.slice(0,10);
    console.log(otuLabels)
    var sampleValues =  biodivdata.samples[0].sample_values.slice(0,10).reverse();
    console.log(sampleValues)

// Reverse the array to get the top 10 ids
var OTU_top = ( biodivdata.samples[0].otu_ids.slice(0, 10)).reverse();

// Fetch the Ids
var OTU_id = OTU_top.map(d => "OTU " + d);
console.log(`OTU IDS: ${OTU_id}`)

//Trace1 for Bar Chart
// Slice the top 10
var labels =  biodivdata.samples[0].otu_labels.slice(0,10);
console.log(`OTU_labels: ${labels}`)
var trace1 = {
    x: sampleValues,
    y: OTU_id,
    text: labels,
    marker: { color: 'blue'},
    type: "bar",
    orientation: "h",
    };

// Creating the data arrary for the plot
var traceBar = [trace1];

// Define the bar mode layout for horizontal graph
var layoutBar = {
    title: "Top 10 OTU",
    yaxis:{ tickmode: "linear"},
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

// Plot the chart to the div tag with id "bar"
Plotly.newPlot("bar", traceBar, layoutBar);

// Trace 2 for Bubble chart
var trace2 = {
    x: biodivdata.samples[0].otu_ids,
    y: biodivdata.samples[0].sample_values,
    mode: "markers",
    marker: {
    color: biodivdata.samples[0].otu_ids,
    size: biodivdata.samples[0].sample_values,
    type: 'contour',
    colorscale: "Blackbody"
    },
    text: biodivdata.samples[0].otu_labels  
};

// Creating the data arrary for the plot
var traceBubble = [trace2];

// Define the plot layout for bubble plot
var layoutBubble = {
    x1:{title: "OTU ID"},
    height: 500,
    width: 1000
    };

// create the bubble plot
Plotly.newPlot("bubble", traceBubble, layoutBubble); 
    });
}  

// create the function fetch the DemoInfo data
function fetchDemoInfo(id) {

//Fetching the JSON data and then console log it
d3.json("data/samples.json").then((data)=> {

// populate with the metadata by selected id
    var getMetadata = data.metadata;
    console.log(getMetadata)

// filter metadata info by id
var result = getMetadata.filter(meta => meta.id.toString() === id)[0];
        
// select demographic panel to put data
var demographicInfo = d3.select("#sample-metadata");
        
// This will clear the demographic panel everytime a new subject id is selected
demographicInfo.html(" ");

// Post the demographic info within the h5 section of the HTML
    Object.entries(result).forEach((key) => {   
    demographicInfo.append("h5").text(key[0]+ ": "+ key[1] + "\n");    
    });
});
}

// create the function for the change event - looking to onchange
function optionChanged(id) {
    getData(id);
    fetchDemoInfo(id);
}

// initialise the webpage
function init() {
    
// D3 would be used to create an event handler - dropdown options
// This iwll assign the value of the dropdown menu option to a variable
var dropdown = d3.select("#selDataset");

//Fetching the JSON data and then console log it
d3.json("data/samples.json").then((data)=> {
    console.log(data)

// Use forEach to get the ids
data.names.forEach(function(name) {
    dropdown.append("option").text(name).property("value");
});

// Call function to update the chart
getData(data.names[0]);
fetchDemoInfo(data.names[0]);
    });
}

init();