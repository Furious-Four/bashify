const { db } = require('./index');

const init = async () => {
  try {
    await db.sync({ force: true });
    //call the seed file
    console.log('connected');
    await db.close();
  } catch (error) {
    console.log(error);
    db.close();
  }
};

init();
