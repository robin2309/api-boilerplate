import nodemon from 'nodemon';
import log4js from 'log4js';
var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfigServer = require('./webpack.config.js');
const logger = log4js.getLogger();

/*var runner = function() {
  console.log(1);
  var bundleStart = null;
  var compiler = Webpack(webpackConfigServer);

  console.log(compiler)

  // We give notice in the terminal when it starts bundling and
  // set the time it started
  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took. Nice to have
  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });
};

runner();
var compiler = Webpack(webpackConfigServer);
compiler.watch({
  aggregateTimeout: 300,
  poll: 1000
}, function(err, stats) {
    console.log('watching!');
});*/

const builder = {
  async run() {
    try {
      await this.webpackBuildServer();
      this.nodemon();
      logger.info('Done !');
    } catch(error) {
      logger.error('Error while compiling !');
    }
  },

  webpackBuildServer() {
    const compiler = Webpack(webpackConfigServer);
    let firstBuild = true;
    return new Promise((resolve, reject) => {
      compiler.watch({
        aggregateTimeout: 300,
        poll: 1000
      }, function(err, stats) {
        logger.info('Building server Bundle ...');
        console.log(stats.toString({
          chunks: false,
          colors: true
        }));
        const info = stats.toJson();
        if (err || stats.hasErrors() || stats.hasWarnings()) {
          return reject(err);
        }
        logger.info('Build success !');
        if (firstBuild) {
          firstBuild = false;
          return resolve();
        }
        nodemon.restart();
      });
    });
  },

  nodemon() {
    nodemon({
      execMap: {js: 'node'},
      script: require('path').resolve(__dirname, './', 'dist/server.js'),
      watch: false
    }).on('restart', (files) => {
      const leafname = files && files.length ? files[0].split('\\').pop().split('/').pop() : '<manual restart>';
      console.log('Node server restarted, file changed:', leafname);
      console.log('nodemon restarted');
    });
  }
}

export default builder;

builder.run();
