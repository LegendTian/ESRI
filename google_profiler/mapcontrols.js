/* Copyright (C) 2013 Michael Kosowsky  All rights reserved. */

// add tile copyrights: https://code.google.com/p/gmaps-samples-v3/source/browse/trunk/custom-copyirghts/custom-copyrights.html?r=238 (sic)


var added_mapcontrols_styles = 0;

				//////////////////// BoxControl
				// A box with four states: hidden, disabled, off, on

	//  for styling, see https://developers.google.com/maps/documentation/javascript/controls#CustomControls
function BoxControl(label, title, onclick, is_subbox) {
  var s;

  if (!added_mapcontrols_styles) {
    var style = document.createElement("style");
		// is this necessary?
    style.appendChild(document.createTextNode(""));
		// IE9 doesn't like document.head.appendChild(style);
    document.getElementsByTagName('head')[0].appendChild(style);
		// http://stackoverflow.com/questions/826782/css-rule-to-disable-text-selection-highlighting
    style.sheet.insertRule("._noselect_ { -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }", 0);
		// would prefer 5px all around,
		// but on iphone, when you bold "Update GPS location", it expands to 2 lines
    style.sheet.insertRule("._boxdiv_ { padding: 5px 3px; }", 0);
    style.sheet.insertRule("._boxui_ { background-color: white; border: 2px solid black; cursor: pointer; text-align: center }", 0);
    style.sheet.insertRule("._boxsubui_ { background-color: white; cursor: pointer; white-space: nowrap; text-align: left }", 0);
    style.sheet.insertRule("._boxlabeldiv_ { font-family: Arial,sans-serif; font-size: 12px; padding-left: 4px; padding-right: 4px; }", 0);
    added_mapcontrols_styles = 1;
  }

  this.div = document.createElement('div');
  this.div.className = '_boxdiv_ _noselect_';

  this.ui = document.createElement('div');
  this.ui.className = '_noselect_ _boxui_';
  this.ui.title = title;
  this.div.appendChild(this.ui);

  this.is_subbox = is_subbox;
  if (is_subbox) {
    this.ui.className = '_noselect_ _boxsubui_';
    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.ui.appendChild(this.checkbox);
  }
  this.labeldiv = document.createElement('span');
  this.labeldiv.className = '_boxlabeldiv_ _noselect_';
  this.labeldiv.innerHTML = label;
  this.ui.appendChild(this.labeldiv);

  this._onclick_ = onclick;
  if (onclick)
    this.clicklistener = $m.event.addDomListener(/*this.is_subbox? this.checkbox : */this.ui, 'click', onclick);
  this.set_state(BoxControl.OFF);
}

BoxControl.HIDDEN   = 0;
BoxControl.DISABLED = 1;
BoxControl.OFF      = 2;
BoxControl.ON       = 3;

BoxControl.prototype.set_state = function(x) {
  this.previous_state = this.state;

  if (x == BoxControl.HIDDEN) {
    this.display(0);
    this.state = x;
    return;
  }

  if (this.state == BoxControl.HIDDEN)
    this.display(1);

  if (this.is_subbox) {

    if (x == BoxControl.DISABLED) {
      this.ui.style.backgroundColor = '#C0C0C0';
      this.labeldiv.style.fontWeight = 'normal';
      this.checkbox.disabled = true;
    } else {
      this.ui.style.backgroundColor = 'white';
      this.labeldiv.style.fontWeight = /* x == BoxControl.ON? 'bold' : */ 'normal';
      this.checkbox.disabled = false;
      this.checkbox.checked = x == BoxControl.ON;
    }

  } else {

    if (x == BoxControl.DISABLED) {
      this.ui.style.backgroundColor = '#C0C0C0';
      this.labeldiv.style.fontWeight = 'normal';
    } else {
      this.ui.style.backgroundColor = 'white';
      this.labeldiv.style.fontWeight = x == BoxControl.ON? 'bold' : 'normal';
    }

  }

  this.state = x;
  this.set_title();
};

BoxControl.prototype.display = function(x) {
  this.div.style.display = x? '' : 'none';
	// for MapControlDropdown entries
  this.ui.style.display  = x? '' : 'none';
};

BoxControl.prototype.set_title = function() {
};


BoxControl.prototype.set_onshiftclick = function(onshiftclick) {
  if (this.clicklistener)
    $m.event.removeListener(this.clicklistener);
  this.ui._onclick_      = this._onclick_;
  this.ui._onshiftclick_ = onshiftclick;
  this.clicklistener = $m.event.addDomListener(
    this.ui,
    'click',
    function(e) {
      if ((e || window.event).shiftKey && this._onshiftclick_)
	this._onshiftclick_(e);
      else if (this._onclick_)
	this._onclick_(e);
    }
  );
}


				//////////////////// MapControl
				// position the control on the map

function MapControl(label, title, position, onclick) {
  if (position instanceof MapControlDropdown) {
    BoxControl.call(this, label, title, onclick, true);
    position.add(this);
  } else {
    BoxControl.call(this, label, title, onclick, false);
    map.controls[position].push(this.div);
  }
}
derive(MapControl, BoxControl);



				//////////////////// MapControlDropdown
				// put multiple MapControls in a single unit
function MapControlDropdown(label, title, position) {
  MapControl.call(this, label, title, position);
  //ToggleMapControl.call(this, label, name, position, min_zoom, max_zoom);

  this.controls = [];

  this.dropdown = document.createElement('div');
  this.dropdown.style.display = 'none';
  this.ui.appendChild(this.dropdown);
  this.dropdown.appendChild(document.createElement('hr'));

  var t = this;
  $m.event.addDomListener(this.ui, 'mouseenter', function() { t.show_dropdown(); });
  $m.event.addDomListener(this.ui, 'mouseleave', function() { t.hide_dropdown(); });
}
derive(MapControlDropdown, MapControl);

MapControlDropdown.prototype.add = function(item) {
  this.controls.push(item);
  this.dropdown.appendChild(item.ui);
  var t       = this;
  var item_ss = item.set_state;
  item.set_state = function(x) { item_ss.call(item, x); t.set_state(); }
};

MapControlDropdown.prototype.set_state = function(x) {
  if (x == null && this.state != BoxControl.HIDDEN && this.state != BoxControl.DISABLED)
    x = this.controls._until(function(c) { return c.state == BoxControl.ON; })? BoxControl.ON : BoxControl.OFF;
  if (x != null)
    BoxControl.prototype.set_state.call(this, x);
};

MapControlDropdown.prototype.show_dropdown = function() {
  this.dropdown.style.display = '';
};

MapControlDropdown.prototype.hide_dropdown = function() {
  this.dropdown.style.display = 'none';
};



				//////////////////// ToggleMapControl
				// turn on and off, and handle min/max zooms

function ToggleMapControl(label, name, position, callback, min_zoom, max_zoom) {
  this.name     = name;
  this.min_zoom = min_zoom == null?     0 : min_zoom;
  this.max_zoom = max_zoom == null? 10000 : max_zoom;
  this.callback = callback;
  this.last_zoomed_state = BoxControl.OFF;

  var t = this;
  MapControl.call(this, label, '', position, function() { t.onclick(); });
  this.zoom_listener = $m.event.addListener(map, 'zoom_changed', function() { t.onzoom() });

  if (map.getZoom() < min_zoom)
    this.set_state(BoxControl.DISABLED);
}
derive(ToggleMapControl, MapControl);

		// CAREFUL: this may get called out of the BoxControl constructor, before our constructor or our descendants'constructors are finished
ToggleMapControl.prototype.set_state = function(x) {
  MapControl.prototype.set_state.call(this, x);
  if (this.callback)
    this.callback(x);
};

ToggleMapControl.prototype.onclick = function() {
  if (map.getZoom() < this.min_zoom) {
    alert("Zoom in to enable " + this.name + "\n(current zoom " + map.getZoom() + ", need " + this.min_zoom + " or higher)");
    return;
  }
  if (this.state == BoxControl.OFF)
    this.set_state(BoxControl.ON);
  else if (this.state == BoxControl.ON)
    this.set_state(BoxControl.OFF);
};

ToggleMapControl.prototype.set_title = function() {
  this.ui.title = (this.state == BoxControl.DISABLED? "Zoom in to enable " : this.state == BoxControl.OFF? "Click to show " : "Click to clear ") + this.name;
};

ToggleMapControl.prototype.onzoom = function() {
  if (this.state == BoxControl.HIDDEN)
    return;
  var z = map.getZoom();
  if (z >= this.min_zoom && z <= this.max_zoom) {
    if (this.state == BoxControl.DISABLED) {
      this.set_state(this.last_zoomed_state);
      //this.set_state(BoxControl.OFF);
    }
  } else {
    if (this.state != BoxControl.DISABLED) {
      this.last_zoomed_state = this.state;
      this.set_state(BoxControl.DISABLED);
    }
  }
};


				//////////////////// KMLOverlay
function KMLOverlay(label, name, position, url) {
  var layer = new KMLGroundOverlay(url, function(status) { alert("load " + label + " failed: " + status); });
  ToggleMapControl.call(this, label, name, position, function(x) { layer.setMap(x == BoxControl.ON? map : null); });
}
derive(KMLOverlay, ToggleMapControl);


				// This is a KmlLayer with a few fixes
				// used standalone and in our MapControl KMLOverlay above
function KMLGroundOverlay(url, fail_callback) {
  var layer = new $m.KmlLayer({ url: url, preserveViewport: true, suppressInfoWindows: true });
  if (fail_callback)
    $m.event.addListener(layer, "status_changed", function() {
      var status = layer.getStatus();
      if (status != $m.KmlLayerStatus.OK)
	fail_callback(status);
    });
  $m.event.addListener(layer, 'click', function(e) { $m.event.trigger(map, 'click', e); });
  $m.event.addListener(layer, 'mousemove', function(e) { $m.event.trigger(map, 'mousemove', e); });
  return layer;
}



				//////////////////// PlateCarreeMultiOverlay
function PlateCarreeMultiOverlay(label, name, position, tiles) {
  this.tiles = tiles;
  for (var i = 0; i < tiles.length; i++) {
     var t = tiles[i];
     t.ground_overlay = new ClickthruGroundOverlay(t.url, new $m.LatLngBounds(new $m.LatLng(t.lat0, t.lon0), new $m.LatLng(t.lat1, t.lon1)));
  }
  ToggleMapControl.call(this, label, name, position, function(x) { tiles._foreach(function(t) { t.ground_overlay.setMap(x == BoxControl.ON? map : null); }) });
}
derive(PlateCarreeMultiOverlay, ToggleMapControl);

PlateCarreeMultiOverlay.prototype.set_opacity = function(opacity) {
  this.tiles._foreach(function(t) { t.ground_overlay.setOpacity(opacity); });
}



				//////////////////// TiledMapOverlay
				// control map tiles

function TiledMapOverlay(label, name, position, url, min_zoom, max_zoom, projection, missing_url_message) {
  this.url = url;
  var t = this;

  this.maptype  = new $m.ImageMapType({
    getTileUrl: function(coord, zoom) { return t.get_tile_url.call(t, coord, zoom); },
    tileSize:   new $m.Size(256, 256),
    isPng:      true
  });
  if (projection)
    this.maptype.projection = projection;
  this.missing_url_message = missing_url_message || '';

  this.maptype_on = 0;

  ToggleMapControl.call(this, label, name, position, null, min_zoom, max_zoom);
  if (!this.url)
    this.set_state(BoxControl.DISABLED);
}
derive(TiledMapOverlay, ToggleMapControl);


function tile_xyz(x, y, zoom) {
  return 'x=' + x + '&y=' + y + '&zoom=' + zoom;
}

TiledMapOverlay.prototype.get_tile_url = function(coord, zoom) {
  if (!this.url)
    return null;
  var x = coord.x;
  var d = Math.round(Math.pow(2, zoom));
  x %= d;
  if (x < 0) x += d;
  if (typeof(this.url) == 'function')
      return this.url(x, coord.y, zoom);
  return this.url + tile_xyz(x, coord.y, zoom);
};


TiledMapOverlay.prototype.set_state = function(x) {
  ToggleMapControl.prototype.set_state.call(this, x);
  if (this.state == BoxControl.ON) {
    if (!this.maptype_on) {
      map.overlayMapTypes.insertAt(0, this.maptype);
      this.maptype_on = 1;
    }
  } else {
    if (this.maptype_on) {
      remove_map_type(this.maptype);
      this.maptype_on = 0;
    }
  }
};


TiledMapOverlay.prototype.set_title = function() {
  if (!this.url)
    this.ui.title = this.missing_url_message;
  else
    ToggleMapControl.prototype.set_title.call(this);
};


TiledMapOverlay.prototype.set_url = function(url) {
  this.url = url;
  this.onzoom();
  this.redraw();
};


TiledMapOverlay.prototype.onclick = function() {
  if (!this.url) {
    if (this.missing_url_message)
      alert(this.missing_url_message);
    return;
  }
  ToggleMapControl.prototype.onclick.call(this);
};


TiledMapOverlay.prototype.redraw = function() {
  if (this.state == BoxControl.ON) {
    remove_map_type(this.maptype);
    map.overlayMapTypes.insertAt(0, this.maptype);
  }
};


TiledMapOverlay.prototype.onzoom = function() {
  if (!this.url)
    this.set_state(BoxControl.DISABLED);
  else
    ToggleMapControl.prototype.onzoom.call(this);
};


function _until(a, f) {
  for (var __i = 0; __i < a.length; __i++)
    if (f(a[__i], __i))
      return true;
  return false;
}

function remove_map_type(m) {
  var a = map.overlayMapTypes.getArray();
  for (var i = 0; i < a.length; i++) {
    if (a[i] == m) {
      map.overlayMapTypes.removeAt(i, m);
      return;
    }
  }
}


				//////////////////// PlateCarree Projection


// cf. https://developers.google.com/maps/documentation/javascript/maptypes#WorldCoordinates
// The "world coordinate" system has x run horizontally from 0 to 256 and y run vertically from 0 to 256 across the zoom level 0 tile
// (if we use a different tile size then do those "256"s change? If the base map type uses a different tile size?)
// So for Plate-Carree, map lat,lng -> 128*(1 + lng/180), 128*(1 - lat/90)

function PlateCarreeProjection() {
}


PlateCarreeProjection.prototype.fromLatLngToPoint = function(latlng) {
  return new $m.Point(128 * (1 + latlng.lng() / 180), 128 * (1 + latlng.lat() / 90));
};


PlateCarreeProjection.prototype.fromPointToLatLng = function(point, noWrap) {
    return new $m.LatLng(90 * (1 - point.y / 128), 180 * (point.x / 128 - 1), noWrap);
};



				//////////////////// ContourOverlay

function ContourOverlay(src, position, bad_interval_callback) {
  this.src = src;
  this.bad_interval_callback = bad_interval_callback;
  this.interval_request = 0;
  this.interval = 0;
  this.domain = 'http://contour.heywhatsthat.com';
  TiledMapOverlay.call(this, 'Contours', 'contours', position, this.contours_url);
}

derive(ContourOverlay, TiledMapOverlay);


				 // 0     1     2     3     4     5     6     7    8    9   10   11   12   13  14  15  16  17
var contour_interval_ft_array = [2500, 2500, 2500, 2500, 2500, 1000, 1000, 1000, 500, 250, 100, 100, 100, 100, 50, 25, 10];
var contour_interval_m_array  = [1000, 1000,  750,  750,  750,  250,  250,  250, 200, 100,  50,  50,  25,  25, 25, 10,  3];

function contour_interval_ft(z) {
  if (z >= contour_interval_ft_array.length)
    return contour_interval_ft_array[contour_interval_ft_array.length - 1];
  return contour_interval_ft_array[z];
}

function contour_interval_m(z) {
  if (z >= contour_interval_m_array.length)
    return contour_interval_m_array[contour_interval_m_array.length - 1];
  return contour_interval_m_array[z];
}

function contour_interval(z) {
  return settings.use_metric? contour_interval_m(z) : contour_interval_ft(z) * METERS_PER_FOOT;
}

	// mimic computation in bin/contour_tiles.cgi
function contour_min_interval(z) {
  return .25 * .3048 * contour_interval_ft(z);
}


ContourOverlay.prototype.set_color = function(color) {
  this.color = color;
}

ContourOverlay.prototype.set_interval = function(interval) {
  if (interval && units_to_meters(interval) < contour_min_interval(map.getZoom())) {
    //alert("requested interval " + interval + " too small for current zoom\n(minimum about " + ft_or_m(contour_min_interval(map.getZoom())) + ")");
    if (this.bad_interval_callback)
      this.bad_interval_callback();
    return;
  }

  this.interval_request = interval;
  this.interval = 0;
  TiledMapOverlay.prototype.redraw.call(this);
};

ContourOverlay.prototype.redraw = function() {
  this.set_interval(0);
}

ContourOverlay.prototype.set_title = function() {
  this.ui.title = (this.state == BoxControl.DISABLED? "Zoom in to enable contours" : this.state == BoxControl.OFF? "Click to show contours" : "Contour interval " + ft_or_m(this.interval));
};

ContourOverlay.prototype.onzoom = function() {
  this.interval = 0;
  ToggleMapControl.prototype.onzoom.call(this);
};

ContourOverlay.prototype.set_domain = function(s) {
    this.domain = s;
}

ContourOverlay.prototype.contours_url = function(x, y, zoom) {
  if (!this.interval) {
    if (!this.interval_request) {
      this.interval = contour_interval(zoom);

    } else if (units_to_meters(this.interval_request) >= contour_min_interval(zoom)) {
      this.interval = units_to_meters(this.interval_request);

    } else {
      this.interval_request = null;
      this.interval = contour_interval(zoom);
      //alert("requested interval too small for current zoom\n(minimum about " + ft_or_m(contour_min_interval(zoom)) + ")\nreverting to default " + ft_or_m(this.interval));
      if (this.bad_interval_callback)
        this.bad_interval_callback();
    }
    this.set_title();
  }

  return this.domain + '/bin/contour_tiles_a23b9.cgi?src=' + this.src + '&interval=' + this.interval + (this.color? '&color=' + this.color : '') + '&' + tile_xyz(x, y, zoom);
};



				//////////////////// Mercator GroundOverlay
// gmaps v3 GroundOverlay assumes plate-carree.

// cf. https://developers.google.com/maps/documentation/javascript/overlays#CustomOverlays
// they suggest using show/hide methods as being faster than relying setMap(map)/setMap(null),
// but that wouldn't be too polymorphic of us

function MercatorGroundOverlay(url, bounds, opts) {
  this.url               = url;
  this.img               = document.createElement("img");
  this.img.src           = this.url;
  this.style             = this.img.style;
  this.style.position    = "absolute";
  this.style.border      = "none";
  this.style.borderWidth = "0px";

  this.sw                = bounds.getSouthWest();
  this.ne                = bounds.getNorthEast();
		// options { pixel: 'area' } or { pixel: 'point' } refer to whether the bounds refer to the pixel edges or pixel centers
		// (e.g. SRTM data and our cloaks are 'point' but KML and gmaps' GroundOverlays are 'area')
		// default to 'area'
  this.pixel_is_point    = opts && opts.pixel == 'point';

  if (opts && opts.map)
    this.setMap(opts.map);
}

derive(MercatorGroundOverlay, google.maps.OverlayView);

MercatorGroundOverlay.prototype.onAdd = function() {
  this.pane = this.getPanes().overlayLayer;
  this.pane.appendChild(this.img);
};

MercatorGroundOverlay.prototype.onRemove = function() {
  this.pane.removeChild(this.img);
};

//MercatorGroundOverlay.prototype.copy = function() {
//  return new MercatorGroundOverlay(this.url, this.bounds);
//}

MercatorGroundOverlay.prototype.draw = function() {
  var proj = this.getProjection();
  var sw;
  var ne;

  if (this.pixel_is_point && this.img.naturalWidth && this.img.naturalHeight) {
    var lat0 = this.sw.lat();
    var lon0 = this.sw.lng();
    var lat1 = this.ne.lat();
    var lon1 = this.ne.lng();
    var dlat = (lat1 - lat0) / (this.img.naturalHeight - 1);
    var dlon = (lon1 - lon0) / (this.img.naturalWidth - 1);
    sw       = proj.fromLatLngToDivPixel(new google.maps.LatLng(lat0 - dlat/2, lon0 - dlon/2));
    ne       = proj.fromLatLngToDivPixel(new google.maps.LatLng(lat1 + dlat/2, lon1 + dlon/2));

  } else {

	// if we don't have naturalWidth/Height, probably haven't loaded the image yet
    if (this.pixel_is_point) {
      var t = this;
      this.img.onload = function() { t.draw(); };
    }

    sw       = proj.fromLatLngToDivPixel(this.sw);
    ne       = proj.fromLatLngToDivPixel(this.ne);
  }

  this.style.width  = (ne.x - sw.x) + "px";
  this.style.height = (sw.y - ne.y) + "px";
  this.style.left   = sw.x + "px";
  this.style.top    = ne.y + "px";
};


				//////////////////// PlateCarreeGroundOverlay
function ClickthruGroundOverlay(url, bounds, opts) {
  if (bounds == null) {
    var a = url.match(/--(-?[\d\.]+)-(-?[\d\.]+)-(-?[\d\.]+)-(-?[\d\.]+)/);
    if (!a || !a[4])
      return;
    bounds = new $m.LatLngBounds(new $m.LatLng((a[1] - 0)/10, (a[2] - 0)/10), new $m.LatLng((a[3] - 0)/10, (a[4] - 0)/10));
  }
  $m.GroundOverlay.call(this, url, bounds, opts);
  $m.event.addListener(this, 'click', function(e) { $m.event.trigger(map, 'click', e); });
  $m.event.addListener(this, 'mousemove', function(e) { $m.event.trigger(map, 'mousemove', e); });
}
derive(ClickthruGroundOverlay, google.maps.GroundOverlay);
