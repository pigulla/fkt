var fs = require('fs');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['docs'],

        jshint: {
            files: ['src/fkt.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'src/',
                    outdir: 'docs/'
                }
            }
        },
        
        shell: {
            doc2md: {
                command: 'node_modules/yuidoc2md/bin/cli.js src/fkt.js',
                options: {
                    stdout: false,
                    callback: function (err, stdout, stderr, cb) {
                        fs.writeFile('api.md', stdout, cb)
                    }
                }
            }
        },

        nodeunit: {
            all: ['test/*.test.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['clean', 'jshint', 'nodeunit', 'yuidoc', 'shell:doc2md']);
};
