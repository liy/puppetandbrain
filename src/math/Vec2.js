export default class Vec2
{
	static min(v1, v2) {
		return new Vec2(Math.min(v1.x, v2.x), Math.min(v1.y, v2.y));
	}

	static max(v1, v2) {
		return new Vec2(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
	}

	static sub(v1, v2) {
		return new Vec2(v1.x-v2.x, v1.y-v2.y);
	}

	static add(v1, v2) {
		return new Vec2(v1.x+v2.x, v1.y+v2.y);
	}

	static reflect(i, n) {
		// R = 2 * N  * (I . N) - I
		return n.clone().scale(2).scale(i.dot(n)).sub(i);
	}

	static scale(v, s) {
		return new Vec2(v.x*s, v.y*s);
	}

	constructor(x=0, y=0) {
		if(typeof x === 'object') {
			this.x = x.x;
			this.y = x.y;
		}
		else {
			this.x = x;
			this.y = y;
		}
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	sub(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	} 

	scale(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	dot(v) {
		return this.x*v.x + this.y*v.y;
	}

	cross(v) {
		return this.x*v.y - this.y*v.x;
	}

	/**
	* Rotate this vector by an angle.
	* If you want to rotate to a specifc angle use setAngle instead.
	* <p>
	* <code>
	* finalRadian = currentRadian + $radian ----> fr = cr + r</br>
	* nx = scale&#42;cos(cr+r) ----> nx = scale&#42;cos(cr)&#42;cos(r) - scale&#42;sin(cr)&#42;sin(r)</br>
	* ny = scale&#42;sin(cr+r) ----> ny = scale&#42;sin(cr)&#42;cos(r) + scale&#42;cos(cr)&#42;sin(r)</br>
	* x = scale&#42;cos(cr)</br>
	* y = scale&#42;sin(cr)</br>
	* SO:</br>
	* nx = x&#42;cos(r) - y&#42;sin(r)
	* ny = y&#42;cos(r) + x&#42;sin(r)
	* </code>
	* </p>
	* @param $radian Angle in radian.
	*
	*/
	rotate(radian) {
		var cos = Math.cos(radian);
		var sin = Math.sin(radian);
	
		var nx = this.x*cos - this.y*sin;
		var ny = this.x*sin + this.y*cos;
	
		this.x = nx;
		this.y = ny;
	}

	/**
	* Check a vector is perpendicular to this vector.
	* If their dot product is 0 (Since cos(0) is 0), then they are
	* perpendicular to each other.
	* @param $v A Vector2D instance.
	* @return True if they are perpendicular to each other.
	*
	*/
	isPerpTo(v) {
		return this.dot(v) === 0;
	}

	set len(v) {
		var len = this.len;
		if(len!==0){
			var scale = v/len;
			this.x = this.x*scale;
			this.y = this.y*scale;
		}
		else
			this.x = v;
	}

	get len() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	get len2() {
		return this.x*this.x + this.y*this.y;
	}

	normalize() {
		this.len = 1;
		return this;
	}

	equals(v) {
		return this.x == v.x && this.y == v.y;
	}

	get isZero() {
		return this.x === 0 && this.y === 0;
	}

	zero() {
		this.x = this.y = 0;
	}

	reverse() {
		this.x =- this.x;
		this.y =- this.y;
		return this;
	}

	abs() {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		return this;
	}

	clone() {
		return new Vec2(this.x, this.y);
  }
  
  pod() {
    return {
      x: this.x,
      y: this.y
    }
  }
}
