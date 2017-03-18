(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var searcher = this;
  var searchTerm = "";

  searcher.getMatchedMenuItems = function(searchTerm){
          searcher.found = MenuSearchService.getMatchedMenuItems(searchTerm);

          console.log(searcher.found);
      };
  };

/////////////*********** Services********** //////////
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems= function (searchTerm) {
  var items = [];
    $http({
      url: (ApiBasePath +  "/menu_items.json")
    }).then(function(response){
        for (var i=0;i<response.data.menu_items.length;i++){
            if (response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm)!==-1){
                items.push(response.data.menu_items[i]);
                //console.log("adding item:");
                //console.log(response.data.menu_items[i].name);
                }
            }
        })
      .catch(function(error){
        console.log("error retrieving data");
        });
      
        console.log("Returning items:");
        console.log(items);
      return items;
  };
}
})();
