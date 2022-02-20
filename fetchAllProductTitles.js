// Reading the file using default
// fs npm package
const fs = require("fs");
csv = fs.readFileSync("TCL Products.csv")

// Convert the data to String and
// split it in an array
var array = csv.toString().split("\r");

// All the rows of the CSV will be
// converted to JSON objects which
// will be added to result in an array
let result = [];

// The array[0] contains all the
// header columns so we store them
// in headers array
let headers = array[0].replaceAll(" ", "");
headers = headers.split(",");

// Since headers are separated, we
// need to traverse remaining n-1 rows.
for (let i = 1; i < array.length - 1; i++) {
    let productTitle = ""

    // Create an empty object to later add
    // values of the current row to it
    // Declare string str as current array
    // value to change the delimiter and
    // store the generated string in a new
    // string s
    let str = array[i];
    str = str.replaceAll("\n", "");
    let s = ''

    // By Default, we get the comma separated
    // values of a cell in quotes " " so we
    // use flag to keep track of quotes and
    // split the string accordingly
    // If we encounter opening quote (")
    // then we keep commas as it is otherwise
    // we replace them with pipe |
    // We keep adding the characters we
    // traverse to a String s
    let flag = 0
    for (let ch of str) {
        if (ch === '"' && flag === 0) {
            flag = 1
        }
        else if (ch === '"' && flag == 1) flag = 0
        if ((ch === ', ' || ch === ',') && flag === 0) ch = '|'
        if (ch !== '"') s += ch
    }

    // Split the string using pipe delimiter |
    // and store the values in a properties array
    let properties = s.split("|")

    // For title header store the product title in the array
    for (let j in headers) {
        if (headers[j] == "title") {
            productTitle = properties[j];
            break;
        }

        // if (properties[j].includes(", ")) {
        //     obj[headers[j]] = properties[j]
        //         .split(", ").map(item => item.trim())
        // } else if (properties.includes(",")) {
        //     obj[headers[j]] = properties[j]
        //         .split(",").map(item => item.trim())
        // }
        // else obj[headers[j]] = isNaN(properties[j]) ? properties[j] : +properties[j];
    }

    // Add the product title in the array.
    result.push(productTitle)
}

// Convert the resultant array to json and
// generate the JSON output file.
let json = JSON.stringify(result);
fs.writeFileSync('output_product_titles.json', json);
