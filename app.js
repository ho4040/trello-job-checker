var unique = function(list, key){
	let u = list.map(e=>{ 
			let obj={}; 
			obj[e[key]]=true; 
			return obj 
		}).reduce((a,b)=>{ 
			return Object.assign({}, a, b) 
		})
	return Object.keys(u)
}

var asDict = function(list, initVal){
	let dict = {}
	list.forEach(e=>{
		dict[e] = initVal;
	})
	return dict
}

var app = angular.module("JobChecker", [])
.controller("MainCtrl", function($scope){

	$scope.visibleList = {}


	$scope.$watch('dataList', function(values, oldData){

		if(!values)
			return;

		values.forEach(e=>{
			e.memberName = e.memberName.replace(/\(.+\)/, "").trim()
		})

		console.log("newDataRecved!", values)
		$scope.visibleList = asDict(unique(values, 'listId'), false)
		$scope.visibleMember = asDict(unique(values, 'memberName'), true)

		let users = unique(values, "memberName")

		$scope.memberWithJobs = users.map(memberName=>{
			var validDataList = values.filter(e=>{
				return e.memberName == memberName
			})
			validDataList.sort((a,b)=>{
				return a.listId < b.listId
			})

			return {memberName:memberName, jobList:validDataList}
		})

	})
})