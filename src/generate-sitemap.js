const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

// An array with your page routes
const links = [
  { url: "/", changefreq: "daily", priority: 0.8 },
  { url: "/home", changefreq: "monthly", priority: 0.7 },
  { url: "/search", changefreq: "monthly", priority: 0.7 },
  { url: "/albums", changefreq: "monthly", priority: 0.7 },
  { url: "/artists", changefreq: "monthly", priority: 0.7 },
  // Add more routes as needed
];

// Create a stream to write to
const stream = new SitemapStream({
  hostname: "https://wavelet.vercel.app",
});

// Write sitemap to file
streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
  fs.writeFileSync("public/sitemap.xml", data.toString());
});
