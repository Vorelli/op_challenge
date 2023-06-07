const app = require("./server");
const E = require("express");
const request = require("supertest");

describe("server", () => {
  it("should store ip in top 100", async () => {
    await request(app).get("/").set("X-Forwarded-For", "1").expect(200);
    request(app)
      .get("/100")
      .expect("Content-Type", /json/)
      .then((res: E.Response) => {
        expect(res.body[0]).toBe("1");
      });
  }, 500);

  it("should allow client to clear top 100", async () => {
    await request(app).get("/").set("X-Forwarded-For", "1").expect(200);
    await request(app).get("/clear");
    request(app)
      .get("/100")
      .then((res: E.Response) => {
        expect(res.body.length).toBe(0);
      });
  });

  it("should actually order them by frequency", async () => {
    await request(app).get("/").set("X-Forwarded-For", "1").expect(200);
    const requests = [];
    for (let i = 0; i < 11; i++) {
      requests.push(
        request(app)
          .get("/")
          .set("X-Forwarded-For", (i % 2) + "")
      );
    }
    Promise.all(requests).then(() => {
      request(app)
        .get("/100")
        .expect("Content-Type", /json/)
        .then((res: E.Response) => {
          expect(res.body[0]).toBe("0");
        });
    });
  });
});
