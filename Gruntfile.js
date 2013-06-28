module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['fkt.js'],
            options: {
                globals: {
                }
            }
        },

        jsdoc: {
            dist: {
                src: ['fkt.js'],
                options: {
                    destination: 'doc',
                    configure: 'jsdoc.json'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
};