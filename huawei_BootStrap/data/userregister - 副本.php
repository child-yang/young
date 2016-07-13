<?php
	header("Content-Type:application/json");
	$uname=$_REQUEST['username'];
	$upwd=$_REQUEST['upwda'];
	$email=$_REQUEST['email'];
	//INSERT INTO `hw_users` (`user_id`, `user_name`, `user_pwd`, `last_time`) VALUES (NULL, 'wanghp', 'wanwhp1314', '0');
	$conn=mysqli_connect('127.0.0.1','root','','app_wanghp','3306');
	mysqli_query($conn,"SET NAMES UTF8");
	$sql="INSERT INTO `hw_users`(`user_id`,`user_name`,`user_pwd`,`email`,`last_time`) VALUES(NULL, '$uname', '$upwd','$email', '0');";
	$result=mysqli_query($conn,$sql);
	if($result){
		$output=["uname"=>$uname,"upwd"=>$upwd,"email"=>$email];
		echo json_encode($output);
	}
?>