const mongoose = require('mongoose');

let isConected = false;

const connectDB = async () => {
  try {
    const dbs = await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (dbs.connections[0].readyState === 1) {
      console.log('🌱 Connected to MongoDB');
      isConected = dbs.connections[0].readyState;
    }
  } catch (err) {
    throw ('🔥 Error on mongodb conection ', err);
  }
};

module.exports.checkConection = async () => {
  if (isConected === false) {
    const conection = await connectDB();
    return conection;
  }
  return isConected;
};
