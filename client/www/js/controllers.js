angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('HomeCtrl',
		["$sce", function ($sce) {
			this.config = {
				sources: [
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
				],
				tracks: [
					{
						src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
						kind: "subtitles",
						srclang: "en",
						label: "English",
						default: ""
					}
				],
				theme: "bower_components/videogular-themes-default/videogular.css",
				plugins: {
					poster: "http://www.videogular.com/assets/images/videogular.png"
				}
			};
		}]
	)
    .controller('EpisodesCtrl', function($scope, Episode) {
	$scope.page = 1;
	$scope.nextPage = function() {
	    if($scope.page === 5) {
		$scope.noMoreItemsAvailable = true;
	    }
	    episodeQuery = Episode.query({page: $scope.page});
	    episodeQuery.$promise.then(function (result){
		if ($scope.episodes === undefined) {
		    $scope.episodes = result.episodes;
		}
		else {
		    $scope.episodes.push.apply($scope.episodes, result.episodes);
		}
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.page += 1;
	    });
	};
    })
    .controller('EpisodeCtrl', function($scope, $stateParams, Episode, $ionicLoading, $sce) {
	$scope.episode = Episode.get({episodeSlug: $stateParams.episodeSlug});
	$scope.episode.$promise.then(function (result) {
	    $scope.episodeDescription = $sce.trustAsHtml($scope.episode.description);
	});

	$scope.play = function(src) {
	    if($scope.audio === undefined) {
		$scope.audio = new Audio($scope.episode.public_url);
	    }
	    $scope.audio.play();
	}

	$scope.pause = function () {
	    $scope.audio.pause();
	}
	
	var mediaStatusCallback = function(status) {
            if(status == 1) {
		$ionicLoading.show({template: 'Loading...'});
            } else {
		$ionicLoading.hide();
            }
	}
    });
