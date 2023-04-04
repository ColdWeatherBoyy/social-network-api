// Mongoose needs
const { Schema, model } = require("mongoose");

// defines user schema
const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: true,
			// match validator with email regex for lowercase, hence lowercase constraint above
			match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
		},
		// references, including self reference
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "user",
			},
		],
	},
	// needed for virtuals
	{
		toJSON: { getters: true },
		id: false,
	}
);

// virtual getter
userSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
