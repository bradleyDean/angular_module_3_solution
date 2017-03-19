(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItems(){
    //directive definition object:
    //NOTE: Caution when changing object or array property in component scope 
    //since the change will be reflected in the parent.
    var ddo = {
        templateUrl: 'foundItems.html',
        scope:{ //in isolated scope mode, directive can not directly access scope of parent controller
            onRemove: '&',
            found: '<'
            
        },
        controller: FoundItemsDirectiveController, //note not registered on the module
        controllerAs: 'list',
        bindToController: true
    };
    return ddo;

}

function FoundItemsDirectiveController(){
    var list = this;
    list.found = [];
    list.message = "Nothing Found";
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.refresh = function(){
        MenuSearchService.getMatchedMenuItems(menu.searchTerm)
        .then(function(results){
            //console.log(results);
            menu.found = results.foundItems;
            //console.log(menu.found);
            if (results.foundItems.length === 0){
                menu.message = 'Nothing Found';
            }else{
                menu.message = "";
            }
        });
    }
    menu.removeItem = function(index){
        menu.found.splice(index,1);
    }
}  //END: NarrowItDownController

/////////////*********** Services********** //////////
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems= function (searchTerm) {
      //console.log(searchTerm);
    //console.log('In getMatchedMenuItems');
    return $http({ 
        method: 'GET', 
        url: (ApiBasePath + '/menu_items.json')
        })
      .then(function(response){
          var all = response.data;
          //console.log(all);
          var found = [];

          for (var i=0;i<all.menu_items.length;i++){
              var item = all.menu_items[i];
              if (searchTerm != null && searchTerm !== "" && item.description.toLowerCase().indexOf(searchTerm)!==-1){
                found.push(item);
                }
          }
          return {foundItems: found};
       })
      .catch(function(error){
          console.lot("Something Went Wrong!");
          return {foundItems: []};
      });
   } //end getMatchedMenuItems
} //end menuSearchService

})();
