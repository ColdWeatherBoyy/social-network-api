// Mongoose needs
const { Schema, model } = require("mongoose");

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
			unique: true,
			required: true,
			// match validator with email regex
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
	// needed for virtuals conversion
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
