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
});

var filterColumn = (columnName, value) => {
    return csv.transform((data) => {
        if(data[columnName] === value){
            console.log("Removing row that has '" + value + "' in column '" + columnName + "' with price " + data['Amount']);
            return;
        }
        return data;
    });
};

var hideRow = (columnName, value) => {
    return csv.transform((data) => {
        if(data[columnName] === value){
            console.log("Hidding row that has '" + value + "' in column '" + columnName + "' with price " + data['Amount']);
            data['__visibility'] = 'hidden';
        }
        return data;
    });
};

var changeValueTo = (columnName, value, newValue) => {
    return csv.transform((data) => {
        if(data[columnName] === value){
            console.log("Changing cell value from '" + value + "' to '" + newValue + "' in column " + columnName);
            data[columnName] = newValue;
        }        
        return data;
    });
};

processData = () => {
    output = fs.createWriteStream('export.csv');
    fs.createReadStream(filePath)
        .pipe(parser)
        // .pipe(filterColumn('Split Type', 'Parent'))
        .pipe(changeValueTo('Category-Subcategory', 'Other Expenses - Misc', 'Misc'))
        .pipe(filterColumn('Category-Subcategory', 'Interest Income'))
        .pipe(filterColumn('Category-Subcategory', 'Salary/Regular Income'))
        .pipe(filterColumn('Category-Subcategory', 'Savings'))
        .pipe(filterColumn('Category-Subcategory', 'Deposits'))
        .pipe(filterColumn('Category-Subcategory', 'Credit Card Payments'))
        .pipe(filterColumn('Category-Subcategory', 'Transfers'))
        .pipe(filterColumn('Category-Subcategory', 'Long Term Savings'))
        .pipe(stringer)
        .pipe(output)
        .on('end', () => {
            console.log("Done!")
        })
};

module.exports = {
    processData: processData
}

