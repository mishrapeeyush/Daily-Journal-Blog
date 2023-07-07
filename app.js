//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "Journaling offers numerous benefits for personal growth and well-being. By dedicating time to write down your thoughts, emotions, and experiences, you gain self-awareness and clarity. It provides a safe space to process emotions, explore patterns, and find healing. Journaling enhances creativity, boosts memory, and improves problem-solving skills. It promotes mindfulness, reduces stress, and increases gratitude. Additionally, journaling serves as a tool for setting goals, tracking progress, and fostering self-discipline. Whether you use it for self-reflection, personal development, or simply to document your journey, journaling is a powerful practice that can positively impact various aspects of your life.";
const aboutContent =
  " Welcome to my world! I'm Peeyush Mishra, a full stack web developer with a passion for building innovative digital experiences. I love exploring the realms of software development and data analysis. When I'm not coding, you'll find me embarking on adventures, indulging in junk food, and enjoying a good movie. Let's join forces to create extraordinary web solutions that combine functionality, design, and a touch of wanderlust.";
const contactContent =
  "For any inquiries or collaborations, feel free to reach out to Peeyush Mishra. You can contact Peeyush via email at mishrapeeyush212@gmail.com. Peeyush is based in Delhi, India, and can be reached at mobile number 8287633390. Whether you have questions, feedback, or opportunities to discuss, Peeyush looks forward to hearing from you and engaging in meaningful conversations.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home.ejs", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about.ejs", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact.ejs", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose.ejs");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  let requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post.ejs", {
        requestedTitle: requestedTitle,
        requestedContent: post.content,
      });
    }
  });
});

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
