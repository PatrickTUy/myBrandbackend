// import chai, { expect, request } from "chai";
// import chaiHttp from "chai-http";
// import app from "../src/app.js";
// import "dotenv/config";
// import { userData, validUser } from "./dummyData.js";

// chai.use(chaiHttp);
// describe("USER-ENDPOINT-TEST", () => {
//   let token = "";
//   it("should accept user to login", (done) => {
//     request(app)
//       .post("/api/v1/users/login")
//       .send(validUser)
//       .end((err, res) => {
//         if (err) console.log(err);
//         token = res.body.accessToken;

//         expect(res.body).to.have.property("message");
//         expect(res.body).to.have.property("accessToken");
//         done();
//       });
//   });
//   it("should not accept user to login", (done) => {
//     request(app)
//       .post("/api/v1/users/longin")
//       .send()
//       .end((err, res) => {
//         expect(res.status).to.equal(404);
//         done();
//       });
//   });
// });
