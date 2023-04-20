
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('watch_list', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true
          },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          },
    }, {
        tableName: 'watch_list',
        timestamps: false
    });
};