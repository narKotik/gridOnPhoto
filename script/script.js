var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var button1 =  document.getElementById('b1');
var button2 =  document.getElementById('b2');
var color = document.querySelector('input[type=color]');
color.defaultValue = '#00ff00';
var file = document.querySelector('input[type=file]');
var interval = document.getElementById('interval');
var opacity = document.getElementById('opacity');
var catcher = document.getElementById('catcher');
var body = document.body;
var getBlobURL = (window.URL && URL.createObjectURL.bind(URL))||(window.webkitURL && webkitURL.createObjectURL.bind(webkitURL))||window.createObjectURL; 
var revokeBlobURL = (window.URL && URL.revokeObjectURL.bind(URL))||(window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL))||window.revokeObjectURL;
catcher.style.width = screen.width - 30 + 'px';
catcher.style.height = screen.height * 0.75+ 'px';
var point = 0.5;
var lineWidth = 1; //px

body.ondragenter = function(){
	catcher.style.display = 'block';
	return false;
};

color.addEventListener('input', drawGrid, false);
interval.addEventListener('input', drawGrid, false);
opacity.addEventListener('input', drawGrid, false);
file.addEventListener('change', downloadImage, false);
button1.addEventListener('click', decreaseStartPointOfGrid, false);
button2.addEventListener('click', increaseStartPointOfGrid, false);
	
function increaseStartPointOfGrid(){point++; drawGrid()}
function decreaseStartPointOfGrid(){point--; drawGrid()}
function downloadImage(){
	var files = file.files;
	for(var i = 0; i < files.length; i++){
		var type = files[i].type; 
		if (type.substring(0,6) !== 'image/') {
			continue; 
		}
		var img = document.createElement('img');
		img.src = getBlobURL(files[i]); 
		grid = document.getElementById('grid');
		if(grid){grid.remove();}
		img.onload = function() {
			img.style.display = 'none';
			img.id = 'grid';
			document.body.appendChild(this); 
			revokeBlobURL(this.src);
			drawGrid();
		}
	}
}
	
function drawGrid(){
	var grid = document.getElementById('grid');
	if(grid){
		canvas.width = grid.width;
		canvas.height = grid.height;
		catcher.style.display = 'none';
		
		c.drawImage(grid, 0,0);
		
		var intervalValue = interval.value * 1 || 50;
		
		c.strokeStyle = color.value || 'rgba(0,255,0,0.5)';
		c.globalAlpha = opacity.value / 100 || 1;
		c.lineWidth = lineWidth;
		
		for(var j=0, i = point; j < Math.round(canvas.width / intervalValue) + 1; i += intervalValue, j++){
			c.moveTo(i, 0);
			c.lineTo(i, canvas.height);
		}
		for(var j=0,i = point; j < Math.round(canvas.height / intervalValue) + 1; i += intervalValue, j++){
			c.moveTo(0, i);
			c.lineTo(canvas.width, i);
		}
		c.stroke();
	}
}





catcher.ondragenter = function(){
	return false;
};
catcher.ondragover = function(){
	catcher.style.border = '3px solid blue';
	return false;
};
catcher.ondragleave = function(){
	catcher.style.border = null;
	return false;
};
catcher.ondrop = function(e){
	var files = e.dataTransfer.files; 
		for(var i = 0; i < files.length; i++) {
		var type = files[i].type; 
		if (type.substring(0,6) !== 'image/') 
		continue; 
		var img = document.createElement('img');
		img.src = getBlobURL(files[i]); 
		grid = document.getElementById('grid');
		if(grid){grid.remove();}
		img.onload = function() {
			img.style.display = 'none';
			img.id = 'grid';
			document.body.appendChild(this); 
			revokeBlobURL(this.src);
			drawGrid();
		} 
	}
	catcher.style.border = null;
	return false;
};