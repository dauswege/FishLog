// namespace fishing.log{
//     'use strict';

//     interface Person{
//         constructor(firstname: string, lastname: string,
//             username: string, mailAddress: string, _links: any);
//     }

//     class MaintenanceController{
        
//         static $init = ['$http', '$filter'];
        
//         persons: Array<Person>;
//         person: Person;

//         constructor(private $http: ng.IHttpService, private $filter: ng.IFilterService){        
//         }

//         $onInit(){
//             this.person = <Person>{};
//             // this.$http.get("persons").then(result => {
//             //     var data :any = result.data;
//             //     this.persons = data._embedded.persons;
//             // });
//             this.loadPersons();
//         }

//         savePerson(){
//             if(this.person._links == undefined){
//                 this.$http.post("persons", this.person)
//                     .then(result => {
//                         this.loadPersons();
//                     });
//             } else {
//                 this.$http.put(this.person._links.self.href, this.person)
//                     .then(result => {
//                         this.loadPersons();
//                 });
//             }

            


//         }

//         private loadPersons(){
//              this.$http.get("persons").then(result => {
//                 var data :any = result.data;
//                 this.persons = data._embedded.persons;
//             });
//         }
//     }


//     angular.module('fishingLog').controller('MaintenanceController', MaintenanceController);

// }