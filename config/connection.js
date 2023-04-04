const { connect, connection } = require("mongoose");

// basic mongoDB connect
connect("mongodb://localhost/socialnetwork", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = connection;
