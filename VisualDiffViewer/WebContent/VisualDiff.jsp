<!doctype html>
<html ng-app="visualDiffApp">
  <head>
    <link rel="stylesheet" type="text/css" href="css/app.css">
    <script src="js/angular.min.js"></script>
    <script src="js/angular-sanitize.min.js"></script>
    <script src="js/angu-fixed-header-table.js"></script>
    <script src="js/xml2json.min.js"></script>
    <script src="js/diff_match_patch.js"></script>
    <script src="js/angular-rich-text-diff.js"></script>
    <script src="js/app.js"></script>
  </head>
  <body>
    <div ng-controller="VisualDiffController as visualDiff" data-ng-init="init()">
      <h1>IBM Web Content Manager - Diff Viewer</h1>
      <h2>Current versions</h2>

      <table fixed-header table-height="200px" class="gridtable" style="width:600px">
        <thead>
          <tr>
            <th></th>
            <th>Version name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="version in visualDiff.versions">
            <td><input type="radio" name="href" ng-hide="$first" ng-click="visualDiff.retrieveSelectedVersion(version.versionContent.versionName, version.link[0].href)"></td>
            <td>{{version.versionContent.versionName}}</td>
            <td>{{version.versionContent.versionDate}}</td>
          </tr>
        </tbody>
      </table>

      <h2>Diff Viewer</h2>
      <div ng-hide="visualDiff.selectedVersionName">
        Please select a version.
      </div>
      <table border="1" class="gridtable animate-show" style="width:100%" ng-show="visualDiff.selectedVersionName">
        <thead>
          <tr>
            <th>Element name</th>
            <th>Element type</th>
            <th width="30%">HTML Diff View</th>
            <th width="20%">Version {{visualDiff.selectedVersionName}} (Selected)</th>
            <th width="20%">Version {{visualDiff.currentVersionName}} (Current)</th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="difference in visualDiff.differences">
            <td>{{difference.name}}</td>
            <td>{{difference.type}}</td>
            <td width="30%"><rich-text-diff left="difference.before" right="difference.after"></rich-text-diff></td>
            <td width="20%"><div><span ng-bind-html="difference.before"></span></div></td>
            <td width="20%"><div><span ng-bind-html="difference.after"></span></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>

