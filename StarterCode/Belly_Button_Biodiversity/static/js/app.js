// Creating a function for plotting the data 
function getPlot(id) {
    // Source the data from the json file 
    d3.json("Belly_Button_Biodiversity/sample.json").then((data)=> {
        console.log(data)
        
        
        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wreq}`)
    })
}