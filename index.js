const express = require("express");
const fs = require("fs");
const app = express();

// Middleware to log user visits
app.use((req, res, next) => {
  const visitData = {
    ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    url: req.originalUrl,
    referrer: req.headers["referer"] || "Direct",
    userAgent: req.headers["user-agent"],
    timestamp: new Date().toISOString(),
  };

  // Log visit data to a file (or save to a database)
  fs.appendFile("visitorLogs.json", JSON.stringify(visitData) + "\n", (err) => {
    if (err) console.error("Failed to log visit:", err);
  });

  next();
});

// Serve your website
app.get("/", (req, res) => {
  res.send("Welcome to my website!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
