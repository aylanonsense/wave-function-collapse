//configure requirejs
requirejs.config({
	baseUrl: 'javascripts',
	paths: {
		jquery: '/jquery',
		Promise: '/lib/promise-6.1.0',
		Mustache: '/mustache',
	},
	shim: {
		Promise: {
			exports: 'Promise'
		}
	}
});

//execute the main class
requirejs([ 'main' ], function(main) {
	main();
});