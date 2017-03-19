const
    angularFilesort = require('gulp-angular-filesort'),
    concat = require('gulp-concat'),
    eventStream = require('event-stream'),
    gulp = require('gulp'),
    util = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    tscConfig = require('./tsconfig.json');

const conf = { 
        paths: { 
                js: 'src/main/resources/static/assets/**/*.js', 
    ts: 'src/main/resources/static/assets/**/*.ts', 
    npm: 'node_modules/', 
    //sass: 'src/main/resources/static/style/sass/**/*.scss', 
    style: './target/classes/static/dist/style', 
    fonts:  'node_modules/bootstrap/dist/fonts/**', 
    img:  'src/main/resources/static/style/img/*.gif', 
                dist: './target/classes/static/dist/', 
                vendorjs: [ 
                           'node_modules/jquery/dist/jquery.min.js', 
                           'node_modules/angular/angular.min.js',
                           //'node_modules/bootstrap/dist/js/bootstrap.min.js', 
                           'node_modules/angular-route/angular-route.min.js', 
                           //'node_modules/angular-animate/angular-animate.min.js', 
                           //'node_modules/angular-resource/angular-resource.min.js', 
                           'node_modules/angular-messages/angular-messages.min.js', 
                           //'node_modules/angular-sanitize/angular-sanitize.min.js', 
                           'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                           'node_modules/angular-hal/dist/angular-hal.min.js',
                           'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                          //  'node_modules/min/moment.min.js',
                          //  'node_modules/fullcalendar/dist/fullcalendar.js',
                          //  'node_modules/angular-ui-calendar/src/calendar.js'
                           //'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js', // TODO min 
                           //'node_modules/ui-select/dist/select.min.js' 
                ], 
                vendorcss: [ 
                           'node_modules/ui-select/dist/select.css', 
                           'node_modules/angular/angular-csp.css' ,
                           'node_modules/bootstrap/dist/css/bootstrap.min.css',
                           'node_modules/fullcalendar/fullcalendar.css'
                ] 
  }, 
  production: !!util.env.production 
}; 

// 1) create vendor.min.js (concat all vendor js-files) 
gulp.task('create-vendor-js', () => 
  gulp 
    .src(conf.paths.vendorjs) // get all js files for angular, bootstrap, etc. 
    .pipe(concat('vendor.min.js')) // concat files to a single file 
    .pipe(conf.production ? util.noop() : sourcemaps.write()) // write sourcemaps (unless on production) 
    .pipe(gulp.dest(conf.paths.dist)) // save to distribution 
) 

// 2) create vendor.css (concat all vendor css-files) 
gulp.task('create-vendor-css', () => 
  gulp 
    .src(conf.paths.vendorcss) // get all vendor css files 
    .pipe(sourcemaps.init()) // init sourcemaps 
    .pipe(concat('vendor.css')) // concat files to a single file 
    .pipe(gulp.dest(conf.paths.style + '/css/')) // save to distribution 
); 

// 3) install fonts (glyphicons) 
gulp.task('install-fonts', () => 
  gulp 
    .src(conf.paths.fonts) // get fonts for glyphs 
    .pipe(gulp.dest(conf.paths.style + '/fonts/')) // save to distribution 
); 

// 4) install angular-translate 
gulp.task('install-translation', () => 
  gulp 
    .src('node_modules/angular-i18n/angular-locale_*.js') // get file 
    .pipe(gulp.dest(conf.paths.dist + '/i18n')) // save to distribution 
); 

// 5) use TSLint to test typescript code for readability, maintainability, and functionality errors 
gulp.task('test-tslint', () => 
  gulp 
  .src(conf.paths.ts) // get all *.ts files 
  .pipe(tslint({formatter: 'verbose'})) // check by TSLint 
  .pipe(tslint.report()) // generate report 
); 

// 6) compile app.min.js (from all our own typescript and javascript files) 
gulp.task('compile-js', () => 
{ 
  //NOT needed anymore as there are no more .js files present in the project 
  // stream of all custom js files 
  var jsStream = gulp 
    .src(conf.paths.js) 
    .pipe(sourcemaps.init()); 
  // stream of all custom ts files compiled to js files   
  var tsStream = gulp 
    .src(conf.paths.ts) 
    .pipe(typescript(tscConfig.compilerOptions)); 
  return eventStream 
    .merge(jsStream, tsStream) // no need to merge -> no more .js files 
    .pipe(angularFilesort()) // sort files 
    .pipe(concat('app.min.js')) // concat files to a single file 
    //.pipe(uglify({mangle: false})) //TODO uglify on production 
    .pipe(conf.production ? util.noop() : sourcemaps.write()) // write sourcemaps (unless on production) 
    .pipe(gulp.dest(conf.paths.dist)); // save to distribution 
}); 


// 7) compile css-files (from sass-files) 
/*gulp.task('compile-css', () => 
  gulp 
    .src(conf.paths.sass) // get all *.scss files 
    .pipe(sass().on('error', sass.logError)) // compile sass 
    .pipe(gulp.dest(conf.paths.style + '/css/')) //save to distribution 
);*/ 

// 8) test code with tslint 
gulp.task("tslint", () => 
    gulp.src(conf.paths.ts) 
        .pipe(tslint({ 
            formatter: "verbose" 
        })) 
        .pipe(tslint.report('verbose', { emitError: false })) 
); 

// 9) create img folder 
gulp.task('create-img-folder', () => 
  gulp 
    .src(conf.paths.img) // get images of the image folder 
    .pipe(gulp.dest(conf.paths.style + '/img/')) // save to distribution 
); 



gulp.task('watch_task', () => { 
  gulp.watch(conf.paths.ts, ['compile-js']); // run task compile-js whenever a typescript file changes 
  gulp.watch(conf.paths.js, ['compile-js']); // run task compile-css whenever a javascript file changes 
  //gulp.watch(conf.paths.sass, ['compile-css']); // run task compile-css whenever a sass file changes 
}); 

// default gulp configuration - inject new tasks here if necessary 
gulp.task('default', 
  [ 
    'create-vendor-js', 
    'create-vendor-css', 
    'install-fonts', 
    'install-translation', 
    'compile-js', 
    //'compile-css', 
    'create-img-folder' 
  ] 
);

// for console use: gulp watch 
gulp.task('watch', ['default', 'watch_task']);  