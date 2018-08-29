const gutil = require('gulp-util');
const through2 = require('through2');
const path = require('path');

const PLUGIN_NAME = "gulp-dist-filter";

const files = [];
var opts = {};
var base_opts = {
	is_log_trace: false,
	dist_path: "dist",
	html_path: ".tmp",
};

function output(options) {

	// set option
	opts = options || {};
	opts = Object.assign(base_opts, opts);

	function transform(file, encoding, callback) {
		if (file.isNull()) {
			this.push(file);
			return callback();
		}
		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return callback();
		}

		files.push(file);

		callback();
	}

	function flush(callback) {

		let file_paths = [];

		files.forEach((file)=>{
			let tmp = process.cwd();
			tmp = path.resolve(tmp, opts.html_path);

			let dist = process.cwd();
			dist = path.resolve(dist, opts.dist_path);

			let file_path = file.path.replace(tmp, "");
			file_path = path.resolve(dist, `./${file_path}`);

			let _file = file_paths.find((_path)=>{
				return _path == file_path;
			});

			if (opts.is_log_trace ) {
				console.log(`---------------------------------------------`);
				console.log(`file.path : ${file.path}`);
				console.log(`file_path : ${file_path}`);
			}

			if (!_file ) {
				this.push(file);
				file_paths.push(file_path);

				if (opts.is_log_trace) {
					console.log(`[useref_exits] ${file_path}`);
				}
			}
		});

		callback();
	}

	var outObject = through2.obj(transform, flush);

	return outObject;
}

module.exports = output;
