module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        nodeunit: {
            all: ['test/*.test.js']
        },

        jscs: {
            source: {
                src: ['src/**/*.js'],
                options: {
                    config: '.jscsrc'
                }
            }
        },

        markdox: {
            'readme': {
                src: 'src/fkt.js',
                dest: 'README.md'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-markdox');

    grunt.registerTask('default', ['jshint', 'jscs', 'nodeunit', 'markdox']);
};
