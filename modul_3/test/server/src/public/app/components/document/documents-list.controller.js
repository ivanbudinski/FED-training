(function(){
	"use strict";

	angular
		.module('warehouse.document')
		.controller("DocumentsListController", DocumentsListController);

	DocumentsListController.$inject=['DocumentService', 'documents','$location'];
	function DocumentsListController(DocumentService, documents, $location){
		var dlc=this;

		dlc.documents=documents.results;
		dlc.count=documents.count;

		dlc.tableSetting={
			dateOfCreation: true,
			dateOfRecording:true,
			status:true,
			transactionType:true,
			businessPartner:true,
			businessPartnerLocation:true,
			year:true,
			showButton:true,
			toggleShow:function(){
				if (this.showButton==true) {
					this.showButton=false;
				}else{
					this.showButton=true;
				}
			}
		}

		dlc.params={
			page:1,
			pageSize:10,
			sort:'',
			sortDirection: 'asc'
		}

		dlc.pagination={
			iterator: new Array(Math.ceil(dlc.count / dlc.params.pageSize)),
			changePage: function(page) {
				if(page>=1&&page<=this.iterator.length){
					dlc.params.page = page;
					getDoc();
				}
			}
		}

		dlc.editDocument = function(id) {
			$location.path("/document/"+id);
		};

		dlc.tableChanged = function(sortParam){
			if(dlc.params.sort === sortParam) {
				dlc.params.sortDirection = dlc.params.sortDirection == 'asc' ? 'desc' : 'asc';
			} else {
				dlc.params.sort = sortParam;
				dlc.params.sortDirection = 'asc';
			}
			getDoc();	
		}

		var getDoc = function (){
			DocumentService.getDocuments(dlc.params).then(function(data){
				dlc.documents=data.results;
				dlc.count=data.count;
			});
		}
		
	}
})();