/**
 * Created by admin on 2016/6/10.
 */
//注册页面验证代码
var register={
    isUserName:false,
    isUserPassword:false,
    isEmail:false,
    init:function(){
        var me=this;
        $('#result').on('hidden.bs.modal', function (e) {
            $("#register input[name]").val("");
        })
        $("#register input[name]").focus(function(){
            $(this).parent().next().children(".tips_main").css("display","block");
        });
        $("#register button").attr("disabled",true);
        $("#register input:checkbox").change(function(){
            if(this.checked){var bool=false;}else{var bool=true}
            $("#register button").attr("disabled",bool);
        });
        $("#register input[name]").blur(function(){
            $(this).parent().next().children(".tips_main").css("display","none");
            if(this.name=="username"){
                var str=me.valiall(this.value,/^[a-zA-Z0-9][a-zA-Z0-9_]{5,15}$/,this.name);
                str!==undefined&&($(this).parent().next().children("span").html("用户名"+str));
            }else if(this.name=="upwda"||this.name=="upwdb"){
                var str=me.valiall(this.value,/^[a-zA-Z0-9_]{8,}$/,this.name);
                $(this).parent().next().children("span").html("密码"+str);
                str==="OK!"?(me.isUserPassword=true):(me.isUserPassword=false);
            }else if(this.name=="email"){
                var str=me.valiall(this.value,/^[a-zA-Z0-9_]+@[a-zA-Z0-9]{2,}\.[comn]{2,3}$/,this.name);
                $(this).parent().next().children("span").html("邮箱"+str);
                str==="OK!"?(me.isEmail=true):(me.isEmail=false);
            }
        });
        $("#register button[class]").click(function(){
            if(me.isEmail&&me.isUserName&&me.isUserPassword){
                $.post("../data/userregister.php",$("form").serialize(),function(data){
                    $("#result").modal("show");
                    $("#result .result").html("已注册成功！您的用户名为："+data.uname+" 如果忘记密码可以通过："+data.email+" 找回密码！");
                })
            }
        });
    },
    valiall:function(val,reg,name){
        var me=this;
        if($.trim(val)==""||($.trim(val)==null)){
            return "不能为空！";
        }else if(!reg.test(val)){
            return "不符合要求！";
        }else{
            switch (name){
                case "username":
                    $.get("../data/vali_name.php",{uname:val},function(txt){
                        var str="";
                        if(txt=="n"){
                            str="已被注册，请重新选择！";
                            me.isUserName=false;
                        }else{
                            str="OK!";
                            me.isUserName=true;
                        }
                        $("#username").parent().next().children("span").html("用户名"+str)
                    })
                    ;break;
                case "upwdb":
                    var upwda=$("#upwda").val();
                    if(val!==upwda){
                        return "两次的密码不一致!";
                    }else{return "OK!";}
                    break;
                default :return "OK!";
            }
        }
    }
};
var login={
    uname:"",
    upwd:"",
    init:function(){
        var me=this;
        $("#uname").blur(function(){
			$("#login_result").html("");
            me.uname=this.value;
            if(me.uname!==""){
                $.get("../data/vali_name.php",{uname:me.uname},function(txt){
                    if(txt=="y"){var str="用户名不存在！";}else{var str="";}
                    $("#tiptext").html(str);
                });
            }
        });
        $("#login button").click(function(){
			var now=new Date().getTime();
            var data=$("form").serialize();
			data+="&nowtime="+now;
            me.uname=$("#uname").val();
            me.upwd=$("#upwdc").val();
            if(me.uname!==""&&me.upwd!==""){
                me.postData(data);
            }
        });
    },
    postData:function(data){
		var me=this;
        $.post("../data/userlogin.php",data,function(json){
            if(json.isOk){
				me.loginIndex();//去往登陆首页
            }else if(!json.isOk){
                $("#login_result").html(json.back);
            }
        });
    },
	loginIndex:function(){
		$('#uname').val("");
		$('#upwdc').val("");
		var date=new Date();
		date.setDate(date.getDate()+1);
		document.cookie="username="+this.uname+"; path=/; expires="+date.toGMTString();
		var t=4;
		var timer=setInterval(function(){
			$("#login button").html("登录成功，请稍后！ "+(t--)+"s");
			if(t==-1){
				clearInterval(timer);
				location.replace('../');
			}
		},1000);
	}
};
$(window).ready(function(){
    register.init();
    login.init();
})

