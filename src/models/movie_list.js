
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('movie_list', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true
          },
        watch_list_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          },
        movie_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          }
    }, {
        tableName: 'movie_list',
        timestamps: false
    });
};