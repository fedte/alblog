/**
 * Created by Falost on 2016/8/3.
 */
angular.module('settingCtr',[])
    .controller('globalSetting',function($scope, $http){
      console.log('anguler 开始加载')
      $http.get('/api/setting').success(function(data){
        $scope.setting = [data];
        console.log( $scope.setting)
      });
    });
