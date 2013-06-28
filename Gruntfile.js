module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['doc'],

        jshint: {
            files: ['src/fkt.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        jsdoc: {
            dist: {
                src: ['src/fkt.js'],
                options: {
                    destination: 'doc',
                    configure: 'jsdoc.json'
                }
            }
        },

        nodeunit: {
            all: ['test/*.test.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', ['clean', 'jshint', 'jsdoc', 'nodeunit']);
};