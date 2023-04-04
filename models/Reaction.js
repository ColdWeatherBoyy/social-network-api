// need for reactionSchema definition
const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
	{
		// use of ObjectId type
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			require: true,
			maxLength: 280,
		},
		username: {
			type: String,
			require: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { getters: true },
		id: false,
	}
);

// virtual for date formatting
reactionSchema.virtual("formatDate").get(function () {
	const date = new Date(this.createdAt);
	return date.toLocaleString();
});

module.exports = reactionSchema;
