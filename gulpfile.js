/**
** CONFIGURAÇÃÕES PARA O NOTIFICATION
**/
/**
** DEPENDENCIAS


	# Node Versão 8
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	sudo apt-get install -y nodejs

	# NPM ultima versão
	npm install npm@latest -g

	# verificar Node e npm instalado,
	node -v
	npm -v

	# Instalação Gulp
	# Gulp
	sudo npm install gulp-cli -g
	sudo npm install gulp -D

	# Dependencias
	# gulp-uglify-es
	npm install --save-dev gulp-uglify-es

	# gulp-rename
	npm i gulp-rename

	# gulp-concat
	npm install --save-dev gulp-concat

	# gul-sass
	npm install gulp-sass --save-dev
	'Se der problema com o Sass, execute isso'
	npm rebuild node-sass

	# gulp-notify
	npm i gulp-notify

	# gulp-sourcemaps
	npm i gulp-sourcemaps


	# ERRO ESCUTA GULP
	gulp watch fails with error: Error: watch ... ENOSPC

	( SOLUÇÃO )
	- no terminal -
	echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
**/

const projeto = 'Galeria',
		msg		 = 'O arquivo "<%= file.relative %>" foi compilado com sucesso!';

var gulp = require('gulp'),
  connect = require('gulp-connect-php'),
	browserSync = require('browser-sync'),
	sass	 = require('gulp-sass'),
	reload = browserSync.reload,
	uglify = require('gulp-uglify-es').default,
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
  	fs      = require('fs'),
	argv	 = require('yargs').argv,
	sourcemaps = require('gulp-sourcemaps');

var package = fs.readFileSync('package.json', 'utf8');

/**
** FUNÇÕES
**/	

gulp.task('js', function(cb){
  // Função compila o dev.JS com Map para Debugar
  return gulp.src('js/js/galeria.js')
    .pipe(sourcemaps.init())
    .pipe(rename('galeria.min.js'))
    .pipe(sourcemaps.write('./map'))
    .pipe(gulp.dest('js'))
    .on('error', function(err) {
        notify().write(err);
        this.emit('end');
    })
});

gulp.task('scss', function(){

  // Função compila o SCSS com Map para Debugar
  var sassFiles = 'css/scss/main.scss',
      cssDest = 'css';

   return gulp.src(sassFiles)
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compiled'}))
      .pipe(rename('site.min.css'))
      .pipe(sourcemaps.write('./map'))
      .pipe(gulp.dest(cssDest))
      .pipe(reload({ stream:true }))
      .on('error', function(err) {
         /// notify().write(err);
          done(erro); 
      })
});

gulp.task('default', function() {
});

gulp.task('dev', function() {

	connect.server({}, function (){
		browserSync.init({
			proxy: 'http://galeria.local/'
		});
	});

	/* CSS */
	gulp.watch(['css/scss/**/*.scss'], gulp.series('scss'));
	
	/* JS */
	gulp.watch(['js/js/**/*.js'], gulp.series('js'));
});