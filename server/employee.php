<?php

$app->get("/employees",function (){

	$sql = "SELECT EmployeeID,Name,Phone,Salary FROM employees";
	$stmt = DB::prepare($sql);
	$stmt->execute();
	formatJson($stmt->fetchAll());
});

$app->get("/employee/:id",function ($id){

	//DATE_FORMAT( `date` , '%d/%c/%Y %H:%i:%s' ) AS `date`
	$sql = "SELECT EmployeeID,Name,Phone,Salary FROM employees WHERE EmployeeID=?";
	$stmt = DB::prepare($sql);
	$stmt->execute(array($id));
	formatJson($stmt->fetch());
});

$app->post("/employee/:id",function (){

	$data =json_decode(\Slim\Slim::getInstance()->request()->getBody());

	if ($data->EmployeeID!=0){
		$sql = "UPDATE employees SET Name=?,Phone=?,Salary=? WHERE EmployeeID=?";
		$stmt = DB::prepare($sql);
		$stmt->execute(array(
			$data->Name,
			$data->Phone,
			$data->Salary,
			$data->EmployeeID
			)
		);
	}else{
		$sql = "INSERT INTO employees (EmployeeID,Name,Phone,Salary)  VALUES (?,?,?,?)";
		$stmt = DB::prepare($sql);
		$stmt->execute(array(
			$data->Name,
			$data->Phone,
			$data->Salary
			)
		);
		$data->EmployeeID = DB::lastInsertId();
	}

	formatJson($data);
});

$app->delete("/employee/:id",function ($id){
	$sql = "DELETE FROM employees WHERE EmployeeID=?";
		$stmt = DB::prepare($sql);
		$stmt->execute(array($id));
	formatJson(true);
});
