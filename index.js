const express = require("express");
const app = express();

app.get("/", (req, res) => {
  let userIP =
    req.headers["x-forwarded-for"]?.split(",")[0] || // Check for proxy headers
    req.connection.remoteAddress; // Fallback to direct connection

  // Convert IPv6 localhost (::1) to IPv4 (127.0.0.1)
  if (userIP === "::1") {
    userIP = "127.0.0.1";
  }

  res.send(`User's IP Address: ${userIP}`);
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
