App.config(function($stateProvider) {

    $stateProvider.state('tip-view', {
        url: BASE_PATH+"/tip/mobile_view/index/value_id/:value_id",
        controller: 'TipController',
        templateUrl: 'templates/tip/l1/view.html'
    });

}).controller('TipController', function($window, $scope, $stateParams, Tip) {

    $scope.is_loading = true;
    $scope.value_id = Tip.value_id = $stateParams.value_id;

    $scope.$on("connectionStateChange", function(event, args) {
        if(args.isOnline == true) {
            $scope.loadContent();
        }
    });

    $scope.bill = {};

    $scope.loadContent = function() {
        Tip.findAll().success(function(data) {
            $scope.page_title = data.page_title;
            $scope.currency = data.currency_symbol;
            $scope.format = data.format;
            $scope.is_loading = false;
        });
    };

    $scope.calculate = function() {

        if($scope.bill.amount && $scope.bill.percent) {

            $scope.global_tip = ($scope.bill.amount * ($scope.bill.percent/100)).toFixed(2);

            if($scope.bill.number < 0) {
                $scope.bill.number =null;
            }

            if($scope.bill.number) {
                $scope.each_tip = ($scope.global_tip / $scope.bill.number).toFixed(2);
                $scope.each_tip = $scope.format.replace(",00","").replace(".00","").replace("1", $scope.each_tip);
            }
            $scope.global_tip = $scope.format.replace(",00","").replace(".00","").replace("1",$scope.global_tip);
        }
    };

    $scope.loadContent();
});