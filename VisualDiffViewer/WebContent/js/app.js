angular.module('visualDiffApp', ['ngSanitize','anguFixedHeaderTable', 'angular-rich-text-diff'])
  .controller('VisualDiffController', ['$scope', '$http', '$templateCache', '$filter',
    function($scope, $http, $templateCache, $filter) {
      var x2js = new X2JS();
      var visualDiff = this;

      visualDiff.uuid = '';

      visualDiff.type = '';

      visualDiff.currentVersionName = '';

      visualDiff.selectedVersionName = '';

      visualDiff.versions = [];

      visualDiff.latest = [];

      visualDiff.selected = [];

      visualDiff.differences = [];

      $scope.init = function() {
        // retrieve document UUID from query string
        visualDiff.uuid = window.location.search.substring(4);

        // retrieve a list of all versions
        $http.get('http://' + location.hostname + '/wps/mycontenthandler/!ut/p/wcmrest/item/' + visualDiff.uuid + '/versions').
          success(function(data, status, headers, config) {
            visualDiff.versions = data.feed.entry;

            visualDiff.currentVersionName = visualDiff.versions[0].versionContent.versionName;
            visualDiff.versions[0].versionContent.versionName += ' (Current)';

            visualDiff.versions.forEach(function(entry) {
              var tempDate = new Date(entry.versionContent.versionDate.substring(0, entry.versionContent.versionDate.indexOf('.')));
              entry.versionContent.versionDate = tempDate.toLocaleString();
            });
          }).
          error(function(data, status, headers, config) {
            console.log('error', + status);
          });

        // retrieve the full contents of the latest version
        $http.get('http://' + location.hostname + '/wps/mycontenthandler/!ut/p/wcmrest/Content/' + visualDiff.uuid).
          success(function(data, status, headers, config) {
            visualDiff.latest = data.entry.content.content.elements.element;
          }).
          error(function(data, status, headers, config) {
            console.log('error', + status);
            $http.get('http://' + location.hostname + '/wps/mycontenthandler/!ut/p/wcmrest/SiteArea/' + visualDiff.uuid).
              success(function(data, status, headers, config) {
                visualDiff.latest = data.entry.content.siteArea.elements.element;
              }).
              error(function(data, status, headers, config) {
                console.log('error', + status);
              });
          });
      };

      visualDiff.retrieveSelectedVersion = function(name, href) {
        visualDiff.selectedVersionName = name;

        // retrieve the full contents of the selected version
        $http.get(href).
          success(function(data, status, headers, config) {
            if (data.entry.content.content) {
              visualDiff.selected = data.entry.content.content.elements.element; 
            } else {
              visualDiff.selected = data.entry.content.siteArea.elements.element; 
            }
            visualDiff.compareElements();
          }).
          error(function(data, status, headers, config) {
            console.log('error', + status);
          });
      };

      visualDiff.compareElements = function() {
        visualDiff.differences = [];

        visualDiff.latest.forEach(function(latestEntry) {
 
          var tempArray = $filter('filter')(visualDiff.selected, { name: latestEntry.name }, true);

          if (tempArray.length > 0) {
            var selectedEntry = tempArray[0];

            if (latestEntry.type.indexOf('TextComponent') > -1) {
              if (latestEntry.data.value != selectedEntry.data.value) {
                var differenceEntry = {
                  name: latestEntry.name,
                  type: latestEntry.type,
                  before: selectedEntry.data.value,
                  after: latestEntry.data.value
                };

                visualDiff.differences.push(differenceEntry);
              }
            } else if (latestEntry.type == 'OptionSelectionComponent') {
              var latestOptions = '';
              var selectedOptions = '';
              
              latestEntry.data.optionselection.options.option.forEach(function(option) {
                if (option.selected == true) {
                  if (latestOptions == '') {
                    latestOptions = option.value;
                  } else {
                    latestOptions += ', ' + option.value;
                  }
                }
              });

              selectedEntry.data.optionselection.options.option.forEach(function(option) {
                if (option.selected == true) {
                  if (selectedOptions == '') {
                    selectedOptions = option.value;
                  } else {
                    selectedOptions += ', ' + option.value;
                  }
                }
              });

              if (latestOptions != selectedOptions) {
                var differenceEntry = {
                  name: latestEntry.name,
                  type: latestEntry.type,
                  before: selectedOptions,
                  after: latestOptions
                };

                visualDiff.differences.push(differenceEntry);
              }
            } else if (latestEntry.type == 'DateComponent') {
              var latestDate = '';
              var selectedDate = '';
              var tempDate;

              if (latestEntry.data.date) {
                tempDate = new Date(latestEntry.data.date.value.substring(0, latestEntry.data.date.value.indexOf('.')));

                if (latestEntry.data.date.type.indexOf('DateTime') > -1) {
                  latestDate = tempDate.toLocaleString();
                } else if (latestEntry.data.date.type.indexOf('Date') > -1) {
                  latestDate = tempDate.toLocaleDateString();
                } else if (latestEntry.data.date.type.indexOf('Time') > -1) {
                  latestDate = tempDate.toLocaleTimeString();
                }
              } else {
                latestDate = "Not Set";
              }

              if (selectedEntry.data.date) {
                tempDate = new Date(selectedEntry.data.date.value.substring(0, selectedEntry.data.date.value.indexOf('.')));

                if (selectedEntry.data.date.type.indexOf('DateTime') > -1) {
                  selectedDate = tempDate.toLocaleString();
                } else if (selectedEntry.data.date.type.indexOf('Date') > -1) {
                  selectedDate = tempDate.toLocaleDateString();
                } else if (selectedEntry.data.date.type.indexOf('Time') > -1) {
                  selectedDate = tempDate.toLocaleTimeString();
                }
              } else {
                selectedDate = "Not Set";
              }

              if (latestDate != selectedDate) {
                var differenceEntry = {
                  name: latestEntry.name,
                  type: latestEntry.type,
                  before: selectedDate,
                  after: latestDate
                };

                visualDiff.differences.push(differenceEntry);
              }


            } else if (latestEntry.type == 'LinkComponent') {
            } else if (latestEntry.type == 'ImageComponent') {
            } else {
              // ignoring
            }

          } else {
            // new element
          }
        });
      };
  }]);

