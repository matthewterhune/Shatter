w = 800;
h = 1000;
scl = 1;
scr = 1;
seed = Date.now();
//seed = 1599179365693;

console.log(seed);


/*svgpath = [
	[339,214],
	[385.34078,238.65608,389.33813,301.39822,408.35156,346.02734],
	[434.11362,421.41348,449.60401,500.40802,469.64413,576.84375],
	[481.51474,568.16084,467.39706,542.93461,468.455,527.63941],
	[458.50741,435.49444,424.24638,347.88405,414,256],
	[416.66711,198.05669,496.75437,220.13631,504.01562,265.73438],
	[544.28051,360.32494,564.62975,462.24344,582.04688,563.15625],
	[591.48187,636.82372,628.11632,707.77719,681.875,758.9375],
	[730.7874,779.09861,738.62836,688.50177,761.8125,658.125],
	[786.1538,600.64267,840.54457,539.64659,908.75,548.5],
	[950.47028,578.81303,882.02157,632.12304,879.84375,674.14062],
	[864.75126,721.08661,838.24066,767.92893,848.32812,818.70312],
	[855.42217,871.31664,827.42857,916.44219,800.46094,958.875],
	[774.43118,1005.6119,744.64182,1050.1183,712.51562,1092.7188],
	[692.00676,1139.4471,717.19256,1191.2733,720.95312,1239.3135],
	[726.98267,1272.2064,732.98229,1305.1049,739,1338],
	[634.66667,1338,530.33333,1338,426,1338],
	[431.18183,1273.6223,421.82315,1205.9605,380.78125,1153.7031],
	[334.94018,1087.9006,282.63119,1024.9969,256.45312,947.89062],
	[225.27255,872.6819,212.93716,790.8832,174.07422,718.63672],
	[146.87421,656.13155,107.93464,597.67912,92.5,530.75],
	[89.038755,479.51055,151.93578,485.08197,160.35156,530.23047],
	[199.37361,591.25205,235.01553,654.34249,273,716],
	[313.18552,729.884,283.97851,657.3021,291.75,682.70312],
	[258.67519,577.87263,209.03612,479.32043,170.758,376.5],
	[145.25592,321.68477,239.42803,296.30474,244,358],
	[282.89198,445.83068,334.01307,528.36882,364,620],
	[385.39745,648.28399,372.63273,576.88224,377,612],
	[356.2643,495.1854,319.02249,382.04131,289.52362,267.33496],
	[279.45658,234.19957,306.50026,209.85256,339,214]];

svgscale = .7;
svgx = 100;
svgy = 100;
svgpath[0][0] = Math.round(svgpath[0][0] * svgscale + svgx);
svgpath[0][1] = Math.round(svgpath[0][1] * svgscale + svgy);
for (let i = 1; i < svgpath.length; i++) {
	svgpath[i][0] = Math.round(svgpath[i][0] * svgscale + svgx);
	svgpath[i][1] = Math.round(svgpath[i][1] * svgscale + svgy);
	svgpath[i][2] = Math.round(svgpath[i][2] * svgscale + svgx);
	svgpath[i][3] = Math.round(svgpath[i][3] * svgscale + svgy);
	svgpath[i][4] = Math.round(svgpath[i][4] * svgscale + svgx);
	svgpath[i][5] = Math.round(svgpath[i][5] * svgscale + svgy);
}*/


function inCircle(p1, p2, p3){ 
  let side=getSides(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
  let a=side.a, b=side.b, c=side.c; 
  let inCenter=getIncenter(a, b, c, p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]); 
  let inRadius=getInradius(a, b, c); 
  return([inCenter.x, inCenter.y, inRadius]);
} 

// Helper Function: Get Sides from Angular points 
function getSides(Ax, Ay, Bx, By, Cx, Cy){ 
  return { 
    a: dist(Bx, By, Cx, Cy), 
    b: dist(Cx, Cy, Ax, Ay), 
    c: dist(Ax, Ay, Bx, By), 
  } 
} 
function getIncenter(a, b, c, x1, y1, x2, y2, x3, y3){ 
  return { 
    x: (a*x1 + b*x2 + c*x3)/(a + b + c), 
    y: (a*y1 + b*y2 + c*y3)/(a + b + c) 
  } 
} 
  
function getInradius(a, b, c){ 
  let s=(a+b+c)/2    // Semi-perimeter 
  let area=sqrt(s*(s-a)*(s-b)*(s-c)) 
  return area/s 
} 


function drawSVG(svgpath) {
	beginShape();
	vertex(svgpath[0][0], svgpath[0][1]);
	for (let i = 1; i < svgpath.length; i++) {
		bezierVertex(svgpath[i][0], svgpath[i][1],
					 svgpath[i][2], svgpath[i][3],
					 svgpath[i][4], svgpath[i][5],);
	}
	endShape();
}

function rev(point) {
	newpoint = [point[6],	
				point[7],
				point[4],
				point[5],
				point[2],
				point[3],
				point[0],
				point[1]];
	return newpoint.slice();
}

function larp(a, b, t) {
    let s = 1 - t;
    return [(a[0]*s + b[0]*t),
            (a[1]*s + b[1]*t)];
}

function splitcurve(pts, t) {
    var p0 = [pts[0],pts[1]], p1 = [pts[2],pts[3]], p2 = [pts[4],pts[5]], p3 = [pts[6],pts[7]];

    if (p0[0] == p1[0] && p0[1] == p1[1] && p2[0] == p3[0] && p2[1] == p3[1]) {
    	let p4 = [int(p1[0] + (p2[0]-p1[0])/2.5), int(p1[1] + (p2[1]-p1[1])/2)];
    	let firsthalf = [p0[0], p0[1], p0[0], p0[1], p4[0], p4[1], p4[0], p4[1]];
    	let secondhalf = [p4[0], p4[1], p4[0], p4[1], p3[0], p3[1], p3[0], p3[1]];
    	return [firsthalf, secondhalf];
    } else {
	    let p4 = larp(p0, p1, t);
	    let p5 = larp(p1, p2, t);
	    let p6 = larp(p2, p3, t);
	    let p7 = larp(p4, p5, t);
	    let p8 = larp(p5, p6, t);
	    let p9 = larp(p7, p8, t);

	    let firsthalf = [p0[0], p0[1], p4[0], p4[1], p7[0], p7[1], p9[0], p9[1]];
	    let secondhalf =  [p9[0], p9[1], p8[0], p8[1], p6[0], p6[1], p3[0], p3[1]];
	    return [firsthalf, secondhalf];
	}
}

function lineLength(p1) {
  return Math.hypot(p1[6] - p1[0], p1[7] - p1[1]);
}

function stripes(val, dim, num, mod) {
	if (int(val/(dim/num))%mod == 0) {
		return true;
	}
	else {
		return false;
	}
}

function getDistance(x1, y1, x2, y2) {
	
	let xs = x2 - x1,
		ys = y2 - y1;		
	
	xs *= xs;
	ys *= ys;
	 
	return Math.sqrt( xs + ys );
};


function packCircles(circles, radius, count, colors){
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < 1000; j++) {
			let x = Math.floor(random() * w * 2 - w/2),
				y = Math.floor(random() * h * 2 - h/2);
			let works = true;
			for (let k = 0; k < circles.length; k++) {
				if (getDistance(circles[k][0], circles[k][1], x, y) < circles[k][2] + radius) {
					works = false;
					break;
				}
			}
			if (works == true) {
				circles.push([x, y, radius, colors[Math.floor(random()*colors.length)]]);
				break;
			}
		}

	}
}

function preload() {
  img = loadImage('woman.png');
}


function setup() {
	setAttributes('antialias', true);
	smooth();
	createCanvas(w, h);
	noLoop();
	randomSeed(seed);
}

function draw() {

	//Color Definitions

	//colorMode(HSB);
	background('white');
	//image(img, 0, 0);
	noStroke();


	c = []
	//cl = [color(111, 90, 80,),
	//		  color(15, 90, 80,),
	//		  color(200, 90, 80,),];
	cl = [color(50, 90, 200,),
			  color(15, 150, 80,),
			  color(200, 90, 80,),];
	/*cm = [color(111, 40, 90,),
			  color(15, 40, 90,),
			  color(30, 60, 100,),
			  color('white'),
			  color(200, 40, 90,),];
	cm = [color(111, 70, 90, .5),
		  color(15, 70, 90, .5),
		  color(30, 90, 100, .5),
		  //color('white'),
		  color(200, 70, 90, .5),];*/

	cm = [color('#f0f0e0'),
		  color('#fdcb4a'),
		  color('#72777d'),
		  color('#41444b')];
	tn = [color('white')];

	//Circle packing to create evenly distributed random points

	packCircles(c, 150*scr, 50*scl, cm);

	//Triangles from the circle centers

	points = []
	for (let i = 0; i < c.length; i += 1) {
		points.push([c[i][0],c[i][1]]);
	}
	//for (let i = 0; i < svgpath.length; i++) {
	//	points.push([svgpath[i][svgpath[i].length-2], svgpath[i][svgpath[i].length-1]]);
	//}

	
	//for (let i = 0; i < 10000; i += 1) {
	//	let x = Math.floor(random() * w*2 - w/2);
	//	let y = Math.floor(random() * h*2 - h/2);
	//	if (get(x,y)[0] == 255) {
	//		points.push([x,y]);
	//	}
	//}
	const delaunay = Delaunator.from(points);

	// Convert weird library format to triange coordinates

	coordinates = [];
	const rd = 20;
	fill('white');
	//stroke('black');
	for (let i = 0; i < delaunay.triangles.length; i += 3) {
			let x1 = points[delaunay.triangles[i]][0];
			let y1 = points[delaunay.triangles[i]][1];
			let x2 = points[delaunay.triangles[i+1]][0];
			let y2 = points[delaunay.triangles[i+1]][1];
			let x3 = points[delaunay.triangles[i+2]][0];
			let y3 = points[delaunay.triangles[i+2]][1];
		//if (get(x1,y1)[0] != 255 && get(x2,y2)[0] != 255 && get(x3,y3)[0] != 255) {
		    coordinates.push([		    	
		        [x1, y1, x1, y1, x2, y2, x2, y2],
		        [x2, y2, x2, y2, x3, y3, x3, y3],
		        [x3, y3, x3, y3, x1, y1, x1, y1],
		        Math.floor(random()*rd),
		        cm[Math.floor(random()*cm.length)],
		        0
		    ]);
		    //triangle(x1, y1, x2, y2, x3, y3);
		//}   
		
		
	}
	//noStroke();
	/*coordinates.push([		    	
	        [100,100,200,100,400,500,500,500],
	        [500, 500, 500, 500, 100, 500, 100, 500],
	        [100, 500, 100, 500, 100,100,100,100],
	        Math.floor(random()*rd),
	        cm[Math.floor(random()*cm.length)],
	        0
	    ]);*/

	for (let j = 0; j < rd; j += 1) {
		ccopy = [];
		for (let i = 0; i < coordinates.length; i += 1) {
			if (coordinates[i][3] < j*0.7 || coordinates[i][3] < 2) {  // don't modify
				ccopy.push(coordinates[i]);
			} else {
				let d1 = lineLength(coordinates[i][0]); //find longest side to split
				let d2 = lineLength(coordinates[i][1]);
				let d3 = lineLength(coordinates[i][2]);
				let m = [0,1,2];
				if (d2 > d1) {
					m = [1,2,0];
				}
				if (d3 > d1 && d3 > d2) {
					m = [2,0,1];
				}

				let p1 = coordinates[i][m[0]]; //map coords based on longest side
				let p2 = coordinates[i][m[1]];
				let p3 = coordinates[i][m[2]];
				let ps = splitcurve(p1, .5);   //split longest side
				let p4 = [ps[1][0], ps[1][1], ps[1][0], ps[1][1], p3[0], p3[1], p3[0], p3[1]]; //from split to opposite vertex
				if (Math.floor(random()*10) > 8) {
					if (j < rd/3) {  
						ccopy.push([ps[0], p4, p3, Math.floor(random()*rd),
							cm[Math.floor(random()*cm.length)], j+1]);
						ccopy.push([ps[1], p2, rev(p4), Math.floor(random()*rd),
							cm[Math.floor(random()*cm.length)], j+1]);
					} else {
						ccopy.push([ps[0], p4, p3, Math.floor(random()*rd),
							cl[Math.floor(random()*cl.length)], j+1]);
						ccopy.push([ps[1], p2, rev(p4), Math.floor(random()*rd),
							cl[Math.floor(random()*cl.length)], j+1]);
					}
				} else {
					ccopy.push([ps[0], p4, p3, Math.floor(random()*rd), coordinates[i][4], j+1]);
					ccopy.push([ps[1], p2, rev(p4), Math.floor(random()*rd), coordinates[i][4], j+1]);
				}
			}
		}
		coordinates = ccopy;
	}

	// Actual Drawing

	drawCache = createGraphics(w, h);
	drawCache.noStroke();

	for (let i = 0; i < coordinates.length; i += 1) {
		if (coordinates[i][4].toString() != 'rgba(255,255,255,1)') {
			if (coordinates[i][5] > 9) {
				let b1 = coordinates[i][0],
					b2 = coordinates[i][1],
					b3 = coordinates[i][2];
				drawCache.fill(coordinates[i][4]);
				if (coordinates[i][5] > 8) {
				} else {
					drawCache.noStroke();
				}
				drawCache.beginShape();
				drawCache.vertex(b1[0], b1[1]);
				drawCache.bezierVertex(b1[2], b1[3], b1[4], b1[5], b1[6], b1[7]);
				drawCache.bezierVertex(b2[2], b2[3], b2[4], b2[5], b2[6], b2[7]);
				drawCache.bezierVertex(b3[2], b3[3], b3[4], b3[5], b3[6], b3[7]);
				drawCache.vertex(b1[0], b1[1]);
				drawCache.endShape();
			} else {
				let b1 = coordinates[i][0],
					b2 = coordinates[i][1],
					b3 = coordinates[i][2];
				fill(coordinates[i][4]);
				beginShape();
				vertex(b1[0], b1[1]);
				bezierVertex(b1[2], b1[3], b1[4], b1[5], b1[6], b1[7]);
				bezierVertex(b2[2], b2[3], b2[4], b2[5], b2[6], b2[7]);
				bezierVertex(b3[2], b3[3], b3[4], b3[5], b3[6], b3[7]);
				vertex(b1[0], b1[1]);
				endShape();

			}
		}
	}
	blendMode(ADD);
	image(img, 0, 0);
	blendMode(BLEND);
	image(drawCache, 0, 0);


}