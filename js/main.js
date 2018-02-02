window.onload = function() {
	setOnChange();
	chartbuild();
};

function chartbuild() {
	
	var canvas = document.getElementById('chart');
	if (canvas.getContext) {

		var context = canvas.getContext('2d');

		//チャートの基本変数定義
		var center_x = 250;	         //中心x座標
		var center_y = 200;          //中心y座標
		var vertex = 5;		         //頂点の数
		var size = 150;	             //大きさ（外周円の半径）
		var tilt　= 180;             //傾き
		var scale = 5;               //目盛の数
		var line_color = "#a9a9a9";  //プロット表のライン色
		var line_width = 2;          //プロット表のラインの太さ
		var line_width_out = 4;      //プロット表のラインの太さ（一番外側）
		var line_width_center = 1;   //プロット表の中心線の太さ

		vertex = parseInt(document.getElementById("vertex").value);
		size = parseInt(document.getElementById("size").value);
		tilt = parseInt(document.getElementById("tilt").value);
		scale = parseInt(document.getElementById("scale").value);
		line_color = document.getElementById("line_color").value;
		line_width = parseInt(document.getElementById("line_width").value);
		line_width_out = parseInt(document.getElementById("line_width_out").value);
		line_width_center = parseInt(document.getElementById("line_width_center").value);
		
		reset();

		function reset() {
			context.clearRect(0,0,canvas.width,canvas.height);
	        makechartframe();
	        makecenterline();
	    }	
		

	    //チャートの枠と目盛ラインを描画
	    function makechartframe(){
	        
	        var x;
	        var y;
	        var start_x;
	        var start_y;
	        var csize;
	        var angle;
	        var rad;
	        context.strokeStyle = line_color;
	        for (var k=scale;k>=0;k--) {
	            csize = size / scale * k;
	            context.beginPath();
	            //context.globalAlpha = 1;
	            if (k == scale) {
	                context.lineWidth = line_width_out;
	            } else {
	                context.lineWidth = line_width;
	            }
	            
	            for (var l=0;l<vertex;l++) {

	                angle = tilt + 360 / vertex * l;
	                rad = angle * Math.PI / 180;

	                x = center_x + Math.sin(rad) * csize;
	                y = center_y + Math.cos(rad) * csize;

	                if (l == 0) {
	                    context.moveTo(x,y);
	                    start_x = x;
	                    start_y = y;
	                } else {
	                    context.lineTo(x,y);
	                }
	                
	            }
	            context.lineTo(start_x,start_y);
	            context.stroke();
	        }
	    }

	    //チャートの中心線を描画
	    function makecenterline() {

	    	var x;
	    	var y;
	    	var angle;
	    	var rad;
	    	context.strokeStyle = line_color;
	    	context.lineWidth = line_width_center;
	    	//context.globalAlpha = 1;
	        for (var m=0;m<vertex;m++) {
	            angle = tilt + 360 / vertex * m;
	            rad = angle * Math.PI / 180;

	            x = center_x + Math.sin(rad) * size;
	            y = center_y + Math.cos(rad) * size;

	            context.beginPath();
	            context.moveTo(center_x,center_y);
	            context.lineTo(x,y);
	            context.stroke();
	        }
	    }
	    
	}
}

function setOnChange() {
	var inputElements = document.getElementsByTagName('input'),
		i, len = inputElements.length;

	for (i=0; i<len; ++i) {
		inputElements[i].onkeyup = inputElements[i].onchange = chartbuild;
	}
}
