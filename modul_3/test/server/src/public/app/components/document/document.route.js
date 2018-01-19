(function(){
	"use strict";

	angular
		.module('warehouse.document')
		.config(config);

	config.$inject=['$stateProvider'];	
	function config($stateProvider){

		$stateProvider
			.state('main.documents',{
				url:'/documentsList',
				views:{
					'content@':{
						templateUrl:'app/components/document/documents-list.html',
						controller:'DocumentsListController',
						controllerAs:'dlc',
						resolve:{
							documents:getDocumentsList
						}
					}
				}
			})
			.state('main.document',{
				url: "/document/:id",
				views:{
					'content@':{
						templateUrl:'app/components/document/document.html',
						controller:'DocumentController',
						controllerAs:'dc',
						resolve:{
							document:getDoc,
							documentItems:getDocItems,
							articles:getArticles
						}
					}	
				}
			});

		getDocumentsList.$inject=['DocumentService']
		function getDocumentsList(DocumentService){
			return DocumentService.getDocuments({'pageSize':10});
		}

		getDoc.$inject=['DocumentService','$stateParams']
		function getDoc(DocumentService,$stateParams){
			return DocumentService.getDocument($stateParams.id);
		}

		getDocItems.$inject=['DocumentService','$stateParams']
		function getDocItems(DocumentService,$stateParams){
			return DocumentService.getDocumentItems($stateParams.id);
		}

		getArticles.$inject=['DocumentService']
		function getArticles(DocumentService){
			return DocumentService.getArticles();
		}


	}
})();