define(
[
  'angular-mocks',
  'modules/jobs/jobs.ctrl'
],
function(){
  'use strict';
  describe('JobCtrl', function() {

    var scope,jobCtrl,
    frontCtrlMock,
    dbMock,
    types,
    def;

   
    beforeEach(module('app.jobs'));
    
    beforeEach(
      inject(function ($rootScope,$q,$controller) {
        scope = $rootScope.$new();

        frontCtrlMock ={
          invoke:function(){}
        };

        dbMock ={
          info:function(){
            def = $q.defer();
            return def.promise;
          },
          add:function(){
            def = $q.defer();
            return def.promise;
          },
          remove:function(){
            def = $q.defer();
            return def.promise;
          }
        };

        types = [
          { name: 'proximity', value: 'proximity' },
          { name: 'priority', value: 'priority' },
          { name: 'date', value: 'date' }
        ];

        jobCtrl = $controller('JobCtrl', {
          $scope: scope,
          db:dbMock,
          FrontController: frontCtrlMock,
          typeOptions: types,
          jobs:[]
        });
      })
    );

    it('should have a JobCtrl controller', function() {
      expect(jobCtrl).toBeDefined();
    });

    it('should have orderProp set to date by default', function() {
      expect(scope.orderProp).toBeDefined();
    });

    it('should have sortOrder set to ascending order by default', function() {
      expect(scope.sortOrder).toBeTruthy();
    });

    describe('add job form', function(){

      beforeEach(function () {
        scope.jobs = [];
      });

      it('should add a job to the job list', function() {

        scope.addJob({ ref:'127',client:'mr smith',date: new Date(2014,1,23), proximity:50,priority:3, subJobs:[{},{},{}]});
        def.resolve({});
        scope.$apply();
        expect(scope.jobs.length).toBe(1);
      });
    });

    describe('remove job button', function(){

      beforeEach(function () {
        scope.jobs = [{ ref:'127',client:'mr smith',date: new Date(2014,1,23), proximity:50,priority:3, subJobs:[{},{},{}]}];
      });

      it('should remove a job to the job list', function() {
        scope.removeJob();
        def.resolve({ok:true});
        scope.$apply();
        expect(scope.jobs.length).toBe(0);
      });
    });
  });
});


