/*
 * image-optimization
 * https://github.com/prashantkoshta/image-optimization.git
 *
 * Copyright (c) 2017 Prashant Koshta
 * Licensed under the MIT license.
 */

'use strict';
var fs = require("fs");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('image_optimization', 'Help to identify allowed images size and image size map with optimization rate.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      allowedsize: ''
    });

    
    getAllowedFileUnit(options.allowedsize);
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
           var stats = fs.statSync(filepath);
           var fileSize = stats["size"];
           grunt.log.writeln("File", filepath, fileSize);
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));
      // Handle options.
      src += options.punctuation;
      // Write the destination file.
      grunt.file.write(f.dest, src);
      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });



  });

  function setMap(fpath,fsize){

  }

  function getAllowedFileUnit(allowedsize){
    var sizeunit = {
      "KB" : 1024,
      "MB" : 1024 * 1024,
      "GB" : 1024 * 1024 * 1024,
      "NA" : 0
    };
    allowedsize = allowedsize.trim();
    allowedsize = allowedsize.toUpperCase();
    var key = allowedsize!=""? allowedsize.substring(allowedsize.length-2 ,allowedsize.length) : "NA";
    if(key !== "NA"){
      allowedsize = allowedsize.replace(key,"")
    }

    if(sizeunit[key]=== undefined) 
    {
      grunt.log.error("Invalid size syntax. ");
    }
    allowedsize = allowedsize * sizeunit[key]
    return allowedsize;
  }


};
