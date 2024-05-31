let mongoose = require("mongoose");

let candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  // partyLogo:{
  //   url: String,
  //   filename: String,
  // },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      voteAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});

let Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
