// CLIENTES CONTROLLER
function clientesController($scope, $http, $routeParams, $location) {
  // Lista de clientes
  $scope.rows = null;

  // Um cliente
  $scope.row = null;

  // Paginação
  $scope.currentPage = 0;
  $scope.pageSize = 15;
  $scope.numberOfPages = function(){
    return Math.ceil($scope.rows.lenght/$scope.pageSize);
  }

  // Método que acessa o banco de dados
  $scope.loadAll = function(){
    $scope.showLoader();
    $http.get($scope.server("/customers"))
      .success(function(data){
      $scope.rows = data;
      });
  }

  $scope.loadRow = function(){
    if($routeParams.id!=null){
      $scope.showLoader();
      $http.get($scope.server("/customer/"+$routeParams.id))
        .success(function(data){
          $scope.row = data;
          $scope.row.isUpdtae = true;
        });
      }else {
        $scope.row = {};
        $scope.CustomerID = null;
        $scope.row.isUpdtae = false;
      }
  }

  $scope.save = function(){
    $scope.showLoader();
    $http.post($scope.server("/customer/"+$routeParams.id), $scope.row)
      .success(function(data){
        alert("Salvo com sucesso");
        $scope.row.isUpdate = true;
      });
  }

  $scope.del = function(){
    if (confirm("Deseja excluir "+$scope.row.CustomerID+"?")){
      $http.delete($scope.server("/customer/"+$routeParams.id))
        .success(function(s){
          alert("Excluído com sucesso");
          $location.path("/clientes");
        });
    }
  }
}
