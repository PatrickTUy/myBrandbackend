// import chai, { expect } from "chai";
// import chaiHttp from "chai-http";
// import app from "../src/app.js";
// import "dotenv/config";
// import article from "../src/models/article.js";

// chai.use(chaiHttp);
// describe("ARTICLE END-POINT TESTING", () => {
//   let articleId = '';
//   it("Should retrieve the articles", (done) => {
//     chai
//       .request(app)
//       .get("/api/v1/articles/")
//       .send()
//       .end((err, res) => {
//         articleId = res.body.data[0]._id;
//         expect(res).to.have.property("status");
//         expect(res.body).to.have.property("message");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });
//   it("Should not retrieve the articles", (done) => {
//     chai
//       .request(app)
//       .get("/api/v1/aritcle/")
//       .send()
//       .end((err, res) => {
//         expect(res).to.have.status([404]);
//         done();
//       });
//   });
//   let token = "";

//   it("should add article while logged in", (done) => {
//     chai
//       .request(app)
//       .post("/api/v1/articles")
//       .set("Authorisation", `Bearer ${token}`)
//       .set("Content-Type", "multipart/form-data")
//       .field({ title: "postM", content: "perfect" })
//       .attach("image", "./elon musk.jpg")
//       .end((req, res) => {

//         expect(res).to.have.status([200]);
//         expect(res.body).to.have.property("message");
//         expect(res.body).to.have.property("data");
//         expect(res.body).to.be.a("object");
//         done();
//       });
//   });
//   it("should not add article while logged in", (done) => {
//     chai
//       .request(app)
//       .post("/api/v1/articles")
//       .set("Authorisation", `Bearer ${token}`)
//       .set("Content-Type", "multipart/form-data")
//       .field({ title: " ", content: "perfect" })
//       .attach("image", "./elon musk.jpg")
//       .end((req, res) => {
//         articleId = res.body.data._id;
//         expect(res).to.have.status([403]);
//         done();
//       });
//   });
// });
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import Article from "./../src/models/article.js";

let articleId;

const getArticleId = async () => {
  const all = await Article.find();
  let id = all[0]._id;
  return id;
};

(async () => {
  articleId = await getArticleId();
})();

chai.use(chaiHttp);
describe("ARTICLE END-POINT TESTING", () => {
  it("Should retrieve the articles", (done) => {
    chai
      .request(app)
      .get("/api/v1/articles/")
      .send()
      .end((err, res) => {
        expect(res).to.have.property("status");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        done();
      });
  });
  it("Should not retrieve the articles", (done) => {
    chai
      .request(app)
      .get("/api/v1/aritcle/")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([404]);
        done();
      });
  });
  it("Should  retrieve the article by id", (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleId}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status([200]);
        expect(res).to.have.property("status");
        expect(res.body).to.have.property("message");
        expect(res.body).to.be.a("object");
        done();
      });
  });
});
