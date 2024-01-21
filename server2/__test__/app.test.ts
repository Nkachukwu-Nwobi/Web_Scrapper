import http from "http";
import {
  describe,
  expect,
  test,
  it,
  beforeAll,
  afterAll,
  jest,
} from "@jest/globals";

import supertest from "supertest";
import Server from "../server2/app";
 
let server: http.Server;
let request: supertest.SuperTest<supertest.Test>;
 
beforeAll(() => {
  //   server = Server.listen(0); // Listen on a random port
  request = supertest(Server);
});
 
afterAll((done) => {
  //   server.close(done);
  Server.close(done);
});
 
describe("GET", () => {
  it("should return scraped data for a valid URL", async () => {
    const url = "https://www.mikano.com/"; 
    // url for testing
    const response = await request.get(`?url=${encodeURIComponent(url)}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("Title");
    expect(response.body).toHaveProperty("Description");
    expect(response.body).toHaveProperty("Images");
  });
 
  it("should handle missing URL parameter with a 400 status code", async () => {
    const response = await request.get("/");
 
    expect(response.status).toBe(400);
    expect(response.text).toContain("Bad Request - Missing URL Parameter");
  });
});