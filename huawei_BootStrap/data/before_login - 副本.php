<?php
	header("Content-Type:application/json");
	$uname=$_REQUEST['username'];
	$now=$_REQUEST['nowtime'];
	$conn=mysqli_connect('127.0.0.1','root','','app_wanghp','3306');
	mysqli_query($conn,"SET NAMES UTF8");
	$sql="SELECT * FROM hw_users WHERE user_name='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row!==null&&($now-$row['last_time']<300000)){
		$sql="UPDATE hw_users SET last_time = '$now' WHERE user_name='$uname'";
		mysqli_query($conn,$sql);
		$output=['username'=>$row['user_name'],'isNotTimeout'=>true];
	}else{
		$output=['username'=>'','isNotTimeout'=>false];
	}
	echo json_encode($output);
?>