module.exports = function (grunt) {
    var assets = grunt.file.readJSON('app/config/assets.json');
    var mapAssets = function (assets) {
        var map = {};
        for (var k in assets) {
            var files = assets[k];
            map['web/' + files.output] = ([].concat(files.input)).map(function (file) {
                return 'web/' + file;
            });
        }
        return map;
    };
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'web/assets/sass',
                    src: ['*.scss'],
                    dest: 'web/assets/css/dist',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            options: { target: 'web/assets/css/./' },
            all: { files: mapAssets(assets.css) }
        },
        uglify : {
            options: { preserveComments: 'some' },
            all: { files: mapAssets(assets.js) }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'web/assets/js/*.js'
            ]
        },
        imagemin: {
            all: {
                files: [{
                    expand: true,
                    cwd: 'web/assets/img',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'web/assets/img/dist'
                }]
            }
        },
        bower: {
            options: { copy: false },
            install: { }
        },
        clean: {
            dist: [
                'web/assets/css/dist',
                'web/assets/js/dist',
                'web/assets/img/dist'
            ]
        },
        shell: {
            touch: { command: 'touch -m app/config/assets.json && touch -m app/config/assets.php' }
        },
        watch: {
            sass: {
                files: 'web/assets/sass/*.scss',
                tasks: ['sass']
            }
        }
    });
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('develop', ['bower', 'sass', 'jshint', 'watch']);
    grunt.registerTask('compile', ['clean:dist', 'sass', 'cssmin', 'uglify', 'shell:touch', 'jshint']);
    grunt.registerTask('optimize', ['imagemin']);
    grunt.registerTask('default', ['bower', 'compile', 'optimize']);
};

