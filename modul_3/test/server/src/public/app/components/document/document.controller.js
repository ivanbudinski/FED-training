(function(){
	"use strict";

	angular
		.module('warehouse.document')
		.controller("DocumentController", DocumentController);

	DocumentController.$inject=['DocumentService', 'document', 'documentItems', 'articles', '$location'];
	function DocumentController(DocumentService, document, documentItems, articles, $location){
		var dc=this;
		
		dc.document=document;
		dc.documentItems=documentItems.results;
		dc.articles=articles.results;

		dc.recDocument = function(){
			dc.document.status="recorded";
			dc.document.dateOfRecording=new Date();
			DocumentService.recordDocument(dc.document).then(function(){
				getAll();
			})
		}

		dc.addItem = function(){
			DocumentService.addNewItem(dc.document._id, dc.newItem).then(function(){
				getAll();
				dc.newItem={article:"",price:"",quantity:""};
			})
		}

		var getAll =function(){
			DocumentService.getDocument(dc.document._id).then(function(data){dc.document=data;});
			DocumentService.getDocumentItems(dc.document._id).then(function(data){dc.documentItems=data.results;});
			DocumentService.getArticles().then(function(data){dc.articles=data.results;});
		}

		
	}
})();