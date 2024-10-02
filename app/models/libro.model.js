module.exports = (sequelize, Sequelize) => {
	const Libro = sequelize.define('libros', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  libro: {
			type: Sequelize.STRING
	  },
	  editorial: {
			type: Sequelize.STRING
  	},
	  autor: {
			type: Sequelize.STRING
	  },
	  genero: {
			type: Sequelize.STRING
    },
    paisautor: {
        type: Sequelize.STRING
    },
    paginas: {
        type: Sequelize.INTEGER
    },
    year: {
        type: Sequelize.INTEGER
    },
    precio: {
        type: Sequelize.FLOAT
    },
    
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Libro;
}