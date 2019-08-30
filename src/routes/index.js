const express = require('express');
const router = express.Router();
const tarea = require('../model/tareas');

router.get('/', async (req, res) => {
   const lista = await tarea.find();
   res.render('index', {
       lista
   });
});

router.post('/agregar', async (req, res) => {
   const guardar = new tarea(req.body);
   await guardar.save();
   res.redirect("/");
});

router.get('/borrar/:id', async (req, res) => {
   const { id } = req.params; //recivo el id
   await tarea.remove({_id: id}); //y finalmente lo elimino
   res.redirect("/");
});

router.get('/estado/:id', async (req, res) => {
   const { id } = req.params;
   const estado = await tarea.findById(id);
   estado.status = !estado.status;
   await estado.save();
   res.redirect("/");
});

router.get('/editar/:id', async (req, res) => {
   const { id } = req.params;
   const editar = await tarea.findById(id);
   res.render("editar",{
      editar //con esto obtengo los datos
   });

});

router.post('/editar/:id', async (req, res) => {
   const { id } = req.params;
   await tarea.update({_id:id}, req.body);
   res.redirect("/");
});


module.exports = router;