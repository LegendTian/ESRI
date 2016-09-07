/**
 * Created by LegendTian on 2016/6/6.
 */

function ALGIS(){
	this.lods = [
	            {"level" : 0, "resolution" : 0.703125, "scale" : 295497593.05875003},
	            {"level" : 1, "resolution" : 0.3515625, "scale" : 147748796.52937502},
	            {"level" : 2, "resolution" : 0.17578125, "scale" : 73874398.264687508},
	            {"level" : 3, "resolution" : 0.087890625, "scale" : 36937199.132343754},
	            {"level" : 4, "resolution" : 0.0439453125 , "scale" : 18468599.566171877},
	            {"level" : 5, "resolution" : 0.02197265625 , "scale" : 9234299.7830859385},
	            {"level" : 6, "resolution" : 0.010986328125 , "scale" : 4617149.8915429693},
	            {"level" : 7, "resolution" : 0.0054931640625 , "scale" : 2308574.9457714846},
	            {"level" : 8, "resolution" : 0.00274658203125 , "scale" : 1154287.4728857423},
	            {"level" : 9, "resolution" : 0.001373291015625 , "scale" : 577143.73644287116},
	            {"level" : 10, "resolution" : 0.0006866455078125 , "scale" : 288571.86822143558},
	            {"level" : 11, "resolution" : 0.00034332275390625 , "scale" : 144285.93411071779},
	            {"level" : 12, "resolution" : 0.000171661376953125 , "scale" : 72142.967055358895},
	            {"level" : 13, "resolution" : 8.58306884765625e-005 , "scale" : 36071.483527679447},
	            {"level" : 14, "resolution" : 4.291534423828125e-005 , "scale" : 18035.741763839724},
	            {"level" : 15, "resolution" : 2.1457672119140625e-005 , "scale" : 9017.8708819198619},
	            {"level" : 16, "resolution" : 1.0728836059570313e-005 , "scale" : 4508.9354409599309},
	            {"level" : 17, "resolution" : 5.3644180297851563e-006 , "scale" : 2254.4677204799655},
	            {"level" : 18, "resolution" : 2.6822090148925781e-006 , "scale" : 1127.2338602399827},
	            {"level" : 19, "resolution" : 1.3411045074462891e-006 , "scale" : 563.61693011999137},
	            {"level" : 20, "resolution" : 6.7055225372314455e-007 , "scale" : 281.8084650599957},
	            {"level" : 21, "resolution" : 3.35276126861572275e-007 , "scale" : 140.9042325299978},
	            {"level" : 22, "resolution" : 1.676380634307861375e-007 , "scale" : 70.45211626499891},
	            {"level" : 23, "resolution" : 8.381903171539306875e-008 , "scale" : 35.22605813249946}
	          ];
	this.map;
	this.basemaps= [];
}
ALGIS.prototype={

	    //constructor属性始终指向创建当前对象的构造函数
	    // 因为原型被替换，所以需要恢复construtor的默认指向
	    constructor: ALGIS,
	    newMap:function(mapdiv,x,y,zoom){
	    	var map;
	    	var lods=this.lods;
	    	require(["esri/map","esri/SpatialReference"],function(Map,SpatialReference){
	    		//实例化地图容器
	    		map = new Map(mapdiv,{
	    			logo:false,
	    			center: [x, y],
	    			lods: this.lods,
	    			zoom:zoom,
                    spatialReference:new SpatialReference(4490)
	    		});
	    		console.log(map);
	    	});

	    	this.map=map;
	    	return map;
	    },
	    
	    addBaseMap:function(basemapid,mapurl,title,imageurl,callback){
	    	var baseMap;
			console.log("basemaps",this.basemaps);
	    	require([
    	        //基本地图
    	 		"esri/dijit/Basemap",
    	 		//基本图层
    	 		"esri/dijit/BasemapLayer"],function(Basemap,BasemapLayer){
	    		var basemapLayer = new BasemapLayer({
	    			url:mapurl
	    		});
				baseMap = new Basemap({
					id:basemapid,
	    			layers:[basemapLayer],
	    			title:title,
	    			thumbnailUrl: imageurl
	    		});

				callback(baseMap);

	    	});
			//this.basemaps.push(baseMap);

	    },
	    startupBaseMap:function(basediv,basemaps,map){
	    	require(["esri/dijit/BasemapGallery","dojo/on"],function(BasemapGallery,on){
	    		var basemapGallery = new BasemapGallery({
					showArcGISBasemaps:false,
					basemaps          :basemaps,
	    			map               :map
	    		}, basediv);

	    		basemapGallery.startup();
				on(basemapGallery, "onError", function (error) {
	    			console.log(error);
	    		});	
 	    	});
	    },
		initBasemapGallery: function (basediv,map) {
			var basemapGallery;
			require(["esri/dijit/BasemapGallery","dojo/on"],function(BasemapGallery,on){
				basemapGallery = new BasemapGallery({
					showArcGISBasemaps:false,
					//basemaps          :basemaps,
					map               :map
				}, basediv);

				//basemapGallery.startup();
				on(basemapGallery, "onError", function (error) {
					console.log(error);
				});

			});
			return basemapGallery;
		},
	    initOverviewMap:function(){
	    	require([
	    	 		//地图布局鹰眼控件
	    	 		"esri/dijit/OverviewMap"
	    	 	], function(OverviewMap){
	    	 		 var overviewMapDijit = new OverviewMap({          
	    	 			 map: this.map,
	    	 			 attachTo: "bottom-right"
	    	 		 });        
	    	 		 overviewMapDijit.startup();
	    	 	});
	    },
	    initScalebar:function(map){
			if(!map){
				map=this.map;
			}
	    	require([
    	 		//地图布局比例尺控件
    	 		"esri/dijit/Scalebar"
    	 	], function(Scalebar){
    	 		var scalebar = new Scalebar({
    	 			map: map,
    	 			scalebarUnit:"dual" 
    	 		}); 
    	 	});	
	    },
	    initMeasurement:function(measureDiv){
	    	var measurement;
	    	require([
    	 		//地图测量工具控件
    	 		"esri/dijit/Measurement",
    	 		"esri/units",
    	 		"dojo/on",
    	 		"dojo/dom",
    	 	], function(Measurement,Units,on,dom){
    	 		measurement = new Measurement({
    	 	        map: this.map,
    	 			defaultAreaUnit: Units.SQUARE_KILOMETERS,
    	 			defaultLengthUnit: Units.KILOMETERS,
    	 	    }, dom.byId(measureDiv));
    	 		
    	 	    measurement.startup();   
    	 	});	
	    	return measurement;
	    },
	    centerTo:function(x,y,zoom){
	    	require([
	    	   	  "esri/geometry/Point"
    	   	],function(Point){
    	   	
	    	   	var point = new Point( {"x": x, "y": y, "spatialReference": {"wkid": 4490 } });
	    	   	
	    	   	this.map.centerAt(point);
    	   	
    	   	
    	   	})
	    },
	    centerToExtent:function(minX,minY,maxX,maxY){
	    	require([
	    	   	  "esri/geometry/Extent"
    	   	],function(Extent){
	    	   	var extent = new Extent( {"xmin":minX,"ymin":minY,"xmax":maxX,"ymax":maxY, "spatialReference": {"wkid": 4326 } });
	    	   	
	    	   	this.map.setExtent(extent.expand(1.5));
    	   	
    	   	})
	    },
	    //属性查询（{string}被查询图层地址，{string}条件，{bool}是否返回几何图形，{string}返回的字段）
	    doQueryByWhere:function(url, where, returnGeometry, outFields){	    
			var queryTask = new esri.tasks.QueryTask(url); 
			var query = new esri.tasks.Query();
			query.where = where;
			query.returnGeometry = false;
			query.outFields = outFields;
			var deferred = queryTask.execute(query);
			return deferred;
	    },
	newDynamicLayer: function (url,id,callback) {
		var dynamicLayer;
		require([
			"esri/layers/ArcGISDynamicMapServiceLayer"
		],function(ArcGISDynamicMapServiceLayer){
			dynamicLayer = new ArcGISDynamicMapServiceLayer(url,{"id":id});
			callback(dynamicLayer);
		})
	},
	newFeatureLayer:function(url,id,template,callback){
		var featureLayer;
		require([
			"esri/layers/FeatureLayer"
		],function(FeatureLayer){
			featureLayer = new FeatureLayer(url,{
				"id":id,
				mode: FeatureLayer.MODE_ONDEMAND,
				infoTemplate: template,
				outFields: ["*"]});
			callback(featureLayer);
		})
	}


	    
}
