angular.module('assignmentApp', []);

angular.module('assignmentApp').controller("AssignmentController", function($http){
  var vm = this;

  vm.getAssignments = function(){
    $http.get('/assignments/getAssignments').then(function(response){
      vm.assignments = response.data;
      console.log(vm.assignments);
    }, function(response){
      console.log('fail');
    })

  }
  vm.getAssignments();


  vm.makeAssignment = function(){
    var sendData = {};

    sendData.assignmentNum = vm.assignmentNum;
    sendData.studentName = vm.studentName;
    sendData.score = vm.score;

    $http.post('/assignments/createAssignment', sendData).then(function(response){
      console.log(response);
      vm.assignmentNum = '';
      vm.studentName = '';
      vm.score = '';
      vm.getAssignments();
    }, function(response){
      console.log('fail');
    })
  }

  vm.deleteAssignment = function(clickedId){
    console.log('click');
    console.log(clickedId);
    $http.delete('/assignments/deleteAssignment/' + clickedId).then(function(response){
      console.log(response);
      vm.getAssignments();
    }, function(response){
      console.log('fail');
    })
  }
})
