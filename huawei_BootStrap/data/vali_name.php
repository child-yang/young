<?php
	header("Content-Type:text/plain");
	$uname=$_REQUEST['uname'];
//	$conn=mysqli_connect('127.0.0.1','root','','app_wanghp','3306');
	$conn = mysqli_connect(SAE_MYSQL_HOST_M,SAE_MYSQL_USER,SAE_MYSQL_PASS,SAE_MYSQL_DB,SAE_MYSQL_PORT);
	mysqli_query($conn,"SET NAMES UTF8");
	$sql="SELECT * FROM hw_users WHERE user_name='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row!==null){
		echo "n";
	}else{
		echo "y";
	}
?>