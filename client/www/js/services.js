angular.module('starter.services', ['ngResource'])

    .factory('Episode', function ($resource){
	return $resource('http://archive.uhhyeahdu.de/episodes/:episodeSlug.json', {}, {
		get: {
		    method: 'GET',
		    transformResponse: function (data, headersGetter) {
			return JSON.parse(data);
		    }
		},
		query: {
		    method: 'GET',
		    params: {page: 1, by_direction: 'desc'}
		}
	    });
    });
