// Author: nicogis
// nicogis.blogspot.it

dojo.declare('studioat.js.dsUtility.ags', null,
    {
        constructor:function (config) {
            dojo.mixin(this, config);
        },
        urlMapServer:function (serviceName, layerId) {
            var url = esri.substitute(this, '${protocol}//${host}/${instance}/${rest}/${services}/' + serviceName + '/MapServer');
            if (layerId) {
                url += '/' + layerId;
            }
            return url;
        },
        urlGeometryServer:function () {
            return esri.substitute(this, '${protocol}//${host}/${instance}/${rest}/${services}/Geometry/GeometryServer');
        },
        urlDSUtility:function (serviceName, layerId, operation) {
            return esri.substitute(this, '${protocol}//${host}/${instance}/${rest}/${services}/' + serviceName + '/MapServer/exts/DSUtility/RouteLayers/' + layerId + '/' + operation);
        }
    }
);


dojo.declare('studioat.js.dsUtility.message', null,
    {
        message:null,
        type:null,
        duration:config.durationMessage,
        constructor:function (message, type) {
            this.message = message;
            this.type = type;
        }
    }
);
