/*merging jquery, bootstrap and remodal js files*/
const gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    image = require('gulp-image'),
    pngquant = require('imagemin-pngquant'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    sftp = require('gulp-sftp');


gulp.task('sftp', function () {
	return gulp.src('./dist/*')
		.pipe(sftp({
			host: 'michelmoreau.ca',
                        port: 21,
			auth: 'keyMain',
                        timeout: 999999
		}));
});


gulp.task('css-merge-minify', () => {
    return gulp.src(['./src/bower_components/bootstrap/dist/css/bootstrap.min.css',
            './src/bower_components/remodal/dist/remodal.css',
            './src/bower_components/remodal/dist/remodal-default-theme.css',
            './src/css/style.css'
        ])
        .pipe(concat('all.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css/'));
});


gulp.task('scripts1', () => {
    return gulp.src(['./src/bower_components/jquery/dist/jquery.min.js',
            './src/js/helper.js'
        ])
        .pipe(concat('head.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});


gulp.task('scripts2', () => {
    return gulp.src(['./src/bower_components/remodal/dist/remodal.min.js',
            './src/js/resumeBuilder.js'
        ])
        .pipe(concat('body.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('json-to-dist', () => {
    return gulp.src(['./mmoreauCV.json'
        ])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('images', () => {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});


gulp.task('copy-root-files', () => {
    return gulp.src(['./src/index.html',
            './src/Enso.png'
        ])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('htmlreplacement', ['copy-root-files'], function() {
    gulp.src('./dist/index.html')
        .pipe(htmlreplace({
            'css': 'css/all.min.css',
            'jshead': 'js/head.min.js',
            'jsbody': 'js/body.min.js'
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['css-merge-minify', 'scripts1', 'scripts2', 'copy-root-files', 'json-to-dist','htmlreplacement']);
