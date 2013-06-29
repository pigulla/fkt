module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['docs'],

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
                    destination: 'docs',
                    configure: 'jsdoc.json'
                }
            }
        },

        nodeunit: {
            all: ['test/*.test.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    grunt.registerTask('default', ['clean', 'jshint', 'jsdoc', 'nodeunit']);
};