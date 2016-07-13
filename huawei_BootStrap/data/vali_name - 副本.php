<?php
	header("Content-Type:text/plain");
	$uname=$_REQUEST['uname'];
	$conn=mysqli_connect('127.0.0.1','root','','app_wanghp','3306');
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