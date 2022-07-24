const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleContentSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  mainTitle: {
    type: String,
  },
  secondTitle: {
    type: String,
  },
  firstTag: {
    type: String,
  },
  secondTag: {
    type: String,
  },
  thirdTag: {
    type: String,
  },
  author: {
    type: String,
  },
  date: {
    type: String,
  },
  firstDescription: {
    type: String,
  },
  firstP: {
    type: String,
  },
  secondP: {
    type: String,
  },
  thirdP: {
    type: String,
  },
  quote: {
    type: String,
  },
  fourthP: {
    type: String,
  },
  fifthP: {
    type: String,
  },
  firstImg: {
    type: String,
  },
  firstphotoBy: {
    type: String,
  },
  thirdTitle: {
    type: String,
  },
  secondDescription: {
    type: String,
  },
  secondImg: {
    type: String,
  },
  secondPhotoBy: {
    type: String,
  },
  seventhP: {
    type: String,
  },
  eighthP: {
    type: String,
  },
  ninthP: {
    type: String,
  },
  fourthTitle: {
    type: String,
  },
  thirdDescription: {
    type: String,
  },
  tenthP: {
    type: String,
  },
  eleventhP: {
    type: String,
  },
  twelvethP: {
    type: String,
  },
  thirteenP: {
    type: String,
  },
  fourteenP: {
    type: String,
  },
  thirdImg: {
    type: String,
  },
  thirdPhotoBy: {
    type: String,
  },
  fourthImg: {
    type: String,
  },
  fourthPhotoBy: {
    type: String,
  },
  fifthImg: {
    type: String,
  },
  fifthPhotoBy: {
    type: String,
  },
  fifthTitle: {
    type: String,
  },
  fourthDescription: {
    type: String,
  },
  fifteenP: {
    type: String,
  },
  sixteenP: {
    type: String,
  },
  seventeenP: {
    type: String,
  },
  eighteenP: {
    type: String,
  },
  secondQuote: {
    type: String,
  },
  ninteenP: {
    type: String,
  },
  twentyP: {
    type: String,
  },
  sixthP: {
    type: String,
  },
  twentyOneP: {
    type: String,
  },
  sixthImg: {
    type: String,
  },
  sixthPhotoBy: {
    type: String,
  },
});

module.exports = mongoose.model("article", articleContentSchema);
