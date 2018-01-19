(function(){
	"use strict";

	angular
		.module('warehouse.document')
		.factory("DocumentService", DocumentService);

	
		DocumentService.$inject=['$http']	
		function DocumentService($http){

			var url="http://localhost:3000/api/";

			var getDocuments=function(params){
			  return $http.get(url+'documents',{params}).then(extarctData);	
			}

			var getDocument=function(id){
			  return $http.get(url+'documents/'+id).then(extarctData);
			}

			var getDocumentItems=function(id){
			  return $http.get(url+'documents/'+id+'/items').then(extarctData);	
			}

			var getArticles=function(){
			  return $http.get(url+'articles').then(extarctData);
			}

			var recordDocument=function(doc){
				return $http.put(url+'documents/'+doc._id, doc).then(extarctData);
			}

			var addNewItem=function(id, newItem){
				return $http.post(url+'documents/'+id+'/items', newItem).then(extarctData);
			}
	
			var extarctData=function(results){
				return results.data;
			}

			return {
				getDocuments:getDocuments,
				getDocument:getDocument,
				getDocumentItems:getDocumentItems,
				getArticles:getArticles,
				recordDocument:recordDocument,
				addNewItem:addNewItem
			}

		}

})();