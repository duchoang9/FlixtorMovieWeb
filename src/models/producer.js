
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('producer', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true
          },
        name: {
            allowNull: false,
            type: DataTypes.STRING(20),
          },
        country: {
            allowNull: false,
            type: DataTypes.STRING(20),
        }
    }, {
        tableName: 'producer',
        timestamps: false
    });
};