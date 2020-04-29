const express = require("express");
const app = express();
const port = 3001;
const scrapeIndeed = require("./scrapers").scrapeIndeed;

app.get("/jobs/:title", async (req, res) => {
  try {
    const jobs = await scrapeIndeed(
      `https://www.indeed.com/jobs?q=${req.params.title}`
    );
    res.send(jobs);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => console.log(`Server listening on ${port}`));
