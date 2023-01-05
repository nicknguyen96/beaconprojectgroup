const { Schema, model } = require("mongoose");

const blacklistTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const BlackListToken = model("BlacklistToken", blacklistTokenSchema);

module.exports = BlackListToken;
