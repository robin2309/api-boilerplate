import nodemon from 'nodemon';
var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfigServer = require('./webpack.config.js');

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
      //await Promise.all(this.webpackBuildClient(), this.webpackBuildServer());
      await this.webpackBuildServer();
      this.nodemon();
      console.log('Done !');
    } catch(error) {
      console.log('Error : ' + error);
      process.exit(1);
      throw error;
    }
  },

  webpackBuildServer() {
    console.log('Building server bundle ...');
    const compiler = Webpack(webpackConfigServer);
    console.log(3);
    let firstBuild = true;
    return new Promise((resolve, reject) => {
      console.log(4);
      compiler.watch({
        aggregateTimeout: 300,
        poll: 1000
      }, function(err, stats) {
          console.log('Watcher for server bundle ...');
          if (err) reject(err);
          console.log('Success !');
          // restart nodemon
          if (firstBuild) {
            console.log('First build');
            firstBuild = false;
            return resolve();
          }
          console.log('nodemon');
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
      console.log('node restart');
      const leafname = files && files.length ? files[0].split('\\').pop().split('/').pop() : '<manual restart>';
      console.log('Node server restarted, file changed:', leafname);
      console.log('nodemon restarted');
    });
  }
}

export default builder;

builder.run();
