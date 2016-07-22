////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////총알 발사 관련 함수///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var bulletFn = function( map, tankX, tankY, gravity, pwX, pwY, side, bulletImg1, bulletImg2, damage1, damage2){
	
	this.img;
	this.bulletImg1=bulletImg1;
	this.bulletImg2=bulletImg2;
	this.damage1=damage1;
	this.damage2=damage2;
	this.map=map;
	this.x=tankX;
	this.y=tankY;
	this.gravity=gravity;
	this.shotPwX=pwX;
	this.shotPwY=pwY;
	this.side=side;
	this.st;

	this.init = function(){

		this.img = document.createElement("img");
		this.img.src=this.bulletImg1;
		this.img.style.position="absolute";
		this.img.style.width=50+"px";
		this.img.style.height=25+"px";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";

		console.log(this.img.src);

		if(this.side){
			
			this.x=this.x+20;
			this.y=this.y+10;
			this.shotPwX=this.shotPwX;
			this.shotPwY=-this.shotPwY;
			this.img.style.transform="rotateY(0deg)";
			this.img.style.left=this.x+"px";
			this.img.style.top=this.y+"px";

		}else{

			this.x=this.x;
			this.y=this.y+10;
			this.shotPwX=-this.shotPwX;
			this.shotPwY=-this.shotPwY;
			this.img.style.transform="rotateY(180deg)";
			this.img.style.left=this.x+"px";
			this.img.style.top=this.y+"px";

		}

		this.map.appendChild(this.img);

		console.log( parseInt( this.map.style.width ) );


		this.move();

	}

	this.move=function(){

		var me = this;

		//console.log("여긴가?");


		this.shotPwY+=this.gravity;

		//console.log(this.shotPwY);

		this.x+=this.shotPwX;
		this.y+=this.shotPwY;

		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";

		//	stage를 벗어나면, 총알의 setTimeout은 멈춰야한다
		//console.log( parseInt( this.map.style.width ) );
		
		this.st=setTimeout(function(){
			
			me.move();
			
		}, 10);		// setTimeout이 clearTimeout보다 먼저 호출되어야 한다.
		


		//	블록과 부딪히면
		for( var a=0 ; a<blockArr.length ; a++ ){

			if(blockArr[a]!=undefined){							//	배열에 존재하는 img에 대해서만 (undefined가 아닌 경우만)
				
				var result = hitTest(this.img, blockArr[a].img);

				if( result ){

					//	총알 죽이고 총알의 setTimeout도 중지
					this.map.removeChild(this.img);
					clearTimeout(this.st);

					//	적군 죽이고
					this.map.removeChild(blockArr[a].img);			//	이미지를 먼저 없애고 delete를 맨마지막에 쓴다.
					clearTimeout(blockArr[a].st);
					delete blockArr[a];				//	배열에서 제거하고 이자리에는 Undefined 가 남음

					break;
					return;

				}

			}

		}

			
		// 부딪히지 않고 화면 밖으로 나가면
		if( parseInt( this.img.style.left ) > parseInt( this.map.style.width ) ){

			//alert("저 자살할게요");

			clearTimeout(this.st);
			this.map.removeChild(this.img);
			return;

		}

	}

}


