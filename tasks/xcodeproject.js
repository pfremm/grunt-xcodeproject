/*
 * grunt-xcodeproject
 * https://github.com/pfremm/grunt-xcodeproject
 *
 * Copyright (c) 2016 Bryan Pfremmer
 * Licensed under the MIT license.
 */

'use strict';
var copyDir = require('copy-dir');
var xcode = require('xcode');
var fs = require('fs');
var async = require('async');

module.exports = function (grunt) {
    grunt.registerMultiTask('xcodeproject', 'This grunt plugin uses xcode npm module to edit xcode project files.', function () {
        var options = this.options({
            frameworkName: '',
            projectPath: '',
            frameworkSourcePath: '',
            xCodeProjectPath: ''
        });

        function process() {
            async.parallel([
                    function (callback) {
                        grunt.log.writeln('Running copy framework');
                        try {
                            copyDir.sync(options.frameworkSourcePath + '/' + options.frameworkName, options.projectPath + '/' + options.frameworkName);
                        } catch (err) {
                            callback(err, null);
                            return;
                        }
                        grunt.log.success('Copied-> xcodeproject framework ' + options.frameworkName + ' to project directory.');
                        callback(null, 'successful');
                        return;
                    },
                    function (callback) {
                        try {
                            var projectPath = options.xCodeProjectPath + '/project.pbxproj';
                            var xcodePrj = xcode.project(projectPath);
                            xcodePrj = xcodePrj.parseSync();
                            xcodePrj.addFramework(options.frameworkName);
                            fs.writeFileSync(projectPath, xcodePrj.writeSync());
                            grunt.log.success('Updated-> xcodeproject framework ' + options.frameworkName + ' added to xcode project file.');
                            callback(null, 'successful');
                            return;
                        } catch (err) {
                            callback(err, null);
                            return;
                        }
                    }
                ],
                function (err, results) {
                    if (err) {
                        grunt.util.error(err);
                    } else {
                        grunt.log.success('Done-> xcodeproject framework ' + options.frameworkName + ' added successfully.');
                    }
                });
        }
        process();

        // function process() {
        //     grunt.log.writeln('Running copy');
        copyDir.sync(options.frameworkSourcePath + '/' + options.frameworkName, options.projectPath + '/' + options.frameworkName);
        //     grunt.log.success('Done-> xcodeproject');
        // }
        // process();

    });

};
