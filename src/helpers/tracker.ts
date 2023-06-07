const Bigger = require("./BiggerMap");

class MostUsed {
  ipMap: typeof Bigger;
  freq: Array<string>;

  constructor() {
    this.ipMap = new Bigger();
    this.freq = [];
  }

  // binary insert ipAddress into frequency array
  insertIntoFrequent(ipAddress: string, amt: number) {
    let l = 0;
    let r = this.freq.length - 1;
    while (l < r) {
      let m = Math.floor((r - l) / 2) + l;
      let mEle = this.freq[m];
      let mAmt = this.ipMap.get(mEle) ?? 0;
      if (mAmt <= amt) {
        if (mEle === ipAddress) {
          return;
        }
        r = m - 1;
      } else if (mAmt > amt) {
        l = m + 1;
      }
    }
    this.freq.splice(l, 0, ipAddress);
    if (this.freq.length > 100) {
      this.freq.pop();
    }
  }

  // check to the right and the left of an index for an
  // ipAddress and remove, if found
  findAndRemoveIter(ipAddress: string, m: number, currentAmt: number) {
    for (let i = m; i < this.freq.length; i++) {
      // loop through IPs with same number of requests
      if ((this.ipMap.get(this.freq[i]) ?? 0) > currentAmt) break;
      if (this.freq[i] === ipAddress) {
        return this.freq.splice(i, 1);
      }
    }
    for (let i = m; i >= 0; i--) {
      // loop through backwards (just in case)
      if ((this.ipMap.get(this.freq[i]) ?? 0) < currentAmt) break;
      if (this.freq[i] === ipAddress) {
        return this.freq.splice(i, 1);
      }
    }
  }

  // binary search to remove an ipAddress from the frequency array
  findAndRemove(ipAddress: string) {
    let l = 0,
      r = this.freq.length - 1;
    const currentAmt = this.ipMap.get(ipAddress) ?? 1;
    while (l <= r) {
      let m = Math.floor((r - l) / 2) + l;
      const mIp = this.freq[m];
      const mAmt = this.ipMap.get(mIp) ?? 0;
      if (mAmt > currentAmt) {
        l = m + 1;
      } else {
        if (mIp === ipAddress || currentAmt - 1 === mAmt) {
          this.findAndRemoveIter(ipAddress, m, currentAmt);
          return -1;
        }
        r = m - 1;
      }
    }
    return -1;
  }

  // this function takes in a string, increases its request amount
  // and modifies the frequency array, if necessary
  requestHandled(ipAddress: string) {
    const amt = (this.ipMap.get(ipAddress) ?? 0) + 1;
    this.ipMap.set(ipAddress, amt);
    const currentLowestIp = this.freq[this.freq.length - 1];
    const currentLowestAmt = this.ipMap.get(currentLowestIp) ?? 0;
    if (currentLowestAmt < amt || this.freq.length < 100) {
      this.findAndRemove(ipAddress);
      return this.insertIntoFrequent(ipAddress, amt);
    }
  }

  // reset the frequency array and the request amount map
  clear() {
    this.ipMap = new Map();
    this.freq = [];
  }

  // returns the top 100 ip addresses for number of requests sent
  get100() {
    return this.freq;
  }
}

module.exports = MostUsed;
