const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/server');

const actorModel = require('./actor');
const castModel = require('./cast');
const commentModel = require('./comment');
const directorModel = require('./director');
const gerneMovieModel = require('./category');
const gerneModel = require('./gerne');
const movieListModel = require('./movie_list');
const movieModel = require('./movie');
const producerModel = require('./producer');
const userModel = require('./user');
const watchListModel = require('./watch_list');

// Tạo instance Sequelize và kết nối database
const sequelize = new Sequelize(
    config.db.database,
    config.db.username, 
    config.db.password, 
    {
        host: config.db.host,
        port: config.db.port,
        dialect: config.db.dialect
    }
);

// khởi tạo models
const actor = actorModel(sequelize, DataTypes); 
const cast = castModel(sequelize, DataTypes);
const comment = commentModel(sequelize, DataTypes);
const director = directorModel(sequelize, DataTypes);
const category = gerneMovieModel(sequelize, DataTypes);
const gerne = gerneModel(sequelize, DataTypes);
const movie_list = movieListModel(sequelize, DataTypes);
const movie = movieModel(sequelize, DataTypes);
const producer = producerModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);
const watch_list = watchListModel(sequelize, DataTypes);

// định nghĩa quan hệ
actor.belongsToMany(movie, { through: cast, foreignKey: 'actor_id' });
movie.belongsToMany(actor, { through: cast, foreignKey: 'movie_id' });
actor.hasMany(cast, { foreignKey: 'actor_id'});
cast.belongsTo(actor, { foreignKey: 'actor_id'});
movie.hasMany(cast, { foreignKey: 'movie_id'});
cast.belongsTo(movie, { foreignKey: 'movie_id'});

gerne.belongsToMany(movie, { through: category, foreignKey: 'gerne_id' });
movie.belongsToMany(gerne, { through: category, foreignKey: 'movie_id' });
gerne.hasMany(category, { foreignKey: 'gerne_id'});
category.belongsTo(gerne, { foreignKey: 'gerne_id'});
movie.hasMany(category, { foreignKey: 'movie_id'});
category.belongsTo(movie, { foreignKey: 'movie_id'});

watch_list.belongsToMany(movie, { through: movie_list, foreignKey: 'watch_list_id' });
movie.belongsToMany(watch_list, { through: movie_list, foreignKey: 'movie_id' });
watch_list.hasMany(movie_list, { foreignKey: 'watch_list_id' });
movie_list.belongsTo(watch_list, { foreignKey: 'watch_list_id' });
movie.hasMany(movie_list, { foreignKey: 'movie_id' });
movie_list.belongsTo(movie, { foreignKey: 'movie_id' });

movie.belongsTo(director, { foreignKey: 'director_id' });
director.hasMany(movie, { foreignKey: 'director_id' });

movie.belongsTo(producer, { foreignKey: 'producer_id' });
producer.hasMany(movie, { foreignKey: 'producer_id' });

comment.belongsTo(movie, { foreignKey: 'movie_id' });
movie.hasMany(comment, { foreignKey: 'movie_id' });

comment.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(comment, { foreignKey: 'user_id' });

user.hasOne(watch_list, { foreignKey: 'user_id' });
watch_list.belongsTo(user, { foreignKey: 'user_id' });

// Đồng bộ hóa define models vs Database
sequelize.sync()
  .then(() => {
    console.log('Synchronized model definitions with the structure of the database!');
  })
  .catch(err => {
    console.error('The model definitions cannot be synchronized with the database structure:', err);
  });


module.exports = {
    sequelize,
    actor,
    cast,
    comment,
    director,
    category,
    gerne,
    movie_list,
    movie,
    producer,
    user,
    watch_list
}