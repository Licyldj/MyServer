
var over=false;
var chessBoard=[];//棋盘上的所有的点
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
	}
}

//赢法的数组  3维
var wins=[];
for (var i = 0; i < 15; i++) {
	wins[i]=[];
	for(var j=0;j < 15;j++){
		wins[i][j]=[];
	}
}



//赢法种类的索引
var count=0;
//所有的横线 五子
for(var i = 0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			// wins[0][0+0][0]=true;
			// wins[0][0+1][0]=true;
			// wins[0][0+2][0]=true;   
			// wins[0][0+3][0]=true;
			// wins[0][0+4][0]=true;

			// wins[0][1+0][1]=true;
			// wins[0][1+1][1]=true;
			// wins[0][1+2][1]=true;
			// wins[0][1+3][1]=true;
			// wins[0][1+4][1]=true;
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
//所有的竖线 五子
for(var i = 0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
//所有的正斜线 五子
for(var i = 0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
//所有的反斜线 五子
for(var i = 0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}
console.log(count);

//赢法统计数组
var mywin=[];
var computerwin=[];
for(var i=0;i<count;i++){
	mywin[i]=0;
	computerwin[i]=0;
}

var me=true;
var chess=document.getElementById('chess');
var context = chess.getContext('2d');


context.strokeStyle = "#BFBFBF";
//水印logo
var logo = new Image();
logo.src="images/logo.png";
logo.onload=function(){
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();


//绘制棋子
// context.beginPath();
// context.arc(200,200,100,0,2*Math.PI);
// var gradient=context.createRadialGradient(200,200,50,200,200,20);//返回一个渐变对象
// gradient.addColorStop(0,"#0A0A0A");//设置填充色
// gradient.addColorStop(1,"#636766");
// context.closePath();
// context.fillStyle=gradient;
//context.stroke();   stroke 描边

context.fill(); //    fill 填充
}
//绘制棋盘
var drawChessBoard = function(){
	for (var i = 0; i < 15 ; i++ ){
	context.moveTo(15 + i*30,15);
	context.lineTo(15 + i*30,435);
	context.stroke();
	context.moveTo(15,15 + i*30);
	context.lineTo(435,15 + i*30);
	context.stroke();
	}
}



var oneStep = function(i,j,me){
	context.beginPath();
	context.arc(15 + i*30,15 + j*30,13,0,2*Math.PI);
	var gradient=context.createRadialGradient(15 + i*30 +2,15 + j*30 -2,13,15 + i*30 +2,15 + j*30 -2,0);//返回一个渐变对象
	if(me){
		gradient.addColorStop(0,"#0A0A0A");//设置填充色
		gradient.addColorStop(1,"#636766");
	} else{
		gradient.addColorStop(0,"#D1D1D1");//设置填充色
		gradient.addColorStop(1,"#F9F9F9");
	}

	context.closePath();
	context.fillStyle=gradient;
	//context.stroke();   stroke 描边

	context.fill(); //    fill 填充
}

//设置鼠标点击事件（即落子）
chess.onclick = function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x=e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x/30);
	var j = Math.floor(y/30);
	if(chessBoard[i][j]==0){
		oneStep(i,j,me);
		chessBoard[i][j]=1;
		for(var k=0;k<count;k++){
			if(wins[i][j][k]){
				mywin[k]++;
				computerwin[k]=6;
				if(mywin[k]==5){
					window.alert("您赢了");
					over=true;
				}
			}
		}
		if(!over){
			me=!me;
			computerAI();
		}
	}
}

var computerAI=function(){
	//计算机得分，个人得分数组，并初始化
	var myScore=[];
	var computerScore=[];
	var max=0;//保存最高分数
	var u=0,v=0;//最高分数点的坐标
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
//遍历棋盘
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j]==0){
				for(var k=0;k<count;k++){
					if(wins[i][j][k]){

						if(mywin[k]==1){
							myScore[i][j] += 200;
						}else if(mywin[k]==2){
							myScore[i][j] += 400;
						}else if(mywin[k]==3){
							myScore[i][j] += 2000;
						}else if(mywin[k]==4){
							myScore[i][j] += 10000;
						}

						if(computerwin[k]==1){
							computerScore[i][j] += 220;
						}else if(computerwin[k]==2){
							computerScore[i][j] += 420;
						}else if(computerwin[k]==3){
							computerScore[i][j] += 2100;
						}else if(computerwin[k]==4){
							computerScore[i][j] += 20000;
						}
					}
				}
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}

				if(computerScore[i][j]>max){
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}
			}
		}
	}
	oneStep(u,v,false);
	chessBoard[u][v]=2;
	for(var k=0;k<count;k++){
		if(wins[u][v][k]){
			computerwin[k]++;
			mywin[k]=6;
			if(computerwin[k]==5){
				window.alert("计算机赢了");
				over=true;
			}
		}
	}
	if(!over){
		me=!me;
	}
}