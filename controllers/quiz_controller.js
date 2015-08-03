var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error);});
};

// GET /quizes/
exports.index = function(req, res) {
  if(req.query.search){    
    var search  = '%'+ req.query.search.replace(/ /g, '%') + '%';

    models.Quiz.findAll({where: ["pregunta like ?", search],order: 'pregunta ASC'}).then(
      function(quizes){
        res.render('quizes/index.ejs', {quizes: quizes, errors: []});
      }
    ).catch(function(error){next(error);});

  } else {
    models.Quiz.findAll().then(
      function(quizes){
        res.render('quizes/index.ejs', {quizes: quizes, errors: []});
      }
    ).catch(function(error){next(error);});

  }
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.findById(quizId).then(
    function(quiz){
      res.render('quizes/show', {quiz: quiz, errors: []});
    }
  ).catch(function(error){next(error);});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta){
        resultado = 'Correcto';
    }
    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(  //crea objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz: quiz, errors: []});
};

// GET /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);
  quiz
  .validate()
  .then(
    function(err){
    if(err) {
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    } else { 
      //guarda en DB los campos pregunta y respuesta de quiz
      quiz
      .save({fields: ["pregunta", "respuesta"]})
      .then(function(){ res.redirect('/quizes')})
    }
  }).catch(function(error){next(error)});
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;
  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz
  .validate()
  .then(
    function(err){
    if(err) {
      res.render('quizes/edit', {quiz: quiz, errors: err.errors});
    } else { 
      //guarda en DB los campos pregunta y respuesta de quiz
      req.quiz
      .save({fields: ["pregunta", "respuesta"]})
      .then(function(){ res.redirect('/quizes')})
    }
  }).catch(function(error){next(error)});
};