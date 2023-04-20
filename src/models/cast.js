
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cast', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true
          },
        actor_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          },
        movie_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          }
    }, {
        tableName: 'cast',
        timestamps: false
    });
};