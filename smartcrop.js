// use walk to iterate through a directory
var walk    = require('walk');
//use tinify to create thumbnails
var tinify = require("tinify");

tinify.key = "UvQbkRDVKFAqP4Gz4W4CcBpc8LITtfd4";
var source;
var resized;

// Walker options - iterate through a directory named uncompressed that has the uncompressed images
var walker  = walk.walk('./uncompressed', { followLinks: false });

walker.on('file', function(root, stat, next) {
    source = tinify.fromFile("uncompressed/"+stat.name); // pass the file to tinify to resize, we are choosing 100x100 as size of thumbnail
    resized = source.resize({
  		method: "cover",
 		 width: 100,
 		 height: 100
	});
	resized.toFile("thumbnails/"+stat.name); // save thumbnails in a directory named thumbnails
	console.log("done creating thumbnail for: " + stat.name);
    next();
});

walker.on('end', function() {
});