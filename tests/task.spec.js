import chai, { should } from "chai";
import chaiHttp from "chai-http";
import app from "../index.mjs";
import { userModel } from "../models/index.mjs";
import { postModel } from "../models/index.mjs";

chai.should();
chai.use(chaiHttp);

describe("test ", () => {
  afterEach = () => {
    userModel.destroy({
      where: {},
      truncate: true,
    });
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpVU1QgVEVTVCIsImlhdCI6MTYzODEwMzg2OX0.OpykSblQQ4lSOWDWHzwzAbxOsNKVhm_P9ridvxSLxHI";

  describe("test", () => {
    it("home route", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.body.should.be.eq("Test WORKING FINE !!!! ");
          done();
        });
    });
    it("test all users", (done) => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          res.body.should.be.a("array");
          done();
        });
    });

    it("wrong route", (done) => {
      chai
        .request(app)
        .get("/usersssss")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    // ==========================================signup
    it("It should POST a new user signup tessssssssssssssssssssssssssss", (done) => {
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
          done();
        });
    });

    it("invalid signup ", (done) => {
      const user = {
        userna123me: "JUST TEST",
        passw213123ord: "123",
      };
      chai
        .request(app)
        .post("/signup")
        .send(user)
        .end((err, response) => {
          response.body.should.be.a("object");
          done();
        });
    });
    // ==========================================signin

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

          done();
        });
    });

    it("cant log in wrong password ", (done) => {
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
          done();
        });
    });
  });

  it("cant signin test with wrong  info ", (done) => {
    const user = {
      title: "JUST TEST",
      qwe: "123",
    };
    chai
      .request(app)
      .post("/login")
      .send(user)
      .end((err, response) => {
        response.body.should.be.eq("Wrong!!!!!@!");
        done();
      });
  });

  // ========================================posts

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
        // response.should.have.status(200);
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
        // should be array
        done();
      });
  });

  it("It should get  posts  by user id ", (done) => {
    chai
      .request(app)
      .get("/posts/1")
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.body.should.be.a("array");
        // should be array
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
        // response.body.should.be.eq("post deleted !!")
        // should be array
        done();
      });
  });

  it("cant update post not exsist ", (done) => {
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
        response.body.should.be.eq("cant find your post");
        done();
      });
  });

  it("it should update post  ", async () => {
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
  });

  it("cant add post wrong body", (done) => {
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
        // should be array
        done();
      });
  });

  it("cant delete if you have wrong id ", (done) => {
    chai
      .request(app)
      .delete("/posts/1")
      .set("Authorization", `Bearer ${token}`)
      .end((err, response) => {
        response.body.should.be.eq("Cant delete");
        // response.body.should.be.eq("post deleted !!")
        // should be array
        done();
      });
  });

  it("No Authorization info  ", (done) => {
    const post = {
      title: "tess",
      body: "qwqwq",
    };
    chai
      .request(app)
      .post("/posts")
      .send(post)
      .end((err, response) => {
        response.body.should.be.a("object");
        // response.should.have.status(200);

        done();
      });
  });

  it("Invalid Token", (done) => {
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

  // ============================================comments

  it("It should add comment by POST id  q3123 ", (done) => {
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
});