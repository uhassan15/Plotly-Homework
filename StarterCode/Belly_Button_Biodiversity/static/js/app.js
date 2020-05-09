// Creating a function for plotting the data 
function getPlot(id) {
    // Use `d3.json` to fetch the metadata for a sample
    d3.json("Belly_Button_Biodiversity/sample.json").then((data)=> {
        console.log(data)
        
    // tags for each key-value in the metadata.
        
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wreq}`)
        
        
    // populate the initial plot by using samples from the data 
    // sample using 'id'
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
    // To sample the top 10 values print the follwing 
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
      
    // print only desired results from OTU
        let OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
    // format the OTU to plot 
        let OTU_id = OTU_top.map(d => "OTU " + d)
        
        
        
    })
}