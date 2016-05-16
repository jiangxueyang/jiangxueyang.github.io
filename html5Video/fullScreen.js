//全屏函数
function changeScreen(ele){
	this.fullScreen=function(){	
		if(ele.webkitRequestFullScreen){
			ele.webkitRequestFullScreen();
		}
		else if(ele.mozRequestFullScreen){
			ele.mozRequestFullScreen()
		}
		else if(ele.msRequestFullscreen){
			ele.msRequestFullscreen();
		}
		$(ele).width(winW);
		$(ele).height(winH);
	}
	this.cancelFull=function(){
		if(document.webkitCancelFullScreen){
			document.webkitCancelFullScreen();	
		}
		else if(document.mozCancelFullScreen){
			document.mozCancelFullScreen();
		}
		else if(document.exitFullscreen){
			document.exitFullscreen();
		}
		$(ele).width(boxW);
		$(ele).height(boxH);
	}
}

function leftTime(time){
	var minute = Math.floor(time/60);
	var sec = time%60;
	if(minute<10){
		minute = "0" + minute;
	}
	if(sec<10){
		sec = "0" + sec;

	}
	$minute.html(minute);
	$second.html(sec);	
}
var $box=$("#box");
var $oVideo=$box.find("#oVideo")
var oVideo =$oVideo[0];
var $bar =$box.find("#bar");


//控制按钮
var $switchT=$bar.find("#switchT");
var $stop=$switchT.find(".stop");
var $start=$switchT.find(".start");
var $timeBar =$bar.find(".timeBar");
var $videoDur=$bar.find("#videoDur");
var $full=$bar.find("#full");
var $cancelFull=$bar.find("#cancelFull");
var $minute=$bar.find(".minute");
var $second=$bar.find(".second");
var $show=$bar.find(".show");
var $volume=$bar.find("#volume");
var $volumebox = $bar.find(".volumebox");

var $maskPlay=$box.find(".maskPlay");

//播放/暂停视频 
$switchT.click(function(){
	if($start.is(":hidden")){
		oVideo.pause();
		$stop.hide();
		$maskPlay.show();
		$start.show();

	}	
	else{
		oVideo.play();
		$stop.show();
		$start.hide();
		$maskPlay.hide();

	}
	
});


//设置音量
$show.click(function(){
	$volumebox.toggle();
});
oVideo.onloadedmetadata=function(){
	//显示视频总时长
	var totalTime = Math.floor(this.duration);
	leftTime(totalTime);


	$timeBar.click(function(e){
		var totalW = $(this).width();
		var offsetX = e.offsetX;
		$videoDur.width(offsetX);	
		oVideo.currentTime = Math.round(totalTime*(e.offsetX/totalW));
	});
	this.ontimeupdate=function(){
		var totalW = $timeBar.width();		
		var currTime = this.currentTime;
		$videoDur.width(Math.round(totalW*currTime/totalTime));
		var lTime = totalTime - Math.floor(currTime);
		leftTime(lTime);		
	}

	//音量
	var volumeH = $volumebox.height();
	var currVolume = this.volume;
	$volume.height(currVolume*volumeH);	
	$volumebox.click(function(e){
		$volume.height(e.offsetY);
		oVideo.volume=e.offsetY/80;	
	})
}

//点击全屏按钮切换
var changeS = new changeScreen($box[0]);
var winH =window.screen.height;
var winW =window.screen.width;
var boxH = $box.height();
var boxW = $box.width();
$full.click(function(){
	changeS.fullScreen();
	// $videoDur.width(1050);
	$cancelFull.show();
	$(this).hide();


});
$cancelFull.click(function(){
	changeS.cancelFull();	
	$videoDur.width(260);	
	$full.show();
	$(this).hide();
});

//各种快捷键


$(document).on("keyup",function(e){
	// 按ESC退出全屏 
	var code = e.keyCode;
	if( code=="27"){
		$cancelFull.trigger('click');
	}
	// 按空格键停止或播放视频 
	else if(code =="32"){
		$switchT.trigger('click');
	}

});

//双击屏幕全屏
$oVideo.dblclick(function(){
	$full.trigger('click');
});



//点击主屏幕上的播放按钮
$maskPlay.click(function(){
	$switchT.trigger('click');
})