require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const exists = await Admin.findOne({ email: 'bhandariarnav06@gmail.com' });
    if (exists) {
      console.log('ℹ️ Admin already exists');
      process.exit();
    }

    const admin = new Admin({
      email: 'bhandariarnav06@gmail.com',
      password: 'admin1234',
    });

    await admin.save();
    console.log('✅ Admin created');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
