# Substitute loader for [webpack](https://webpack.github.io/)

Replaces the content of a file. Defaults to ```null```but you can supply the new content as parameter.

## Install

```sh
$ npm i -S substitute-loader

```

## Usage

```javascript
module: {
    loaders: [ {
        test: /\.mock.json$/,
        // default
        loader: "substitute"
         // custom content
         // loader: "substitute?{content: '{}'}"
        
    } ]
}
```

```javascript
// default, mock will equal null
var emptyMock = require("substitute!./mock.json");
// custom, mock will equal "{}"
var emptyMock = require("substitute!./mock.json?" + JSON.stringify({}));
```


[Documentation: Using loaders](https://webpack.github.io/docs/using-loaders.html).

## License
[MIT](http://choosealicense.com/licenses/mit/)
