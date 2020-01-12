import puppeteer, { PDFOptions } from 'puppeteer';
import express from 'express';

// TODO Get this from env variables
const port = 3000;

const app = express();
app.use(express.json());

interface PDFGenRequest {
  url?: string;
  htmlString?: string;
  pdfOptions?: PDFOptions;
}

const defaultPdfOptions = {
  printBackground: true,
};

app.post('/', async (req, res) => {
  const payload: PDFGenRequest = req.body;

  if (!(payload.htmlString || payload.url)) {
    res.sendStatus(400);
    return;
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const options = {
    ...defaultPdfOptions,
    ...payload.pdfOptions,
  };

  let pdf: Buffer | undefined;

    if (payload.url) {
      await page.goto(payload.url, { waitUntil: 'networkidle0' });
      pdf = await page.pdf(options);
    } else if (payload.htmlString) {
      await page.setContent(payload.htmlString);
      pdf = await page.pdf(options);
    }

    await browser.close();

    if (pdf) {
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=' + 'file.pdf',
        'Content-Length': pdf.length,
      });
      res.end(pdf);
    } else {
      res.sendStatus(400);
    }
});

app.listen(port, () => console.log(`Peedy listening on port ${port}`));
