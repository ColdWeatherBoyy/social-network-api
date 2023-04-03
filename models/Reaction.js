const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
	{
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

reactionSchema.virtual("formatDate").get(function () {
	this.createdAt = this.createdAt.toLocaleString();
	return this.createdAt;
});

module.exports = reactionSchema;
