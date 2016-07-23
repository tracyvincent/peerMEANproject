var router = require('express').Router();

var Assignment = require('../models/assignments');

router.get('/getAssignments/:id?', function(request, response){
  if(request.params.id){
    Assignment.findById(request.params.id, function(err, assignment){
      if(err){
        console.log(err);
        response.sendStatus(500);
      }else{
        response.send(assignment);
      }
    })
  }else{
  Assignment.find({}, function(err, assignments){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      console.log(assignments);
      response.send(assignments);
    }
  })
}
});


router.post('/createAssignment', function(request, response){
  console.log('creating assignment');
  var data = request.body;

  var createdAssignment = new Assignment({
    assignment_number: data.assignmentNum,
    student_name: data.studentName,
    score: data.score,
    date_completed: new Date()
  });
  createdAssignment.save(function(err){
    if(err){
      console.log("save err", err);
      response.sendStatus(500);
    }else{
      response.sendStatus(200);
    }
  });
});

router.delete('/deleteAssignment/:id', function(request, response){
  console.log('deleting assignment');
  Assignment.findByIdAndRemove(request.params.id, function(err, assignment){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      response.sendStatus(200);
    }
  })
})

module.exports = router;
