/* Copyright (C) 2013 Michael Kosowsky  All rights reserved. */


			///////////// UTILS /////////////////

function $$(s)  { return document.getElementById(s); }
function $$s(s) { return $$(s).style; }
function display(div, on) { $$s(div).display = on? '' :'none'; }

var is_msie    = navigator.userAgent.toLowerCase().indexOf('msie') != -1;

var select_add_to_end = is_msie? (function(sel, o) { sel.add(o); }) : (function(sel, o) { sel.add(o, null); });
function select_remove_by_text(sel, text) {
  var options = sel.options;
  for (var i = 0; i < options.length; i++) {
    if (options[i].text == text) {
        options.remove(i);
        return;
    }
  }
}
    

if (!String.prototype.localeCompare)
  String.prototype.localeCompare = function(s) { return this < s? -1 : this > s? 1 : 0; };


function WTBrowserCompatible() {
  return 1;
//  var s = navigator.userAgent.toLowerCase();
//  if (s.match(/(firefox|iceweasel)\/(3|2|1\.5)/i))
}

function blockevent() { e = event || window.event; if (is_msie) e.cancelBubble = true; else e.stopPropagation(); }

function loadscript(src, onload) {
  var script    = document.createElement('script');
			// IE8 doesn't document.head
  var head      = document.getElementsByTagName('head')[0];
  var done      = false;
		
  script.src    = src;
  script.onload = function() {
			// IE8 doesn't fire onload; IE9 fires onload and onreadystatechange
    if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
      done = true;
      if (onload)
	onload();
			// IE8 memory leak
      script.onload             = null;
      script.onreadystatechange = null;
      head.removeChild(script);
    }
  };

  script.onreadystatechange = script.onload;
  head.appendChild(script);
}




	// Possibly the right way to do inheritance cf. http://www.kevlindev.com/tutorials/javascript/inheritance/
function derive(newclass, base) {
  function xxx() {}
  xxx.prototype      = base.prototype;
  newclass.prototype = new xxx();
}

Array.prototype._foreach = function(f) { for (var __i = 0; __i < this.length; __i++) f(this[__i], __i); };
Array.prototype._while   = function(f) { for (var __i = 0; __i < this.length; __i++) if (!f(this[__i], __i)) return false; return true; };
Array.prototype._until   = function(f) { for (var __i = 0; __i < this.length; __i++) if  (f(this[__i], __i)) return true;  return false; };


function read_cookie(c) {
  var s = document.cookie.match(new RegExp(c + '=([^;]*)'));
  return s && s[1]? s[1] : null;  
}

function write_cookie(c, v, days) {
  days = days || 365;
  document.cookie = c + '=' + v + ';expires=' + new Date((new Date()).getTime() + days * 24 * 60 * 60 * 100).toGMTString();
}


function round0(x) {
  return Math.round(x);
}

function round1(x) {
  return Math.round(x * 10)/10;
}

function round2(x) {
  return Math.round(x * 100)/100;
}

function round3(x) {
  return Math.round(x * 1000)/1000;
}

function round4(x) {
  return Math.round(x * 10000)/10000;
}

function round5(x) {
  return Math.round(x * 100000)/100000;
}

function round6(x) {
  return Math.round(x * 1000000)/1000000;
}

function _round(x, n) {
  var b = [1,10,100,1000,10000,100000,1000000][n];
  return Math.round(x * b) / b;
}


function radio_clear(r) {
  for (var i = 0; i < r.length; i++)
    r[i].checked = 0;
}

function radio_set(r, v) {
  for (var i = 0; i < r.length; i++)
    if (r[i].value == v) {
      r[i].checked = 1;
      return 1;
    }
  return 0;
}

function radio_get(r) {
  for (var i = 0; i < r.length; i++)
    if (r[i].checked)
      return r[i].value;
  return null;
}

function encodeURI_more(s) {
  s = encodeURI(s);
  s = s.replace(/\&/g, '%26');
  s = s.replace(/\=/g, '%3D');
  s = s.replace(/\+/g, '%2B');
  return s;
}

function exec_or_value(f, o) {
  if (typeof f != 'function')
    return f;
		// arguments.slice(2) doesn't work
  var a = [];
  for (var i = 2; i < arguments.length; i++)
    a.push(arguments[i]);
  return f.apply(o, a);
}

function word_param(k) {
  var a = location.search.match('(?:\\?|&)' + k + '=(\\w+)');
  return a && a[1];
}

function words_param(k) {
  var a = location.search.match('(?:\\?|&)' + k + '=([\\+\\w]+)');
  return a && a[1]? a[1].split('+') : [];
}

function word_or_dash_param(k) {
  var a = location.search.match('(?:\\?|&)' + k + '=([\\-\\w]+)');
  return a && a[1];
}

function param(k) {
  var a = location.search.match('(?:\\?|&)' + k + '=(.*?)(?:&|$)');
  return a && a[1];
}

function decode_param(k) {
  var a = location.search.match('(?:\\?|&)' + k + '=(.*?)(?:&|$)');
  return a && a[1]? decodeURIComponent(a[1]) : null;
}

function number_param(k) {
  var a = location.search.match('(?:\\?|&)' + k + '=([\\+\\-]?[\\d\\.]+)');
  return a && a[1]? a[1] - 0 : null;
}

angle_param = number_param;

function boolean_param(k) {
  var a = word_param(k);
  return a && a != '0' && a != 'false';
}


function twodigits(x) {
  return x < 10? '0' + x : x;
}

function default_timezone() {
  var d = new Date;
  var m = d.getTimezoneOffset();
  var s = (m > 0? '-' : '+');
  m = Math.abs(m);
  return s + twodigits(Math.floor(m / 60)) + twodigits(m - 60 * Math.floor(m / 60));
}


			///////////// SETTINGS AND FORMATTING ANGLES AND DISTANCES /////////////////

/* When setting a setting, this code will call _set_XXXX() if it exists,
   otherwise it just sets settings.XXXX itself
   The idea is that you may want to do something, but not everything, that, e.g. set_units() does
   (This is important in the WISP code, but none of the clients using this seem to need it)
   BE CAREFUL THAT BOOLEANS END UP AS 0 or 1, not "true" or "false"
*/

var settings = {
    use_metric:     0,
    degrees_format: 0,
    use_magnetic:   0,
    decimal_places: 0,

    round_distance: round0,
    round_distance_at_least_1: round1,
    round_bearing:  round0,
    round_altitude_at_least_1: round1,


         // version#  then all of these:
    items: 'use_metric degrees_format use_magnetic decimal_places'.split(' '),

    as_string: function() {
	var a = ['1.0'];	// version
	var s;
	this.items._foreach(function(s) { a.push(settings[s]); });  // using global 'settings'
	return a.join(' ');
    },

    array_from_string: function(s) {
        return s == null || s == ''? [] : s.split(' ');
    },

			// unlike the more complex approach in wisp3.js, we default to 0 for all the settings
    from_string: function(s) {
	var a = settings.array_from_string(s);
	a.shift(); // element 0 is version
	this.items._foreach(function(s) {
					// HACK: all settings are numeric
	    var t = a.shift();
	    if (t == null || isNaN(t))
		t = 0;
	    var f = '_set_' + s;
	    if (typeof window[f] == 'function')
		(window[f])(t);
	    else
		settings[s] = t;  // NOTE using global 'settings'
	});
    }
};


var METERS_PER_FOOT = .3048;
var METERS_PER_MILE = 1609.344;


function read_old_settings_cookie() {
    settings.use_metric     = read_cookie('units') - 0;
    settings.degrees_format = read_cookie('df') - 0;
}

function read_settings_cookie() {
    var s = read_cookie('settings');
    if (s)
	settings.from_string(s);
    else
	read_old_settings_cookie();
}

function write_settings_cookie() {
    write_cookie('settings', settings.as_string());
}


//function write_settings_cookie() {
//    write_cookie('units', settings.use_metric);
//    write_cookie('df',    settings.degrees_format);
//}

function set_rounding(n) {
  if (n < 0 || n > 6)
    return;
  settings.decimal_places = n;
  eval("settings.round_bearing = round" + n);
  settings.round_distance = settings.round_bearing;
  settings.round_distance_at_least_1 = n < 1? round1 : settings.round_bearing;
  settings.round_altitude_at_least_1 = n < 1? round1 : settings.round_bearing;
}



function units_to_meters(x) {
  return settings.use_metric? x : x * METERS_PER_FOOT;
}

function meters_to_units(x) {
  return settings.use_metric? x : x / METERS_PER_FOOT;
}

function meters_to_units_round(x) {
  return settings.round_distance(meters_to_units(x));
}

function ft_or_m(x, is_html) {
  return settings.use_metric? settings.round_distance(x) + 'm'
	                    : settings.round_distance(x / METERS_PER_FOOT) + (is_html? '&nbsp;' : ' ') + 'ft';
}

function ft_or_m0(x, is_html) {
  return settings.use_metric? round0(x) + 'm'
	                    : round0(x / METERS_PER_FOOT) + (is_html? '&nbsp;' : ' ') + 'ft';
}

function sqmiles_or_sqkm0(x, is_html) {
  var s = (is_html? '&nbsp;' : ' ');
  return settings.use_metric? round0(x / 1000000) + s + 'sq' + s + 'km'
			    : round0(x / METERS_PER_MILE / METERS_PER_MILE) + s + 'sq' + s +'miles';
}

function miles_or_km_to_meters(x) {
  return settings.use_metric? x * 1000 : x * METERS_PER_MILE;
}

function meters_to_miles_or_km(x) {
  return settings.use_metric? x / 1000 : x / METERS_PER_MILE;
}

function meters_to_miles_or_km_round(x) {
  return settings.round_distance(meters_to_miles_or_km(x));
}

function meters_to_miles_or_km_round1(x) {
  return settings.round_distance_at_least_1(meters_to_miles_or_km(x));
}

function miles_or_km(x, is_html) {
  return settings.use_metric? settings.round_distance(x/1000)            + (is_html? '&nbsp;' : ' ') + 'km'
		  	    : settings.round_distance(x/METERS_PER_MILE) + (is_html? '&nbsp;' : ' ') + (settings.round_distance(x/METERS_PER_MILE) == 1? 'mile' : 'miles');
}

function miles_or_km1(x, is_html) {
  return settings.use_metric? settings.round_distance_at_least_1(x/1000)            + (is_html? '&nbsp;' : ' ') + 'km'
		  	    : settings.round_distance_at_least_1(x/METERS_PER_MILE) + (is_html? '&nbsp;' : ' ') + (settings.round_distance_at_least_1(x/METERS_PER_MILE) == 1? 'mile' : 'miles');
}




function read_angle_more_broadly(s) {
	// ignore all ' and " and get rid of trailing NSEW, but use 'W' or 'S' to change sign
    if (s.match(/[sw]\s*$/i))
	s = '-' + s;
    return read_angle(s.replace(/["']/g, '').replace(/[nsew]\s*$/i, ''));
}


function read_angle(s) {
    // trim trailing spaces
    s = s.replace(/\s+$/, '');

    // leading spaces and + or -
    var a = s.match(/^\s*([\+\-]?)(.*)/);
    s = a[2];
    var sign = a[1] == '-'? -1 : 1;

    // then the rest all digits or spaces or decimal point
    if (s.search(/[^\d\.\s]/) != -1)
        return null;

    // only one decimal point, and it must be on last element
    if (s.search(/\..*(\s|\.)/) != -1)
        return null;

    var dms = s.split(/\s+/);

    if (dms.length >= 3)
	return sign * ((dms[0] - 0) + ((dms[1] - 0) + (dms[2] - 0) / 60) / 60);
    else if (dms.length == 2)
	return sign * ((dms[0] - 0) + (dms[1] - 0) / 60);

    var l = s.indexOf('.');
    var frac;
    if (l < 0) {
      frac = 0;
      l = s.length;
    } else {
      frac = s.substring(l) - 0;
      s = s.substring(0, l);
    }

    if (l < 4)				// 44 or 108.  NOTE: 108 is 108 deg, not 1 deg 8'
	return sign * (s - 0 + frac);
    else if (l < 6)			// 4423 10804
	return sign * ((s.substring(0, l-2) - 0) + ((s.substring(l-2, l) - 0) + frac) / 60);
    else
	return sign * ((s.substring(0, l-4) - 0) + ((s.substring(l-4, l-2) - 0) + ((s.substring(l-2, l) - 0) + frac) / 60) / 60);
}



		// HACK: settings.degrees_format is number of parts - 1, e.g. 0 for DD, 1 for 'DDMM', 2 for 'DDMMSS'
		// Note you can provide the array of parts if you don't want to use expand_angle
function format_angle(x, pos_char, neg_char, is_html, a) {
  if (!a)
    a = expand_angle(Math.abs(x), settings.degrees_format);
  var s = '';
  var symbols = [is_html? '&deg;' : '', "'", '"'];
  var space = is_html? '&nbsp;' : ' ';
  for (var i = 0; i <= settings.degrees_format; i++)
    s += (i == 0? '' : space) + a[i] + symbols[i];
  if (x < 0)
    if (neg_char)
      s += space + neg_char;
    else
      s = '-' + s;
  else if (pos_char)
    s += space + pos_char;

  return s;
}

	// like format_angle, but honors settings.decimal_places
function format_angle_dp(_x, is_html) {
  if (settings.degrees_format == 0)
      return settings.round_bearing(_x) + '&deg;';

  // each additional component (minutes or seconds) counts as two decimal places
  var dp = settings.decimal_places;
  var a;
  var x = Math.abs(_x);
  var d = Math.floor(x);
  x = 60 * (x - d);
  dp -= 2;
  if (dp < 0) dp = 0;
  if (settings.degrees_format == 1) {
    a = [d, _round(x, dp)];
  } else {
    var m = Math.floor(x);
    x = 60 * (x - m);
    dp -= 2;
    if (dp < 0) dp = 0;
    a = [d, m, _round(x, dp)];
  }

  return format_angle(_x, null, null, is_html, a);
}


function expand_angle(x, mode) {
  if (mode == 0)
    return [round6(x)];
  var d = Math.floor(x);
  x = 60 * (x - d);
  if (mode == 1)
    return [d, round4(x)];
  var m = Math.floor(x);
  x = 60 * (x - m);
  return [d, m, round2(x)];
}

function format_lat(x, is_html) {
    return format_angle(x, 'N', 'S', is_html);
}

function format_lon(x, is_html) {
    return format_angle(x, 'E', 'W', is_html);
}

function format_latlon(lat, lon, is_html) {
  return    format_lat(lat, is_html)
          + (is_html? '&nbsp;&nbsp;' : '  ')
          + format_lon(lon, is_html);
}


var fd_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var fd_mos    = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function format_localtime(d) {
  return (d.getHours() == 0? 12 : d.getHours() > 12? d.getHours() - 12 : d.getHours()) + ':' + (d.getMinutes() < 10? '0' : '') + d.getMinutes() + (d.getHours() > 12? 'pm' : 'am');
}

function format_localdate(d) {
  return d.getDate() + ' ' + fd_mos[d.getMonth()] + ' ' + d.getFullYear();
}

function format_localdatetime(d) {
    return format_localdate(d) + ' ' + format_localtime(d);
}


			///////////// REQUESTS /////////////////

			//////////////////////////////////////// WT SPECIFIC

function signup() {
  var email = prompt("Give us an email address and\nwe'll send you news about the site", '');
  if (email)
    wt_async_request('/bin/subscribe.cgi?email=' + encodeURI_more(email), 'SUBSCRIBE',
						function(s) { alert(s.replace(/\n/g,'') + ' subscribed.  Thanks.') });
}

function results_file(id, filename) {
  return '/results/' + id + '/' + filename;
}

// DATA format: status lat lon elev elev-above-ground queued_time start_time end_time is_public declination name
var DATA_PUBLIC_INDEX = 8;
var DATA_NAME_INDEX = 11;

			//////////////////////////////////////// REQUESTS

// BUG: make all requests asynchronous, so browser doesn't get hung up if server hangs
//      To do so we could implement something like a list of requests, followed by a
//	function to call once they're all complete, and maybe a semaphore and a cancel routine

// In maps v2, you could use req = GXmlHttp.create()
// In maps v3 they don't do that for you, so if you're worried about IE6 (I hope it's only them) you'd need
// req = ActiveXObject? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

function _wt_request(url, error_label) {
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);
  var o = parse_response(request);
  if (!o.ok && error_label)
    alert(_wt_request_error_message(error_label, o));
  return o;
}

		// set data for POST rather than GET
function _wt_async_request(url, error_label, callback, data, user, passwd) {
  var request = new XMLHttpRequest();
  request.open(data? "POST" : "GET", url, true, user, passwd);
  request.onreadystatechange = function() {
    if (request.readyState != 4)
      return;
    var o = parse_response(request);
    if (!o.ok && error_label)
      alert(_wt_request_error_message(error_label, o));
    callback(o);
  }


		// chrome only??
  if (typeof data != 'object')
    request.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');

//  if (data)
//    request.setRequestHeader("Content-Type", typeof data == 'object'? 'multipart/form-data' : 'application/x-www-form-urlencoded');
// text/plain is another option

  request.send(data);
}


function _wt_request_error_message(error_label, o) {
   return error_label + ': '
	  + (  o.app_status_message? o.app_status_message
	     : o.http_status_message && o.http_status_message.toLowerCase() != 'ok'? o.http_status_message
             : 'request error');
}


function wt_request(url, error_label) {
  var o = _wt_request(url, error_label);
  return o.response;
}


function wt_async_request(url, error_label, callback) {
  _wt_async_request(url, error_label, function(o) { if (o.ok) callback(o.response); });
}
  
	// if you use this to get array of lines, remember to 'if (a.length) a.pop();'
function wt_async_request_succeed_fail(url, succeed, fail) {
  _wt_async_request(url, null, function(o) { if (o.ok) { if (succeed) succeed(o.response, o); } else { if (fail) fail(o); } } );
}
  
function wt_async_request_post_succeed_fail(url, data, succeed, fail) {
  _wt_async_request(url, null, function(o) { if (o.ok) { if (succeed) succeed(o.response, o); } else { if (fail) fail(o); } }, data);
}
  
/**** function wt_async_request_array_of_lines_succeed_fail(url, succeed, fail) {
  _wt_async_request(url, null,
    function(o) {
      if (o.ok) {
        if (succeed) {
	  var a = o.response.split('\n');
          if (a.length)
	    a.pop();
	  succeed(a);
        } 
      } else {
        if (fail)
          fail(o);
      }
    });
} *****/


function wt_request_array(url, error_label, test) {
  var o = _wt_request(url, error_label);
  if (!o.ok)
    return null;

		// get rid of final NL so we don't have extra field
  o.response_array = o.response.replace(/\n$/, '').replace(/\n/g, ' ').split(' ');
  if (test && !test(o.response_array)) {
    if (error_label)
      alert(error_label + ': invalid response');
    return null;
  }

  return o.response_array;
}

function wt_async_request_array(url, error_label, test, callback) {
  _wt_async_request(url, error_label, function(o) {
    if (!o.ok)
      return;
		// get rid of final NL so we don't have extra field
    o.response_array = o.response.replace(/\n$/, '').replace(/\n/g, ' ').split(' ');
    if (test && !test(o.response_array)) {
      if (error_label)
        alert(error_label + ': invalid response');
      return;
    }
    if (o.response_array)
      callback(o.response_array)
  });
}

function wt_request_array_of_lines(url, error_label) {
  var s = wt_request(url, error_label);
  if (s == null)
    return null;
	// pop off last element, which will be blank (assuming response ends with \n)
  var a = s.split('\n');
  if (a.length)
    a.pop();
  return a;
}

function wt_async_request_array_of_lines(url, error_label, callback) {
	// pop off last element, which will be blank (assuming response ends with \n)
  wt_async_request(url, error_label, function(s) { var a = s.split('\n'); if (a.length) a.pop(); callback(a); });
}

function parse_response(request) {
  var o = {ok: 0,
	   response: null,
	   http_status_code: null,
	   http_status_message: null,
	   app_status_code: null,
	   app_status_message: null};

  o.http_status_code    = request.status;
  o.http_status_message = request.statusText;
  if (request.status != 200)
    return o;

  var s;
  var a;
  try { s = request.getResponseHeader('X-App-Status'); } catch(e) {}
  if (s && (a = s.match(/^(\d\d\d)\s+(.+)/))) {
    o.app_status_code    = a[1];
    o.app_status_message = a[2];
    if (o.app_status_code < 200 || o.app_status_code >= 300)
      return o;
  }

  o.ok             = 1;
  o.response       = request.responseText;

  return o;
}


/***********
function wt_async_request_with_error_callback(url, callback, error_callback) {
  _wt_async_request(url, '', function(o) { if (o.ok && o.response) callback(o.response); else error_callback(o); });
}

function wt_async_request_array_with_error_callback(url, callback, error_callback) {
  _wt_async_request(url, '',
    function(o) {
      if (o.ok && o.response) {
        o.response_array = o.response.replace(/\n$/, '').replace(/\n/g, ' ').split(' ');
        callback(o.response_array);
      } else {
        error_callback(o);
      }
    }
  );
}
*************/


			//////////////////////////////////////// GEOCODING

			// callback is f(lat, lon, boolean is_address)

var geocoder = null;
function geocode(s, callback, error, honor_usa_zip) {
  if (!s)
    return;

  var p;
  if (p = geocode_latlon(s) || geocode_maidenhead(s)) {
      callback(p[0], p[1], 0);
    return;
  }

  if (!geocoder)
    geocoder = new $m.Geocoder();

  var q;
  var a;
  if (honor_usa_zip && (a = s.match(/^(.*)\s+(\d\d\d\d\d)$/)) && a[1] && a[2])
    q = { address: a[1], componentRestrictions: { postalCode: a[2] } };
  else
    q = { address: s };

  geocoder.geocode(
    q,
    function(results, status) {
		// pick first geometry. lots of additional info present, including accuracy of result
      if (status == $m.GeocoderStatus.OK && results._until(function(r) {
        if (!r.geometry || !r.geometry.location)
          return 0;
        callback(r.geometry.location.lat(), r.geometry.location.lng(), 1);
        return 1;
      })) {

      } else if (error) {
        error(s);
      } else
        alert(s + " not found");
      }
  );
}


function geocode_latlon(s) {
	// 3/2009 Google's geocoder now seems to respond to lat/lon with
        //        the point on a road closest to it, which isn't what we want
  var a = s.match(/^\s*([\-\+]?[\d\.]+)\s*([ns]?)[\s\,]+([\-\+]?[\d\.]+)\s*([ew]?)\s*$/i);

  if (a && a[1] && a[3]) {
    var lat = a[1] - 0;
    if (a[2] == 's' || a[2] == 'S')
	lat = -lat;
    var lon = a[3] - 0;
    if (a[4] == 'w' || a[4] == 'W')
	lon = -lon;
    return [lat, lon];
  }
  return null;
}


function geocode_maidenhead(ss) {
  var a = ss.match(/^\s*([A-R][A-R][0-9][0-9]([A-X][A-X]([0-9][0-9]([A-X][A-X])?)?)?)\s*$/i);
  if (!a || !a[1])
    return null;
  var s = a[1].toUpperCase();
 
  var dlon = 2;
  var dlat = 1;
  var lon = -180 + 20 * (s.charCodeAt(0) - 65) + dlon * (s.charCodeAt(2) - 48);
  var lat =  -90 + 10 * (s.charCodeAt(1) - 65) + dlat * (s.charCodeAt(3) - 48);

  if (s.length > 4) {
    dlon /= 24;
    dlat /= 24;
    lon += dlon * (s.charCodeAt(4) - 65);
    lat += dlat * (s.charCodeAt(5) - 65);

    if (s.length > 6) {
      dlon /= 10;
      dlat /= 10;
      lon += dlon * (s.charCodeAt(6) - 48);
      lat += dlat * (s.charCodeAt(7) - 48);
      
      if (s.length > 8) {
	dlon /= 24;
        dlat /= 24;
        lon += dlon * (s.charCodeAt(8) - 65);
        lat += dlat * (s.charCodeAt(9) - 65);
      }
    }
  }

	// move to center of square
  lon += dlon / 2;
  lat += dlat / 2;

  return [lat, lon];
}


function reverse_geocode(lat, lon, callback, error) {
  if (!geocoder)
    geocoder = new $m.Geocoder();

  geocoder.geocode(
    {'location': {lat: lat, lng: lon}},
    function(results, status) {
		// pick first result. lots of additional info present
      if (status == $m.GeocoderStatus.OK && results.length > 0) {
	callback(results[0].formatted_address.replace(/,\s*USA$/, ''));
      } else if (error) {
        error(status);
      }
      // else alert('Geocoder failed due to: ' + status)
    }
  );
}


			//////////////////////////////////////// INPUT FIELD HACKS

	// show instructions (eg. "Enter address") in input text box
function input_note_onfocus(e) {
  var note = e.getAttribute("data-note");
  if (!note) {
    note = e.value;
    e.setAttribute("data-note", note);
  }
  e.value = e.value == note? '' : e.value;
  e.className = '';
}

function input_note_onblur(e) {
  if (e.value == '') {
    e.value = e.getAttribute("data-note");
    e.className = 'inputnote';
  }
}

	// run the handler when you hit ENTER, even if input hasn't changed 
        // in many browsers, hitting enter fires onchange if there's been a change, so we're careful not do it twice
function input_enter_onfocus(e) {
  e.setAttribute("data-was", e.value);
}

function input_enter_onkeydown(e, event) {
  if (eventkey(event) == 13 && e.value == e.getAttribute("data-was") && e.onchange)
    e.onchange();
}

function eventkey(event) {
  return event && event.keyCode || window.event && window.event.keyCode;
}



			//////////////////////////////////////// TEXT BUTTONS WITH STATE
	// BUG: can't have both text and image, because b.innerHTML would clobber the <img>
function wtbutton_show(b, val) {
  b.setAttribute('data-val', val);
  if (is_msie? b.getAttribute('data-text-' + val) : b.hasAttribute('data-text-' + val))
    b.innerHTML = b.getAttribute('data-text-' + val);
  else if (is_msie? b.getAttribute('data-img-' + val) : b.hasAttribute('data-img-' + val))
    b.getElementsByTagName('img')[0].src = b.getAttribute('data-img-' + val);
}

function wtbutton_toggle(b) {
  wtbutton_set(b, b.getAttribute('data-val') - 0? 0 : 1);
}

function wtbutton_set(b, val) {
  wtbutton_show(b, val);
  //eval('(function(val){' + b.getAttribute('data-exec') +'})(val)');
  eval(b.getAttribute('data-exec'));
}

function wtbutton_restore(b) {
  wtbutton_set(b, b.getAttribute('data-val'));
}

			//////////////////////////////////////// GOOGLE ANALYTICS
var _gaq;
function init_google_analytics_async() {
  _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-2222064-1']);
  _gaq.push(['_setDomainName', 'heywhatsthat.com']);
  _gaq.push(['_trackPageview']);

  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
}


var BLOCK_ANALYTICS;
if (!BLOCK_ANALYTICS)
  init_google_analytics_async();
