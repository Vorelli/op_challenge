class BiggerMap {
  maps: [Map<string, number>];
  max: number;
  len: number[];

  constructor() {
    this.maps = [new Map()];
    this.max = 16000000;
    this.len = [0];
  }

  get(k: string) {
    for (let i = 0; i < this.maps.length; i++) {
      const cur = this.maps[i].get(k);
      if (cur !== undefined) {
        return cur;
      }
    }
    return undefined;
  }

  set(k: string, v: number) {
    for (let i = 0; i < this.maps.length; i++) {
      const cur = this.maps[i].get(k);
      if (cur !== undefined) {
        return this.maps[i].set(k, v);
      }
    }
    if (this.len[this.len.length - 1] < this.max) {
      this.maps[this.maps.length - 1].set(k, v);
    } else {
      this.maps.push(new Map());
      this.maps[this.maps.length - 1].set(k, v);
    }
  }
}
