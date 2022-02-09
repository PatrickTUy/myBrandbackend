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
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import {
  userData,
  userData2,
  userDatatoDelete,
  validUser2,
} from "./dummyData.js";
import User from "./../src/models/user.js";

chai.use(chaiHttp);
describe("USER END-POINT TESTING", () => {
  before(async () => {
    await User.deleteMany({ email: userData2.email });
  });

  it("It should register the user", (done) => {
    chai
      .request(app)
      .post("/api/v1/users/register")
      .send(userData2)
      .end((err, res) => {
        expect(res).to.have.status([201]);
        done();
      });
  });

  it("It should register the user for deleting", (done) => {
    chai
      .request(app)
      .post("/api/v1/users/register")
      .send(userDatatoDelete)
      .end((err, res) => {
        expect(res).to.have.status([201]);
        done();
      });
  });

  let token2 = "";
  it("It should loggin the user", (done) => {
    chai
      .request(app)
      .post("/api/v1/users/login")
      .send(validUser2)

      .end((err, res) => {
        token2 = res.body.accessToken;
        expect(res.body).to.have.property("accessToken");
        done();
      });
  });
  it("When logged in Should update profile info", (done) => {
    chai
      .request(app)
      .patch(`/api/v1/users/${userData2.email}`)
      .set("Authorization", `Bearer ${token2}`)
      .send({ username: "kabby" })
      .end((err, res) => {
        expect(res).to.have.property("status");
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("When not logged in, should not update profile information", (done) => {
    chai
      .request(app)
      .patch(`/api/v1/users/${userDatatoDelete.email}`)
      .send()
      .end((err, res) => {
        expect(res.body).to.have.property("error");
        expect(res).to.have.status([401]);
        done();
      });
  });

  it("Should not delete user when not authorized", (done) => {
    chai
      .request(app)
      .delete(`/api/v1/users/${userData2.email}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status([401]);
        done();
      });
  });

  it("Should delete user when authorized", (done) => {
    chai
      .request(app)
      .delete(`/api/v1/users/${userDatatoDelete.email}`)
      .set("Authorization", `Bearer ${token2}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res).to.have.property("status");
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
