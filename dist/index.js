"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const express_1 = __importDefault(require("express"));
// TODO Get this from env variables
const port = 3000;
const app = express_1.default();
app.use(express_1.default.json());
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (!(payload.htmlString || payload.url)) {
        res.sendStatus(400);
        return;
    }
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    let pdf;
    if (payload.url) {
        yield page.goto(payload.url, { waitUntil: 'networkidle0' });
        pdf = yield page.pdf({
            printBackground: true,
        });
    }
    else if (payload.htmlString) {
        yield page.setContent(payload.htmlString);
        pdf = yield page.pdf({
            printBackground: true,
        });
    }
    if (pdf) {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=' + 'file.pdf',
            'Content-Length': pdf.length,
        });
        res.end(pdf);
    }
    else {
        res.sendStatus(400);
    }
}));
app.listen(port, () => console.log(`Peedy listening on port ${port}`));
