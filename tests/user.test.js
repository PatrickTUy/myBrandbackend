import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
chai.use(chaiHttp);
describe("USER-ENDPOINT-TEST", () => {
  it("should accept user to login", (done) => {
    request(app)
      .post("api/v1/users/login")
      .send({
        email: "exampl@gmail.com",
        password: "exampl12@!",
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it("should not accept user to login", (done) => {
    request(app)
      .post("api/v1/users/longin")
      .send({
        email: "yangeney@gmail.com",
        password: "yange@1!",
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
