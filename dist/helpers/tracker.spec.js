"use strict";
const MostUsedIps = require("./tracker");
describe("mostUsedIps", () => {
    let a;
    beforeEach(() => {
        a = new MostUsedIps();
    });
    it("shouldn't create duplicate ips", () => {
        a.requestHandled("::1");
        expect(a.freq.length).toBe(1);
        a.requestHandled("::1");
        expect(a.freq.length).toBe(1);
    });
    it("should return the correct place to insert", () => {
        a.ipMap.set("0.0.0.0", 1);
        a.ipMap.set("1", 2);
        a.ipMap.set("3", 5);
        a.insertIntoFrequent("0.0.0.0", 1);
        expect(a.freq[0]).toBe("0.0.0.0");
        a.insertIntoFrequent("1", 2);
        expect(a.freq[1]).toBe("0.0.0.0");
        a.insertIntoFrequent("3", 5);
        expect(a.freq[0]).toBe("3");
    });
    it.only("should only hold 100 ips", () => {
        for (let i = 0; i < 102; i++) {
            a.requestHandled(i + "");
        }
        expect(a.freq[0]).toBe("99");
        expect(a.freq.length).toBe(100);
        a.requestHandled("1");
        expect(a.freq[0]).toBe("1");
    });
    it("should handle requests", () => {
        a.requestHandled("0");
        expect(a.ipMap.get("0")).toBe(1);
        a.requestHandled("0");
        expect(a.ipMap.get("0")).toBe(2);
        a.requestHandled("0");
        expect(a.ipMap.get("0")).toBe(3);
        a.requestHandled("0");
        expect(a.ipMap.get("0")).toBe(4);
        a.clear();
        expect(a.freq.length).toBe(0);
    });
});
