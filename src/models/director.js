
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('director', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true
          },
        full_name: {
            allowNull: false,
            type: DataTypes.STRING(20),
          },
    }, {
        tableName: 'director',
        timestamps: false
    });
};