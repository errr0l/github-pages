var fs = require('fs');
var postcss = require('postcss');
var pxtorem = require('postcss-pxtorem');

var options = {
    replace: true,
    rootValue: 15,
    unitPrecision: 5,
    propList: ['*'],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 2,
    // exclude: /node_modules/i
};

const cssDirPath = __dirname + "/css/";

fs.readdir(cssDirPath, function(error, files) {
    if (error) {
        throw error;
    }

    for (let file of files) {
        if (!file.endsWith(".css")) {
            continue;
        }
        const cssPath = cssDirPath + file;
        fs.readFile(cssDirPath + file, 'utf-8', function(error, data) {
            if (error) {
                throw error;
            }
            var processedCss = postcss(pxtorem(options)).process(data).css;
            fs.writeFile(cssPath, processedCss, function (error) {
                if (error) {
                    throw error;
                }
                console.log('Rem file written：' + cssPath);
            });
        });
    }
});

// var processedCss = postcss(pxtorem(options)).process(css).css;

// fs.writeFile(__dirname + '/css/base-rem.css' , processedCss, function (err) {
//     if (err) {
//         throw err;
//     }
//     console.log('Rem file written.');
//     console.log(processedCss);
// });