
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true
          },
        content: {
            allowNull: false,
            type: DataTypes.TEXT,
          },
        violate: {
            allowNull: false,
            type: DataTypes.INTEGER(1),
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
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER(3),
          },
        movie_id: {
            allowNull: true,
            type: DataTypes.INTEGER(3),
          },
    }, {
        tableName: 'comment',
        timestamps: true,
        createdAt: 'create_at',
        updatedAt: 'update_at'
    });
};