![Usage Example](https://raw.githubusercontent.com/josnun/peedy/master/data/screenshots/demo.gif)

# Peedy

Peedy is a simple node project that turns a url or HTML string into a pdf document

## Installation

TODO

For now, clone and run `npm run build`

## Usage

Send a post request to the root with a url or an htmlString, and Peedy will return the generated PDF document.

```
curl \
    --output example.pdf \
    --request POST \
    --url http://localhost:3000/ \
    --header 'content-type: application/json' \
    --data '{
                "url": "https://josnun.com"
            }'

```

### Options

| Option     | Description                                                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url        | The url that Peedy should use to generate the PDF. Takes priority over htmlString.                                                                                  |
| htmlString | A string of HTML to generate a PDF from. Can include CSS and JS.                                                                                                    |
| pdfOptions | Options that get passed to puppeteer for generating the PDF. [See here for details.](https://github.com/puppeteer/puppeteer/blob/v2.0.0/docs/api.md#pagepdfoptions) |

### Environment Variables

| variable | Default | Description                           |
| -------- | ------- | ------------------------------------- |
| PORT     | 3546    | The port that 'Peedy should listen on |

## Todo

- [x] Add npm command for debugging
  - [ ] VSCode debugger support?
- [x] Pdf config options
- [x] Read port from env variables
- [ ] Add clean command
- [x] Tests
- [ ] Better Typing
- [ ] Dockerize
- [ ] Update Readme

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
