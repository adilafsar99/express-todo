const mongoose = require("mongoose");
let url = "mongodb+srv://Adil:simplePassword@mycluster.koag1.mongodb.net/practice?retryWrites=true&w=majority";
mongoose.connect(url);

module.exports = mongoose;