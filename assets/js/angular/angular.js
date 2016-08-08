var app=angular.module("CorporateDashboardApp",["ui.router","ngAnimate","uiGmapgoogle-maps"]);app.filter("moment",function(){return function(t){var e=t,n=parseInt(e.split("-")[0]),i=parseInt(e.split("-")[1])-1,r=parseInt(e.split("-")[2]),o=moment().year(n).month(i).date(r);return o=o.calendar(null,{sameDay:"[Today]",nextDay:"[Tomorrow]",lastDay:"[Yesterday]",lastWeek:"D MMM, YYYY",sameElse:"D MMM, YYYY"})}}),app.config(["$stateProvider","$urlRouterProvider","uiGmapGoogleMapApiProvider",function(t,e,n){n.configure({v:"3.18",key:"AIzaSyBWbn2woYcKBa78EGto81shmbogj-9LfF0"}),e.otherwise("/"),t.state("geospatial",{url:"/",templateUrl:"views/geospatial.html",controller:"GeospatialCtrl as dashboard",resolve:{Employees:["CompanyDataService",function(t){return t.getEmployees()}]}}).state("keyMetrics",{url:"/metrics",templateUrl:"views/key-metrics.html",controller:"KeyMetricsCtrl as dashboard",resolve:{Customers:["CompanyDataService",function(t){return t.getCustomers()}],Issues:["CompanyDataService",function(t){return t.getIssues()}]}}).state("data",{url:"/data",templateUrl:"views/data.html",controller:"DataCtrl as dashboard",resolve:{Issues:["CompanyDataService",function(t){return t.getIssues()}]}})}]),app.controller("DataCtrl",["UIFactory","Issues","CompanyDataService","$scope",function(t,e,n,i){var r=this;this.issues=e,this.toggleNav=t.toggleNav,setInterval(function(){n.getIssues().then(function(t,e){e&&(r.issues=t,i.$apply)})},15e3);var o=[],a=[];angular.forEach(e,function(t){o.includes(t.employee_name)||o.push(t.employee_name),a.includes(t.customer_name)||a.push(t.customer_name)}),this.issuesFilter={status:"",employee_name:"",customer_name:""},this.filterByStatusOptions=[{name:"All",value:""},{name:"Open",value:"open"},{name:"Closed",value:"closed"}],this.filterByEmployeeOptions=[{name:"All",value:""}],angular.forEach(o,function(t){r.filterByEmployeeOptions.push({name:t,value:t})}),this.filterByCustomerOptions=[{name:"All",value:""}],angular.forEach(a,function(t){r.filterByCustomerOptions.push({name:t,value:t})}),this.issuesSortOrderOptions=[{name:"Recent First",value:"-submission_timestamp"},{name:"Recent Last",value:"submission_timestamp"}],this.issuesSortOrder=this.issuesSortOrderOptions[0]}]),app.controller("GeospatialCtrl",["UIFactory","Employees","CompanyDataService","$scope","uiGmapGoogleMapApi","uiGmapGmapUtil","$interval","$timeout",function(t,e,n,i,r,o,a,s){this.employees=e;var l=this;this.toggleNav=t.toggleNav,this.map={center:{latitude:9.155746,longitude:7.727321},zoom:5,control:{}},r.then(function(t){console.log("Google Maps loaded"),s(function(){l.map.control.getGMap(),google.maps},1e3)})}]),app.controller("KeyMetricsCtrl",["UIFactory","Customers","Issues","CompanyDataService","$scope",function(t,e,n,i,r){function o(){var t=[],e=[];angular.forEach(s.customers,function(n){t.push(n.week_of_the_year),e.push(n.number_of_customers)});var n={datasets:[{data:e,label:"Customers"}],labels:t},i=$("#customers");new Chart(i,{data:n,type:"line",options:{legend:{position:"bottom"}}})}function a(){var t=0,e=0,n=0,i=["Jan","Feb","Mar","Apr","May","Jun","Jul"],r=[0,0,0,0,0,0,0];angular.forEach(s.issues,function(i){switch(t++,i.status){case"closed":n++;break;case"open":e++}var o=parseInt(i.submission_timestamp.split("-")[1])-1;r[o]++}),s.openIssues=e,s.totalIssues=t;var o={datasets:[{data:r,label:"Issues"}],labels:i},a=$("#issues");new Chart(a,{data:o,type:"bar",options:{legend:{position:"bottom"}}})}var s=this;this.issues=n,this.customers=e,this.toggleNav=t.toggleNav,o(),a(),setInterval(function(){i.getIssues().then(function(t,e){e&&(s.issues=t,a(),r.$apply)}),i.getCustomers().then(function(t,e){e&&(s.customers=t,o(),r.$apply)})},15e3)}]),app.controller("SidebarCtrl",["UIFactory","$state",function(t,e){this.toggleNav=t.toggleNav,this.isActivePage=function(t){return e.current.name===t}}]),app.factory("CSVToJSON",function(){return function(t,e){for(var n=t.split(","),i=[],r=[],o=0;o<e;o++){var a=n.shift();a=a.toLowerCase().replace(/ /g,"_"),r.push(a)}for(var s=0,l={},o=0;o<n.length;o++)l[r[s]]=n[o],s++,s==e&&(i.push(l),s=0,l={});return i}}),app.factory("UIFactory",function(){return{scrollTo:function(t,e){function n(){setTimeout(function(){$(e).focus()},i)}var i=1e3;$("html, body").animate({scrollTop:$(t).offset().top},i),e&&n()},toggleNav:function(){var t=this;$("body").toggleClass("nav-open"),$("body").hasClass("nav-open")?($(".site-main").attr("aria-hidden",!0),$(".site-sidebar").attr("aria-hidden",!1),$(".site-nav li:first-child a").focus(),$(".site-nav li a").on("click",function(){t.toggleNav()})):($(".site-main").attr("aria-hidden",!1),$(".site-sidebar").attr("aria-hidden",!0),$(".page-title .toggle-nav").focus())},toast:function(t,e){console.log("toastubg");var n=document.querySelector(".toast-container"),i=document.querySelector(".toast");i.classList.remove("success","warning","danger"),i.classList.add(t),n.classList.add("open"),i.innerHTML="\t\t        <p>"+e+'</p>\t\t        <button type="button" aria-label="Close Message" class="close-toast btn-bare"> Close </button>\t\t    ',document.querySelector(".close-toast").addEventListener("click",function(){n.classList.remove("open")})}}}),app.factory("CompanyDataService",["$http","$q","CSVToJSON","UIFactory",function(t,e,n,i){function r(t,e){return t.length===e.length&&t.toString()===e.toString()}var o="./data/",a=[],s=[],l=[];return{getEmployees:function(){return e(function(e,n){t.get(o+"employees.json").then(function(t){var n=!r(t.data,a);a=t.data,e(a,n)}).catch(function(t){i.toast("danger","Unable to get the company employees"),console.log(t)})})},getCustomers:function(){return e(function(e,a){t.get(o+"customers.csv").then(function(t){var i=n(t.data,2),o=!r(i,s);s=i,e(s,o)}).catch(function(t){i.toast("danger","Unable to get the company customers"),console.log(t)})})},getIssues:function(){return e(function(e,n){t.get(o+"issues.json").then(function(t){var n=!r(t.data,l);l=t.data,e(l,n)}).catch(function(t){i.toast("danger","Unable to get the company issues"),console.log(t)})})}}}]);