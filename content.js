console.log("trello job checker injected!!")

let extract = function(){
	let data = []
	$('.js-list.list-wrapper').each((i,e,a)=>{
		let listId = $(e).find('h2').text()
		let cards = $(e).find('.list-card.js-member-droppable.ui-droppable')

		cards.each((cardIdx,card,cardList)=>{
			let cardShortId = $(card).find('.card-short-id').text()
			let cardTitle = $(card).find('.list-card-title.js-card-name').text()
			let members = $(card).find(".js-list-card-members .member")

			members.each((memberIdx, memberEle, memberList)=>{
				let firstChild = $(memberEle).children()[0]
				var memberName = $(firstChild).attr("title")
				data.push({listId, "cardTitle":cardTitle.replace(cardShortId, ""), memberName})				
			})
		})
	})
	return data
}

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if ((msg.from === 'popup') && (msg.subject === 'dataList')) {
  	var v = extract()
    response(v);
  }
});
