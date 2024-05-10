const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    name1:{type:DataTypes.STRING,defaultValue: "Гость"},
    surname:{type:DataTypes.STRING,defaultValue: ""},
    img: {type: DataTypes.STRING, allowNull: true},
    
})

const Comments = sequelize.define('Comment', {
    movieId: { type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Movies', // имя связываемой таблицы
          key: 'movieId', // имя связываемого поля
        },},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    text:{type:DataTypes.STRING, secondaryKey: true},
    email:{type: DataTypes.STRING, unique: false},

})

const Film= sequelize.define('Movie', {
    movieId: {type: DataTypes.INTEGER,primaryKey:true},
    movieName:{type:DataTypes.STRING},
    movieYear:{type:DataTypes.STRING},
    avarageRating:{type:DataTypes.STRING},
    moviePeople:{type:DataTypes.STRING},
    movieGenre:{type:DataTypes.STRING},
    movieTime:{type:DataTypes.STRING},
    movieDiscript:{type:DataTypes.TEXT},
   movieImg: {type: DataTypes.STRING,allowNull: true}
})

Film.hasMany(Comments,{ foreignKey: 'movieId' })
Comments.belongsTo(Film,{ foreignKey: 'movieId' })

module.exports = {
    User,
    Comments,
    Film
}





