/**
 * Home controller definition
 * @scope Controllers
 */
define(function (require) {
  'use strict';
  var module = require('./module'),
  _ = require('underscore');

	module.controller('JobCtrl',
	    ['$scope','$q','db','FrontController','typeOptions','jobs',
	    function ($scope,$q,db,FrontController,typeOptions,jobs) {

	      $scope.jobs = jobs;
	      $scope.sortOrder = true;
	      $scope.editing = false;
	      $scope.typeOptions = typeOptions;
	      $scope.orderProp = $scope.typeOptions[0].value;
	      var unEditedJob = {};

	      $scope.addJob = function(job) {

	        job.subJobs = createsubjobs(job.subJobs);

	        db.add(job).then(function(res){
	          job._id = res.id;
	          job._rev = res.rev;
	          $scope.jobs.push(job);
	          $scope.newJob = '';
	        });
	      };

	      $scope.removeJob = function(job) {
	        db.remove(job).then(function(res){
	          if(res.ok === true){
	            $scope.jobs.splice($scope.jobs.indexOf(job),1);
	          }
	        });
	      };

	      $scope.ascending = function(){
	        $scope.sortOrder = false;
	      };

	      $scope.descending = function(){
	        $scope.sortOrder = true;
	      };

	      $scope.viewSubJobs = function(job){
	        sessionStorage.setItem('selectedSubJob',job._id);
	        //require(['FrontController'],function(fronController){
	        FrontController.invoke('subJobsUI');
	        //})
	      };

	      $scope.editJob = function(job) {
	        if(!$scope.editing)
	        {
	          $scope.editing = true;
	          job.subJobs = job.subJobs.length || 0;
	          unEditedJob = _.clone(job);
	          $scope.newJob = job;
	        }
	        else
	        {
	          window.alert('already editing');
	        }
	      };

	      $scope.submitJob = function(job) {
	        if($scope.editing)
	        {
	          this.saveJob(job);
	        }
	        else
	        {
	          this.addJob(job);
	        }
	      };

	      $scope.saveJob = function(job) {
	        if(!_.isEqual(job, unEditedJob)){
	          var index = $scope.jobs.indexOf(job);
	          // remove what angular added
	          job = _.omit(job, '$$hashKey');
	          job.subJobs = createsubjobs(job.subJobs);
	          db.update(job).then(function(res){
	            // update rev
	            $scope.jobs[index]._rev = res.rev;
	          });
	        }

	        $scope.newJob = '';
	        $scope.editing = false;
	      };
	      // convert num of subjobs to array of num objects
	      var createsubjobs = function(subJobsCount)
	      {
	        var subJobs = [];

	        for (var i = 0; i < subJobsCount; i++) {
	          subJobs.push({});
	        }

	        return subJobs;
	      };

	    }]);
});