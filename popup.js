window.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{from: 'popup', subject: 'dataList'},
			function (dataList) {
				console.log(dataList)
				onReady(dataList)
			});
	});
});

function onReady(dataList){
  angular.element($("#MainDiv")).scope().dataList = dataList
  angular.element($("#MainDiv")).scope().$apply()
}
