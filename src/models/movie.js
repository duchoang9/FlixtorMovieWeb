
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('movie', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true
          },
        title: {
            allowNull: false,
            type: DataTypes.STRING(50),
          },
        description: {
            allowNull: false,
            type: DataTypes.TEXT,
          },
        rating: {
            allowNull: false,
            type: DataTypes.DECIMAL(2, 1),
          },
        duration: {
            allowNull: false,
            type: DataTypes.TIME,
          },
        image: {
            allowNull: false,
            type: DataTypes.TEXT,
          },
        video: {
            allowNull: false,
            type: DataTypes.TEXT,
          },
        release: {
            allowNull: false,
            type: DataTypes.DATE,
          },
        create_at: {
            allowNull: false,
            type: DataTypes.DATE,
          },
        update_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: null, 
          },
        director_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          },
        producer_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          },
    }, {
        tableName: 'movie',
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at'
    });
};