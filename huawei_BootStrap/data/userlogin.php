<?php
	header("Content-Type:application/json");
	$uname=$_REQUEST['uname'];
	$upwd=$_REQUEST['upwd'];
	$now=$_REQUEST['nowtime'];
//	$conn=mysqli_connect('127.0.0.1','root','','app_wanghp','3306');
	$conn = mysqli_connect(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
	mysqli_query($conn,"SET NAMES UTF8");
	$sql="SELECT * FROM hw_users WHERE user_name='$uname' AND user_pwd='$upwd'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row!==null){
		$sql="UPDATE hw_users SET last_time = '$now' WHERE user_name='$uname'";
		mysqli_query($conn,$sql);
		$output=["isOk"=>true,"back"=>$uname];
	}else{
		$output=["isOk"=>false,"back"=>"用户名或者密码错误！"];
	}
	echo json_encode($output);
?>