class MostUsed {
  ipMap: Map<string, number>;
  freq: Array<string>;

  constructor() {
    this.ipMap = new Map();
    this.freq = [];
  }

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

  findAndRemove(ipAddress: string) {
    let l = 0,
      r = this.freq.length - 1;
    const current = this.ipMap.get(ipAddress) ?? 1;
    while (l <= r) {
      let middle = Math.floor((r - l) / 2) + l;
      const curIp = this.freq[middle];
      if ((this.ipMap.get(curIp) ?? 0) > current) {
        l = middle + 1;
      } else {
        if (
          curIp === ipAddress ||
          current - 1 === (this.ipMap.get(curIp) ?? 0)
        ) {
          for (let i = middle; i < this.freq.length; i++) {
            if (this.freq[i] === ipAddress) {
              return this.freq.splice(i, 1);
            }
          }
          return -1;
        }
        r = middle - 1;
      }
    }
    return -1;
  }

  requestHandled(ipAddress: string) {
    const oldAmt = this.ipMap.get(ipAddress) ?? 0;
    const newAmt = oldAmt + 1;
    this.ipMap.set(ipAddress, newAmt);
    if (this.freq.length < 100) {
      this.findAndRemove(ipAddress);
      return this.insertIntoFrequent(ipAddress, newAmt);
    } else {
      const currentLowestIp = this.freq[this.freq.length - 1];
      const currentLowestAmt = this.ipMap.get(currentLowestIp) ?? 0;
      if (currentLowestAmt < newAmt) {
        this.findAndRemove(ipAddress);
        this.insertIntoFrequent(ipAddress, newAmt);
      }
    }
  }

  clear() {
    this.ipMap = new Map();
    this.freq = [];
  }

  get100() {
    return this.freq;
  }
}

module.exports = MostUsed;
