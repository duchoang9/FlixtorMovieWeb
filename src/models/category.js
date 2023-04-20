
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true
          },
        gerne_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          },
        movie_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          }
    }, {
        tableName: 'category',
        timestamps: false
    });
};