// Creating a function for plotting the data 
function getPlot(id) {
    // Use `d3.json` to fetch the data 
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
  
        // Tag for each key-value in the metadata.
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)
        
    // populate the initial plot by using samples from the data 
    // sample using 'id'
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // To sample the top 10 values print the follwing 
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        // Print only the desired results from OTU
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // Format the OTU to plot 
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
  
        // Draw the sample of the Top 10 OTU
        var labels = samples.otu_labels.slice(0, 10);
  
      //  Grab the metadata div, clear it and populate with the desired data
      //   Console.log(`Id Values`)
        // create trace variable for the plot
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'rgb(49,130,189)'},
            type:"bar",
            orientation: "h",
        };
  
        // Store the data variable to plot 
        var data = [trace];
  
        // Create a plot for the horizontal bar plot 
        // Reference source https://plotly.com/javascript/indicator/bar
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // To create the bar plot print the following 
        Plotly.newPlot("bar", data, layout);
  
        //console.log(`ID: ${samples.otu_ids}`)
      
        // The bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        // set the layout for the bubble plot
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        // creating data variable 
        var data1 = [trace1];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_b); 
  
        // The guage chart
        // Reference source https://plotly.com/python/gauge-charts/
  
        var data_g = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Belly Button Weekly Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number+delta",
          delta: { reference: 1, increasing: { color: "RebeccaPurple"}},
          gauge: { axis: { range: [null, 9], tickwidth: 1, tickcolor: "green" },
                   bar: { color: "darkblue"},
                   bgcolor: "White", 
                   borderwidth: 2, 
                   bordercolor: "gray",
                   steps: [
                    { range: [0, 2], color: "lightgray" },
                    { range: [2, 4], color: "lavender" },
                    { range: [4, 6], color: "orange" },
                    { range: [6, 8], color: "green" },
                    { range: [8, 9], color: "darkblue" },
                  ]}
              
          }
        ];
        var layout_g = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
          };
        Plotly.newPlot("gauge", data_g, layout_g);
      });
  }  
// create the function to get the necessary data
function getInfo(id) {
    // Read in the Json file to retrieve the data 
    d3.json("Data/samples.json").then((data)=> {
        
        // For the demographic info get the metadata
        var metadata = data.metadata;

        console.log(metadata)

        // Use 'id' to filter the metadata
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // Get rid of the demographic info before getting the new id info to dsplay. 
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Create the function to make changes 
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// Function for data rendering 
function init() {
    // Operationalize the drop down menu  
    var dropdown = d3.select("#selDataset");

    // Read in the json data 
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)

        // Get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // How to call a function to display the data and plots associated with that data
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();