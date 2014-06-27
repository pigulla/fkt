module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['src/fkt.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        nodeunit: {
            all: ['test/*.test.js']
        },
        
        jsdoc2md: {
            docs: {
                options: {
                    template: "jsdoc2md/README.hbs",
                    index: true,
                    "skip-heading": true
                },
                src: "src/fkt.js",
                dest: "README.md"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

    grunt.registerTask('default', ['jshint', 'nodeunit', 'jsdoc2md']);
};
