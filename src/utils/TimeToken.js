export default class TimeToken
{
  /**
   * 36^5 = 60466176
   * 60466176 / 60 / 60 / 24 / 10 = 69.984 days
   * Which means, 100 ms generate a number and cycle in 69 days
   * @param {*} len 
   * @param {*} interval 
   * @param {*} map 
   */
  constructor(len=5, interval=10, map=null) {
    this.len = len;
    this.interval = interval;
    this.map = map || [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','+','p','q','r','s','t','u','v','w','x','y','z'];
    

    this.rseed = Date.now();
  }

  gen() {
    // e.g., 4 digits, 35 characters to choose from.
    // Gives 35*35*35*35 combinations. When you modulate the time with
    // this number, it ensures value in 35*35*35*35 range, that is 4 digits long.
    let cycle = Math.pow(this.map.length, this.len);

    // Make time change in an interval and cycle around
    let n = Math.ceil(Date.now()/this.interval) % cycle;

    // hash function to "random spread" the time sequence, 
    // so no one can guess what is the next(as HMAC key is used)
    // let sha = new jssha('SHA-512', "TEXT");
    // sha.setHMACKey("secret seed of the user from database stored in localstorage", "TEXT");
    // sha.update(n+'');
    // n = parseInt(sha.getHMAC('HEX'), 16);

    let token = '';
    for(let i=0; i<this.len; ++i) {
      let d = n/Math.pow(this.map.length, i) % this.map.length | 0
      token = this.map[d] + token;
    }
    return token;
  }

  /**
   * Not sure how to retain the seed probably, therefore not used for token generation.
   */
  lcg() {
    let cycle = Math.pow(this.map.length, this.len);

    // http://preshing.com/20121224/how-to-generate-a-sequence-of-unique-random-integers/#IDComment721196103
    // https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
    this.rseed = (69069*this.rseed + 1) % 4294967296;
    let n = this.rseed/4294967296 * cycle;

    let token = '';
    for(let i=0; i<this.len; ++i) {
      let d = n/Math.pow(this.map.length, i) % this.map.length | 0
      token = this.map[d] + token;
    }
    return token;
  }
}