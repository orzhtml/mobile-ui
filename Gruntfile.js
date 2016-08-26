module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        modulePath: "<%=pkg.family%>/<%=pkg.name%>/<%=pkg.version%>/",
        copy: {
            main: {
                expand: true,
                flatten: true,
                cwd: 'src/example/',
                src: ['*.html', '*.js'],
                dest: 'dist/'
            },
            js: {
                expand: true,
                flatten: true,
                cwd: 'src/js/',
                src: '*.js',
                dest: 'dist/js/'
            },
            img: {
                expand: true,
                flatten: true,
                cwd: 'src/images/',
                src: '*.*',
                dest: 'dist/images/'
            }
        },
        watch: {
            build: {
                files: ["src/**/*.less", "src/**/*.html"],
                tasks: ["bd"],
                options: {
                    spawn: false
                }
            }
        },
        less: {
            main: {
                expand: true,
                cwd: 'src/less/',
                src: ['mobile-ui.less'],
                dest: 'dist/css/',
                ext: '.css'
            },
            exa: {
                expand: true,
                cwd: 'src/example/',
                src: ['*.less'],
                dest: 'dist/',
                ext: '.css'
            },
            widgets: {
                expand: true,
                cwd: 'src/less/widgets/',
                src: ['*.less'],
                dest: 'dist/css/widgets/',
                ext: '.css'
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions', 'Android >= 4.0']}), // add vendor prefixes
                    require('cssnano')({
                        reduceIdents: false,
                        zindex: false
                    }) // minify the result

                ]
            },
            dist: {
                src: 'dist/**/*.css'
            }
        },
        replace: {
            debug: {
                options: {
                    patterns: [
                        {
                            match: /..\/dist\//g,
                            replacement: './'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        overwrite: true,
                        flatten: true,
                        src: ['dist/*.html'],
                        dest: 'dist/'
                    }
                ]
            },
            view: {
                options: {
                    patterns: [
                        {
                            match: /\.\.\/dist\//g,
                            replacement: 'http://orzhtml.github.io/mobile-ui/<%=modulePath%>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        overwrite: true,
                        flatten: true,
                        src: ['dist/*.html'],
                        dest: 'dist/'
                    }
                ]
            },
            test: {
                options: {
                    patterns: [
                        {
                            match: /\.\.\/dist\//g,
                            replacement: 'http://orzhtml.github.io/mobile-ui/<%=modulePath%>'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        overwrite: true,
                        flatten: true,
                        src: ['dist/*.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        /*concat: {
         options: {
         include: "relative"
         },
         release: {
         files: [{
         expand: true,
         src: ["src/!**!/!*.js"],
         dest: "dist",
         cwd: "dist/.cmd",
         filter: "isFile"
         }]
         }
         },*/
        uglify: {
            options: {
                beautify: {
                    ascii_only: true
                },
                banner: '/*! <%= pkg.name %> <%= pkg.version %> pub <%= grunt.template.today("yyyy-mm-dd HH:MM")%> by <%= pkg.author.name %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.js', '!**/*-debug.js'],
                    dest: 'dist/'
                }]
            }
        },
        /*"ftp-deploy": {
            dev: {
                auth: {
                    host: '192.168.37.104',
                    port: "21",
                    authKey: 'test'
                },
                src: "dist",
                exclusions: ['**!/.DS_Store', 'example'],
                dest: '/static/dev/mod/<%=modulePath%>'
            },
            test: {
                auth: {
                    host: '192.168.37.104',
                    port: "21",
                    authKey: 'test'
                },
                src: "dist",
                exclusions: ['**!/.DS_Store', 'example'],
                dest: '/static/mod/<%=modulePath%>'
            },
            release: {
                auth: {
                    host: '182.92.1.100',
                    port: "21",
                    authKey: 'release'
                },
                src: 'dist',
                exclusions: ['**!/.DS_Store', 'example'],
                dest: '/data/static/mod/<%=modulePath%>'
            }
        },*/
        clean: {
            cmd: ['dist/.cmd'],
            dist: ['css', 'js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-replace');

    //grunt.loadNpmTasks('grunt-ftp-deploy');

    grunt.registerTask('build', function (arg) {
        var tasks = ['clean:dist', 'less', "postcss", 'copy', /*'concat', */'clean:cmd'];
        if (arg == 'min') {
            tasks.push('uglify')
        }
        grunt.task.run(tasks);
    });

    /*grunt.registerTask('test', function (arg) {
        grunt.task.run(['build' + (arg ? ':' + arg : ''), 'replace:view', 'ftp-deploy:test']);
    });

    grunt.registerTask('release', ['build:min', 'replace:view', 'ftp-deploy:release']);*/

    grunt.registerTask("bd", ["build", 'replace:debug']);
    grunt.registerTask("w", ["watch"]);
};