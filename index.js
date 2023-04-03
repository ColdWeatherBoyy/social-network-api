// required dependencies
const express = require("express");
const db = require("./config/connection");
// const routes = require("./routes");

// express server needs
const PORT = process.env.port || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// connection to MongoDB followed by server activation
db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
	});
});
