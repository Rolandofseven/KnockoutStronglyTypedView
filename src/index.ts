/// <reference path="./../node_modules/@types/jquery/index.d.ts" />" />
/// <reference path="../typings/devexpress/dx.all.d.ts" />

import * as ko from 'knockout';
import * as kom from 'knockout.mapping';
import * as dialog from 'devextreme/ui/dialog';
import * as $ from 'jquery'

import 'devextreme/integration/knockout';
import 'devextreme/ui/button';
import 'devextreme/ui/data_grid';
import 'devextreme/ui/text_box';

import {DataGridOptions, editing} from '../Models/DataGridOptions';
import {DxColumn, lookup} from '../Models/DxColumn';
import {DxButtonOptions} from '../Models/DxButtonOptions';


class Company {
    public ID: number;
    public CompanyName: string;
    public Address: string;
    public City: number;

    constructor(id: number, name: string, address: string, city: number) {
        this.ID = id;
        this.CompanyName = name;
        this.Address = address;
        this.City = city;
    }
}

class City {
    public ID: number;
    public CityName: string;
    constructor(id:number, cityName:string){
        this.ID = id,
        this.CityName = cityName 
    }
}

class Post {
    public userId: number;
    public id:number;
    public title:string;
    public body:string;
}

class vm{
    dataGridOptions:DataGridOptions<Company>;
    showAllocatonHistoryForm:KnockoutObservable<boolean>;

    constructor(dataGridOptions:DataGridOptions<Company>,showAllocatonHistoryForm:KnockoutObservable<boolean>){
        this.dataGridOptions = dataGridOptions;
        this.showAllocatonHistoryForm = showAllocatonHistoryForm;
    }
}


let cities = new Array<City>();

cities.push(new City(1, "London"));
cities.push(new City(2, "New York"));
cities.push(new City(3, "Paris"));
cities.push(new City(4, "Moscow"));

let companies = new Array<Company>();
companies.push(new Company(1,"asdasd","55",1));
companies.push(new Company(2,"asdasd","66",2));
companies.push(new Company(3,"asdasd","77",3));
companies.push(new Company(4,"asdasd","88",4));

let companyObservable           = kom.fromJS(companies);
let showAllocatonHistoryForm    = ko.observable<boolean>(false);

let columns = new Array();
columns.push(new DxColumn("ID", "ID"));
columns.push(new DxColumn("CompanyName", "CompanyName"));
columns.push(new DxColumn("Address", "Address"));
columns.push(new DxColumn<City>("City", "City", cities, "CityName", "ID"));


window.onload = function() {

    $.getJSON( "https://jsonplaceholder.typicode.com/posts", function( data ) {
        var repos: Post[] = data;
        var r = kom.fromJS(repos);
        //alert(r()[0].body());
    });
      

    addButtons();

    let dataGridOptions = new DataGridOptions<Company>(companyObservable,columns,null);
    let dxButton = new DxButtonOptions("Hello", "Success", null);

    let edit = new editing();
    edit.allowAdding = true;
    edit.allowDeleting = true;
    edit.allowUpdating = true;
    edit.mode = "row";

    edit.texts.editRow = "Edit";
    edit.texts.deleteRow = "Delete";
    edit.texts.saveRowChanges = "Save";

    dataGridOptions.editing = edit;
    dataGridOptions.onEditorPreparing = function(e:any){
        
    };

    let viewModel = {
        dataGridOptions:dataGridOptions,
        showAllocatonHistoryForm:showAllocatonHistoryForm
    }

    let vm2 = new vm(dataGridOptions,showAllocatonHistoryForm);

    ko.applyBindings(vm2, document.getElementById("data-grid-demo"));
};

function addButtons(){
    var docContext = document.getElementById('content');

    var butShowModal = document.createElement('button');
    butShowModal.innerText = "Show Modal";
    butShowModal.id = "Buttone";
    butShowModal.onclick = ShowModal

    docContext.appendChild(butShowModal);

    var butReplaceArray = document.createElement('button');
    butReplaceArray.innerText = "ReplaceArray";
    butReplaceArray.id = "Buttone";
    butReplaceArray.onclick = ReplaceArray

    docContext.appendChild(butReplaceArray);

    var butRemoveArray = document.createElement('button');
    butRemoveArray.innerText = "RemoveArray";
    butRemoveArray.id = "Buttone";
    butRemoveArray.onclick = RemoveArray

    docContext.appendChild(butRemoveArray);

    var butSayHello = document.createElement('button');
    butSayHello.innerText = "Say Hello";
    butSayHello.id = "Buttone";
    butSayHello.onclick = SayHello

    docContext.appendChild(butSayHello);
}

function SayHello(){
    alert("here");
    var i = <KnockoutObservable<number>>companyObservable()[0].ID;
    i(2);

    companyObservable.push(new Company(61,"asdasd","88",1))

    var j = <KnockoutObservable<number>>companyObservable()[1].ID;
    
    alert(j());
}

function RemoveArray(){
    companies = new Array<Company>();
    companyObservable(companies)
}

function ReplaceArray(){

    companies = new Array<Company>();
    companies.push(new Company(6,"asdasd","55",1));
    companies.push(new Company(7,"asdasd","66",2));
    companies.push(new Company(8,"asdasd","77",4));
    companies.push(new Company(9,"asdasd","88",3));

   
    companyObservable(companies)

    companies = new Array<Company>();
    companies.push(new Company(16,"asdasd","55",2));
    companies.push(new Company(17,"asdasd","66",2));
    companies.push(new Company(18,"asdasd","77",1));
    companies.push(new Company(19,"asdasd","88",2));

    
    companyObservable(companies)

    //companyObservable = kom.fromJS(companies);
}


function ReplaceArray2(){
    companies = new Array<Company>();
    companies.push(new Company(77,"asdasd","55",1));
    companies.push(new Company(17,"asdasd","66",2));
    companies.push(new Company(18,"asdasd","77",3));
    companies.push(new Company(55,"asdasd","88",4));

   
    companyObservable(companies)
}

function ShowModal(){
    showAllocatonHistoryForm(true);
}