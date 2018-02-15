// Funcionários CONTROLLER
function funcionariosController($scope, $http, $routeParams, $loaction){
  $scope.rows = null;
  $scope.row = null;


  // SELECIONAR TODOS OS REGISTROS
  $scope.loadAll = function(){
    $http.get($scope.server("/employees"))
    .success(function(data){
      $scope.rows = data;
    });
  }

  // SELECIONAR UM REGISTRO
  $scope.loadRow = function(){
    if ($routeParams.id!=null){
      $scope.showLoader();
      $http.get($scope.server("/employee/"+$routeParams.id))
        .success(function(data){
          $scope.row = data;
      });
    }
  }

  // INSERT
  $scope.new = function(){
    $scope.row = {
      EmployeeID: 0,
      Name: "",
      Phone: "",
      Salary: ""
    }
  }

  //  UPDATE
  $scope.save = function(){
    $scope.showLoader();
    $http.post($scope.server("/employee/"+$routeParams.id)
      .success(function(data){
        alert("Salvo com sucesso");
        $scope.row.isUpdate = true;
      });
  }

  // DELETE
  $scope.del = function(){
    if (confirm("Deseja realmente excluir este registro?")) {
      $http.delete($scope.sever("/employees/"+$routeParams.id))
        .success(function(s){
          alert("Excluído com sucesso");
          $location.path("/funcionarios");
        });
    }
  }
}
