// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/metadata/types/iso/gmd/identification/templates/ResourceDescription.html":'\x3cdiv data-dojo-attach-point\x3d"containerNode"\x3e\r\n\r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'gmd:abstract\',\r\n      label:\'${i18nIso.AbstractMD_Identification.sAbstract}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement"\r\n      data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/InputTextArea" data-dojo-props\x3d"large:true"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e  \r\n  \r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'gmd:purpose\',minOccurs:0,\r\n      label:\'${i18nIso.AbstractMD_Identification.purpose}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement"\r\n      data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e  \r\n  \r\n  \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/Element"\r\n    data-dojo-props\x3d"target:\'gmd:credit\',minOccurs:0,maxOccurs:\'unbounded\',\r\n      label:\'${i18nIso.AbstractMD_Identification.credit}\'"\x3e\r\n    \x3cdiv data-dojo-type\x3d"esri/dijit/metadata/form/iso/GcoElement"\r\n      data-dojo-props\x3d"target:\'gco:CharacterString\'"\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e  \r\n      \r\n\x3c/div\x3e'}});
define("esri/dijit/metadata/types/iso/gmd/identification/ResourceDescription","dojo/_base/declare dojo/_base/lang dojo/has ../../../../base/Descriptor ../../../../form/Element ../../../../form/InputTextArea ../../../../form/iso/GcoElement dojo/text!./templates/ResourceDescription.html ../../../../../../kernel".split(" "),function(a,b,c,d,g,h,k,e,f){a=a(d,{templateString:e});c("extend-esri")&&b.setObject("dijit.metadata.types.iso.gmd.identification.ResourceDescription",a,f);return a});