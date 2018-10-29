/**
 * Master Controller
 */

angular.module('RDash')
       .controller('MasterCtrl', ['$scope', '$cookieStore','$http', MasterCtrl])

function MasterCtrl($scope, $cookieStore, $http) {
    
    var mobileView = 992;

    console.log("loading main ctrl");

    var commonHeaders = {
        'authorization': 'Basic cHVsYWdhbmF0aGFuQGNzYy5jb206RzAwZ2xlMTIzNDUhIQ=='
    }

    $http(
        {
            method: 'GET',
            url: 'https://cscsacdevtest.service-now.com/api/now/stats/sys_user?sysparm_query=active%3Dtrue%5Ecompany.name%3DCSC%20Internal&sysparm_count=true',
            headers: commonHeaders
        }
    ) .success(function(data) { 
        console.log(data.result.stats.count);
        $scope.userCount = data.result.stats.count;
     }).error(function(msg, code) {
        console.log(msg, code);               
     });

     $http(
        {
            method: 'GET',
            url: 'https://cscsacdevtest.service-now.com/api/now/table/alm_hardware?sysparm_query=company.name%3DCSC%20Internal%5Easset_tagISNOTEMPTY&sysparm_count=true&sysparm_limit=20&sysparam_fields=asset_tag',
            headers: commonHeaders
        }
    ) .success(function(data) { 
        console.log(data.result.length);
        $scope.assetCount = data.result.length;
        $scope.assets = data.result;
     }).error(function(msg, code) {
        console.log(msg, code);               
     });

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        console.log("hello");
        
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}
