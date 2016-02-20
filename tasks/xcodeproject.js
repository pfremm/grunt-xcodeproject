/*
 * grunt-xcodeproject
 * https://github.com/pfremm/grunt-xcodeproject
 *
 * Copyright (c) 2016 Bryan Pfremmer
 * Licensed under the MIT license.
 */

'use strict';
var copyDir = require('copy-dir');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('xcodeproject', 'This grunt plugin uses xcode npm module to edit xcode project files.', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            frameworkName: '',
            projectPath: '',
            frameworkSourcePath: ''
        });
        copyDir.sync(options.frameworkSourcePath + '/' + options.frameworkName, options.projectPath + '/' + options.frameworkName);
    });

};
