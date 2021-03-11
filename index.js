const express = require("express");
const app = express();

const LOGGING = (req, res, next) => {
  console.log("LOG: " + req.method + " " + req.originalUrl);
  res.locals.date = new Date();
  next();
}

// app.use(LOGGING)

app.get("/",
  (req, res, next) => {
    res.send("This is the root of the server.");
    next()
  })

app.get("/contact",
  (req, res, next) => {
    res.send("This is the contact page.")
    next();
  })

app.get("/restricted",
  (req, res, next) => {
    res.redirect("/");
  })

const userRouter = express.Router();

userRouter.use(LOGGING);

userRouter.get("/view/:id",
  (req, res) => {
    console.log("Now in the /view/:id handler");
    console.log("The date today is " + res.locals.date);
    res.send("Viewing user with id " + req.params.id);
  })

userRouter.get("/view-post",
  (req, res) => {
    res.send("Viewing post with id " + req.query.postid);
  })

app.use("/user", userRouter);

app.use("/static", express.static(__dirname + "/assets"));

app.listen(3000);