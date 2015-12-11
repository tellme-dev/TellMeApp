var IonicModule = angular.module('FtActionSheet', ['ngAnimate', 'ngSanitize', 'ui.router']),
	extend = angular.extend,
	forEach = angular.forEach,
	isDefined = angular.isDefined,
	isNumber = angular.isNumber,
	isString = angular.isString,
	jqLite = angular.element,
	noop = angular.noop;
IonicModule
	.factory('$ionicFtActionSheet', [
		'$rootScope',
		'$compile',
		'$animate',
		'$timeout',
		'$ionicTemplateLoader',
		'$ionicPlatform',
		'$ionicBody',
		'IONIC_BACK_PRIORITY',
		function($rootScope, $compile, $animate, $timeout, $ionicTemplateLoader, $ionicPlatform, $ionicBody, IONIC_BACK_PRIORITY) {

			return {
				show: actionSheet
			};

			function actionSheet(opts) {
				var scope = $rootScope.$new(true);

				extend(scope, {
					cancel: noop,
					destructiveButtonClicked: noop,
					buttonClicked: noop,
					$deregisterBackButton: noop,
					buttons: [],
					cancelOnStateChange: true
				}, opts || {});

				function textForIcon(text) {
					if (text && /icon/.test(text)) {
						scope.$actionSheetHasIcon = true;
					}
				}

				for (var x = 0; x < scope.buttons.length; x++) {
					textForIcon(scope.buttons[x].text);
				}
				textForIcon(scope.cancelText);
				textForIcon(scope.destructiveText);

				// Compile the template
				var element = scope.element = $compile('<ion-ft-action-sheet ng-class="cssClass" buttons="buttons"></ion-ft-action-sheet>')(scope);

				// Grab the sheet element for animation
				var sheetEl = jqLite(element[0].querySelector('.action-sheet-wrapper'));

				var stateChangeListenDone = scope.cancelOnStateChange ?
					$rootScope.$on('$stateChangeSuccess', function() {
						scope.cancel();
					}) :
					noop;

				// removes the actionSheet from the screen
				scope.removeSheet = function(done) {
					if (scope.removed) return;

					scope.removed = true;
					sheetEl.removeClass('action-sheet-up');
					$timeout(function() {
						// wait to remove this due to a 300ms delay native
						// click which would trigging whatever was underneath this
						$ionicBody.removeClass('action-sheet-open');
					}, 400);
					scope.$deregisterBackButton();
					stateChangeListenDone();

					$animate.removeClass(element, 'active').then(function() {
						scope.$destroy();
						element.remove();
						// scope.cancel.$scope is defined near the bottom
						scope.cancel.$scope = sheetEl = null;
						(done || noop)();
					});
				};

				scope.showSheet = function(done) {
					if (scope.removed) return;

					$ionicBody.append(element)
						.addClass('action-sheet-open');

					$animate.addClass(element, 'active').then(function() {
						if (scope.removed) return;
						(done || noop)();
					});
					$timeout(function() {
						if (scope.removed) return;
						sheetEl.addClass('action-sheet-up');
					}, 20, false);
				};

				// registerBackButtonAction returns a callback to deregister the action
				scope.$deregisterBackButton = $ionicPlatform.registerBackButtonAction(
					function() {
						$timeout(scope.cancel);
					},
					IONIC_BACK_PRIORITY.actionSheet
				);

				// called when the user presses the cancel button
				scope.cancel = function() {
					// after the animation is out, call the cancel callback
					scope.removeSheet(opts.cancel);
				};

				scope.buttonClicked = function(index) {
					// Check if the button click event returned true, which means
					// we can close the action sheet
					if (opts.buttonClicked(index, opts.buttons[index]) === true) {
						scope.removeSheet();
					}
				};

				scope.destructiveButtonClicked = function() {
					// Check if the destructive button click event returned true, which means
					// we can close the action sheet
					if (opts.destructiveButtonClicked() === true) {
						scope.removeSheet();
					}
				};

				scope.showSheet();

				// Expose the scope on $ionicActionSheet's return value for the sake
				// of testing it.
				scope.cancel.$scope = scope;

				return scope.cancel;
			}
		}
	])
	.directive('ionFtActionSheet', ['$document',
		function($document) {
			return {
				restrict: 'E',
				scope: true,
				replace: true,
				link: function($scope, $element) {

					var keyUp = function(e) {
						if (e.which == 27) {
							$scope.cancel();
							$scope.$apply();
						}
					};

					var backdropClick = function(e) {
						if (e.target == $element[0]) {
							$scope.cancel();
							$scope.$apply();
						}
					};
					$scope.$on('$destroy', function() {
						$element.remove();
						$document.unbind('keyup', keyUp);
					});

					$document.bind('keyup', keyUp);
					$element.bind('click', backdropClick);
				},
				template: '<div class="action-sheet-backdrop">' +
					'<div class="action-sheet-wrapper">' +
					'<div class="action-sheet" ng-class="{\'action-sheet-has-icons\': $actionSheetHasIcon}">' +
					'<div class="action-sheet-group action-sheet-options">' +
					'<div class="action-sheet-title" ng-if="titleText" ng-bind-html="titleText"></div>' +
					'<div class="sheetspan" ng-repeat="b in buttons" ng-click="buttonClicked($index)" style="width:50px;"><img ng-src="{{b.img}}" class="sheetimg"/><span ng-bind-html="b.text"></span></div>' +
					'<button class="button destructive action-sheet-destructive" ng-if="destructiveText" ng-click="destructiveButtonClicked()" ng-bind-html="destructiveText"></button>' +
					'</div>' +
					'<div class="action-sheet-group action-sheet-cancel" ng-if="cancelText">' +
					'<button class="button" ng-click="cancel()" ng-bind-html="cancelText"></button>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>'
			};
		}
	]);