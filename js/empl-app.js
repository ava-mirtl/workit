function Route(name, htmlName, defaultRoute) {
    try {
        if(!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.constructor(name, htmlName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    constructor: function (name, htmlName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name; 
    }
}
function Router (routes){
    try {if(!routes){
        throw 'error: routes parameters is mandatory';}
        this.constructor(routes);
        this.init();
    } catch (error) {
        console.log(error);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function(routes){
        this.routes = routes;
        this.rootElem = document.querySelector('#app')
    },
init: function(){
    let r = this.routes;
    (function(scope, r){
        window.addEventListener('hashchange', (e)=>{
            scope.hasChanged(scope, r);
        });
    })(this, r);
    this.hasChanged(this, r)
},
hasChanged: function (scope, r){
    if(window.location.hash.length > 0){
        for (let i = 0, length = r.length; i<length; i++){
            let route = r[i];
        if(route.isActiveRoute(window.location.hash.substring(1))){
            scope.goToRoute(route.htmlName);
        }
        else if(route.default){
            scope.goToRoute(route.htmlName)
        }
        }
    } 
},
goToRoute: function(htmlName) {
    (function(scope){
        let url = 'views' + htmlName,
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
           if(this.readyState === 4 && this.status === 200) {
            scope.rootElem.innerHTML = this.responseText;
           }
        };
xhttp.open('GET', url, true);
xhttp.send();
    })(this);
}

};
(function () {
    function init() {
        let router = new Router([
            new Route("about", "about.html", true),
            new Route('search', 'en_search_applicants.html'),            
            new Route('contacts', 'contacts.html'),
            new Route('new-vacancy', 'create-vacancy.html'),
            new Route("en/create-vacancy", "en_create-vacancy.html"),
            new Route("en/search", "en_search_applicants.html"),
        ]);
    }
    init();
}());
