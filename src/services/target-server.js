export default {
    get : function() {
        //if (APP_DATA !== undefined && APP_DATA.baseURI) return APP_DATA.baseURI;

        var targetServer = document.baseURI;
        targetServer = targetServer.replace(':8080', '');
        return targetServer;
    }
}