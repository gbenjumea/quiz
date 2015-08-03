// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes){
	return sequelize.define(
		'Quiz',
		{ pregunta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Pregunta"}}
			},
		  respuesta: {
			type: DataTypes.STRING,
			validate: { notEmpty: {msg: "-> Falta Respuesta"}}
			},
		  tema: {
		   	type: DataTypes.ENUM('otro', 'humanidades', 'ocio', 'ciencia', 'tecnologia'),
			validate: { notEmpty: {msg: "-> Falta Respuesta"}}
		    }
		}
	);
}