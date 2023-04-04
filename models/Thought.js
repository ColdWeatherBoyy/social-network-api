// needs for schema
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		username: {
			type: String,
			required: true,
		},
		// use of reactionSchema
		reactions: [reactionSchema],
	},
	{
		toJSON: { getters: true },
		id: false,
	}
);

// both virtual getters for date format
thoughtSchema.virtual("formatDate").get(function () {
	const date = new Date(this.createdAt);
	return date.toLocaleString();
});

// virtual getter for reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
