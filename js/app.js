// URL de acesso ao servidor RESTful
SERVER_URL="http://localhost/2018/Angular/vendas/server";

// Criação do app, módulo de toda a aplicação
$app = angular.module('app',[]);

$app.config(['$routeProvider', '$httpProvider' ,function($routeProvider, $httpProvider){
   // Configuração do routeProvider
   $routeProvider.
   when('/', {templateUrl:"view/main.html"}).
   when('/clientes', {templateUrl:"view/clientes/main.html", controller:'clientesController'}).
   when('/clientes/new', {templateUrl:"view/clientes/update.html", controller:'clientesController'}).
   when('/clientes/:id', {templateUrl:"view/clientes/update.html", controller:'clientesController'}).
   otherwise({redirectTo:'/'});

  // Configurando o response receptor, para exibir mensagem de erro que o servidor retorne
  $httpProvider.interceptors.push(function($q, $rootScope){
    return function(promise){
      // Sempre desativar loader
      $rootScope.hideLoader();
      return promise.then(function(response){
        // Caso sucesso
        return(response);
      }, function(response){
        // Caso erro
        $data = response.data;
        $error = $data.error;
        console.error($data);
        if ($error && $error.text) {
          alert("ERROR: " + $error.text);
        }else {
          if(response.status==404){
            alert("Erro ao acessar o servidor, veja o console para maiores detalhes");
          }else {
            alert("Erro, veja o console");
          }
        }
        return $q.reject(response);
      });
    }
  });
}]);

// APP RUN
$app.run(["$rootScope", function($rootScope){
  // Flag que define se o ícone de acesso ao servidor está ativado
  $rootScope.showLoaderFlag = false;

  // Força o ativamento do icone de acesso ao servidor
  $rootScope.showLoader = function(){
    $rootScope.showLoaderFlag = true;
  }

  // Força o desativamento do icone de acesso ao servidor
  $rootScope.showLoader = function(){
    $rootScope.showLoaderFlag = false;
  }

  // Método que retorna a url completa de acesso ao servidor
  // EVITAR USAR CONCATENAÇÃO NO CONTROLLER
  $rootScope.server = function(url){
    return SERVER_URL + url;
  }
}]);

$app.filter('startFrom', function() {
	return function(input, start) {
		if (input==null){
      return null;
    }else {
      start = +start; //parse to int
      return input.slice(start);
    }
  }
});
