// import chai, { expect } from "chai";
// import chaiHttp from "chai-http";
// import app from "../src/app.js";
// import "dotenv/config";
// import Comment from "../src/models/comment.js";
// import Article from "../src/models/article.js";

// chai.use(chaiHttp);
// describe("COMMENT END-POINT TESTING", () => {
//   let article = "";
//   before(async () => {
//     await Comment.deleteMany({});
//     await Article.deleteMany({});

//     const COMMENT = await Comment({
//       name: "rudi",
//       comment: "gigigi",
//     });
//     const articleToUpdate = await Article({
//       title: "title1",
//       content: "gogogo",
//       image: "ruti",
//     });
//     console.log(COMMENT);
//     articleToUpdate.comments.push(COMMENT);
//     await articleToUpdate.save();

//     await COMMENT.save();

//     article = articleToUpdate;
//   });
//   it("Should retrieve the comments", (done) => {
//     chai
//       .request(app)
//       .get("/api/v1/comments/" + article._id)
//       .send()
//       .end((err, res) => {
//         console.log(res.body);
//         expect(res).to.have.status([200]);
//         expect(res.body).to.have.property("message");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });

//   it("Should not retrieve the comments", (done) => {
//     chai
//       .request(app)
//       .get("/api/v1/commentss/")
//       .send()
//       .end((err, res) => {
//         expect(res).to.have.status([404]);
//         done();
//       });
//   });
// });
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import { comment } from "./dummyData.js";
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
describe("COMMENT END-POINT TESTING", () => {
  it("It should Create the comment", (done) => {
    chai
      .request(app)
      .post(`/api/v1/comments/${articleId}`)
      .send(comment)
      .end((err, res) => {
        expect(res).to.have.status([201]);
        done();
      });
  });

  it("Should retrieve comments of the Article", (done) => {
    chai
      .request(app)
      .get(`/api/v1/articles/${articleId}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.property("status");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        done();
      });
  });
  it("Should not retrieve the comments", (done) => {
    chai
      .request(app)
      .get("/api/v1/cmments")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([404]);
        done();
      });
  });
});
