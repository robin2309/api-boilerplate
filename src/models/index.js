import Sequelize from 'sequelize';

export default () => {
const sequelize = new Sequelize(__CONFIG__.bdd.database, __CONFIG__.bdd.username, __CONFIG__.bdd.password, {
  host: __CONFIG__.bdd.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })

}