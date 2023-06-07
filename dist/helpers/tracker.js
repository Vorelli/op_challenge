"use strict";
class MostUsed {
    constructor() {
        this.ipMap = new Map();
        this.freq = [];
    }
    insertIntoFrequent(ipAddress, amt) {
        var _a;
        let l = 0;
        let r = this.freq.length - 1;
        while (l < r) {
            let m = Math.floor((r - l) / 2) + l;
            let mEle = this.freq[m];
            let mAmt = (_a = this.ipMap.get(mEle)) !== null && _a !== void 0 ? _a : 0;
            if (mAmt <= amt) {
                if (mEle === ipAddress) {
                    return;
                }
                r = m - 1;
            }
            else if (mAmt > amt) {
                l = m + 1;
            }
        }
        this.freq.splice(l, 0, ipAddress);
        if (this.freq.length > 100) {
            this.freq.pop();
        }
    }
    findAndRemove(ipAddress) {
        var _a, _b, _c;
        let l = 0, r = this.freq.length - 1;
        const current = (_a = this.ipMap.get(ipAddress)) !== null && _a !== void 0 ? _a : 1;
        while (l <= r) {
            let middle = Math.floor((r - l) / 2) + l;
            const curIp = this.freq[middle];
            if (((_b = this.ipMap.get(curIp)) !== null && _b !== void 0 ? _b : 0) > current) {
                l = middle + 1;
            }
            else {
                if (curIp === ipAddress ||
                    current - 1 === ((_c = this.ipMap.get(curIp)) !== null && _c !== void 0 ? _c : 0)) {
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
    requestHandled(ipAddress) {
        var _a, _b;
        const oldAmt = (_a = this.ipMap.get(ipAddress)) !== null && _a !== void 0 ? _a : 0;
        const newAmt = oldAmt + 1;
        this.ipMap.set(ipAddress, newAmt);
        if (this.freq.length < 100) {
            this.findAndRemove(ipAddress);
            return this.insertIntoFrequent(ipAddress, newAmt);
        }
        else {
            const currentLowestIp = this.freq[this.freq.length - 1];
            const currentLowestAmt = (_b = this.ipMap.get(currentLowestIp)) !== null && _b !== void 0 ? _b : 0;
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
