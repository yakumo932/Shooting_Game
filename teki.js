//
//teki.js 敵関連
//
// 敵弾クラス
class Teta extends CharaBase {
	constructor(sn, x, y, vx, xy, t) {
		super(sn, x, y, vx, xy);
		this.r = 3;
		if (t == undefined) this.timer = 0;
		else this.timer = t;
	}
	update() {
		if (this.timer) {
			this.timer--;
			return;
		}
		super.update();
		//damageバージョン
		//if (!jiki.damage && checkHit(this.x, this.y, this.r, jiki.x, jiki.y, jiki.r))
		///mutekiバージョンへ変更
		if (!gameOver && !jiki.muteki && checkHit(this.x, this.y, this.r, jiki.x, jiki.y, jiki.r)) {

			this.kill = true;
			if ((jiki.hp -= 20) <= 0) {
				gameOver = true;
			}
			else {
				jiki.damage = 10;
				jiki.muteki = 60;
			}
		}
		this.sn = 14 + ((this.count >> 3) & 1);
	}
}
//敵クラス
class Teki extends CharaBase {

	//敵のバリエーションを増やす
	//constructor(snum, x, y, vx, vy)
	constructor(t, x, y, vx, vy) {
		//super(snum, x, y, vx, vy);
		super(0, x, y, vx, vy);
		this.tnum = tekiMaster[t].tnum;
		this.r = tekiMaster[t].r;
		this.mhp = tekiMaster[t].hp;
		this.hp = this.mhp;
		this.score = tekiMaster[t].score;
		this.flag = false;

		this.dr = 90;
		this.relo = 0;

		//矩形同士の当たり判定
		//this.w = 20;
		//this.h  = 20;

		//円同士の当たり判定
		//this.r = 10;
		//this.tnum = tnum;
	}

	update() {


		//共通のアップデート
		if (this.relo) this.relo--;

		super.update();

		//tekiMove();

		//個別のアップデート
		tekiFunc[this.tnum](this);

		//サブルーチンに変更
		/*if (!this.flag) {
			if (jiki.x > this.x && this.vx < 120) this.vx += 4;
			else if (jiki.x < this.x && this.vx > -120) this.vx -= 4;
		}
		else {
			if (jiki.x < this.x && this.vx < 400) this.vx += 30;
			else if (jiki.x > this.x && this.vx > -400) this.vx -= 30;
		}

		//sin.cos.tan ・三平方の定理（ピタゴラスの定理）
		if (Math.abs(jiki.y - this.y) < (100 << 8) && !this.flag) {
			this.flag = true;

			/*始点から見て目標への角度を取得するにはアークタンジェントを使います。
				角度＝atan(高さ/底辺)で求まります。
				高さは、jiki.y(目標)-this.y(始点)
				底辺は、jiki.x(目標)-this.x(始点)
				アークタンジェントはatanではなく、Math.atan2を使います。
				角度からベクトルを計算する場合はサイン・コサインを使います。
				x座標＝ｃｏｓθ
				y座標＝ｓｉｎθ
				で簡単に求まります。
				尚、この場合は半径は1として、cos,sinはそれぞれ0～1までの間を返しています。
				なので、移動量は別途掛ける必要があります。

			let an, dx, dy;
			an = Math.atan2(jiki.y - this.y, jiki.x - this.x);

			dx = Math.cos(an) * 1000;		//今回は移動スピードとして1000を掛けました。実際は1000/256ピクセルで、
			dy = Math.sin(an) * 1000;	 //1フレームに約4ピクセル動く速度です。



			teta.push(new Teta(15, this.x, this.y, dx, dy));
		}
		if (this.flag && this.vx > -800) this.vy -= 30;*/

		//当たり判定
		//damageバージョン
		//if (!jiki.damage && checkHit(this.x, this.y, this.r, jiki.x, jiki.y, jiki.r))
		//mutekiバージョンへ変更
		/*if (!jiki.muteki && checkHit(this.x, this.y, this.r, jiki.x, jiki.y, jiki.r)) {

			this.kill = true;
			jiki.damage = 10;
			jiki.muteki = 60;
		}*/


		//当たり判定
		if (!gameOver && !jiki.muteki && checkHit(this.x, this.y, this.r, jiki.x, jiki.y, jiki.r)) {

			if (this.mhp < 500) this.kill = true;

			if ((jiki.hp -= 20) <= 0) {
				gameOver = true;
			}
			else {
				jiki.damage = 10;
				jiki.muteki = 60;
			}
		}


		/*　おまけ（余談）？w　sin.cos.tan ・三平方の定理（ピタゴラスの定理）PI/180
		移動量は、ピタゴラスの定理(三平方の定理)で求める事もできます。
		この場合は角度を求めません。
		c2 = a2 + b2
		(2は二乗と見てください)
		つまり、
		c = √a2 + b2
		JavaScriptではsqrtを使います。
		c = Math.sqrt( (jiki.y-this.y)**2 , (jiki.x-this.x)**2 ); これで斜めの辺の長さが求められます。
		この長さを1としますので、x,yのベクトルは
		vx = a/c;
		vy = b/c;
		で求める事ができます。

		if ( Math.abs ( jiki.y - this.y ) < ( 100 << 8 ) )
		{
			this.flag = true;

			let an,dx,dy;
			an = Math.atan2( jiki.y - this.y , jiki.x - this.x );

			an += rand( -20 , 20) * Math.PI/180;

			dx = Math.cos( an ) * 1000;
			dy = Math.sin ( an ) * 1000;


			teta.push( new Teta ( 15, this.x, this.y, dx, dy ));
		}
		if ( this.flag && this.vx > -800 ) this.vy -= 30;
	}

	draw() {
		super.draw();
	}*/
	}
}

//弾を自機に向けて発射する
function tekiShot(obj, speed) {

	if (gameOver) return;
	let px = (obj.x >> 8);
	let py = (obj.y >> 8);
	if (px - 40 < camera_x || px + 40 >= camera_x + SCREEN_W
		|| py - 40 < camera_y || py + 40 >= camera_y + SCREEN_H) return;

	let an, dx, dy;
	an = Math.atan2(jiki.y - obj.y, jiki.x - obj.x);
	dx = Math.cos(an) * speed;		//今回は移動スピードとして1000を掛けました。実際は1000/256ピクセルで、
	dy = Math.sin(an) * speed;	 //1フレームに約4ピクセル動く速度です。
	teta.push(new Teta(15, obj.x, obj.y, dx, dy));
}

//ピンクのヒヨコの移動パターン
function tekiMove01(obj) {
	if (!obj.flag) {
		if (jiki.x > obj.x && obj.vx < 120) obj.vx += 4;
		else if (jiki.x < obj.x && obj.vx > -120) obj.vx -= 4;
	}
	else {
		if (jiki.x < obj.x && obj.vx < 400) obj.vx += 30;
		else if (jiki.x > obj.x && obj.vx > -400) obj.vx -= 30;
	}

	//sin.cos.tan ・三平方の定理（ピタゴラスの定理）
	if (Math.abs(jiki.y - obj.y) < (100 << 8) && !obj.flag) {
		obj.flag = true;
		tekiShot(obj, 600);
	}
	if (obj.flag && obj.vx > -800) obj.vy -= 30;

	//スプライトの変更
	const ptn = [39, 40, 39, 41];
	obj.sn = ptn[(obj.count >> 3) & 3];
	//const ptn = [45,46,45,47];
	//obj.sn = ptn[ (obj.count>>3)&3 ];
	//const ptn = [51, 52, 51, 53];
	//obj.sn = ptn[ (obj.count>>3)&3 ];
	//obj.sn = 73;
}


//黄色のヒヨコの移動パターン
function tekiMove02(obj) {
	if (!obj.flag) {
		if (jiki.x > obj.x && obj.vx < 600) obj.vx += 30;
		else if (jiki.x < obj.x && obj.vx > -600) obj.vx -= 30;
	}
	else {
		if (jiki.x < obj.x && obj.vx < 600) obj.vx += 30;
		else if (jiki.x > obj.x && obj.vx > -600) obj.vx -= 30;
	}

	//sin.cos.tan ・三平方の定理（ピタゴラスの定理）
	if (Math.abs(jiki.y - obj.y) < (100 << 8) && !obj.flag) {
		obj.flag = true;
		tekiShot(obj, 600);
	}
	//teta.push(new Teta(15,obj.x,obj.y,dx,dy));
	//tekiShot(obj, 600);
	//if (obj.flag && obj.vx > -800) obj.vy -= 30;

	//スプライトの変更
	//const ptn = [33,34,33,35];
	//obj.sn = ptn[ (obj.count>>3)&3 ];
	const ptn = [57,58,57,59];
	obj.sn = ptn[ (obj.count>>3)&3 ];
	//const ptn = [45, 46, 45, 47];
	//obj.sn = ptn[(obj.count >> 3) & 3];
}

//ボスキャラの移動パターン
function tekiMove03(obj) {

	if (!obj.flag && (obj.y >> 8) >= 70) obj.flag = 1;
	if (obj.flag == 1) {

		if ((obj.vy -= 2) <= 0) {
			obj.flag = 2;
			obj.vy = 0;
		}
	}
	else if (obj.flag == 2) {
		if (obj.vx < 300) obj.vx += 10;
		if ((obj.x >> 8) > (FIELD_W - 100)) obj.flag = 3;
	}
	else if (obj.flag == 3) {
		if (obj.vx > - 300) obj.vx -= 10;
		if ((obj.x >> 8) < 100) obj.flag = 2;
	}

	//弾の発射
	if (obj.flag > 1) {
		let an, dx, dy;
		an = obj.dr * Math.PI / 180;
		dx = Math.cos(an) * 300;
		dy = Math.sin(an) * 300;
		let x2 = (Math.cos(an) * 70) << 8;
		let y2 = (Math.sin(an) * 70) << 8;

		teta.push(new Teta(15, obj.x + x2, obj.y + y2, dx, dy, 60));
		if ((obj.dr += 14) >= 360) obj.dr = 0;
	}

	//追加攻撃
	if (obj.hp < obj.mhp / 2) //if(1)
	{
		let c = obj.count % (60 * 5);
		if (c / 10 < 4 && c % 10 == 0) {
			let an, dx, dy;
			an = (90 + 45 - (c / 10) * 30) * Math.PI / 180;
			dx = Math.cos(an) * 300;
			dy = Math.sin(an) * 300;
			let x2 = (Math.cos(an) * 70) << 8;
			let y2 = (Math.sin(an) * 70) << 8;

			teki.push(new Teki(3, obj.x + x2, obj.y + y2, dx, dy,));
		}
	}

	//スプライト指定
	obj.sn = 77;

}
//ボスヒヨコの子供移動パターン
function tekiMove04(obj) {

	if (obj.count == 10) {
		obj.vx = obj.vy = 0;
	}
	if (obj.count == 60) {
		if (obj.x > jiki.x) obj.vx = - 30;
		else obj, vx = 30;
		obj.vy = 100;
	}
	if (obj.count > 100 && !obj.relo) {
		if (rand(0, 100) == 1) {
			tekiShot(obj, 300);
			obj.relo = 200;
		}
	}


	//スプライトの変更
	//const ptn = [33,34,33,35];
	//obj.sn = ptn[ (obj.count>>3)&3 ];
	//const ptn = [57,58,57,59];
	//obj.sn = ptn[ (obj.count>>3)&3 ];
	//const ptn = [45, 46, 45, 47];
	//obj.sn = ptn[(obj.count >> 3) & 3];
	const ptn = [51, 52, 51, 53];
	obj.sn = ptn[(obj.count >> 3) & 3];
}

let tekiFunc = [
	tekiMove01,
	tekiMove02,
	tekiMove03,
	tekiMove04,
];
