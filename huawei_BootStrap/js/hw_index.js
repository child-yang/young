//新闻轮播效果
var news=[
	{'i':0,'a':'华为U-vMOS实现视频通信，开创从单向视频到双向视频业务体验','href':'http://www.huawei.com/cn/news'},
	{'i':1,'a':'VIVA 巴林携手华为完成九扇区解决方案中东区域首商用','href':'http://www.huawei.com/cn/news'},
	{'i':2,'a':'华为与沃达丰宣布成立全球首个窄带物联网开放实验室','href':'http://www.huawei.com/cn/news'},
	{'i':3,'a':'华为IT入选2016 Gartner CIO Agenda数字化加速者名单','href':'http://www.huawei.com/cn/news'},
	{'i':4,'a':'华为通过NB-IoT创新与合作，助力NB-IoT行业应用的发展','href':'http://www.huawei.com/cn/news'},
	{'i':5,'a':'华为FusionServer E9000两路刀片升级 打破三项性能测试世界纪录','href':'http://www.huawei.com/cn/news'}
];
var group_news={
	LIHEIGHT:50,//用来保存每个li的高度
	WAIT:4000,
	duration:250,//用来保存移动的总时间
	STEPS:75,//用来保存移动的总步数
	step:0,//用来保存每步移动的距离
	current:1,//用来保存当前显示的图片
//	distance:0,//用来保存移动的距离(该功能用不着)
	interval:0,//用来保存每次移动的时间间隔
	moved:0,//用来保存移动过的步数
	timer:null,//保存定时器变量
	canAuto:true,
	init:function(){
		news[news.length]=news[0];
		this.interval=this.duration/this.STEPS;
		this.upView();
		this.autoMove();
		var me=this;
		$('#section span:first').click(this.move.bind(this,-1));
		$('#section span:last').click(this.move.bind(this,1));
		$('#section div.row').hover(function(){
			me.canAuto=false;
		},function(){
			me.canAuto=true;
		});
	},
	autoMove:function(){
		if(this.canAuto){this.move(1);}
		setTimeout(this.autoMove.bind(this),this.WAIT);
	},
	move:function(n){
		this.step=this.LIHEIGHT/this.STEPS;
		if(this.current==1||this.current==news.length){
			switch(n){
				case 1:this.current=1;break;
				case -1:this.current=news.length;break;
			}
			var finalTop=-(this.current-1)*this.LIHEIGHT;
			$('#news ul').css('top',finalTop+'px');
		}
		this.current+=n;
		this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
	},
	moveStep:function(n){
		this.moved++;
		var top=parseFloat($('#news ul').css('top'));
		top+=-this.step*n;
		$('#news ul').css('top',top+"px");
		this.timer=setTimeout(this.moveStep.bind(this,n),this.interval);
		if(this.moved>this.STEPS){
			clearTimeout(this.timer);
			this.timer=null;
			this.moved=0;
			var finalTop=-(this.current-1)*this.LIHEIGHT;
			$('#news ul').css('top',finalTop+'px');
		}
	},
	upView:function(){
		var height=this.LIHEIGHT*news.length;
		$('#news ul').css('height',height);
		for(var i=0,str='';i<news.length;i++){
			str+="<li><a href='"+news[i].href+"'>"+news[i].a+"</a></li>";
		}
		$('#news ul').html(str);
	},
};
//回到顶部功能
var go_top={
	top:0,
	interval:0,
	duration:500,
	STEP:60,
	step:0,
	moved:0,
	timer:null,
	init:function(){
		var me=this;
		$(window).scroll(function(){
			me.top=$(window).scrollTop();
			if(me.top>600){
				$(".js-goto-top").addClass("show")
			}else{
				$(".js-goto-top").removeClass("show")
			}
		});
		$(".js-goto-top").click(function(){
			me.gotTop();
		});
	},
	gotTop:function(){
		this.interval=this.duration/this.STEP;
		this.step=this.top/this.STEP;
		this.timer=setTimeout(this.moveStep.bind(this),this.interval);
	},
	moveStep:function(){
		this.top-=this.step;
		this.moved++;
		$(window).scrollTop(this.top);
		if(this.moved>=this.STEP){
			clearTimeout(this.timer);
			$(window).scrollTop(0);
			this.moved=0;
			this.timer=null;
		}else{
			this.timer=setTimeout(this.moveStep.bind(this),this.interval);
		}
	}
}
//页面加载后检查登录状态
var loginCheck={
	cookie:null,
	username:null,
	init:function(){
		this.cookie=document.cookie;
		if(this.cookie.trim()!==""){
			//"username=whp; userpwd=12345; ......"
			var cookieArr=this.cookie.split(";");
			for(var i=0;i<cookieArr.length;i++){
				var arr=cookieArr[i].split("=");
				if(arr[0]==="username"){
					this.username=arr[1];
					this.visitDb();
				}
			}
		}
	},
	visitDb:function(){
		var nowTime=(new Date()).getTime();
		$.get("data/before_login.php",{username:this.username,nowtime:nowTime},function(data){
			if(data.isNotTimeout){
				$("#login_wel").html("<a>"+data.username+",你好！</a>");
				$("#regist_name").html("<a href='accounts/login.html'>退出登录</a>");
			}
		})
	}
}
window.addEventListener('load',function(){
	group_news.init();
	go_top.init();
	loginCheck.init();
});