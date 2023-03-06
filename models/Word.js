import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WordSchema = new Schema({
   word: {
      type: String,
      required: true,
      trim: true,
   },
   meaning: {
      type: String,
      required: true,
      trim: true,
   },
   examples: {
      type: [[String]],
      required: false,
   },
   definitions: {
      type: [[String]],
      required: false,
   },
   synonymes: {
      type: [[String]],
      required: false,
   },
   custom: {
      type: Boolean,
      default: false,
   },
});

module.exports = mongoose.models.Word || mongoose.model("Word", WordSchema);
