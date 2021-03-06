import chai, { should } from "chai";
import chaiHttp from "chai-http";
import app from "../index.mjs";
import sinon from "sinon";

import { userModel } from "../models/index.mjs";
import { postModel } from "../models/index.mjs";

chai.should();
chai.use(chaiHttp);

describe("ALL TEST ", () => {
  afterEach = () => {
    userModel.destroy({
      where: {},
      truncate: true,
    });
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpVU1QgVEVTVCIsImlhdCI6MTYzODEwMzg2OX0.OpykSblQQ4lSOWDWHzwzAbxOsNKVhm_P9ridvxSLxHI";

  describe("USER ROUTES TEST", () => {
    it("It should get Test WORKING FINE !!!!", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.body.should.be.eq("Test WORKING FINE !!!! ");
          res.should.have.status(200);

          done();
        });
    });
    it("It should get all Users", (done) => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.a("array");
          res.should.have.status(200);

          done();
        });
    });

    it("It should get Err if you hit wrong route", (done) => {
      chai
        .request(app)
        .get("/usersssss")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("It should signup as a new user ", (done) => {
      const user = {
        username: "JUST TEST",
        password: "123",
      };
      chai
        .request(app)
        .post("/signup")
        .send(user)
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.username.should.be.eq("JUST TEST");
          response.should.have.status(200);
          done();
        });
    });

    it("It should get Err if you pass wrong body  ", (done) => {
      const user = {
        userna123me: "JUST TEST",
        passw213123ord: "123",
      };
      chai
        .request(app)
        .post("/signup")
        .send(user)
        .end((err, response) => {
          response.body.should.be.eq("invalid signup");
          response.should.have.status(401);
          done();
        });
    });

    it("It should signin  ", (done) => {
      const user = {
        username: "JUST TEST",
        password: "123",
      };
      chai
        .request(app)
        .post("/login")
        .send(user)
        .end((err, response) => {
          response.body.should.be.a("object");
          response.should.have.status(200);
          done();
        });
    });

    it("It should get Err if login with wrong password or username ", (done) => {
      const user = {
        username: "JUST TEST",
        password: "123qweqweqweqweqwe",
      };
      chai
        .request(app)
        .post("/login")
        .send(user)
        .end((err, response) => {
          response.body.should.be.eq("WORNG LOGIN!!!");
          response.should.have.status(401);
          done();
        });
    });
  });

  it("It should get Err if try login with wrong information ", (done) => {
    const user = {
      title: "JUST TEST",
      qwe: "123",
    };
    chai
      .request(app)
      .post("/login")
      .send(user)
      .end((err, response) => {
        response.body.should.be.eq("WORNG LOGIN!!!");
        response.should.have.status(401);
        done();
      });
  });

  describe("POSTS ROUTES TEST", () => {
    it("It should add a new post  ", (done) => {
      const post = {
        title: "tesst",
        body: "qwqwq",
      };

      chai
        .request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send(post)
        .end((err, response) => {
          response.body.should.be.a("object");
          response.body.title.should.be.eq("tesst");
          response.body.body.should.be.eq("qwqwq");
          response.should.have.status(200);

          done();
        });
    });

    it("It should get all posts  ", (done) => {
      chai
        .request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .end((err, response) => {
          response.body.should.be.a("array");
          response.should.have.status(200);

          done();
        });
    });

    it("It should get posts by user id ", (done) => {
      chai
        .request(app)
        .get("/posts/1")
        .set("Authorization", `Bearer ${token}`)
        .end((err, response) => {
          response.body.should.be.a("array");
          response.should.have.status(200);

          done();
        });
    });

    it("It should delete post by POST id ", (done) => {
      chai
        .request(app)
        .delete("/posts/1")
        .set("Authorization", `Bearer ${token}`)
        .end((err, response) => {
          response.body.should.be.eq("post deleted !!");
          response.should.have.status(200);

          done();
        });
    });

    it("It should get Err update post not exist ", (done) => {
      const obj = {
        body: "test update from test",
        title: "update from test",
      };

      chai
        .request(app)
        .put("/posts/123123")
        .set("Authorization", `Bearer ${token}`)
        .send(obj)
        .end((err, response) => {
          response.body.should.be.eq("Cant Update");
          response.should.have.status(500);

          done();
        });
    });

    it("It should update post  ", async () => {
      const obj = {
        body: "test update from test",
        title: "update from test",
      };
      const obj1 = {
        body: "test update from test",
        title: "update from test",
        id: 2,
      };
      const note = await postModel.create({
        body: obj.body,
        title: obj.title,
        userId: 1,
      });
      const response = await chai
        .request(app)
        .put(`/posts/${note.dataValues.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send(obj1);
      response.body.should.be.eq("post updated !!");
      response.should.have.status(200);
    });

    it("It should get Err when add post with wrong body", (done) => {
      const post = {
        usernamea: "qweqwe",
      };

      chai
        .request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send(post)
        .end((err, response) => {
          response.body.should.be.eq("Cant add post");
          response.should.have.status(500);

          done();
        });
    });

    it("It should get Err when try delete post not exist ", (done) => {
      chai
        .request(app)
        .delete("/posts/1")
        .set("Authorization", `Bearer ${token}`)
        .end((err, response) => {
          response.body.should.be.eq("Cant delete");
          response.should.have.status(500);

          done();
        });
    });

    it("It should get Err when use posts routes and you Not logged in  ", (done) => {
      const post = {
        title: "tess",
        body: "qwqwq",
      };
      chai
        .request(app)
        .post("/posts")
        .send(post)
        .end((err, response) => {
          response.body.should.be.eq("No Authorization info");
          response.should.have.status(401);
          done();
        });
    });

    it("It should get Err if you have invaild token", (done) => {
      const post = {
        title: "JUST TEST",
        body: "123",
      };
      chai
        .request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${"wqeqweqweqweqew"}`)
        .send(post)
        .end((err, response) => {
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
describe("COMMENTS ROUTES TEST", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpVU1QgVEVTVCIsImlhdCI6MTYzODEwMzg2OX0.OpykSblQQ4lSOWDWHzwzAbxOsNKVhm_P9ridvxSLxHI";

  it("It should add comment by POST id  ", (done) => {
    const obj = {
      name: "test add comment from test",
      email: "comment from test",
      body: "comment",
    };
    chai
      .request(app)
      .post("/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .send(obj)
      .end((err, response) => {
        response.body.should.be.a("object");
        done();
      });
  });

  it("It should get comment by id ", (done) => {
    chai
      .request(app)
      .post("/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.body.should.be.eq("Cant add comment");
        done();
      });
  });
  it("It should get all comments ", (done) => {
    chai
      .request(app)
      .get("/comments")
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.body.should.be.a("array");
        done();
      });
  });

  it("It should get comment by postId ", (done) => {
    chai
      .request(app)
      .get("/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.body.should.be.a("array");
        done();
      });
  });

  it("It should get err when you add wrong postId  ", (done) => {
    chai
      .request(app)
      .get("/comments/qweqwe")
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.body.should.be.eq("cant get comments");
        response.should.have.status(500);
        done();
      });
  });

  it("It should get Err when you try to  add comment with wrong data ", (done) => {
    const obj = {
      naqewme: "test add comment from test",
      emawqeil: "comment from test",
      bod123y: "comment",
    };
    chai
      .request(app)
      .post("/comments/1")
      .set("Authorization", `Bearer ${token}`)
      .send(obj)
      .end((err, response) => {
        response.body.should.be.eq("Cant add comment");
        response.should.have.status(500);
        done();
      });
  });
});
