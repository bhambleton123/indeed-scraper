const express = require("express");
const app = express();
const port = 3001;
const scrapeIndeed = require("./scrapers").scrapeIndeed;

app.get("/jobs/:title", async (req, res) => {
  try {
    const jobs = await scrapeIndeed(
      `https://www.indeed.com/jobs?q=${req.params.title}&fromage=15&limit=50`,
      10
    );
    res.send(jobs);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server listening on ${port}`));
