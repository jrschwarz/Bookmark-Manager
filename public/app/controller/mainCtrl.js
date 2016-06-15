angular.module('app').controller('mainCtrl', function($scope, $window, localStorageService) {

	$scope.bookmarkInput = {
		name: '',
		url: '',
		isFavorite: false,
		editing: false
	};

	$scope.defaults = [ 
		{ 
			name:'Google',
			url: 'http://google.com',
		  	isFavorite: false,
		  	editing: false
		},
		{
			name: 'Facebook',
			url: 'http://facebook.com',
			isFavorite: false,
			editing: false
		},
		{
			name: 'Youtube',
			url: 'http://youtube.com',
			isFavorite: false,
			editing: false
		},
		{
			name: 'FAU Blackboard',
			url: 'https://bb.fau.edu',
			isFavorite: false,
			editing: false
		},
		{
			name: 'Apple',
			url: 'http://apple.com',
			isFavorite: false,
			editing: false
		}
	];

	var listInStore = localStorageService.get('bookmarks');
	$scope.bookmarks = (listInStore != null) ? listInStore : $scope.defaults;
	$scope.panelOpen = false;

	$scope.$watch('bookmarks', function() {
		localStorageService.set('bookmarks', $scope.bookmarks);
	}, true);


	$scope.cancelEditing = function() {
		$scope.bookmarks.forEach(function(b) {
			b.editing = false;
		})
	}

	$scope.addBookmark = function() {
		$scope.bookmarks.push($scope.bookmarkInput);

		$scope.bookmarkInput = {
			name: '',
			url: '',
			isFavorite: false,
			editing: false
		};
	}

	$scope.editBookmark = function(bookmark, e) {

		e.stopPropagation();
		$scope.bookmarks.forEach(function(b) {
			if(b == bookmark) b.editing = true;
			else b.editing = false;
		})
	}

	$scope.updateBookmark = function(bookmark) {

		$scope.bookmarks.forEach(function(b) {
			if(b == bookmark) b.editing = false;
			else b.editing = false;
		})
	}

	$scope.deleteBookmark = function(bookmark, e) {

		e.stopPropagation();

		var index = $scope.bookmarks.indexOf(bookmark);
		$scope.bookmarks.splice(index, 1);
	}

	$scope.markFavorite = function(bookmark, e) {

		e.stopPropagation();
		bookmark.isFavorite = true;
	}

	$scope.unmarkFavorite = function(bookmark, e) {

		e.stopPropagation();
		bookmark.isFavorite = false;
	}

	$scope.openWindow = function(bookmark, e) {

		e.stopPropagation();
		if (!bookmark.editing) $window.open(bookmark.url);
	}
});