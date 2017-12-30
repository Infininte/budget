const   fs = require('fs'),
        path = require('path'),
        csv = require('csv'),   
        filePath = path.join(__dirname, '/import.csv');

var parser = csv.parse({columns: true});
var stringer = csv.stringify({header: true});

var removeParents = csv.transform((data) => {
    if(data['Split Type'] === "Parent"){
        return;
    }
    return data;
})


processData = () => {
    output = fs.createWriteStream('export.csv');
    fs.createReadStream(filePath)
        .pipe(parser)
        .pipe(removeParents)
        .pipe(stringer)
        .pipe(output)
        .on('end', () => {
            console.log("Done!")
        })
};

module.exports = {
    processData: processData
}

