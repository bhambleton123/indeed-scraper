const express = require("express");
const app = express();
const port = 3001;
const scrapeIndeed = require("./scrapers").scrapeIndeed;

app.get("/jobs/:title/:pages", async (req, res) => {
  try {
    const jobs = await scrapeIndeed(
      `https://www.indeed.com/jobs?q=${req.params.title}&fromage=${
        req.query.posted ? req.query.posted : 3
      }&limit=50`,
      req.params.pages
    );
    res.send(jobs);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server listening on ${port}`));
