// Import MySQL connection.
var connection = require("./connection.js");

// Helper function for SQL syntax.

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [ ];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
      arr.push(key + "=" + ob[key]);
    
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  //display db
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err,  result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  //add new burgers
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // change burgers once eaten
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	}
};


// Export the orm object for the model (cat.js).
module.exports = orm;
