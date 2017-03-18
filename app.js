(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function MenuSearchService(MenuSearchService) {
  var searcher = this;
  var searchTerm = "";

  var promise = MenuSearchService.getMatchedMenuItems(searchTerm); //TO DO: implement getMatchedMenuItems

  promise.then(function (response) {
    searcher.found = response.data;
    console.log("found is:");
    console.log(searcher.found);
  })
  .catch(function (error) {
    console.log("No results found.");
  });

  searcher.logMenuItems = function (shortName) {
    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}
/////////////*********** Services********** //////////
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems= function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath +  "/menu_items.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

}
});
