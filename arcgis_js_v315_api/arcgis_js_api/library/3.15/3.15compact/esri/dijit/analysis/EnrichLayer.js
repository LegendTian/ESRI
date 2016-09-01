// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/analysis/templates/EnrichLayer.html":'\x3cdiv class\x3d"esriAnalysis"\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" style\x3d"margin-top:0.5em; margin-bottom: 0.5em;"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"_aggregateToolContentTitle" class\x3d"analysisTitle"\x3e\r\n        \x3ctable class\x3d"esriFormTable" \x3e \r\n          \x3ctr\x3e\r\n            \x3ctd class\x3d"esriToolIconTd"\x3e\x3cdiv class\x3d"geoenrichLayerIcon"\x3e\x3c/div\x3e\x3c/td\x3e\r\n            \x3ctd class\x3d"esriAlignLeading esriAnalysisTitle" data-dojo-attach-point\x3d"_toolTitle"\x3e${i18n.enrichLayer}\x3c/td\x3e\r\n            \x3ctd\x3e\r\n              \x3cdiv class\x3d"esriFloatTrailing" style\x3d"padding:0;"\x3e\r\n                  \x3cdiv class\x3d"esriFloatLeading"\x3e\r\n                    \x3ca href\x3d"#" class\x3d\'esriFloatLeading helpIcon\' esriHelpTopic\x3d"toolDescription"\x3e\x3c/a\x3e\r\n                  \x3c/div\x3e\r\n                  \x3cdiv class\x3d"esriFloatTrailing"\x3e\r\n                    \x3ca href\x3d"#" data-dojo-attach-point\x3d"_closeBtn" title\x3d"${i18n.close}" class\x3d"esriAnalysisCloseIcon"\x3e\x3c/a\x3e\r\n                  \x3c/div\x3e              \r\n              \x3c/div\x3e                \r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n        \x3c/table\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv style\x3d"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"_form" readOnly\x3d"true"\x3e\r\n       \x3ctable class\x3d"esriFormTable"  data-dojo-attach-point\x3d"_aggregateTable"  style\x3d"border-collapse:collapse;border-spacing:5px;" cellpadding\x3d"5px" cellspacing\x3d"5px"\x3e \r\n         \x3ctbody\x3e\r\n          \x3ctr data-dojo-attach-point\x3d"_titleRow"\x3e\r\n            \x3ctd  colspan\x3d"3" class\x3d"sectionHeader" data-dojo-attach-point\x3d"_aggregateToolDescription" \x3e${i18n.enrichDefine}\x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr data-dojo-attach-point\x3d"_analysisLabelRow" style\x3d"display:none;"\x3e\r\n            \x3ctd colspan\x3d"2" style\x3d"padding-bottom:0;"\x3e\r\n              \x3clabel class\x3d"esriFloatLeading  esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.oneLabel}\x3c/label\x3e\r\n              \x3clabel class\x3d"esriAnalysisStepsLabel"\x3e${i18n.analysisLayerLabel}\x3c/label\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd class\x3d"shortTextInput" style\x3d"padding-bottom:0;"\x3e\r\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"inputLayer"\x3e\x3c/a\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e           \r\n          \x3ctr data-dojo-attach-point\x3d"_selectAnalysisRow" style\x3d"display:none;"\x3e\r\n            \x3ctd  colspan\x3d"3"\x3e\r\n              \x3cselect class\x3d"esriLeadingMargin1 longInput esriLongLabel"  style\x3d"margin-top:1.0em;" data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"_analysisSelect" data-dojo-attach-event\x3d"onChange:_handleAnalysisLayerChange"\x3e\x3c/select\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e            \r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3" style\x3d"padding-bottom:0;"\x3e\r\n              \x3clabel class\x3d"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.oneLabel}\x3c/label\x3e\r\n              \x3c!--\x3clabel class\x3d""\x3e${i18n.chooseDataCollectionLabel}\x3c/label\x3e--\x3e\r\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"DataCollection"\x3e\x3c/a\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3c!--\x3ctr\x3e\r\n            \x3ctd colspan\x3d"3" class\x3d"clear"\x3e\x3c/td\x3e\r\n          \x3c/tr\x3e--\x3e          \r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3" style\x3d"padding-top:0;"\x3e\r\n              \x3cdiv style\x3d"width:95%;height:200px;border:1px #EFEEEF solid;" data-dojo-attach-point\x3d"_analysisVariablesCtr" class\x3d"ShoppingCart"\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"_selectedList" style\x3d"overflow-y:auto;height:100%;"\x3e\r\n                \x3c/div\x3e\r\n                \x3cdiv data-dojo-attach-point\x3d"_selectLabelDiv" class\x3d"selectLabel"\x3e${i18n.clickDataVar}\x3c/div\x3e\r\n              \x3c/div\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd \x3e\r\n              \x3cdiv data-dojo-type\x3d"dijit/form/Button" class\x3d"esriTertiaryActionBtn" data-dojo-attach-point\x3d"_addBtn" data-dojo-attach-event\x3d"onClick:_handleShowDataDialogClick"\x3e\r\n              ${i18n.selectDataVar}\r\n              \x3c/div\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd colspan\x3d"2"\x3e\r\n              \x3ctable class\x3d"esriFormTable"\x3e\r\n                \x3ctr\x3e\r\n                  \x3ctd class\x3d"ShoppingCart_CounterTD" style\x3d"padding-right:0"\x3e\r\n                    \x3cdiv class\x3d"ShoppingCart_CounterDivLeftBorder"\x3e\x3c/div\x3e\r\n                    \x3cdiv data-dojo-attach-point\x3d"varCounter" class\x3d"ShoppingCart_CounterDiv"\x3e0\x3c/div\x3e\r\n                    \x3cdiv class\x3d"ShoppingCart_CounterDivRightBorder"\x3e\x3c/div\x3e\r\n                  \x3c/td\x3e\r\n                  \x3ctd class\x3d"ShoppingCart_LabelTd" style\x3d"white-space:nowrap;"\x3e\r\n                      \x3cdiv\x3e${i18n.selectedVars}\x3c/div\x3e\r\n                  \x3c/td\x3e\r\n                \x3c/tr\x3e\r\n              \x3c/table\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3" class\x3d"clear"\x3e\x3c/td\x3e\r\n          \x3c/tr\x3e\r\n            \r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"2"\x3e\r\n              \x3clabel data-dojo-attach-point\x3d"_labelOne" class\x3d"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.twoLabel}\x3c/label\x3e\r\n              \x3clabel data-dojo-attach-point\x3d"_measurelabel" class\x3d"esriAnalysisStepsLabel"\x3e${i18n.defAreasLabel}\x3c/label\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd class\x3d"shortTextInput"\x3e\r\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' data-dojo-attach-point\x3d"_analysisFieldHelpLink" esriHelpTopic\x3d"BufferOption"\x3e\x3c/a\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd style\x3d"padding:0.25em;" colspan\x3d"3"\x3e\r\n              \x3cdiv data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"_bufferTypeSelect" class\x3d"esriLeadingMargin1 longInput esriLongLabel esriAnalysisDriveMode"\x3e\r\n              \x3c/div\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd style\x3d"padding-right:0;padding-bottom:0;width:20%;"\x3e\r\n              \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/NumberTextBox" data-dojo-attach-event\x3d"onChange:_handleDistUnitsChange" data-dojo-props\x3d"intermediateChanges:true,value:1,required:true,missingMessage:\'${i18n.distanceMsg}\',constraints:{min:0}" data-dojo-attach-point\x3d"_distanceInput" class\x3d"esriLeadingMargin1"  style\x3d"width:75%;"\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd colspan\x3d"2" style\x3d"padding-left:0.25em;padding-bottom:0;width:60%;"\x3e\r\n              \x3cselect class\x3d"mediumInput esriAnalysisSelect" data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-event\x3d"onChange:_handleDistUnitsChange" data-dojo-attach-point\x3d"_distanceUnitsSelect" style\x3d"width:80%;table-layout:fixed;"\x3e\r\n                \x3coption value\x3d"Seconds"\x3e${i18n.seconds}\x3c/option\x3e\r\n                \x3coption value\x3d"Minutes" selected\x3d"selected"\x3e${i18n.minutes}\x3c/option\x3e\r\n                \x3coption value\x3d"Hours"\x3e${i18n.hours}\x3c/option\x3e\r\n              \x3c/select\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr data-dojo-attach-point\x3d"_useTrafficRow"\x3e\r\n            \x3ctd style\x3d"padding:0" colspan\x3d"3"\x3e\r\n              \x3cdiv style\x3d"width:100%;" data-dojo-type\x3d"esri/dijit/analysis/TrafficTime" data-dojo-attach-point\x3d"_trafficTimeWidget"\x3e\x3c/div\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e \r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3" class\x3d"clear"\x3e\x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"2"\x3e\r\n              \x3clabel class\x3d"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.threeLabel}\x3c/label\x3e\r\n              \x3clabel class\x3d"longTextInput esriAnalysisStepsLabel"\x3e${i18n.outputLayerLabel}\x3c/label\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd class\x3d"shortTextInput"\x3e\r\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"OutputName"\x3e\x3c/a\x3e \r\n            \x3c/td\x3e             \r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3"\x3e\r\n              \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" class\x3d"esriLeadingMargin1 esriOutputText"  data-dojo-props\x3d"trim:true,required:true" data-dojo-attach-point\x3d"_outputLayerInput" value\x3d""\x3e\x3c/input\x3e\r\n            \x3c/td\x3e                \r\n          \x3c/tr\x3e \r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3"\x3e\r\n               \x3cdiv class\x3d"esriLeadingMargin1" data-dojo-attach-point\x3d"_chooseFolderRow"\x3e\r\n                 \x3clabel style\x3d"width:9px;font-size:smaller;"\x3e${i18n.saveResultIn}\x3c/label\x3e\r\n                 \x3cinput class\x3d"longInput esriFolderSelect" data-dojo-attach-point\x3d"_webMapFolderSelect" data-dojo-type\x3d"dijit/form/FilteringSelect" trim\x3d"true"\x3e\x3c/input\x3e\r\n               \x3c/div\x3e              \r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e                                      \r\n        \x3c/tbody\x3e         \r\n       \x3c/table\x3e\r\n     \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"_aggregateToolContentButtons" style\x3d"padding:5px;margin-top:5px;border-top:solid 1px #BBB;"\x3e\r\n      \x3cdiv class\x3d"esriExtentCreditsCtr"\x3e\r\n        \x3ca class\x3d"esriFloatTrailing esriSmallFont"  href\x3d"#" data-dojo-attach-point\x3d"_showCreditsLink" data-dojo-attach-event\x3d"onclick:_handleShowCreditsClick"\x3e${i18n.showCredits}\x3c/a\x3e\r\n       \x3clabel data-dojo-attach-point\x3d"_chooseExtentDiv" class\x3d"esriSelectLabel esriExtentLabel"\x3e\r\n         \x3cinput type\x3d"radio" data-dojo-attach-point\x3d"_useExtentCheck" data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-props\x3d"checked:true" name\x3d"extent" value\x3d"true"/\x3e\r\n           ${i18n.useMapExtent}\r\n       \x3c/label\x3e\r\n      \x3c/div\x3e\r\n      \x3cbutton data-dojo-type\x3d"dijit/form/Button" type\x3d"submit" data-dojo-attach-point\x3d"_saveBtn" class\x3d"esriLeadingMargin4 esriAnalysisSubmitButton" data-dojo-attach-event\x3d"onClick:_handleSaveBtnClick"\x3e\r\n          ${i18n.runAnalysis}\r\n      \x3c/button\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"esriFormWarning esriRoundedBox" data-dojo-attach-point\x3d"_errorMessagePane" style\x3d"display:none;"\x3e\r\n      \x3cspan data-dojo-attach-point\x3d"_bodyNode"\x3e\x3c/span\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/Dialog" title\x3d"${i18n.creditTitle}" data-dojo-attach-point\x3d"_usageDialog" style\x3d"width:40em;"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/analysis/CreditEstimator"  data-dojo-attach-point\x3d"_usageForm"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e    \r\n    \x3cdiv data-dojo-type\x3d"dijit/Dialog" title\x3d"" data-dojo-attach-point\x3d"_dataDialog" data-dojo-props\x3d"closable:false"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/geoenrichment/DataBrowser"  class\x3d"calcite esriAnalysisEnrichDataBrowser" data-dojo-props\x3d"backButton:null" data-dojo-attach-point\x3d"_databrowser" style\x3d"width:60em;height:40em;"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e    \r\n\x3c/div\x3e\r\n'}});
define("esri/dijit/analysis/EnrichLayer","require dojo/aspect dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/json dojo/_base/fx dojo/has dojo/json dojo/string dojo/dom-style dojo/dom-attr dojo/dom-construct dojo/query dojo/dom-class dojo/fx/easing dojo/number dojo/on dojo/Evented dojo/store/Observable dojo/dom-geometry dojo/store/Memory dojo/window dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/_OnDijitClickMixin dijit/_FocusMixin dijit/registry dijit/form/Button dijit/form/CheckBox dijit/form/Form dijit/form/FilteringSelect dijit/form/Select dijit/form/TextBox dijit/form/ValidationTextBox dijit/form/NumberTextBox dijit/layout/ContentPane dijit/Dialog dgrid/List ../../kernel ../../lang ./AnalysisBase ./_AnalysisOptions ./CreditEstimator ./utils ./TrafficTime ../geoenrichment/config ../geoenrichment/DataBrowser ../../tasks/geoenrichment/GeoenrichmentTask ../../geometry/Extent ../../geometry/webMercatorUtils ../../geometry/Point dojo/i18n!../../nls/jsapi dojo/text!./templates/EnrichLayer.html".split(" "),
function(w,B,C,d,k,r,g,y,D,T,s,e,m,t,z,h,A,u,E,U,V,W,X,F,G,H,I,J,K,Y,Z,$,aa,ba,ca,da,ea,fa,ga,ha,L,M,n,N,O,ia,f,ja,l,ka,P,v,Q,R,x,S){w=C([G,H,I,J,K,N,O],{declaredClass:"esri.dijit.analysis.EnrichLayer",templateString:S,widgetsInTemplate:!0,inputLayer:null,outputLayerName:null,distance:null,enableTravelModes:!0,showTrafficWidget:!1,_isBufferSelectionEnabled:!0,analysisVariables:null,i18n:null,toolName:"EnrichLayer",helpFileName:"EnrichLayer",resultParameter:"enrichedLayer",constructor:function(a){this._pbConnects=
[];this._statsRows=[];this._isLineEnabled=!1;a.containerNode&&(this.container=a.containerNode)},destroy:function(){this.inherited(arguments);k.forEach(this._pbConnects,r.disconnect);delete this._pbConnects;this._driveTimeClickHandle&&(r.disconnect(this._driveTimeClickHandle),this._driveTimeClickHandle=null)},postMixInProperties:function(){this.inherited(arguments);d.mixin(this.i18n,x.bufferTool);d.mixin(this.i18n,x.driveTimes);d.mixin(this.i18n,x.enrichLayerTool)},postCreate:function(){this.inherited(arguments);
h.add(this._form.domNode,"esriSimpleForm");this._outputLayerInput.set("validator",d.hitch(this,this.validateServiceName));this._buildUI();this.watch("analysisVariables",d.hitch(this,this._refreshGrid))},_onClose:function(a){a&&(this._save(),this.emit("save",{save:!0}));this.emit("close",{save:a})},_handleShowCreditsClick:function(a){a.preventDefault();if(this._form.validate()&&this.validateSelectedGrid()){a={};var c,b,p;c=this.get("analysisVariables");p=[];b=[];k.forEach(c,function(a){-1!==a.indexOf(".*")?
b.push(a.split(".*")[0]):p.push(a)});a.inputLayer=g.toJson(f.constructAnalysisInputLyrObj(this.inputLayer));if(this._isBufferSelectionEnabled||this._isLineEnabled)a.bufferType=this.get("bufferType"),a.distance=this.get("distance"),a.units=this._distanceUnitsSelect.get("value");this.get("country")&&(a.country=this.get("country"));b&&0<b.length&&(a.dataCollections=g.toJson(b));p&&0<p.length&&(a.analysisVariables=g.toJson(p));this.get("showTrafficWidget")&&this._trafficTimeWidget.get("checked")&&(a.TimeOfDay=
this._trafficTimeWidget.get("timeOfDay"));this.returnFeatureCollection||(a.OutputName=g.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}}));this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=g.toJson({extent:this.map.extent._normalize(!0)}));this.getCreditsEstimate(this.toolName,a).then(d.hitch(this,function(a){this._usageForm.set("content",a);this._usageDialog.show()}))}},_handleSaveBtnClick:function(){if(this._form.validate()&&this.validateSelectedGrid()){var a=
{},c={},b,d,q;this._saveBtn.set("disabled",!0);b=this.get("analysisVariables");q=[];d=[];k.forEach(b,function(a){-1!==a.indexOf(".*")?d.push(a.split(".*")[0]):q.push(a)});a.inputLayer=g.toJson(f.constructAnalysisInputLyrObj(this.inputLayer));if(this._isBufferSelectionEnabled||this._isLineEnabled)b=this._bufferTypeSelect.getOptions(this._bufferTypeSelect.get("value")),a.bufferType=b.travelMode?g.toJson(b.travelMode):this._bufferTypeSelect.get("value"),a.distance=this.get("distance"),a.units=this._distanceUnitsSelect.get("value");
this.get("country")&&(a.country=this.get("country"));d&&0<d.length&&(a.dataCollections=d);q&&0<q.length&&(a.analysisVariables=q);this.get("showTrafficWidget")&&this._trafficTimeWidget.get("checked")&&(a.TimeOfDay=this._trafficTimeWidget.get("timeOfDay"));this.returnFeatureCollection||(a.OutputName=g.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}}));this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=g.toJson({extent:this.map.extent._normalize(!0)}));this.returnFeatureCollection&&
(b={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(b.extent=this.map.extent._normalize(!0)),a.context=g.toJson(b));c.jobParams=a;this._saveBtn.set("disabled",!1);c.itemParams={description:s.substitute(this.i18n.itemDescription,{inputLayerName:this.inputLayer.name}),tags:s.substitute(this.i18n.itemTags,{inputLayerName:this.inputLayer.name}),snippet:this.i18n.itemSnippet};this.showSelectFolder&&(c.itemParams.folder=this.get("folderId"));this.execute(c)}},
_handleDistUnitsChange:function(a){this.set("outputLayerName");f.updateModeConstraints({validateWidget:this._distanceInput,type:this._bufferTypeSelect.get("value"),units:this._distanceUnitsSelect.get("value")})},_handleDistanceTypeChange:function(a){var c,b;b=this._bufferTypeSelect.getOptions(this._bufferTypeSelect.get("value"));n.isDefined(b)?(c="Time"===b.units,b="Time"===b.units&&"driving"===b.modei18nKey):(c=-1!==a.indexOf("Time"),b="DrivingTime"===a);this.set("bufferType",a);this.get("showTrafficWidget")&&
(e.set(this._useTrafficRow,"display",b?"":"none"),this._trafficTimeWidget.set("disabled",!b),this._trafficTimeWidget.set("reset",!b));c?(this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes,selected:"selected"},{value:"Hours",label:this.i18n.hours}])):(this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Miles",
label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]));this.set("outputLayerName");f.updateModeConstraints({validateWidget:this._distanceInput,type:a,units:this._distanceUnitsSelect.get("value")})},_save:function(){},_buildUI:function(){var a=!0;this.signInPromise.then(d.hitch(this,f.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer}));
this._addBtn.set("disabled",!0);e.set(this._dataDialog.titleNode,"display","none");e.set(this._dataDialog.titleBar,"display","none");e.set(this._dataDialog.containerNode,"padding","0");e.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none");f.populateTravelModes({selectWidget:this._bufferTypeSelect,addStraightLine:!0,widget:this,enableTravelModes:this.get("enableTravelModes")});this.get("showSelectAnalysisLayer")&&(!this.get("inputLayer")&&this.get("inputLayers")&&this.set("inputLayer",
this.inputLayers[0]),f.populateAnalysisLayers(this,"inputLayer","inputLayers"),f.addReadyToUseLayerOption(this,[this._analysisSelect]));this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),a=!1);this.inputLayer&&(this._getSourceCountry(),this._updateAnalysisLayerUI(a));this._loadConnections();(this._isBufferSelectionEnabled||this._isLineEnabled)&&this._handleDistanceTypeChange("StraightLine");e.set(this._useTrafficRow,"display",this.get("showTrafficWidget")?"":"none");this.outputLayerName&&
this._outputLayerInput.set("value",this.outputLayerName);e.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none");this.showSelectFolder&&this.getFolderStore().then(d.hitch(this,function(a){this.folderStore=a;f.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}));e.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":
"none");this.list=new L({renderRow:d.hitch(this,this._renderVariableRow)},this._selectedList)},startup:function(){this.list.startup();e.set(this._selectLabelDiv,"display","block");e.set(this._selectedList,"display","none")},_getSourceCountry:function(a){var c,b;this.inputLayer&&this.signInPromise.then(d.hitch(this,function(e){c=this.analysisGpServer&&-1!==this.analysisGpServer.indexOf("dev")?"dev":this.analysisGpServer&&-1!==this.analysisGpServer.indexOf("qa")?"qa":"";l.portalUrl=this.portalUrl;this._task||
(this.isSingleTenant?this.isSingleTenant&&(this.helperServices&&this.helperServices.geoenrichment)&&(l.server=this.helperServices.geoenrichment.url):l.server=location.protocol+"//geoenrich"+c+".arcgis.com/arcgis/rest/services/World/GeoenrichmentServer",l.server&&(this._task=new P(l.server),this._task.token=l.token));this._databrowser.pages.cat||this._databrowser.startup();n.isDefined(this.inputLayer)&&(b=this._getPoint(this.inputLayer,a));b?this._task.getCountries(b).then(d.hitch(this,function(a){a instanceof
Array&&(this._databrowser.set("countryID",a[0]),this._databrowser.pages.cat.countrySelect.set("value",a[0]),this.set("country",a[0]),this._addBtn.set("disabled",!1))}),d.hitch(this,function(a){console.log(a);this._addBtn.set("disabled",!1)})):this._addBtn.set("disabled",!1)}))},_updateAnalysisLayerUI:function(a){var c,b;if(this.inputLayer){m.set(this._aggregateToolDescription,"innerHTML",s.substitute(this.i18n.enrichDefine,{inputLayerName:this.inputLayer.name}));"esriGeometryPolygon"===this.inputLayer.geometryType?
(this._isLineEnabled=this._isBufferSelectionEnabled=!1,this._updateTravelModes(!1)):"esriGeometryPolyline"===this.inputLayer.geometryType?(this._updateTravelModes(!1),this._isLineEnabled=!0,this._isBufferSelectionEnabled=!1):(this._updateTravelModes(!0),this._isBufferSelectionEnabled=!0,this._isLineEnabled=!1);b=!this._isBufferSelectionEnabled&&!this._isLineEnabled;if(c=this._bufferTypeSelect.getOptions("StraightLine"))b?(c.label=c.label.replace("esriStraightLineDistanceIcon","esriStraightLineDistanceDisabledIcon"),
c.label=c.label.replace("esriLeadingMargin4","esriLeadingMargin4 esriAnalysisTextDisabled"),c.disabled=!0):(c.label=c.label.replace("esriStraightLineDistanceDisabledIcon","esriStraightLineDistanceIcon"),c.label=c.label.replace("esriAnalysisTextDisabled",""),c.disabled=!1),this._bufferTypeSelect.updateOption(c);h.toggle(this._distanceInput,"disabled",b);this._distanceInput.set("disabled",b);h.toggle(this._distanceUnitsSelect,"disabled",b);this._distanceUnitsSelect.set("disabled",b);h.toggle(this._bufferTypeSelect,
"disabled",b);this._bufferTypeSelect.set("disabled",b);b||this._bufferTypeSelect.set("value","StraightLine");a&&(this.outputLayerName=s.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name}));this._outputLayerInput.set("value",this.outputLayerName)}},_renderVariableRow:function(a){var c=t.create("div",{"class":"ShoppingCartRowOuter"}),b=t.create("div",{"class":"ShoppingCartRow"},c);t.create("div",{"class":"TrimWithEllipses ShoppingCartRowLabel",innerHTML:a.alias},b);b=t.create("div",
{"class":"ShoppingCartRowCloser"},b);m.set(b,"idDesc",a.idDesc);E(b,"click",d.hitch(this,this._handledRemoveVarClick));return c},_handledRemoveVarClick:function(a){this._databrowser.shoppingCart.onClick(a);this._databrowser._onOK()},validateSelectedGrid:function(){var a;(a=this.get("analysisVariables")&&0!==this.get("analysisVariables").length)?e.set(this._analysisVariablesCtr,"borderColor","#EFEEEF"):(F.scrollIntoView(this._analysisVariablesCtr),e.set(this._analysisVariablesCtr,"borderColor","#f94"));
return a},validateDistance:function(){var a=this,c,b=[],e,f;this.set("distance");c=d.trim(this._distanceInput.get("value"));if(!c)return!1;f=u.parse(c);if(isNaN(f))return b.push(0),!1;c=u.format(f,{locale:"root"});n.isDefined(c)?n.isDefined(c)||(c=u.format(f,{locale:"en-us"})):c=u.format(f,{locale:"en"});n.isDefined(c)&&(e=d.trim(c).match(/\D/g));e&&k.forEach(e,function(c){"."===c||","===c?b.push(1):"-"===c&&"polygon"===a.inputType?b.push(1):b.push(0)});return-1!==k.indexOf(b,0)?!1:!0},_loadConnections:function(){this.on("start",
d.hitch(this,"_onClose",!0));this._connect(this._closeBtn,"onclick",d.hitch(this,"_onClose",!1));r.connect(this._bufferTypeSelect,"onChange",d.hitch(this,this._handleDistanceTypeChange));this._connect(this._databrowser,"onOK",d.hitch(this,this._handleDataBrowserOk));this._connect(this._databrowser,"onCancel",d.hitch(this,this._handleDataBrowserCancel));B.after(this._databrowser,"loadPage",d.hitch(this,this._setCalciteButtons));this.watch("enableTravelModes",d.hitch(this,function(a,c,b){this._updateTravelModes(b)}));
this.on("travelmodes-added",d.hitch(this,this._updateAnalysisLayerUI,!0));this.map.on("extent-change",d.hitch(this,function(){this._getSourceCountry(!0)}))},_handleBrowseItemsSelect:function(a){a&&a.selection&&f.addAnalysisReadyLayer({item:a.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:this._browsedlg,widget:this}).always(d.hitch(this,function(){this._updateAnalysisLayerUI(!0);this._isAnalysisSelect=!1}))},_handleDataBrowserOk:function(){this.set("analysisVariables",
this._databrowser.selection);this._dataDialog.hide()},_handleDataBrowserCancel:function(){this._dataDialog.hide()},_handleShowDataDialogClick:function(a){this._dataDialog.show()},_setCalciteButtons:function(){z(".calcite .DataCollectionButton").forEach(function(a){h.add(a,"btn secondary")});z(".calcite .Wizard_Button").forEach(function(a,c){m.get(a,"innerHTML")===this._databrowser.okButton?h.add(a,"btn secondary"):h.add(a,"btn transparent")},this)},_refreshGrid:function(a,c,b){a=[];for(var d in this._databrowser.shoppingCart.content)this._databrowser.shoppingCart.content.hasOwnProperty(d)&&
a.push(this._databrowser.shoppingCart.content[d]);e.set(this._selectLabelDiv,"display",0===a.length?"block":"none");e.set(this._selectedList,"display",0===a.length?"none":"block");m.set(this.varCounter,"innerHTML",a.length.toString());this.list.refresh();this.list.renderArray(a)},_showMessages:function(a){m.set(this._bodyNode,"innerHTML",a);y.fadeIn({node:this._errorMessagePane,easing:A.quadIn,onEnd:d.hitch(this,function(){e.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(a){a&&
a.preventDefault();y.fadeOut({node:this._errorMessagePane,easing:A.quadOut,onEnd:d.hitch(this,function(){e.set(this._errorMessagePane,{display:"none"})})}).play()},_handleAnalysisLayerChange:function(a){if("browse"===a)this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery),this._isAnalysisSelect=!0,this._browsedlg.show();else if(this.inputLayer=this.inputLayers[a])this._getSourceCountry(this.inputLayer.analysisReady),
this._updateAnalysisLayerUI(!0)},_setAnalysisGpServerAttr:function(a){a&&(this.analysisGpServer=a,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(a){this.inputLayer=a},_setDisableRunAnalysisAttr:function(a){this._saveBtn.set("disabled",a)},_setInputLayersAttr:function(a){this.inputLayers=a},_setAnalysisVariablesAttr:function(a){this._set("analysisVariables",a)},_getAnalysisVariablesAttr:function(){return this.analysisVariables},_setShowTrafficWidgetAttr:function(a){this.showTrafficWidget=
a},_getShowTrafficWidgetAttr:function(){return this.showTrafficWidget},_setBufferTypeAttr:function(a){this.bufferType=a},_getBufferTypeAttr:function(){return this.bufferType},_setDistanceAttr:function(a){a&&(this.distance=a)},_getDistanceAttr:function(){return this.distance=this._distanceInput.get("value")},_setCountryAttr:function(a){this.country=a},_getCountryAttr:function(){this._databrowser&&(this.country=this._databrowser.get("countryID"));return this.country},_setEnableTravelModesAttr:function(a){this._set("enableTravelModes",
a)},validateServiceName:function(a){return f.validateServiceName(a,{textInput:this._outputLayerInput})},_connect:function(a,c,b){this._pbConnects.push(r.connect(a,c,b))},_updateTravelModes:function(a){var c=this._bufferTypeSelect.getOptions();k.forEach(c,function(b){"StraightLine"!==b.value&&(b.disabled=!a)});this._bufferTypeSelect.updateOption(c)},_getPoint:function(a,c){var b;if(a.graphics&&0<a.graphics.length)return a.graphics[0].geometry;b=this.map.extent||c?(new v(this.map.extent)).getCenter():
a.extent?(new v(a.extent)).getCenter():a.initialExtent?(new v(a.initialExtent)).getCenter():a.fullExtent?(new v(a.fullExtent)).getCenter():null;return new R(Q.xyToLngLat(b.x,b.y))}});D("extend-esri")&&d.setObject("dijit.analysis.EnrichLayer",w,M);return w});