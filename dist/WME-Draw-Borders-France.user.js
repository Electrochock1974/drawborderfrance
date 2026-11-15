// ==UserScript==
// @name         WME Draw Borders France
// @version      2026.11.15.016
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAABCJJREFUWIWtl09oHFUcx7/fN7vJ1jSlrUp2c2oCPRjddGcGoV5sqBSk0IKCh4JF0RwC2grVIP6B1pOIIJWIlygIWkEsUvVYWrGnXmYmzcqqKK0HkdWW7aFKd5PZ9/WQ3WWzyW4nyf5gYd7v/d77fub33vzePiKheZ53GsCJRnMuDMN3ko7tZU6SINd1jxtjPiR5X+M3lc1mr5fL5cWtApgkQSQPreN70ff93FYBEmUgm80WSB7oANgj6ZVcLrc/l8vFQ0NDv1cqlfpGAVJJgkjebm9LugbgNwBHSB4GcHjHjh0V3/e/qtfr3xhjTgI4BOCGpBNRFF3qOve9xPP5/Hg6nb4GYIjkrKQoDMMrAOKJiYndmUzmGIDnAfgk18wn6Q7J8SAIbm0GgJ7nXSY5Za09F0XRs90CJycnH3Ec5zmSp0iu2lvW2qNRFH2/3riem9B13ZdITkkq12q1k71iFxcXf4qiaBbAr+1+SarX6ze6jesKkM/nx0m+K0nW2plSqVTpBdAmeELSnTbXv3Ec/7VRAKbT6U9Jbpf05cLCwrdJxAEgiqJLJMettUcl/UhyOJPJvN8tft094Lruy8aYOUnlarX6cNK377RCobDXGLMIYFDSVBRFVzpj1tSBfD4/7jjOeQBpa+3xYrG4sBlxACiXy5XR0VFD8iCA/bt27Zq/efPmqlrRWgLP8057nndrYGDgl82kvpvdvXv3PUk/k3xo27Ztr3f2G2Cl1pM8Q/J+AOlG3+WtigNAqVRakjQjyUp6s1Ao7F0D0KXWT/UDAAAaa/8ZyYwxZt513SO+7z/QApC05jtdz7cVq1ars42qeMAY852k667rPmEAII7js5Jam03SQhzHZ/sJkEqlRgFsb7ZJDpOcMwBQLBZvA3gVAKy1V8MwfLTh65s5jjO2zlkx1voKrLUjDbI/AMT9FAeApaWlBUnqcF9sHcckswAg6e9+iwPA4ODgGZKUVG2Kx3E83Q4wAgDGmHK/xX3fnwbwgqT/SD4WBEGx2dcCkDRCEtbavmbA8zxf0tyKhGbCMCy297f2QDMD/VyCiYmJ3QDOk8xI+jiKoi86Y9YAGGP6BWAymcw5knustVdrtdqpdYOaD5KyALC8vNwXANd1T5N8UtI/cRw/UyqVlnoBkOSDkjQwMLBlgEKhcJjk25JiAMeKxeKf3WJTAJDP58ewcghVgiBY3qRuyvO8xyXtJDnf+F/4VhAEPQ81ep53EMAFksOSRPKDIAhe24jyvn37djqO8wPJQpv7QhAETwPoLD6rqQF8RHIYWFkHSadc1x0HkDgTJMc6xGGtXbyXeBNgrGMyknwqqXgvqCRxKQAXARxpOhpH5gw2kAFrrWuMeaPdJ+liIoA4jqdTqdQnaLtKhWHY9SrVxb72PK+Gtut7FEWfJxn4P1GVx29d/9ycAAAAAElFTkSuQmCC
// @description  Familles Lecture + Assistance (WME France). BAN WFS + BAL + lookup officiels ; communes ADMIN EXPRESS COG-CARTO ; géocodage/signalement officiels. Sources : BAN + Admin Express (Licence Ouverte).
// @author       Sebiseba & Electrochock1974
// @copyright    Sebiseba 2017-2026 (Inspired by Draw Border - ©giovanni-cortinovis)
// @license      MIT
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/*/editor*
// @match        https://www.waze.com/*/editor*
// @match        https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/*/user*
// @run-at       document-idle
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      data.geopf.fr
// @connect      plateforme.adresse.data.gouv.fr
// @connect      plateforme-bal.adresse.data.gouv.fr
// @connect      geo.api.gouv.fr
// @connect      api-lannuaire.service-public.fr
// @connect      radars.securite-routiere.gouv.fr
// @connect      signalement.adresse.data.gouv.fr
// @connect      raw.githubusercontent.com
// @connect      cdn.jsdelivr.net
// @connect      api.github.com
// @namespace Sebiseba
// @downloadURL https://update.greasyfork.org/scripts/8138/WME%20Draw%20Borders%20France.user.js
// @updateURL https://update.greasyfork.org/scripts/8138/WME%20Draw%20Borders%20France.meta.js
// ==/UserScript==

(function _wmeIntegre() {

    const Math = globalThis.Math, Number = globalThis.Number, Date = globalThis.Date;

    const SCRIPT_NAME = "WME Draw Borders France";
    const SCRIPT_ID = "wme-draw-borders-france";
    const VERSION = (typeof GM_info !== 'undefined' && GM_info.script && GM_info.script.version) || 'dev';

    var DBF_pageWindow = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
    var getWmeSdk, $;
    var DBF_sdkTabLabel = null, DBF_sdkTabPane = null;
    var DBFhandleClass, DBFhandleClass2, CitiesOld = [], StatesOld = [], StatesPROld = [];
    var Cty_Layer = null, Dpt_Layer = null, PR_Layer = null, Cam_Layer = null, Ban_Layer = null;
    var Equip_Layer = null, Etabl_Layer = null, RS_Layer = null, Bump_Layer = null, Signals_Layer = null;
    var debug = false, wmeSDK;

    var _dbfZoom = 0, _dbfCenter = null, _dbfExtentBBox = null;
    var _dbfLayersByUnique = Object.create(null);
    var icon_DrB = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAABCJJREFUWIWtl09oHFUcx7/fN7vJ1jSlrUp2c2oCPRjddGcGoV5sqBSk0IKCh4JF0RwC2grVIP6B1pOIIJWIlygIWkEsUvVYWrGnXmYmzcqqKK0HkdWW7aFKd5PZ9/WQ3WWzyW4nyf5gYd7v/d77fub33vzePiKheZ53GsCJRnMuDMN3ko7tZU6SINd1jxtjPiR5X+M3lc1mr5fL5cWtApgkQSQPreN70ff93FYBEmUgm80WSB7oANgj6ZVcLrc/l8vFQ0NDv1cqlfpGAVJJgkjebm9LugbgNwBHSB4GcHjHjh0V3/e/qtfr3xhjTgI4BOCGpBNRFF3qOve9xPP5/Hg6nb4GYIjkrKQoDMMrAOKJiYndmUzmGIDnAfgk18wn6Q7J8SAIbm0GgJ7nXSY5Za09F0XRs90CJycnH3Ec5zmSp0iu2lvW2qNRFH2/3riem9B13ZdITkkq12q1k71iFxcXf4qiaBbAr+1+SarX6ze6jesKkM/nx0m+K0nW2plSqVTpBdAmeELSnTbXv3Ec/7VRAKbT6U9Jbpf05cLCwrdJxAEgiqJLJMettUcl/UhyOJPJvN8tft094Lruy8aYOUnlarX6cNK377RCobDXGLMIYFDSVBRFVzpj1tSBfD4/7jjOeQBpa+3xYrG4sBlxACiXy5XR0VFD8iCA/bt27Zq/efPmqlrRWgLP8057nndrYGDgl82kvpvdvXv3PUk/k3xo27Ztr3f2G2Cl1pM8Q/J+AOlG3+WtigNAqVRakjQjyUp6s1Ao7F0D0KXWT/UDAAAaa/8ZyYwxZt513SO+7z/QApC05jtdz7cVq1ars42qeMAY852k667rPmEAII7js5Jam03SQhzHZ/sJkEqlRgFsb7ZJDpOcMwBQLBZvA3gVAKy1V8MwfLTh65s5jjO2zlkx1voKrLUjDbI/AMT9FAeApaWlBUnqcF9sHcckswAg6e9+iwPA4ODgGZKUVG2Kx3E83Q4wAgDGmHK/xX3fnwbwgqT/SD4WBEGx2dcCkDRCEtbavmbA8zxf0tyKhGbCMCy297f2QDMD/VyCiYmJ3QDOk8xI+jiKoi86Y9YAGGP6BWAymcw5knustVdrtdqpdYOaD5KyALC8vNwXANd1T5N8UtI/cRw/UyqVlnoBkOSDkjQwMLBlgEKhcJjk25JiAMeKxeKf3WJTAJDP58ewcghVgiBY3qRuyvO8xyXtJDnf+F/4VhAEPQ81ep53EMAFksOSRPKDIAhe24jyvn37djqO8wPJQpv7QhAETwPoLD6rqQF8RHIYWFkHSadc1x0HkDgTJMc6xGGtXbyXeBNgrGMyknwqqXgvqCRxKQAXARxpOhpH5gw2kAFrrWuMeaPdJ+liIoA4jqdTqdQnaLtKhWHY9SrVxb72PK+Gtut7FEWfJxn4P1GVx29d/9ycAAAAAElFTkSuQmCC";
    if (debug) console.log('WME Draw Borders France : ' + GM_info.script.version + ' starting');

    var RS_pending = [];
    var RS_CLUSTER_THRESH_M = 5;
    var _rsSpeedGen = 0;
    var RS_SPEED_MAX_M = 30;
    var Cty_LastZoom = null;
    var Cty_BboxOld = null;
    var lastMouseLL = null, lastMouseTS = 0;
    var _dbfPointerFromSdk = false;

    function DBF_debounce(func, wait) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    function DBF_clearEl(el) {
        if (!el) return;
        while (el.firstChild) el.removeChild(el.firstChild);
    }
    function DBF_setText(el, text) {
        if (!el) return;
        el.textContent = text == null ? "" : String(text);
    }
    function DBF_el(tag, props, children) {
        var node = document.createElement(tag);
        if (props) {
            Object.keys(props).forEach(function (key) {
                var val = props[key];
                if (val == null) return;
                if (key === "className") node.className = val;
                else if (key === "text") node.textContent = String(val);
                else if (key === "css") node.style.cssText = String(val);
                else if (key === "title") node.title = String(val);
                else if (key === "href") node.setAttribute("href", String(val));
                else if (key === "target") node.setAttribute("target", String(val));
                else if (key === "rel") node.setAttribute("rel", String(val));
                else if (key === "type") node.setAttribute("type", String(val));
                else if (key === "placeholder") node.setAttribute("placeholder", String(val));
                else if (key === "id") node.id = String(val);
                else if (key.slice(0, 4) === "data") node.setAttribute(key, String(val));
            });
        }
        if (children != null) {
            var list = Array.isArray(children) ? children : [children];
            for (var i = 0; i < list.length; i++) {
                var child = list[i];
                if (child == null) continue;
                node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
            }
        }
        return node;
    }
    function DBF_safeHttpUrl(url) {
        var u = String(url || "").trim();
        if (u.indexOf("https://") === 0 || u.indexOf("http://") === 0) return u;
        return null;
    }
    function DBF_safeMailto(email) {
        var e = String(email || "").trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return null;
        return "mailto:" + encodeURIComponent(e).replace(/%40/g, "@");
    }
    function DBF_msgEl(text, className) {
        return DBF_el("div", { className: className || "dbf-sub", text: text });
    }
    var _dbfToastTimer = null;
    function DBF_notify(msg) {
        if (!msg) return;
        var existing = document.getElementById("dbf-toast");
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        if (_dbfToastTimer) { clearTimeout(_dbfToastTimer); _dbfToastTimer = null; }
        var el = document.createElement("div");
        el.id = "dbf-toast";
        el.textContent = String(msg);
        el.setAttribute("role", "status");
        el.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:99999;background:#1f2937;color:#fff;padding:10px 16px;border-radius:8px;font-size:13px;line-height:1.35;box-shadow:0 4px 16px rgba(0,0,0,.25);max-width:min(520px,90vw);text-align:center;";
        document.body.appendChild(el);
        _dbfToastTimer = setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
            _dbfToastTimer = null;
        }, 3800);
    }
    function DBF_applyRankGates(rank) {
        window.DBF_USER_RANK = rank;

        window.DBF_USER_CAN_AUTOFILL = !(rank <= 1);

        window.DBF_USER_CAN_AUTOFILL_ADDRESS = false;
        DBF_ensureMousePoll();
    }
    const debounced_show_border = DBF_debounce(function () { show_border(); }, 400);
    const debounced_load_ban = DBF_debounce(function () { load_ban(); }, 400);

    const debounced_refresh_ban_states = DBF_debounce(function () {
        DBF_refreshBanStates().catch(function (e) { if (debug) console.warn('[DBF] refreshBanStates:', e); });
    }, 200);

    var _banModelChangeTimer = null;
    function DBF_onBanModelChange() {

        if (_banModelChangeTimer) clearTimeout(_banModelChangeTimer);
        _banModelChangeTimer = window.setTimeout(function () {
            _banModelChangeTimer = null;
            if (getId('optionDBF0')?.checked === true) {
                if (!DBF_redrawBanLayerFromCache()) debounced_load_ban();
            } else if (!DBF_redrawBanLayerFromCache()) {
                debounced_refresh_ban_states();
            }
        }, 300);
    }

    function DBF_await(value) {
        return (value && typeof value.then === 'function') ? value : Promise.resolve(value);
    }

    function DBF_getZoom() { return _dbfZoom; }
    function DBF_getCenter() { return _dbfCenter; }

    function DBF_getMapExtent() {

        if (!_dbfExtentBBox || _dbfExtentBBox.length < 4) return null;
        return {
            left: _dbfExtentBBox[0],
            bottom: _dbfExtentBBox[1],
            right: _dbfExtentBBox[2],
            top: _dbfExtentBBox[3]
        };
    }

    async function DBF_refreshMapState() {
        if (!wmeSDK || !wmeSDK.Map) return;
        try {
            var z = await DBF_await(wmeSDK.Map.getZoomLevel());
            if (typeof z === 'number') _dbfZoom = z;
        } catch (e) { }
        try {
            var c = await DBF_await(wmeSDK.Map.getMapCenter());
            if (c && typeof c.lon === 'number' && typeof c.lat === 'number') _dbfCenter = c;
            else if (c && Array.isArray(c.coordinates)) _dbfCenter = { lon: c.coordinates[0], lat: c.coordinates[1] };
        } catch (e) { }
        try {
            var extFn = wmeSDK.Map.getMapExtent || wmeSDK.Map.getExtent;
            if (typeof extFn === 'function') {
                var ext = await DBF_await(extFn.call(wmeSDK.Map));
                if (Array.isArray(ext) && ext.length >= 4) _dbfExtentBBox = ext;
                else if (ext && typeof ext.left === 'number') {
                    _dbfExtentBBox = [ext.left, ext.bottom, ext.right, ext.top];
                }
            }
        } catch (e) { }
    }

    function DBF_setZoomLevel(level) {
        if (!wmeSDK || !wmeSDK.Map) return;
        try {
            var ret = wmeSDK.Map.setZoomLevel({ zoomLevel: level });
            DBF_await(ret).then(function () { DBF_refreshMapState(); }).catch(function () { });
        } catch (e) { }
    }

    function DBF_setMapCenter(lon, lat, zoomLevel) {
        if (!wmeSDK || !wmeSDK.Map) return;
        try {
            var args = { lonLat: { lon: lon, lat: lat } };
            if (typeof zoomLevel === 'number') args.zoomLevel = zoomLevel;
            var ret = wmeSDK.Map.setMapCenter(args);
            DBF_await(ret).then(function () { DBF_refreshMapState(); }).catch(function () { });
        } catch (e) { }
    }

    function DBF_boundsFromGeometry(geometry) {
        if (!geometry || !geometry.type || !geometry.coordinates) return null;
        var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        function visit(node, depth) {
            if (!Array.isArray(node)) return;
            if (typeof node[0] === 'number' && typeof node[1] === 'number') {
                if (node[0] < minX) minX = node[0];
                if (node[0] > maxX) maxX = node[0];
                if (node[1] < minY) minY = node[1];
                if (node[1] > maxY) maxY = node[1];
                return;
            }
            for (var i = 0; i < node.length; i++) visit(node[i], depth + 1);
        }
        visit(geometry.coordinates, 0);
        if (!isFinite(minX)) return null;
        return { left: minX, bottom: minY, right: maxX, top: maxY };
    }

    function DBF_defaultStyleRules() {

        return [
            {

                style: {
                    strokeColor: "${getStrokeColor}",
                    strokeWidth: "${getStrokeWidth}",
                    strokeOpacity: "${getStrokeOpacity}",
                    fillColor: "${getFillColor}",
                    fillOpacity: "${getFillOpacity}",
                    pointRadius: "${getPointRadius}",
                    label: "${getLabel}",
                    fontSize: "${getFontSize}",
                    fontColor: "${getFontColor}",
                    fontWeight: "${getFontWeight}",
                    labelOutlineColor: "${getLabelOutlineColor}",
                    labelOutlineWidth: "${getLabelOutlineWidth}",
                    labelYOffset: "${getLabelYOffset}",
                    graphicZIndex: "${getGraphicZIndex}"
                }
            },
            {

                predicate: function (featureProperties) {
                    return !!(featureProperties && featureProperties.externalGraphic);
                },
                style: {
                    externalGraphic: "${getExternalGraphic}",
                    graphicWidth: "${getGraphicWidth}",
                    graphicHeight: "${getGraphicHeight}",
                    graphicXOffset: "${getGraphicXOffset}",
                    graphicYOffset: "${getGraphicYOffset}",
                    graphicOpacity: "${getGraphicOpacity}",
                    graphicZIndex: "${getGraphicZIndex}",
                    fillOpacity: 1,
                    pointRadius: 0,
                    label: ""
                }
            }
        ];
    }

    function DBF_defaultStyleContext() {
        function prop(feature, key, fallback) {
            var p = feature && feature.properties;
            if (p && p[key] !== undefined && p[key] !== null && p[key] !== "") return p[key];
            if (p && p.style && p.style[key] !== undefined && p.style[key] !== null && p.style[key] !== "") return p.style[key];
            return fallback;
        }
        function num(feature, key, fallback) {
            var v = prop(feature, key, fallback);
            var n = Number(v);
            return Number.isFinite(n) ? n : fallback;
        }
        function fontSize(feature) {
            var v = prop(feature, "fontSize", "12px");
            if (typeof v === "number" && Number.isFinite(v)) return v + "px";
            if (typeof v === "string") {
                if (/px$/i.test(v)) return v;
                if (/^\d+(\.\d+)?$/.test(v)) return v + "px";
                return v;
            }
            return "12px";
        }
        return {
            getStrokeColor: function (_ref) { return prop(_ref.feature, "strokeColor", "#ce00ce"); },
            getStrokeWidth: function (_ref) { return num(_ref.feature, "strokeWidth", 2); },
            getStrokeOpacity: function (_ref) { return num(_ref.feature, "strokeOpacity", 1); },
            getFillColor: function (_ref) { return prop(_ref.feature, "fillColor", "#ffffff"); },
            getFillOpacity: function (_ref) { return num(_ref.feature, "fillOpacity", 0); },
            getPointRadius: function (_ref) { return num(_ref.feature, "pointRadius", 2); },
            getLabel: function (_ref) { return String(prop(_ref.feature, "labelText", "") || prop(_ref.feature, "label", "") || ""); },
            getFontSize: function (_ref) { return fontSize(_ref.feature); },
            getFontColor: function (_ref) { return prop(_ref.feature, "fontColor", "#000000"); },
            getFontWeight: function (_ref) { return prop(_ref.feature, "fontWeight", "normal"); },
            getLabelOutlineColor: function (_ref) { return prop(_ref.feature, "labelOutlineColor", "#ffffff"); },
            getLabelOutlineWidth: function (_ref) { return num(_ref.feature, "labelOutlineWidth", 2); },
            getLabelYOffset: function (_ref) { return num(_ref.feature, "labelYOffset", 0); },
            getExternalGraphic: function (_ref) { return prop(_ref.feature, "externalGraphic", ""); },
            getGraphicWidth: function (_ref) { return num(_ref.feature, "graphicWidth", 32); },
            getGraphicHeight: function (_ref) { return num(_ref.feature, "graphicHeight", 32); },
            getGraphicXOffset: function (_ref) { return num(_ref.feature, "graphicXOffset", 0); },
            getGraphicYOffset: function (_ref) { return num(_ref.feature, "graphicYOffset", 0); },
            getGraphicOpacity: function (_ref) { return num(_ref.feature, "graphicOpacity", 1); },

            getGraphicZIndex: function (_ref) { return num(_ref.feature, "graphicZIndex", 10); }
        };
    }

    function DBF_createLayerHandle(uniqueName, displayName) {
        var handle = {
            uniqueName: uniqueName,
            name: displayName,
            layerName: uniqueName,
            visibility: false,
            features: [],
            _ids: new Set(),
            setVisibility: function (checked) {
                this.visibility = !!checked;
                if (!wmeSDK || !wmeSDK.Map) return;
                try {
                    var ret = wmeSDK.Map.setLayerVisibility({ layerName: this.layerName, visibility: this.visibility });
                    DBF_await(ret).catch(function () { });
                } catch (e) { if (debug) console.warn("[DBF] setLayerVisibility", this.layerName, e); }
            },
            isVisible: function () { return !!this.visibility; },
            addFeatures: function (feats) {
                if (!feats) return;
                var arr = Array.isArray(feats) ? feats : [feats];
                var toAdd = [];
                for (var i = 0; i < arr.length; i++) {
                    var f = arr[i];
                    if (!f) continue;
                    if (f.id && this._ids.has(f.id)) continue;
                    if (!f.geometry) continue;
                    var props = Object.assign({}, f.attributes || {}, f.properties || {});
                    if (f.style) {

                        Object.keys(f.style).forEach(function (k) {
                            props[k] = f.style[k];
                        });
                        if (f.style.label !== undefined) props.labelText = f.style.label;
                    }
                    var gj = {
                        type: "Feature",
                        id: f.id || (this.uniqueName + "_" + Date.now() + "_" + i),
                        geometry: f.geometry,
                        properties: props
                    };
                    var mirror = {
                        id: gj.id,
                        attributes: props,
                        properties: props,
                        style: f.style || null,
                        geometry: {
                            _gj: f.geometry,
                            getBounds: function () { return DBF_boundsFromGeometry(this._gj); }
                        },
                        _geojson: gj
                    };
                    this.features.push(mirror);
                    this._ids.add(gj.id);
                    toAdd.push(gj);
                }
                if (!toAdd.length || !wmeSDK || !wmeSDK.Map) return;
                try {
                    var ret = wmeSDK.Map.addFeaturesToLayer({ layerName: this.layerName, features: toAdd });
                    DBF_await(ret).catch(function () { });
                } catch (e) {

                    toAdd.forEach(function (feature) {
                        try { wmeSDK.Map.addFeatureToLayer({ layerName: handle.layerName, feature: feature }); } catch (err) { }
                    });
                }
            },
            removeFeatures: function (feats) {
                if (!feats || !feats.length) return;
                var ids = [];
                for (var i = 0; i < feats.length; i++) {
                    if (feats[i] && feats[i].id) ids.push(feats[i].id);
                }
                if (!ids.length) return;
                this.features = this.features.filter(function (f) { return ids.indexOf(f.id) === -1; });
                ids.forEach(function (id) { handle._ids.delete(id); });
                if (!wmeSDK || !wmeSDK.Map) return;
                try {
                    var ret = wmeSDK.Map.removeFeaturesFromLayer({ layerName: this.layerName, featureIds: ids });
                    DBF_await(ret).catch(function () { });
                } catch (e) { }
            },
            destroyFeatures: function (feats) {
                if (feats && feats.length) {
                    this.removeFeatures(feats);
                    return;
                }
                this.features = [];
                this._ids.clear();
                if (!wmeSDK || !wmeSDK.Map) return;
                try {
                    var ret = wmeSDK.Map.removeAllFeaturesFromLayer({ layerName: this.layerName });
                    DBF_await(ret).catch(function () { });
                } catch (e) { }
            },
            redraw: function () {

                if (!wmeSDK || !wmeSDK.Map || !this.features.length) return;
                var snapshot = this.features.slice();
                var self = this;
                this.destroyFeatures();
                snapshot.forEach(function (f) {
                    self.addFeatures([{
                        id: f.id,
                        geometry: f.geometry && f.geometry._gj ? f.geometry._gj : null,
                        attributes: f.attributes,
                        style: f.style
                    }]);
                });
            }
        };
        return handle;
    }

    function DBF_ensureSdkLayer(uniqueName, displayName) {
        if (_dbfLayersByUnique[uniqueName]) return _dbfLayersByUnique[uniqueName];
        if (!wmeSDK || !wmeSDK.Map) {
            console.warn("[DBF] ensureSdkLayer: SDK Map indisponible", uniqueName);
            return null;
        }
        try {
            wmeSDK.Map.addLayer({
                layerName: uniqueName,
                styleContext: DBF_defaultStyleContext(),
                styleRules: DBF_defaultStyleRules(),
                zIndexing: true
            });
        } catch (e) {

            if (debug) console.warn("[DBF] addLayer:", uniqueName, e.message || e);
        }
        try {
            wmeSDK.Map.setLayerVisibility({ layerName: uniqueName, visibility: false });
        } catch (e) { }
        var handle = DBF_createLayerHandle(uniqueName, displayName);
        _dbfLayersByUnique[uniqueName] = handle;
        return handle;
    }

    function DBF_getLayer(uniqueName) {
        return _dbfLayersByUnique[uniqueName] || null;
    }

    function DBF_cleanupLayer(layer) {
        if (!layer || !layer.features || layer.features.length === 0) return;
        const extent = DBF_getMapExtent();
        if (!extent) return;
        const featuresToRemove = [];
        for (let i = 0; i < layer.features.length; i++) {
            const feat = layer.features[i];
            if (feat.geometry && feat.geometry.getBounds) {
                const b = feat.geometry.getBounds();
                if (b) {
                    const isOutside = (b.left > extent.right || b.right < extent.left || b.bottom > extent.top || b.top < extent.bottom);
                    if (isOutside) featuresToRemove.push(feat);
                }
            }
        }
        if (featuresToRemove.length) layer.removeFeatures(featuresToRemove);
    }

    function DBF_clearFeatureIndex(layer) {
        if (!layer) return;
        if (layer._ids) layer._ids.clear();
    }

    function DBF_hasFeature(layer, id) {
        if (!layer || !id) return false;
        return layer._ids ? layer._ids.has(id) : false;
    }

    function DBF_registerFeature(layer, id) {
        if (!layer || !id || !layer._ids) return;
        layer._ids.add(id);
    }

    const GEOPF_WFS = 'https://data.geopf.fr/wfs/ows';
    const GEOPF_GEOCODE = 'https://data.geopf.fr/geocodage';
    const BAN_LOOKUP_BASE = 'https://plateforme.adresse.data.gouv.fr/lookup';
    const BAN_BAL_BASE = 'https://plateforme.adresse.data.gouv.fr/ban/communes';
    const BAN_SIGNALEMENT_API = 'https://plateforme-bal.adresse.data.gouv.fr/api-signalement';
    const GEO_API = 'https://geo.api.gouv.fr';
    const ANNUAIRE_API = 'https://api-lannuaire.service-public.fr/api/explore/v2.1/catalog/datasets/api-lannuaire-administration/records';
    var _mairieMailCache = Object.create(null);
    var _signalementStatusCache = Object.create(null);
    const DBF_WFS_BAN_LAYER = 'BAN.DATA.GOUV:ban';

    const DBF_WFS_COMMUNE_LAYER = 'ADMINEXPRESS-COG-CARTO.LATEST:commune';
    const DBF_WFS_PAGE = 5000;
    const DBF_WFS_MAX = 15000;
    const DBF_BAN_PROPERTYNAME = 'id,numero,rep,nom_voie,nom_commune,nom_ancienne_commune,certification_commune,code_insee,lon,lat,nom_ld';
    const DBF_COMMUNE_PROPERTYNAME = 'nom_officiel,code_insee,code_insee_du_departement,geometrie';
    window.adresses_list = [];
    var _banDrawCache = null;
    var _banWfsAbort = 0;
    var _ctyWfsAbort = 0;
    var _balCache = Object.create(null);
    var _lookupCache = Object.create(null);
    var _inseeNameCache = Object.create(null);
    var _dbfSourceMeta = {
        banRevision: null,
        banComposed: null,
        adminExpress: 'ADMIN EXPRESS COG-CARTO (dernière édition)',
        readAt: null
    };
    var _dbfLocalHn = Object.create(null);

    function DBF_gmGet(url, timeoutMs, essais) {
        essais = essais == null ? 2 : essais;
        var attempt = function (n) {
            return new Promise(function (resolve, reject) {
                try {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: url,
                        timeout: timeoutMs || 45000,
                        anonymous: true,
                        onload: function (r) {
                            if (r.status >= 200 && r.status < 300) resolve(r);
                            else reject(Object.assign(new Error('HTTP ' + r.status), { status: r.status }));
                        },
                        onerror: function () { reject(Object.assign(new Error('network'), { reseau: true })); },
                        ontimeout: function () { reject(Object.assign(new Error('timeout'), { reseau: true })); },
                        onabort: function () { reject(new Error('abort')); }
                    });
                } catch (e) { reject(e); }
            }).catch(function (err) {
                var st = err && err.status;
                var retryable = err && (err.reseau || st === 429 || (st >= 500 && st <= 599));
                if (n >= essais || !retryable) throw err;
                return new Promise(function (r) { setTimeout(r, Math.min(800 * n, 4000)); })
                    .then(function () { return attempt(n + 1); });
            });
        };
        return attempt(1);
    }

    function DBF_wfsGetFeatureUrl(typeNames, bbox, startIndex, count, propertyName, sortBy) {

        var b = [
            Number(bbox[0]).toFixed(6),
            Number(bbox[1]).toFixed(6),
            Number(bbox[2]).toFixed(6),
            Number(bbox[3]).toFixed(6)
        ].join(',') + ',EPSG:4326';
        var url = GEOPF_WFS
            + '?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature'
            + '&TYPENAMES=' + encodeURIComponent(typeNames)
            + '&OUTPUTFORMAT=' + encodeURIComponent('application/json')
            + '&SRSNAME=EPSG:4326'
            + '&BBOX=' + b
            + '&COUNT=' + (count || DBF_WFS_PAGE);
        if (propertyName) url += '&PROPERTYNAME=' + encodeURIComponent(propertyName);
        if (sortBy) url += '&SORTBY=' + encodeURIComponent(sortBy);
        if (startIndex > 0) url += '&STARTINDEX=' + startIndex;
        return url;
    }

    function DBF_mapBanWfsFeature(f) {
        if (!f) return null;
        var p = f.properties || {};
        var coords = f.geometry && f.geometry.coordinates;
        var lon = p.lon != null ? Number(p.lon) : (coords ? Number(coords[0]) : NaN);
        var lat = p.lat != null ? Number(p.lat) : (coords ? Number(coords[1]) : NaN);
        if (!isFinite(lon) || !isFinite(lat)) return null;
        var numero = p.numero != null ? String(p.numero) : '';
        if (numero === '99999') return null;
        var anc = p.nom_ancienne_commune != null ? String(p.nom_ancienne_commune).trim() : '';
        return {
            id: p.id || f.id || '',
            numero: numero,
            rep: p.rep != null ? String(p.rep) : '',
            nom_voie: p.nom_voie || '',
            nom_commune: p.nom_commune || '',
            nom_ancienne_commune: anc || null,
            code_insee: p.code_insee ? String(p.code_insee).toUpperCase() : '',
            certification_commune: p.certification_commune != null ? String(p.certification_commune) : '0',
            date_ajout_modif: null,
            lon: lon,
            lat: lat,
            nom_ld: p.nom_ld || ''
        };
    }

    async function DBF_fetchBanWfs(bbox) {
        var byId = Object.create(null);
        var lieuxDits = [];
        var start = 0;
        var matched = null;
        var returned = 0;
        while (start < DBF_WFS_MAX) {
            var res = await DBF_gmGet(
                DBF_wfsGetFeatureUrl(DBF_WFS_BAN_LAYER, bbox, start, DBF_WFS_PAGE, DBF_BAN_PROPERTYNAME, 'id'),
                60000
            );
            var data = JSON.parse(res.responseText);
            if (!data || !Array.isArray(data.features)) throw new Error('BAN WFS : format inattendu');
            var feats = data.features;
            if (matched == null) {
                matched = Number(data.numberMatched);
                if (!isFinite(matched)) matched = feats.length;
            }
            var pageReturned = Number(data.numberReturned);
            if (!isFinite(pageReturned)) pageReturned = feats.length;
            returned += pageReturned;
            for (var i = 0; i < feats.length; i++) {
                var row = DBF_mapBanWfsFeature(feats[i]);
                if (!row || !row.id) continue;
                if (byId[row.id]) continue;
                if ((!row.numero || row.numero === '') && row.nom_ld) {
                    lieuxDits.push({
                        nom_lieu_dit: row.nom_ld,
                        nom_commune: row.nom_commune,
                        lon: row.lon,
                        lat: row.lat
                    });
                    byId[row.id] = true;
                    continue;
                }
                if (!row.numero && !row.nom_voie) continue;
                byId[row.id] = row;
            }
            start += feats.length;
            if (!feats.length || pageReturned < DBF_WFS_PAGE || returned >= matched) break;
        }
        var addresses = [];
        for (var id in byId) {
            if (byId[id] && byId[id] !== true) addresses.push(byId[id]);
        }
        return {
            info_ban: addresses,
            lieux_dits: lieuxDits,
            truncated: matched != null && returned < matched,
            matched: matched
        };
    }

    function DBF_parseBalCsv(text) {
        var byCle = Object.create(null);
        var lieuxDits = [];
        if (!text) return { byCle: byCle, lieuxDits: lieuxDits };
        var lines = String(text).split(/\r?\n/);
        if (lines.length < 2) return { byCle: byCle, lieuxDits: lieuxDits };
        var header = lines[0].split(';');
        var idx = Object.create(null);
        for (var h = 0; h < header.length; h++) idx[header[h].trim()] = h;
        function cell(cols, name) {
            var i = idx[name];
            return i == null ? '' : String(cols[i] == null ? '' : cols[i]).trim();
        }
        for (var li = 1; li < lines.length; li++) {
            if (!lines[li]) continue;
            var raw = lines[li];

            var cols;
            if (raw.charAt(0) === '"') {
                var endQ = raw.indexOf('";');
                if (endQ > 0) cols = [raw.slice(1, endQ)].concat(raw.slice(endQ + 2).split(';'));
                else cols = raw.split(';');
            } else {
                cols = raw.split(';');
            }
            var cle = cell(cols, 'cle_interop');
            var numero = cell(cols, 'numero');
            var lon = Number(cell(cols, 'long'));
            var lat = Number(cell(cols, 'lat'));
            var commune = cell(cols, 'commune_nom');
            var deleguee = cell(cols, 'commune_deleguee_nom');
            var dateMaj = cell(cols, 'date_der_maj');
            if (numero === '99999') {
                var ldName = cell(cols, 'lieudit_complement_nom') || cell(cols, 'voie_nom');
                if (ldName && isFinite(lon) && isFinite(lat)) {
                    lieuxDits.push({
                        nom_lieu_dit: ldName,
                        nom_commune: commune,
                        lon: lon,
                        lat: lat
                    });
                }
                continue;
            }
            if (!cle) continue;
            byCle[cle] = {
                date_der_maj: dateMaj || null,
                nom_ancienne_commune: deleguee || null,
                certification_commune: cell(cols, 'certification_commune') || null
            };
        }
        return { byCle: byCle, lieuxDits: lieuxDits };
    }

    async function DBF_fetchBalCommune(codeInsee) {
        var code = String(codeInsee || '').toUpperCase();
        if (!code) return null;
        if (_balCache[code]) return _balCache[code];
        var url = BAN_BAL_BASE + '/' + encodeURIComponent(code) + '/download/csv-bal/adresses';
        try {
            var res = await DBF_gmGet(url, 90000, 2);
            var parsed = DBF_parseBalCsv(res.responseText);
            _balCache[code] = parsed;
            return parsed;
        } catch (e) {
            if (debug) console.warn('[DBF] BAL', code, e && e.message);
            return null;
        }
    }

    async function DBF_enrichBanFromBal(bundle) {
        var codes = Object.create(null);
        var list = bundle.info_ban || [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].code_insee) codes[list[i].code_insee] = true;
        }
        var insees = Object.keys(codes).slice(0, 4);
        if (!insees.length) return bundle;
        var bals = await Promise.all(insees.map(function (c) { return DBF_fetchBalCommune(c); }));
        var mergedLd = (bundle.lieux_dits || []).slice();
        var seenLd = Object.create(null);
        mergedLd.forEach(function (ld) {
            seenLd[(ld.nom_lieu_dit || '') + '|' + ld.lon + '|' + ld.lat] = true;
        });
        for (var b = 0; b < bals.length; b++) {
            var bal = bals[b];
            if (!bal) continue;
            for (var j = 0; j < list.length; j++) {
                var row = list[j];
                var meta = bal.byCle[row.id];
                if (!meta) continue;
                if (meta.date_der_maj) row.date_ajout_modif = meta.date_der_maj;
                if (!row.nom_ancienne_commune && meta.nom_ancienne_commune) {
                    row.nom_ancienne_commune = meta.nom_ancienne_commune;
                }
            }
            for (var k = 0; k < bal.lieuxDits.length; k++) {
                var ld = bal.lieuxDits[k];
                var key = (ld.nom_lieu_dit || '') + '|' + ld.lon + '|' + ld.lat;
                if (seenLd[key]) continue;
                seenLd[key] = true;
                mergedLd.push(ld);
            }
        }
        bundle.lieux_dits = mergedLd;
        return bundle;
    }

    async function DBF_banLookup(codeInsee) {
        var code = String(codeInsee || '').toUpperCase();
        if (!code) return null;
        if (_lookupCache[code]) return _lookupCache[code];
        var res = await DBF_gmGet(BAN_LOOKUP_BASE + '/' + encodeURIComponent(code), 20000);
        var data = JSON.parse(res.responseText);
        _lookupCache[code] = data;
        if (data.dateRevision) _dbfSourceMeta.banRevision = data.dateRevision;
        if (data.composedAt) _dbfSourceMeta.banComposed = data.composedAt;
        _dbfSourceMeta.readAt = new Date().toISOString();
        return data;
    }

    async function DBF_geoInseeByName(nom) {
        var key = String(nom || '').toLowerCase().trim();
        if (!key) return null;
        if (_inseeNameCache[key]) return _inseeNameCache[key];
        var url = GEO_API + '/communes?nom=' + encodeURIComponent(nom)
            + '&fields=nom,code&limit=5';
        var res = await DBF_gmGet(url, 15000);
        var list = JSON.parse(res.responseText);
        var best = Array.isArray(list) && list.length ? list[0] : null;
        if (best && best.code) _inseeNameCache[key] = best.code;
        return best ? best.code : null;
    }

    async function DBF_geoInseeAtPoint(lon, lat) {
        var url = GEO_API + '/communes?lon=' + encodeURIComponent(Number(lon).toFixed(3))
            + '&lat=' + encodeURIComponent(Number(lat).toFixed(3))
            + '&fields=nom,code';
        var res = await DBF_gmGet(url, 15000);
        var list = JSON.parse(res.responseText);
        return Array.isArray(list) && list[0] ? list[0] : null;
    }

    function DBF_renderOfficialSourcesCite() {
        var el = document.getElementById('dbf-official-cite');
        if (!el) return;
        var banDate = _dbfSourceMeta.banRevision
            ? new Date(_dbfSourceMeta.banRevision).toLocaleDateString('fr-FR')
            : 'édition courante';
        el.textContent = 'Source : Base Adresse Nationale (BAN), adresse.data.gouv.fr, diffusée par la Géoplateforme (IGN) — révision '
            + banDate + ' — Licence Ouverte Etalab 2.0. Limites communales : '
            + _dbfSourceMeta.adminExpress + ', IGN, Licence Ouverte 2.0.';
    }

    function DBF_ringToCoordString(ring) {
        if (!ring || !ring.length) return '';
        var parts = [];
        for (var i = 0; i < ring.length; i++) {
            var lon = Number(ring[i][0]);
            var lat = Number(ring[i][1]);
            if (!isFinite(lon) || !isFinite(lat)) continue;
            parts.push(lon.toFixed(6) + ';' + lat.toFixed(6));
        }
        return parts.join(' ');
    }

    function DBF_geomToCoordString(geom) {
        if (!geom || !geom.type) return '';
        var polys = [];
        if (geom.type === 'Polygon') polys = [geom.coordinates];
        else if (geom.type === 'MultiPolygon') polys = geom.coordinates;
        else return '';
        var out = [];
        for (var p = 0; p < polys.length; p++) {
            if (polys[p] && polys[p][0]) {
                var s = DBF_ringToCoordString(polys[p][0]);
                if (s) out.push(s);
            }
        }
        return out.join('|');
    }

    async function DBF_fetchCommunesWfs(bbox) {
        var res = await DBF_gmGet(
            DBF_wfsGetFeatureUrl(DBF_WFS_COMMUNE_LAYER, bbox, 0, 1501, DBF_COMMUNE_PROPERTYNAME, null),
            45000
        );
        var data = JSON.parse(res.responseText);
        if (!data || !Array.isArray(data.features)) throw new Error('ADMIN EXPRESS : format inattendu');
        var feats = data.features;
        var matched = Number(data.numberMatched);
        if (isFinite(matched) && matched > 1500) {
            if (debug) console.warn('[DBF] Trop de communes (' + matched + '), zoomez');
        }
        var out = [];
        for (var i = 0; i < feats.length; i++) {
            var f = feats[i];
            var p = f.properties || {};
            var name = p.nom_officiel || p.nom || p.name || '';
            var coord = DBF_geomToCoordString(f.geometry);
            if (!name || !coord) continue;
            out.push({ name: name, coord: coord, code_insee: p.code_insee || '' });
        }
        return out;
    }

    function DBF_mapGeocodeFeature(f) {
        if (!f) return null;
        var p = f.properties || {};
        var c = f.geometry && f.geometry.coordinates;
        var lon = c ? Number(c[0]) : NaN;
        var lat = c ? Number(c[1]) : NaN;
        if (!isFinite(lon) || !isFinite(lat)) return null;
        return {
            id_raw: p.id || '',
            numero: p.housenumber || '',
            voie: p.street || '',
            commune: p.city || '',
            label: p.label || '',
            lon: lon,
            lat: lat
        };
    }

    async function DBF_geocodeSearch(q, limit) {
        var url = GEOPF_GEOCODE + '/search?q=' + encodeURIComponent(q)
            + '&limit=' + (limit || 15)
            + '&index=address';
        var res = await DBF_gmGet(url, 15000);
        var data = JSON.parse(res.responseText);
        return (data.features || []).map(DBF_mapGeocodeFeature).filter(Boolean);
    }

    async function DBF_geocodeReverse(lon, lat, limit) {
        var url = GEOPF_GEOCODE + '/reverse?lon=' + encodeURIComponent(lon)
            + '&lat=' + encodeURIComponent(lat)
            + '&limit=' + (limit || 1)
            + '&index=address';
        var res = await DBF_gmGet(url, 15000);
        var data = JSON.parse(res.responseText);
        return (data.features || []).map(DBF_mapGeocodeFeature).filter(Boolean);
    }

    var _dbfConsoleErrors = [];
    (function () {
        var _origError = console.error;
        var _origWarn = console.warn;
        console.error = function () {
            try { _dbfConsoleErrors.push('[ERROR] ' + Array.from(arguments).join(' ')); } catch (e) { }
            if (_dbfConsoleErrors.length > 50) _dbfConsoleErrors.shift();
            _origError.apply(console, arguments);
        };
        console.warn = function () {
            try { _dbfConsoleErrors.push('[WARN] ' + Array.from(arguments).join(' ')); } catch (e) { }
            if (_dbfConsoleErrors.length > 50) _dbfConsoleErrors.shift();
            _origWarn.apply(console, arguments);
        };
        window.addEventListener('error', function (ev) {
            _dbfConsoleErrors.push('[UNCAUGHT] ' + (ev.message || '') + ' at ' + (ev.filename || '') + ':' + (ev.lineno || ''));
            if (_dbfConsoleErrors.length > 50) _dbfConsoleErrors.shift();
        });
        window.addEventListener('unhandledrejection', function (ev) {
            _dbfConsoleErrors.push('[PROMISE] ' + String(ev.reason || ''));
            if (_dbfConsoleErrors.length > 50) _dbfConsoleErrors.shift();
        });
    })();

    unsafeWindow.DBF = {
        setCenter: function (lon, lat, zoom) { DBF_setMapCenter(lon, lat, zoom); },
        setZoom: function (z) { DBF_setZoomLevel(z); },
        ensureBanLayer: function () {
            try {
                var cb = DBF_getBanLayerCheckboxEl && DBF_getBanLayerCheckboxEl();
                if (cb && !cb.checked) cb.click();
            } catch (e) { }
            try { if (typeof LayerBanToggled === 'function') LayerBanToggled(true); } catch (e2) { }
            try { load_ban(); } catch (e3) { }
        }
    };

    function getId(node) { return document.getElementById(node); }
    function getElementsByClassName(classname, node) {
        node || (node = document.getElementsByTagName('body')[0]);
        for (var a = [], re = new RegExp('\\b' + classname + '\\b'), els = node.getElementsByTagName('*'), i = 0, j = els.length; i < j; i++) { re.test(els[i].className) && a.push(els[i]); }
        return a;
    }
    function isJsonString(str) {
        try { JSON.parse(str); }
        catch (e) { return false; }
        return true;
    }
    function deltaDate(adresseDate) {
        let diffTime = Math.abs(new Date().valueOf() - new Date(adresseDate).valueOf());
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        [days, hours, minutes] = [Math.floor(days), Math.floor(hours), Math.floor(minutes)]
        var delta = days + 'j ' + hours + 'h ' + minutes + 'm';
        return delta;
    }

    function getUserRankDBF() {
        try {
            if (!wmeSDK || !wmeSDK.State) return null;
            var ui = null;
            if (typeof wmeSDK.State.getUserInfo === "function") {
                ui = wmeSDK.State.getUserInfo();
                if (ui && typeof ui.then === "function") return null;
            } else if (wmeSDK.State.userInfo) {
                ui = wmeSDK.State.userInfo;
            }
            if (!ui) return null;
            var r = (typeof ui.rank === "number") ? ui.rank
                : (ui.attributes && typeof ui.attributes.rank === "number" ? ui.attributes.rank : null);
            if (typeof r !== "number") return null;

            return (r >= 0 && r <= 6) ? (r + 1) : r;
        } catch (err) { }
        return null;
    }

    function waitRank() {
        const rank = getUserRankDBF();
        if (null === rank) return setTimeout(waitRank, 300);
        DBF_applyRankGates(rank);
    }

    async function waitRankAsync() {
        try {
            if (wmeSDK && wmeSDK.State && typeof wmeSDK.State.getUserInfo === "function") {
                var ui = await DBF_await(wmeSDK.State.getUserInfo());
                if (ui && typeof ui.rank === "number") {
                    var rank = (ui.rank >= 0 && ui.rank <= 6) ? (ui.rank + 1) : ui.rank;
                    DBF_applyRankGates(rank);
                    return;
                }
            }
        } catch (e) { }
        waitRank();
    }

    function parseWmeMouseSpan(text) {
        if (!window.DBF_USER_CAN_AUTOFILL) return;
        if (!text) return null;
        const coordRegex = /^\s*([+-]?\d+(?:\.\d+)?)\s*[ ,;]\s*([+-]?\d+(?:\.\d+)?)\s*$/;
        const regexMatch = String(text).trim().match(coordRegex);
        if (!regexMatch) return null;
        const firstNum = parseFloat(regexMatch[1]);
        const secondNum = parseFloat(regexMatch[2]);
        if (!isFinite(firstNum) || !isFinite(secondNum)) return null;
        let latitude, longitude;
        if (Math.abs(firstNum) <= 90 && Math.abs(secondNum) > 90) { latitude = firstNum; longitude = secondNum; }
        else if (Math.abs(firstNum) > 90 && Math.abs(secondNum) <= 90) { longitude = firstNum; latitude = secondNum; }
        else { latitude = firstNum; longitude = secondNum; }
        return { lon: longitude, lat: latitude };
    }

    function sanitySwapIfWeird(coords) {
        if (!window.DBF_USER_CAN_AUTOFILL) return;
        if (!coords) return coords;
        if (coords.lon >= -10 && coords.lon <= 15 && coords.lat >= 40 && coords.lat <= 55) return coords;
        const swapped = { lon: coords.lat, lat: coords.lon };
        if (swapped.lon >= -10 && swapped.lon <= 15 && swapped.lat >= 40 && swapped.lat <= 55) return swapped;
        return coords;
    }

    var _dbfMouseTimer = null;
    function DBF_mouseIsFresh() {
        if (!lastMouseLL) return false;

        return Date.now() - lastMouseTS <= 4000;
    }
    function DBF_onSdkMouseMove(ev) {
        if (!ev) return;
        var lon, lat;
        if (typeof ev.lon === "number" && typeof ev.lat === "number") {
            lon = ev.lon; lat = ev.lat;
        } else if (ev.detail && typeof ev.detail.lon === "number" && typeof ev.detail.lat === "number") {
            lon = ev.detail.lon; lat = ev.detail.lat;
        } else if (ev.data && typeof ev.data.lon === "number" && typeof ev.data.lat === "number") {
            lon = ev.data.lon; lat = ev.data.lat;
        } else if (Array.isArray(ev.coordinate) && ev.coordinate.length >= 2) {
            lon = Number(ev.coordinate[0]); lat = Number(ev.coordinate[1]);
        } else if (Array.isArray(ev.coords) && ev.coords.length >= 2) {
            lon = Number(ev.coords[0]); lat = Number(ev.coords[1]);
        } else {
            return;
        }
        if (!isFinite(lon) || !isFinite(lat)) return;
        lastMouseLL = sanitySwapIfWeird({ lon: lon, lat: lat });
        lastMouseTS = Date.now();
    }
    function DBF_bindMousePosition() {
        try {
            if (!_dbfPointerFromSdk && wmeSDK && wmeSDK.Events && typeof wmeSDK.Events.on === "function") {
                var ret = wmeSDK.Events.on({ eventName: "wme-map-mouse-move", eventHandler: DBF_onSdkMouseMove });
                _dbfPointerFromSdk = true;
                if (ret && typeof ret.then === "function") {
                    ret.then(function () { }, function () {
                        _dbfPointerFromSdk = false;
                    });
                }
            }
        } catch (e) {
            _dbfPointerFromSdk = false;
            if (debug) console.warn("[DBF] wme-map-mouse-move indisponible:", e);
        }

        DBF_ensureMousePoll();
    }
    function DBF_ensureMousePoll() {
        if (_dbfMouseTimer || !window.DBF_USER_CAN_AUTOFILL) return;
        _dbfMouseTimer = setInterval(tickMouseSpan, 200);
    }

    function tickMouseSpan() {
        if (!window.DBF_USER_CAN_AUTOFILL) return;
        var mouseSpanEl = document.querySelector(".wz-map-ol-control-span-mouse-position")
            || document.querySelector(".ol-mouse-position")
            || document.querySelector("[class*='mouse-position']");
        if (!mouseSpanEl) return;
        const parsed = parseWmeMouseSpan(mouseSpanEl.textContent || mouseSpanEl.innerText || "");
        if (parsed) { lastMouseLL = sanitySwapIfWeird(parsed); lastMouseTS = Date.now(); }
    }

    function haversine(lon1, lat1, lon2, lat2) {
        if (!window.DBF_USER_CAN_AUTOFILL) return;
        const toRad = (deg) => deg * Math.PI / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
        return 12742e3 * Math.asin(Math.sqrt(a));
    }

    function pickNearestFromList(addressList, mousePosition, maxDistMeters) {
        if (!window.DBF_USER_CAN_AUTOFILL) return;
        let nearest = null;
        let shortestDistance = Infinity;
        for (const address of addressList) {
            const addrLon = Number(address.lon);
            const addrLat = Number(address.lat);
            if (!isFinite(addrLon) || !isFinite(addrLat)) continue;
            const distance = haversine(mousePosition.lon, mousePosition.lat, addrLon, addrLat);
            if (distance < shortestDistance) { shortestDistance = distance; nearest = { ...address, dist: distance }; }
        }
        return (!nearest || nearest.dist > maxDistMeters) ? null : nearest;
    }

    var DBF_WME_LAYER_HOUSE_NUMBERS = "houseNumbers";

    function LayerVilToggled(checked) {
        if (Cty_Layer) Cty_Layer.setVisibility(checked);
        if (checked) show_border();
    }
    function LayerDepToggled(checked) {
        if (Dpt_Layer) Dpt_Layer.setVisibility(checked);
        if (checked) show_border();
    }

    function LayerCamToggled(checked) {
        if (Cam_Layer) Cam_Layer.setVisibility(checked);
        if (checked) show_border();
    }
    function LayerBanToggled(checked) {
        if (Ban_Layer) Ban_Layer.setVisibility(checked);
        DBF_syncHnWithBan(!!checked);
        if (checked) load_ban();
    }

    function DBF_getBanLayerCheckboxEl() {
        return getId('layer-switcher-item_adresses_ban') || getId('layer-switcher-item_dbf_ban');
    }

    function DBF_syncBanPill(visible) {
        var pill = getId('layerBanVisib');
        if (pill) pill.style.backgroundColor = visible ? '#bbffcc' : '#fac3c3';
    }

    function DBF_syncHnPill(visible) {
        var pill = getId('layerHNVisib');
        if (pill) pill.style.backgroundColor = visible ? '#bbffcc' : '#fac3c3';
    }

    function DBF_getHnCheckboxEl() {
        return getId('layer-switcher-item_house_numbers')
            || document.querySelector('#layer-switcher-item_house_numbers')
            || document.querySelector('input[id*="house_number"]')
            || document.querySelector('input[id*="house-number"]')
            || document.querySelector('input[id*="houseNumber"]');
    }

    function DBF_getHouseNumbersVisible() {
        try {
            if (wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.getWMELayerVisibility === "function") {
                var v = wmeSDK.LayerSwitcher.getWMELayerVisibility({ layerName: DBF_WME_LAYER_HOUSE_NUMBERS });
                if (v != null && typeof v.then === "function") return null;
                if (typeof v === "boolean") return v;
            }
        } catch (e) { }
        try {
            if ($ && $('#layer-switcher-item_house_numbers').length) {
                return $('#layer-switcher-item_house_numbers').prop('checked') === true;
            }
        } catch (e2) { }
        var el = DBF_getHnCheckboxEl();
        return el ? !!el.checked : null;
    }

    function DBF_clickHnCheckbox(isVisible) {
        var el = DBF_getHnCheckboxEl();
        if (el && !!el.checked !== !!isVisible) {
            try { el.click(); return true; } catch (e) { }
        }
        try {
            if ($ && $('#layer-switcher-item_house_numbers').length) {
                var cur = $('#layer-switcher-item_house_numbers').prop('checked') === true;
                if (cur !== !!isVisible) {
                    $('#layer-switcher-item_house_numbers').click();
                    return true;
                }
            }
        } catch (e2) { }
        return false;
    }

    function DBF_setHouseNumbersVisible(isVisible) {
        var want = !!isVisible;
        var sdkOk = false;
        try {
            if (wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.setWMELayerVisibility === "function") {
                var ret = wmeSDK.LayerSwitcher.setWMELayerVisibility({
                    layerName: DBF_WME_LAYER_HOUSE_NUMBERS,
                    isVisible: want
                });
                DBF_await(ret).catch(function () { });
                sdkOk = true;
            }
        } catch (e) { if (debug) console.warn('[DBF] setWMELayerVisibility HN:', e); }

        var domOk = DBF_clickHnCheckbox(want);
        DBF_syncHnPill(want);
        return sdkOk || domOk;
    }

    function DBF_syncHnWithBan(banVisible) {
        try {
            if (banVisible) {
                if (getId('optionDBF10')?.checked) {
                    DBF_refreshHnPill();
                    return;
                }
                DBF_ensureHouseNumbersVisible(true);
            } else {
                if (!getId('optionDBF11')?.checked) {
                    DBF_refreshHnPill();
                    return;
                }
                DBF_ensureHouseNumbersVisible(false);
            }
        } catch (e) {
            if (debug) console.warn('[DBF] syncHnWithBan:', e);
        }
    }

    function DBF_ensureHouseNumbersVisible(wantVisible) {
        var want = !!wantVisible;
        var cur = DBF_getHouseNumbersVisible();
        if (cur === want) {
            DBF_syncHnPill(want);
            return;
        }
        if (cur === null && wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.getWMELayerVisibility === "function") {
            DBF_await(wmeSDK.LayerSwitcher.getWMELayerVisibility({ layerName: DBF_WME_LAYER_HOUSE_NUMBERS }))
                .then(function (vis) {
                    if (!!vis !== want) DBF_setHouseNumbersVisible(want);
                    else DBF_syncHnPill(want);
                })
                .catch(function () { DBF_setHouseNumbersVisible(want); });
            return;
        }
        DBF_setHouseNumbersVisible(want);
    }

    function DBF_refreshHnPill() {
        var v = DBF_getHouseNumbersVisible();
        if (v === null && wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.getWMELayerVisibility === "function") {
            DBF_await(wmeSDK.LayerSwitcher.getWMELayerVisibility({ layerName: DBF_WME_LAYER_HOUSE_NUMBERS }))
                .then(function (vis) { DBF_syncHnPill(!!vis); })
                .catch(function () { });
            return;
        }
        if (v !== null) DBF_syncHnPill(!!v);
    }

    function DBF_toggleHnFromPanel() {
        var apply = function (next) {
            DBF_setHouseNumbersVisible(!!next);
            load_ban();
        };
        var cur = DBF_getHouseNumbersVisible();
        if (cur === null && wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.getWMELayerVisibility === "function") {
            DBF_await(wmeSDK.LayerSwitcher.getWMELayerVisibility({ layerName: DBF_WME_LAYER_HOUSE_NUMBERS }))
                .then(function (vis) { apply(!vis); })
                .catch(function () { apply(true); });
            return;
        }
        apply(!cur);
    }

    function DBF_setScriptLayerChecked(name, isChecked) {
        try {
            if (wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.setLayerCheckboxChecked === "function") {
                var ret = wmeSDK.LayerSwitcher.setLayerCheckboxChecked({ name: name, isChecked: !!isChecked });
                DBF_await(ret).catch(function () { });
                return true;
            }
        } catch (e) { }
        return false;
    }

    function DBF_isScriptLayerChecked(name) {
        try {
            if (wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.isLayerCheckboxChecked === "function") {
                var cur = wmeSDK.LayerSwitcher.isLayerCheckboxChecked({ name: name });
                if (cur && typeof cur.then === "function") return null;
                return !!cur;
            }
        } catch (e) { }
        return null;
    }

    function DBF_toggleBanFromPanel() {
        var name = "Adresses BAN";
        var apply = function (next) {
            DBF_setScriptLayerChecked(name, !!next);

            var domCb = DBF_getBanLayerCheckboxEl();
            if (domCb && !!domCb.checked !== !!next) {
                try { domCb.click(); } catch (e2) { }
            }

            LayerBanToggled(!!next);
            DBF_syncBanPill(!!next);
            load_ban();
        };

        var cur = DBF_isScriptLayerChecked(name);
        if (cur === null && wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.isLayerCheckboxChecked === "function") {
            DBF_await(wmeSDK.LayerSwitcher.isLayerCheckboxChecked({ name: name })).then(function (checked) {
                apply(!checked);
            }).catch(function () {
                apply(!(Ban_Layer && Ban_Layer.visibility));
            });
            return;
        }
        if (cur !== null) {
            apply(!cur);
            return;
        }

        var el = DBF_getBanLayerCheckboxEl();
        if (el) {
            apply(!el.checked);
            return;
        }
        apply(!(Ban_Layer && Ban_Layer.visibility));
    }

    function addScriptsMenu() {
        if (typeof getElementsByClassName('collapsible-GROUP__SCRIPTS', getId('layer-switcher-region'))[0] != 'object') {
            if ('undefined' === typeof localStorage.posScriptMenu) { localStorage.setItem('posScriptMenu', '["top"]'); }

            var menuParent = getElementsByClassName('togglers', getId('layer-switcher-region'))[0];

            var scriptMenu = document.createElement('li');
            scriptMenu.className = "group";

            var scriptMenuContent = document.createElement('div');
            scriptMenuContent.className = 'layer-switcher-toggler-tree-category';
            scriptMenuContent.innerHTML = '<wz-button id="developScript" color="clear-icon" size="xs"><i class="toggle-category w-icon w-icon-caret-down"></i></wz-button>' +
                '<wz-toggle-switch disabled="false" checked id="layer-switcher-group__scripts" class="layer-switcher-group__scripts" tabindex="0" name="" value=""></wz-toggle-switch>' +
                '<label class="label-text" for="layer-switcher-group__scripts">Scripts</label>';
            scriptMenu.appendChild(scriptMenuContent);
            var groupScripts = document.createElement('ul');
            groupScripts.className = "collapsible-GROUP__SCRIPTS";
            scriptMenu.appendChild(groupScripts);

            if (JSON.parse(localStorage.posScriptMenu)[0] == 'top') { menuParent.insertBefore(scriptMenu, menuParent.firstChild); }
            else { menuParent.appendChild(scriptMenu); }

            getId('developScript').addEventListener('click', function (e) {
                if (groupScripts.className == 'collapsible-GROUP__SCRIPTS') {
                    groupScripts.className = 'collapsible-GROUP__SCRIPTS collapse-layer-switcher-group';
                    this.innerHTML = '<i class="toggle-category w-icon w-icon-caret-down upside-down"></i>';
                } else {
                    groupScripts.className = 'collapsible-GROUP__SCRIPTS';
                    this.innerHTML = '<i class="toggle-category w-icon w-icon-caret-down"></i>';
                }
            });
            getId('layer-switcher-group__scripts').addEventListener('click', function (e) {
                if (groupScripts.className == 'collapsible-GROUP__SCRIPTS') {
                    groupScripts.className = 'collapsible-GROUP__SCRIPTS collapse-layer-switcher-group';
                    getId('developScript').innerHTML = '<i class="toggle-category w-icon w-icon-caret-down upside-down"></i>';
                } else {
                    groupScripts.className = 'collapsible-GROUP__SCRIPTS';
                    getId('developScript').innerHTML = '<i class="toggle-category w-icon w-icon-caret-down"></i>';
                }
            });
            var lng = DBF_getLocale();
            if (lng == 'fr') { var title = "Position menu des scripts", top = "En haut", bottom = "En bas"; }
            else if (lng == 'es') { var title = "Posición del menú de script", top = "En alto", bottom = "Abajo"; }
            else { var title = "Scripts menu position", top = "On top", bottom = "On bottom"; }

            var optionPosMenu = document.createElement('div');
            optionPosMenu.className = 'settings__form-group';
            optionPosMenu.innerHTML = '<wz-label html-for="">' + title + '</wz-label><span style="padding-right:15px;">' + bottom + ' </span><wz-toggle-switch name="posScriptMenu" id="posScriptMenu" checked=' + (JSON.parse(localStorage.posScriptMenu)[0] == 'top' ? "true" : "false") + ' class="alert-settings-visibility-toggle" tabindex="0" value=""> ' + top + '<input type="checkbox" name="posScriptMenu" value="" style="display: none; visibility: hidden;"></wz-toggle-switch>';

            if ('undefined' === typeof localStorage.posScriptMenu || !isJsonString(localStorage.posScriptMenu)) { localStorage.setItem('posScriptMenu', '[]'); }
        }
    }
    function addTooltipToCheckbox(checkboxId, tooltipText) {
        var checkbox = document.getElementById(checkboxId);
        if (!checkbox) return;

        try {

            var container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'space-between';

            var textSpan = document.createElement('span');
            textSpan.textContent = checkbox.textContent;
            checkbox.textContent = '';

            var tooltipEl = document.createElement('wz-tooltip');
            tooltipEl.setAttribute('position', 'bottom');

            var tooltipSource = document.createElement('wz-tooltip-source');
            var infoIcon = document.createElement('i');
            infoIcon.className = 'w-icon w-icon-info layer-selector-info-icon';
            infoIcon.title = tooltipText;
            tooltipSource.appendChild(infoIcon);

            var tooltipContent = document.createElement('wz-tooltip-content');
            tooltipContent.textContent = tooltipText;

            tooltipEl.appendChild(tooltipSource);
            tooltipEl.appendChild(tooltipContent);

            container.appendChild(textSpan);
            container.appendChild(tooltipEl);
            checkbox.appendChild(container);
        } catch (e) {

            if (debug) console.warn("DBF: Tooltip web component failed, using native title.", e);
            checkbox.title = tooltipText;
        }
    }

    function DBF_bridgePageGlobals() {
        var uw = DBF_pageWindow;
        getWmeSdk = uw.getWmeSdk;
        $ = uw.jQuery || uw.$;
    }

    function DBF_getLocale() {
        try {
            if (wmeSDK && wmeSDK.Settings && typeof wmeSDK.Settings.getLocale === 'function') {
                var loc = wmeSDK.Settings.getLocale();
                if (loc && typeof loc.then !== 'function') return String(loc);
            }
        } catch (e) { }
        try { return (navigator.language || 'fr').slice(0, 2); } catch (e2) { return 'fr'; }
    }

    function DBF_tryLegacySidebarHandles() {
        var DBFhandle = getId("user-info");
        if (!DBFhandle) return false;
        DBFhandleClass = getElementsByClassName("nav-tabs", DBFhandle)[0];
        DBFhandleClass2 = getElementsByClassName("tab-content", DBFhandle)[0];
        return !!(DBFhandleClass && DBFhandleClass2);
    }

    var DBF_shortcutHouseOk = false;
    var DBF_shortcutAddressOk = false;
    var _dbfAutofillLockUntil = 0;

    function DBF_keysAlreadyTaken(keys) {
        if (!keys || !wmeSDK || !wmeSDK.Shortcuts) return false;
        try {
            if (typeof wmeSDK.Shortcuts.areShortcutKeysInUse === "function") {
                return !!wmeSDK.Shortcuts.areShortcutKeysInUse({ shortcutKeys: keys });
            }
        } catch (e) { }
        return false;
    }

    function DBF_runAutofillOnce(fn) {
        var now = Date.now();
        if (now < _dbfAutofillLockUntil) return false;
        _dbfAutofillLockUntil = now + 450;
        try { return !!fn(); } catch (e) {
            if (debug) console.warn("[DBF] autofill error:", e);
            return false;
        }
    }

    function DBF_registerShortcuts() {
        if (!wmeSDK || !wmeSDK.Shortcuts) return;
        var shortcuts = [
            {
                callback: function () { DBF_toggleBanFromPanel(); },
                description: "Activer/Désactiver le calque BAN",
                shortcutId: "ban_switch",
                shortcutKeys: "C+B",
            },
            {
                callback: function () { DBF_runAutofillOnce(DBF_autofillHouseNumber); },
                description: "Autofill BAN n° (dès L2) : Ctrl+M avec la souris sur le point du numéro souhaité",
                shortcutId: "ban_autofill",
                shortcutKeys: "C+M",
            },

            {
                callback: function () { DBF_setZoomLevel(19); },
                description: "Zoom niveau 19",
                shortcutId: "ban_zoom_level",
                shortcutKeys: "A+97",
            }
        ];
        shortcuts.forEach(function (sc) {
            try {
                var wantedKeys = sc.shortcutKeys;
                var keysTaken = wantedKeys && DBF_keysAlreadyTaken(wantedKeys);

                if (keysTaken) sc.shortcutKeys = null;
                var ret = wmeSDK.Shortcuts.createShortcut(sc);
                var bound = !keysTaken && !!wantedKeys;
                if (sc.shortcutId === "ban_autofill") DBF_shortcutHouseOk = bound;
                if (sc.shortcutId === "ban_address_autofill") DBF_shortcutAddressOk = bound;
                if (ret && typeof ret.then === "function") {
                    ret.then(function () { }, function () {
                        if (sc.shortcutId === "ban_autofill") DBF_shortcutHouseOk = false;
                        if (sc.shortcutId === "ban_address_autofill") DBF_shortcutAddressOk = false;
                    });
                }
            } catch (e) {
                if (sc.shortcutId === "ban_autofill") DBF_shortcutHouseOk = false;
                if (sc.shortcutId === "ban_address_autofill") DBF_shortcutAddressOk = false;
                if (debug) console.warn("DBF - Raccourci '" + sc.shortcutId + "' ignoré :", e.message || e);
            }
        });
    }

    function DBF_start() {
        var sdkInit = DBF_pageWindow.SDK_INITIALIZED;
        if (!sdkInit || typeof sdkInit.then !== 'function') {
            console.warn('[DBF] SDK_INITIALIZED absent — nouvel essai dans 500ms');
            window.setTimeout(DBF_start, 500);
            return;
        }
        sdkInit.then(DBF_onSdkInitialized).catch(function (err) {
            console.error('[DBF] SDK_INITIALIZED rejected:', err);
        });
    }

    async function DBF_onSdkInitialized() {
        try {
            DBF_bridgePageGlobals();
            var sdkFactory = (typeof getWmeSdk === 'function') ? getWmeSdk : DBF_pageWindow.getWmeSdk;
            if (typeof sdkFactory !== 'function') {
                console.error('[DBF] getWmeSdk indisponible sur la page');
                DBF_ensureMousePoll();
                return;
            }
            wmeSDK = sdkFactory({
                scriptId: SCRIPT_ID,
                scriptName: SCRIPT_NAME,
                mode: "async",
            });
            console.log('[DBF] SDK prêt — attente wme-ready… (v' + GM_info.script.version + ')');

            var readyOnce = null;
            try { readyOnce = wmeSDK.Events.once({ eventName: "wme-ready" }); } catch (e) { }
            await DBF_waitUntilWmeReady(readyOnce);
            console.log('[DBF] wme-ready OK — init…');
            DBF_bridgePageGlobals();
            await DBF_refreshMapState();
            try {
                wmeSDK.Events.on({ eventName: "wme-map-move-end", eventHandler: function () { DBF_refreshMapState(); } });
                wmeSDK.Events.on({ eventName: "wme-map-zoom-changed", eventHandler: function () { DBF_refreshMapState(); } });
            } catch (e) { }
            DBF_bindMousePosition();
            await DBF_initAfterReady();
        } catch (e) {
            console.error('[DBF] Échec initialisation SDK:', e);
            DBF_ensureMousePoll();
        }
    }

    function DBF_probeIsReady() {

        return new Promise(function (resolve) {
            var done = false;
            function finish(v) {
                if (done) return;
                done = true;
                resolve(!!v);
            }
            try {
                if (!wmeSDK || !wmeSDK.State || typeof wmeSDK.State.isReady !== "function") {
                    finish(false);
                    return;
                }
                var ret = wmeSDK.State.isReady();
                if (ret && typeof ret.then === "function") {
                    ret.then(finish).catch(function () { finish(false); });
                    window.setTimeout(function () { finish(false); }, 200);
                } else {
                    finish(!!ret);
                }
            } catch (e) {
                finish(false);
            }
        });
    }

    async function DBF_waitUntilWmeReady(readyOnce) {
        if (await DBF_probeIsReady()) return;

        var eventDone = false;
        var eventPromise = readyOnce
            ? DBF_await(readyOnce).then(function () { eventDone = true; }).catch(function () { })
            : Promise.resolve();

        await Promise.race([
            eventPromise,
            new Promise(function (resolve) {
                var tries = 0;
                var timer = window.setInterval(function () {
                    tries++;
                    if (eventDone) {
                        window.clearInterval(timer);
                        resolve();
                        return;
                    }
                    DBF_probeIsReady().then(function (ready) {
                        if (ready || tries >= 60) {
                            window.clearInterval(timer);
                            resolve();
                        }
                    });
                }, 250);
            })
        ]);
    }

    async function DBF_initAfterReady() {
        try {
            var tab = await wmeSDK.Sidebar.registerScriptTab();
            DBF_sdkTabLabel = tab.tabLabel;
            DBF_sdkTabPane = tab.tabPane;
            console.log('[DBF] Onglet sidebar enregistré via SDK');
        } catch (e) {
            console.warn('[DBF] Sidebar.registerScriptTab échoué, fallback DOM legacy:', e);
            DBF_tryLegacySidebarHandles();
        }

        DBF_registerShortcuts();
        waitRankAsync();

        Cty_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_Cty", "Limites des communes");
        Dpt_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_Dpt", "Limites des départements");
        PR_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_PR", "Points Routiers");
        Cam_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_Cam", "Radars");
        Ban_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_Ban", "Adresses BAN");
        Equip_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_Equip", "Équipements");
        Etabl_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_Etabl", "Établissements");
        RS_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_RS", "Panneaux routiers Icones");
        Bump_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_Bump", "Ralentisseurs OSM");
        Signals_Layer = DBF_ensureSdkLayer("__WME_Draw_Border_Signals", "Feux tricolores OSM");
        DBFstep2();
    }

    function DBF_addWazeCheckbox(layerName, layerId, isChecked, callback) {
        var scriptsGroup = document.querySelector('.collapsible-GROUP__SCRIPTS');
        if (!scriptsGroup) {
            if (debug) console.warn("DBF: Groupe Scripts introuvable dans le menu calques.");
            return;
        }
        if (document.getElementById(layerId)) return;

        var li = document.createElement('li');
        var wrap = document.createElement('div');
        wrap.className = 'layer-selector';
        var cb = document.createElement('wz-checkbox');
        cb.id = layerId;
        cb.setAttribute('value', 'on');
        if (isChecked) cb.setAttribute('checked', 'true');
        var label = document.createElement('div');
        label.className = 'layer-selector-container';
        label.textContent = layerName;
        cb.appendChild(label);
        wrap.appendChild(cb);
        li.appendChild(wrap);
        scriptsGroup.appendChild(li);

        cb.addEventListener('change', function () {
            if (typeof callback === 'function') callback(!!cb.checked);
        });
    }

    function DBF_addSdkLayerCheckbox(name, isChecked) {
        try {
            if (wmeSDK && wmeSDK.LayerSwitcher && typeof wmeSDK.LayerSwitcher.addLayerCheckbox === 'function') {
                wmeSDK.LayerSwitcher.addLayerCheckbox({ name: name, isChecked: !!isChecked });
                return true;
            }
        } catch (e) {
            if (debug) console.warn('[DBF] LayerSwitcher.addLayerCheckbox échoué:', name, e);
        }
        return false;
    }

    function DBFstep2() {
        if ('undefined' === typeof localStorage.speedCamList || !isJsonString(localStorage.speedCamList)) { localStorage.setItem('speedCamList', '[]'); }
        if ('undefined' === typeof localStorage.DBFsettings || !isJsonString(localStorage.DBFsettings)) {
            localStorage.setItem('DBFsettings', '{"optionDBF0":false,"optionDBF1":true,"optionDBF2":false,"optionDBF3":false,"optionDBF4":true,"optionDBF5":false,"optionDBF6":false,"optionDBF10":false}');
        } else {
            try {
                var _dbfSet = JSON.parse(localStorage.DBFsettings);
                var _dbfSetDirty = false;
                if (_dbfSetDirty) localStorage.setItem('DBFsettings', JSON.stringify(_dbfSet));
            } catch (e) { }
        }

        var layerDefs = [
            { name: "Limites des communes", id: "layer-switcher-item_dbf_communes", toggle: LayerVilToggled, unique: "__WME_Draw_Border_Cty", tooltip: "Limites communales ADMIN EXPRESS COG-CARTO (source officielle IGN/Géoplateforme)." },
            { name: "Limites des départements", id: "layer-switcher-item_dbf_departements", toggle: LayerDepToggled, unique: "__WME_Draw_Border_Dpt" },

            { name: "Radars", id: "layer-switcher-item_dbf_radars", toggle: LayerCamToggled, unique: "__WME_Draw_Border_Cam" },
            { name: "Adresses BAN", id: "layer-switcher-item_dbf_ban", toggle: LayerBanToggled, unique: "__WME_Draw_Border_Ban", tooltip: "Affiche les adresses BAN (source officielle IGN/Géoplateforme) à partir du zoom 19." },

        ];
        var toggleByName = {};

        try { addScriptsMenu(); } catch (e) { if (debug) console.warn('[DBF] addScriptsMenu ignoré:', e); }

        layerDefs.forEach(function (def) {
            toggleByName[def.name] = def.toggle;
            if (!DBF_addSdkLayerCheckbox(def.name, false)) {
                DBF_addWazeCheckbox(def.name, def.id, false, def.toggle);
            }
            try { checklayer(def.unique); } catch (e) { console.warn('[DBF] checklayer échoué:', def.unique, e); }
            if (def.tooltip) {
                try { addTooltipToCheckbox(def.id, def.tooltip); } catch (e) { }
            }
        });

        try {
            if (wmeSDK && wmeSDK.Events && wmeSDK.Events.on) {
                wmeSDK.Events.on({
                    eventName: "wme-layer-checkbox-toggled",
                    eventHandler: function (detail) {
                        var name = detail && detail.name;
                        var checked = detail && detail.checked;
                        var fn = name && toggleByName[name];
                        if (typeof fn === 'function') fn(!!checked);
                        if (name === "Adresses BAN") {

                            DBF_syncBanPill(!!checked);
                            DBF_refreshHnPill();
                            load_ban();
                        }
                    }
                });
            }
        } catch (e) { console.warn('[DBF] wme-layer-checkbox-toggled non enregistré:', e); }

        function DBF_onSdkEvent(eventName, callback) {
            try {
                if (wmeSDK && wmeSDK.Events && wmeSDK.Events.on) {
                    wmeSDK.Events.on({ eventName: eventName, eventHandler: callback });
                    return true;
                }
            } catch (e) { }
            return false;
        }

        DBF_onSdkEvent("wme-map-move-end", debounced_show_border);
        DBF_onSdkEvent("wme-map-move-end", debounced_load_ban);

        DBF_onSdkEvent("wme-map-zoom-changed", debounced_show_border);
        DBF_onSdkEvent("wme-map-zoom-changed", debounced_load_ban);

        DBF_onSdkEvent("wme-map-data-loaded", debounced_show_border);
        DBF_onSdkEvent("wme-map-data-loaded", debounced_load_ban);

        DBF_onSdkEvent("wme-selection-changed", debounced_load_ban);
        DBF_onSdkEvent("wme-after-edit", DBF_onBanModelChange);
        DBF_onSdkEvent("wme-after-undo", DBF_onBanModelChange);
        DBF_onSdkEvent("wme-no-edits", DBF_onBanModelChange);

        function DBF_onHouseNumberSdkEvent(kind, payload) {
            try {
                var hn = payload && (payload.houseNumber || payload.object || payload.data || payload);
                if (Array.isArray(hn)) hn = hn[0];
                var number = hn && (hn.number != null ? hn.number
                    : (hn.attributes && hn.attributes.number));
                var segId = hn && (hn.segmentId != null ? hn.segmentId
                    : (hn.attributes && (hn.attributes.segID != null ? hn.attributes.segID : hn.attributes.segmentId)));
                if (kind === 'deleted') DBF_forgetLocalHn(number, segId);
                else DBF_rememberLocalHn(number, segId);
            } catch (eHn) {  }
            DBF_onBanModelChange();
        }
        DBF_onSdkEvent("wme-house-number-added", function (p) { DBF_onHouseNumberSdkEvent('added', p); });
        DBF_onSdkEvent("wme-house-number-deleted", function (p) { DBF_onHouseNumberSdkEvent('deleted', p); });
        DBF_onSdkEvent("wme-house-number-updated", function (p) { DBF_onHouseNumberSdkEvent('updated', p); });
        DBF_onSdkEvent("wme-house-number-moved", function (p) { DBF_onHouseNumberSdkEvent('moved', p); });

        const banCheckboxEl = DBF_getBanLayerCheckboxEl();
        if (banCheckboxEl) {
            banCheckboxEl.addEventListener('click', function () {
                var _banCb = DBF_getBanLayerCheckboxEl();
                var banOn = !!(_banCb && _banCb.checked);

                DBF_syncHnWithBan(banOn);
                DBF_syncBanPill(Ban_Layer?.visibility === true || banOn);
                DBF_refreshHnPill();
                load_ban();
            });
        }
        insertScriptHTML();
        try { load_radar(); } catch (e) { console.warn('[DBF] load_radar ignoré:', e); }
        console.log('[DBF] Initialisation terminée');
    }
    const DBF_DEFAULT_STYLES = {
        city: {
            strokeColor: "#ce00ce",
            strokeWidth: 2,
            fontSize: 12,
            fontColor: "#000000",
            showLabel: false,
            fontBold: false,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 4
        },
        dep: {
            strokeColor: "#b20000",
            strokeWidth: 5,
            fontSize: 24,
            fontColor: "#b20000",
            fontBold: true,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 4
        },
        ban: {
            verifiedStroke: "#00dd00",
            unverifiedStroke: "#ff8000",
            textMissing: "#ff0000",
            textExisting: "#0000ff",
            strokeWidth: 10,
            fontSize: 12,
            fontBold: false,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 4
        },
        equip: {
            strokeColor: "#2d792d",
            strokeWidth: 10,
            fontSize: 12,
            fontColor: "#33ff33",
            fontBold: false,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 3
        },
        etabl: {
            strokeColor: "#690069",
            strokeWidth: 10,
            fontSize: 12,
            fontColor: "#ff77ff",
            fontBold: false,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 3
        },
        radar: {
            strokeColor: "#ff0000",
            strokeWidth: 10,
            fontSize: 12,
            fontColor: "#ffff00",
            fontBold: false,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 3
        },
        pr: {
            strokeColor: "#3380ff",
            strokeWidth: 10,
            fontSize: 12,
            fontColor: "#33ffee",
            fontBold: false,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 3
        },
        rs: { scale: 1.0 },
        bump: {
            fillColor: "#ff00ff",
            strokeColor: "#ff00ff",
            fillOpacity: 0.35,
            strokeWidth: 2,
            pointRadius: 6,
            fontColor: "#000000",
            fontSize: 10,
            fontBold: false,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 3
        },
        signals: {
            fillColor: "#00ccff",
            strokeColor: "#00ccff",
            fillOpacity: 0.35,
            strokeWidth: 2,
            pointRadius: 6,
            fontColor: "#000000",
            fontSize: 10,
            fontBold: false,
            labelOutlineColor: "#ffffff",
            labelOutlineWidth: 3
        }
    };

    var _dbfCachedStyles = null;
    function DBF_getStyles() {
        if (_dbfCachedStyles) return _dbfCachedStyles;
        let stored = {};
        try {
            stored = JSON.parse(localStorage.DBFstyles || '{}');
        } catch (e) {
            stored = {};
        }

        const base = JSON.parse(JSON.stringify(DBF_DEFAULT_STYLES));
        Object.keys(stored).forEach(layerKey => {
            if (typeof stored[layerKey] === 'object' && stored[layerKey] !== null) {

                if (!base[layerKey]) base[layerKey] = {};
                Object.assign(base[layerKey], stored[layerKey]);
            } else {

                base[layerKey] = stored[layerKey];
            }
        });
        _dbfCachedStyles = base;
        return base;
    }

    function DBF_saveStyles(styles) {
        localStorage.DBFstyles = JSON.stringify(styles);
        _dbfCachedStyles = null;
    }

    function insertScriptHTML() {

        const DBF_STYLE_ID = "WME-DBF-Styles";
        if (document.getElementById(DBF_STYLE_ID)) return;
        var Scss = document.createElement('style');
        Scss.id = DBF_STYLE_ID;
        Scss.type = 'text/css';
        Scss.textContent = `

    /* =============================================
       DBF DESIGN SYSTEM — Premium Modern Theme
       ============================================= */

    /* --- Design Tokens --- */
    :root {
        --dbf-bg: #ffffff;
        --dbf-bg-subtle: #f8fafc;
        --dbf-bg-hover: #f1f5f9;
        --dbf-bg-active: #eef2ff;
        --dbf-border: #e2e8f0;
        --dbf-border-hover: #c7d2fe;
        --dbf-text: #1e293b;
        --dbf-text-secondary: #64748b;
        --dbf-text-muted: #94a3b8;
        --dbf-accent: #4f46e5;
        --dbf-accent-light: #e0e7ff;
        --dbf-accent-text: #3730a3;
        --dbf-success: #059669;
        --dbf-success-bg: #ecfdf5;
        --dbf-success-border: #6ee7b7;
        --dbf-warn: #c2410c;
        --dbf-warn-bg: #fff7ed;
        --dbf-warn-border: #fdba74;
        --dbf-danger: #dc2626;
        --dbf-danger-bg: #fef2f2;
        --dbf-radius: 12px;
        --dbf-radius-sm: 8px;
        --dbf-shadow: 0 1px 3px rgba(15,23,42,.06), 0 1px 2px rgba(15,23,42,.04);
        --dbf-shadow-hover: 0 4px 12px rgba(15,23,42,.08);
        --dbf-transition: .2s cubic-bezier(.4,0,.2,1);
        --dbf-font: 'Inter', 'Waze Sans', system-ui, -apple-system, sans-serif;
    }

    /* --- Global --- */
    #dbf-panel {
        padding: 8px;
        font-family: var(--dbf-font);
        color: var(--dbf-text);
        line-height: 1.5;
        width: 100%;
        max-width: 100%;
        overflow-x: hidden;
        box-sizing: border-box;
        word-break: break-word;
        padding-top: 1px !important;
    }
    #dbf-panel * {
        box-sizing: border-box;
    }
    .userscripts-api-docs-link-container {
        display: none !important;
    }

    /* --- Header --- */
    #dbf-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: var(--dbf-bg-subtle);
        border-radius: var(--dbf-radius);
        border: 1px solid var(--dbf-border);
        margin-bottom: 14px;
        transition: box-shadow var(--dbf-transition);
    }
    #dbf-header:hover {
        box-shadow: var(--dbf-shadow);
    }
    #dbf-header .dbf-title {
        font-size: 15px;
        font-weight: 800;
        letter-spacing: -0.01em;
    }
    #dbf-header .dbf-version {
        font-size: 11px;
        padding: 3px 10px;
        border-radius: 999px;
        background: var(--dbf-accent-light);
        color: var(--dbf-accent-text);
        font-weight: 600;
    }

    /* --- Cards --- */
    .dbf-card {
        background: var(--dbf-bg);
        border-radius: var(--dbf-radius);
        border: 1px solid var(--dbf-border);
        margin: 10px 0;
        overflow: visible !important;
        box-shadow: var(--dbf-shadow);
        transition: box-shadow var(--dbf-transition), border-color var(--dbf-transition);
    }
    .dbf-card:hover {
        box-shadow: var(--dbf-shadow-hover);
        border-color: var(--dbf-border-hover);
    }
    .dbf-card__head {
        padding: 12px 16px;
        border-bottom: 1px solid var(--dbf-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--dbf-bg-subtle);
        border-radius: var(--dbf-radius) var(--dbf-radius) 0 0;
    }
    .dbf-card__title {
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        letter-spacing: -0.01em;
    }
    .dbf-card__body {
        padding: 14px 16px;
        animation: dbf-fadeIn .25s ease;
    }
    .dbf-sub {
        font-size: 11px;
        color: var(--dbf-text-secondary);
        font-weight: 500;
    }

    /* --- Cards width control --- */
    #dbf-panel .dbf-card,
    #dbf-panel .dbf-card__head,
    #dbf-panel .dbf-card__body {
        width: 100%;
        min-width: 0;
    }

    /* --- Chips / Badges --- */
    .dbf-chip a {
        background: var(--dbf-bg-subtle);
        padding: 6px 12px;
        border-radius: 999px;
        border: 1px solid var(--dbf-border);
        font-size: 12px;
        text-decoration: none;
        color: var(--dbf-text);
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all var(--dbf-transition);
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .dbf-chip a:hover {
        background: var(--dbf-bg-active);
        border-color: var(--dbf-border-hover);
        transform: translateY(-1px);
    }
    .dbf-chip { max-width: 100%; }
    .dbf-chip.loading a {
        background: var(--dbf-bg-active);
        border-color: #93c5fd;
    }
    .dbf-chip.loading a .dbf-spinner {
        width: 9px; height: 9px;
        border-radius: 50%;
        background: var(--dbf-accent);
        animation: dbf-blink .75s infinite alternate;
    }

    /* --- Pills --- */
    .dbf-pill {
        background: var(--dbf-bg-subtle);
        border: 1px solid var(--dbf-border);
        padding: 7px 14px;
        border-radius: var(--dbf-radius-sm);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        text-align: center;
        transition: all var(--dbf-transition);
    }
    .dbf-pill:hover {
        background: var(--dbf-bg-active);
        transform: translateY(-1px);
    }
    .dbf-pill--ok {
        background: var(--dbf-success-bg);
        border-color: var(--dbf-success-border);
        color: var(--dbf-success);
    }
    .dbf-pill--ko {
        background: var(--dbf-warn-bg);
        border-color: var(--dbf-warn-border);
        color: var(--dbf-warn);
    }

    /* --- Legend dots --- */
    .dbf-dot {
        width: 10px; height: 10px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 6px;
        box-shadow: 0 0 0 2px rgba(0,0,0,.08);
    }
    .dbf-dot--red  { background: #ef4444; }
    .dbf-dot--green{ background: #22c55e; }
    .dbf-tag  { color: #ea580c; font-weight: 500; }
    .dbf-tag2 { color: #0284c7; font-weight: 500; }

    /* --- Warning --- */
    #dbf-warning {
        background: var(--dbf-danger-bg);
        border-left: 4px solid var(--dbf-danger);
        padding: 10px 14px;
        color: #7f1d1d;
        border-radius: var(--dbf-radius-sm);
        font-size: 12px;
        line-height: 1.5;
        margin-top: 10px;
    }

    /* --- Sub-tabs --- */
    #dbf-subtabs {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 12px;
        padding: 0 0 2px 0;
        list-style: none;
        border-bottom: 2px solid var(--dbf-border);
    }
    #dbf-subtabs .dbf-nav-item {
        flex: 1;
        min-width: 0;
    }
    #dbf-subtabs .dbf-nav-item a {
        display: block;
        padding: 6px 4px;
        border-radius: var(--dbf-radius-sm) var(--dbf-radius-sm) 0 0;
        background: var(--dbf-bg-subtle);
        font-size: 11px;
        font-weight: 600;
        color: var(--dbf-text-secondary);
        cursor: pointer;
        user-select: none;
        transition: all var(--dbf-transition);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    #dbf-subtabs .dbf-nav-item a:hover {
        background: var(--dbf-bg-active);
        color: var(--dbf-accent-text);
    }
    #dbf-subtabs .dbf-nav-item.active a {
        background: var(--dbf-accent);
        color: #fff;
    }

    /* --- Updates bar --- */
    #dbf-updates-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        max-width: 100%;
    }

    /* --- KPIs / Legend grids --- */
    .dbf-kpis {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
        gap: 8px;
    }
    .dbf-kpis > *, .dbf-legend > * { min-width: 0; }

    /* --- Toggle Switch (remplace wz-checkbox) --- */
    .dbf-options-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px 16px;
    }
    .dbf-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        line-height: 1.4;
        cursor: pointer;
        user-select: none;
    }
    .dbf-toggle input { display: none; }
    .dbf-toggle__track {
        position: relative;
        width: 34px; min-width: 34px; height: 18px;
        background: var(--dbf-border, #cbd5e1);
        border-radius: 9px;
        transition: background 0.25s ease;
    }
    .dbf-toggle__track::after {
        content: '';
        position: absolute;
        top: 2px; left: 2px;
        width: 14px; height: 14px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        transition: transform 0.25s ease;
    }
    .dbf-toggle input:checked + .dbf-toggle__track {
        background: linear-gradient(135deg, #6366f1, #818cf8);
    }
    .dbf-toggle input:checked + .dbf-toggle__track::after {
        transform: translateX(16px);
    }
    .dbf-toggle__label { color: var(--dbf-text, #334155); }
    .dbf-section-divider {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--dbf-text-muted);
        margin: 12px 0 6px;
        padding-bottom: 4px;
        border-bottom: 1px solid var(--dbf-border);
        grid-column: 1 / -1;
    }
    .dbf-section-divider:first-child { margin-top: 0; }

    /* --- Topbar Progress Bar --- */
    .location-info-region { display: flex !important; align-items: center !important; flex-wrap: nowrap !important; }
    #dbf-topbar-progress {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-left: 10px;
        font-size: 11px;
        font-weight: 600;
        color: #e2e8f0;
        vertical-align: middle;
        flex-shrink: 0;
    }
    #dbf-topbar-progress .dbf-topbar-track {
        width: 80px; height: 8px;
        background: rgba(255,255,255,0.2);
        border-radius: 4px;
        overflow: hidden;
        display: block;
    }
    #dbf-topbar-progress .dbf-topbar-fill {
        display: block;
        height: 8px;
        min-height: 8px;
        border-radius: 4px;
        background: linear-gradient(90deg, #38bdf8, #818cf8);
        transition: width 0.5s ease;
    }
    #dbf-topbar-progress .dbf-topbar-pct {
        font-size: 10px;
        color: rgba(255,255,255,0.85);
        white-space: nowrap;
    }

    /* --- Icon Grid (panneaux) --- */
    #rsLegendContainer > div {
        border-radius: var(--dbf-radius-sm);
        border: 1px solid var(--dbf-border);
        background: var(--dbf-bg);
        padding: 10px;
        transition: all var(--dbf-transition);
    }
    #rsLegendContainer > div:hover {
        background: var(--dbf-bg-subtle);
        border-color: var(--dbf-border-hover);
        box-shadow: var(--dbf-shadow);
    }

    /* --- WME integration --- */
    #sidepanel-DrawBordersFR {
        overflow: visible !important;
    }
    .dbf-tab-content .dbf-tab-pane { display: none; }
    .dbf-tab-content .dbf-tab-pane.active { display: block; }
    #sidepanel-DrawBordersFR .tab-content {
        overflow: visible !important;
        height: auto !important;
        max-height: none !important;
    }
    #dbf-panel wz-tabs::part(container) {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
    }
    #dbf-panel wz-tab::part(button) {
        background: transparent !important;
    }
    #dbf-panel wz-tab[selected]::part(button) {
        background: var(--dbf-bg-hover) !important;
        color: var(--dbf-text) !important;
        font-weight: 600 !important;
    }
    #dbf-panel wz-tab:not([selected])::part(button) {
        color: var(--dbf-text-secondary) !important;
    }

    /* --- Animations --- */
    @keyframes dbf-fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes dbf-blink {
        from { opacity: .4; }
        to   { opacity: 1; }
    }

    /* --- Search results --- */
    .dbf-results {
        border: 1px solid var(--dbf-border);
        background: var(--dbf-bg);
        max-height: 200px;
        overflow: auto;
        display: none;
        border-radius: 0 0 var(--dbf-radius-sm) var(--dbf-radius-sm);
        box-shadow: var(--dbf-shadow-hover);
    }
    .dbf-item {
        padding: 8px 12px;
        cursor: pointer;
        font-size: 12px;
        transition: background var(--dbf-transition);
    }
    .dbf-item:hover { background: var(--dbf-bg-active); }

    /* --- Search input --- */
    .dbf-search input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid var(--dbf-border);
        border-radius: var(--dbf-radius-sm);
        font-size: 12px;
        font-family: var(--dbf-font);
        background: var(--dbf-bg-subtle);
        transition: all var(--dbf-transition);
    }
    .dbf-search input:focus {
        outline: none;
        border-color: var(--dbf-accent);
        background: var(--dbf-bg);
        box-shadow: 0 0 0 3px rgba(79,70,229,.1);
    }

    /* =============================================
       CUSTOM / PERSONNALISATION PANEL (R3)
       ============================================= */
    #dbf-custom-panel {
        padding: 4px 0;
    }
    #dbf-custom-panel details {
        border: 1px solid var(--dbf-border);
        border-radius: var(--dbf-radius);
        margin: 8px 0;
        background: var(--dbf-bg);
        box-shadow: var(--dbf-shadow);
        transition: all var(--dbf-transition);
        overflow: hidden;
    }
    #dbf-custom-panel details:hover {
        border-color: var(--dbf-border-hover);
        box-shadow: var(--dbf-shadow-hover);
    }
    #dbf-custom-panel details[open] {
        border-color: var(--dbf-border-hover);
    }
    #dbf-custom-panel summary {
        padding: 12px 16px;
        background: var(--dbf-bg-subtle);
        cursor: pointer;
        user-select: none;
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        list-style: none;
        transition: background var(--dbf-transition);
    }
    #dbf-custom-panel summary::-webkit-details-marker { display: none; }
    #dbf-custom-panel summary::after {
        content: '▸';
        margin-left: auto;
        font-size: 11px;
        color: var(--dbf-text-muted);
        transition: transform var(--dbf-transition);
    }
    #dbf-custom-panel details[open] summary::after {
        transform: rotate(90deg);
    }
    #dbf-custom-panel summary:hover {
        background: var(--dbf-bg-active);
    }
    #dbf-custom-panel .dbf-detail-body {
        padding: 12px 16px;
        animation: dbf-fadeIn .2s ease;
    }

    /* --- Form rows (Grid aligned) --- */
    .dbf-form-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 4px 12px;
        align-items: center;
        padding: 6px 0;
        border-bottom: 1px solid var(--dbf-bg-subtle);
    }
    .dbf-form-row:last-child { border-bottom: none; }
    .dbf-form-row label {
        font-size: 12px;
        color: var(--dbf-text-secondary);
        font-weight: 500;
        white-space: nowrap;
    }
    .dbf-form-row input[type="color"] {
        width: 34px; height: 28px;
        padding: 2px;
        border: 2px solid var(--dbf-border);
        border-radius: var(--dbf-radius-sm);
        cursor: pointer;
        background: none;
        transition: all var(--dbf-transition);
    }
    .dbf-form-row input[type="color"]:hover {
        border-color: var(--dbf-accent);
        transform: scale(1.08);
    }
    .dbf-form-row input[type="number"] {
        width: 58px; height: 28px;
        padding: 2px 6px;
        border: 1px solid var(--dbf-border);
        border-radius: var(--dbf-radius-sm);
        font-size: 12px;
        text-align: center;
        background: var(--dbf-bg-subtle);
        font-family: var(--dbf-font);
        transition: all var(--dbf-transition);
    }
    .dbf-form-row input[type="number"]:focus {
        border-color: var(--dbf-accent);
        outline: none;
        background: var(--dbf-bg);
        box-shadow: 0 0 0 3px rgba(79,70,229,.1);
    }
    .dbf-form-row input[type="checkbox"] {
        width: 16px; height: 16px;
        accent-color: var(--dbf-accent);
        cursor: pointer;
    }
    .dbf-form-row .dbf-unit {
        font-size: 11px;
        color: var(--dbf-text-muted);
        margin-left: 2px;
    }
    .dbf-form-row .dbf-input-group {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    /* --- Action bar (Appliquer / Reset) --- */
    #dbf-custom-actions {
        position: sticky;
        bottom: 0;
        background: var(--dbf-bg);
        padding: 12px 0 4px;
        border-top: 1px solid var(--dbf-border);
        display: flex;
        gap: 8px;
        margin-top: 14px;
    }
    #dbf-custom-actions wz-button {
        transition: transform var(--dbf-transition);
    }
    #dbf-custom-actions wz-button:hover {
        transform: translateY(-1px);
    }
    `;

        document.head.appendChild(Scss);

        if (DBF_sdkTabLabel) {
            DBF_sdkTabLabel.innerHTML = "<img src=\"" + icon_DrB + "\" style=\"height:16px;\" alt=\"DBF\" title=\"Draw Borders France\">";
            DBF_sdkTabLabel.title = "Draw Borders France";
        } else if (DBFhandleClass) {
            var DBFnewtab = document.createElement('li');
            DBFnewtab.innerHTML = "<a href='#sidepanel-DrawBordersFR' data-toggle='tab'><img src=" + icon_DrB + " style='height:16px;'></a>";
            DBFhandleClass.appendChild(DBFnewtab);
        } else {
            console.error('[DBF] Aucun conteneur d’onglet disponible (SDK ni #user-info)');
            return;
        }

        var DBFcontent =
            `<div id="dbf-panel">

        <div class="dbf-card">
        <div class="dbf-card__head">
            <div class="dbf-card__title">📡 Sources officielles</div>
        </div>
        <div class="dbf-card__body">
            <div id="dbf-official-cite" class="dbf-sub" style="margin-bottom:8px;line-height:1.45">Source : Base Adresse Nationale (BAN) + ADMIN EXPRESS COG-CARTO — Géoplateforme (IGN) — Licence Ouverte Etalab 2.0.</div>
            <div id="dbf-warning">⚠️ Affichage accrédité lu à la source officielle (doctrine Waze 1.5 — <a href="https://support.google.com/waze/answer/12075833" target="_blank" rel="noopener">Map Data Attribution</a>). Les données peuvent évoluer ou être mal positionnées&nbsp;: vérifiez toujours sur le terrain.</div>
        </div>
        </div>

        <div class="dbf-card">
        <div class="dbf-card__head">
            <div class="dbf-card__title">📍 Adresses BAN</div>
            <div class="dbf-sub">Contrôles rapides</div>
        </div>
        <div class="dbf-card__body">
            <div class="dbf-kpis" style="margin-bottom:10px">
            <div id="layerBanVisib" class="dbf-pill dbf-pill--ok" title="CTRL+B">Calque BAN</div>
            <div id="layerHNVisib" class="dbf-pill dbf-pill--ok">Calque HN</div>
            <div id="zoomBanValue" class="dbf-pill">Zoom: —</div>
            </div>
            <div class="dbf-sub" style="margin-bottom:4px">Adresses BAN chargées : <b id="banQty">0</b></div>
            <div id="dbf-ban-stats" style="display:none; padding:6px 0 2px 0;">
                <div style="display:flex; gap:12px; flex-wrap:wrap; font-size:11px; margin-bottom:6px;">
                    <span title="Adresses certifiées par la commune">✅ Certifiées : <b id="banStatCertified">0</b> (<span id="banStatCertifiedPct">0</span>%)</span>
                    <span title="Adresses déjà renseignées sur WME">🔵 Sur WME : <b id="banStatOnWME">0</b> (<span id="banStatOnWMEPct">0</span>%)</span>
                    <span title="Adresses manquantes sur WME">🔴 Manquantes : <b id="banStatMissing">0</b></span>
                </div>
                <div style="font-size:10px; color:#888; margin-bottom:3px;">Progression édition WME :</div>
                <div style="background:#eee; border-radius:6px; height:10px; overflow:hidden; position:relative;" title="Pourcentage d'adresses BAN déjà sur WME">
                    <div id="banStatBar" style="height:100%; border-radius:6px; transition: width 0.4s ease, background 0.4s ease; width:0%;"></div>
                </div>
                <div style="text-align:right; font-size:10px; color:#666; margin-top:2px;"><span id="banStatBarPct">0</span>% complété</div>
            </div>
        </div>
        </div>

        <div class="dbf-card">
    <div class="dbf-card__head">
        <div class="dbf-card__title">🔎 Signalement BAN</div>
        <div class="dbf-sub">Vérification commune</div>
    </div>

    <div class="dbf-card__body">

    <div class="dbf-search">
    <input id="dbf-ban-search" placeholder="Adresse BAN France (≥3 car. → géocodeur IGN)…" />
    <div id="dbf-ban-results" class="dbf-results"></div>
    </div>

        <div id="dbfBanSelected" class="dbf-sub" style="margin-top:8px;display:none"></div>
        <div id="dbfSignalementCheckWrap" style="margin-top:8px;display:none">
            <wz-button id="dbfCheckSignalement" size="sm" color="secondary">🔎 Vérifier le signalement</wz-button>
        </div>
        <div id="dbfSignalementResult" style="margin-top:10px"></div>
        </div>
        <div id="dbfSignalementActions" style="margin-top:10px;display:none">
    <wz-button id="dbfCopyMail" size="sm" color="secondary">
        📋 Copier le modèle de mail
    </wz-button>
    </div>

    </div>
    </div>

        <div class="dbf-card">
        <div class="dbf-card__head">
            <div class="dbf-card__title">🗺️ Limites, PR, Radars, Équipements</div>
        </div>
        <div class="dbf-card__body">
            <div id="zoomMiscValue" class="dbf-pill">Zoom: —</div>
            <div class="dbf-legend" style="margin-top:12px">
            <div><span class="dbf-dot dbf-dot--red"></span>Non certifié</div>
            <div><span class="dbf-dot dbf-dot--green"></span>Certifié</div>
            <div class="dbf-tag">Non présent sur WME</div>
            <div class="dbf-tag2">Présent sur WME</div>
            </div>
        </div>
        </div>

        <div class="dbf-card">
        <div class="dbf-card__head"><div class="dbf-card__title">⚙️ Options</div></div>
        <div class="dbf-card__body">
            <div class="dbf-options-grid">
            <div class="dbf-section-divider">👁️ Affichage</div>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF0" id="optionDBF0"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Afficher uniquement les n° manquants sur WME</span></label>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF1" id="optionDBF1"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Afficher uniquement les données certifiées</span></label>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF2" id="optionDBF2"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Afficher les anciens noms de communes</span></label>
            <label class="dbf-toggle" title="date_der_maj du fichier BAL officiel (absent du WFS)"><input type="checkbox" name="optionDBF3" id="optionDBF3"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Afficher la date de mise à jour (BAL)</span></label>
            <div class="dbf-section-divider">🔍 Filtrage</div>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF6" id="optionDBF6"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Masquer le nom de la commune</span></label>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF8" id="optionDBF8"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Masquer les noms de rue (n° uniquement)</span></label>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF9" id="optionDBF9"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Masquer les lieux-dits dans les noms de rue</span></label>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF7" id="optionDBF7"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Afficher uniquement les lieux-dits</span></label>
            <div class="dbf-section-divider">🛠️ Avancé</div>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF4" id="optionDBF4"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Effacer les données au déplacement de la carte</span></label>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF5" id="optionDBF5"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Filtrer les adresses pour la rue sélectionnée</span></label>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF10" id="optionDBF10"><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Ne pas activer les numéros de rue WME avec la BAN</span></label>
            <label class="dbf-toggle"><input type="checkbox" name="optionDBF11" id="optionDBF11" checked><span class="dbf-toggle__track"></span><span class="dbf-toggle__label">Désactiver les n° de rue quand la BAN est désactivée</span></label>
            <div class="dbf-section-divider">📊 Topbar</div>
            </div>
        </div>
        </div>

        <div class="dbf-card">
        <div class="dbf-card__head"><div class="dbf-card__title">📌 Rue sélectionnée</div></div>
        <div class="dbf-card__body">
            <wz-body2 class="alert-settings-period-label" id="selectedRoad"></wz-body2>
            <div class="region-switcher" style="margin-top:10px;">
            <wz-select id="DBFselectRoad" name="selectRue" label="Rues disponibles" value="">
                <wz-option value="">---</wz-option>
                <input name="selectRue" style="display:none">
            </wz-select>
            </div>
        </div>
        </div>
        <div id="dbf-footer" style="margin-top:25px; padding-top:15px; border-top:1px solid #e5e7eb;">
    <div id="dbf-header" style="margin-bottom:0;">
        <div class="dbf-title">WME Draw Borders France</div>
        <div class="dbf-version">v${GM_info.script.version}</div>
        <div class="dbf-right">
        <a href="https://greasyfork.org/fr/scripts/8138-wme-draw-borders-france" target="_blank">Documentation</a>
        </div>
    </div>
    <div id="loadBanData" style="display:none"></div>
    <div id="loadMiscData" style="display:none"></div>
    </div>`;

        var CustomContent =
            `<div id="dbf-custom-panel">

    <details>
        <summary>🏘️ Villes</summary>
        <div class="dbf-detail-body">
        <div class="dbf-form-row"><label>Couleur du trait</label><input id="dbfCityStroke" type="color" value="#ce00ce"></div>
        <div class="dbf-form-row"><label>Épaisseur</label><input id="dbfCityStrokeWidth" type="number" min="1" max="20" value="2"></div>
        <div class="dbf-form-row"><label>Couleur du texte</label><input id="dbfCityFontColor" type="color" value="#000000"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfCityFontSize" type="number" min="8" max="40" value="12"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Afficher le nom</label><input id="dbfCityShowLabel" type="checkbox" checked></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfCityFontBold" type="checkbox"></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfCityOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfCityOutlineWidth" type="number" min="0" max="12" value="4"></div>
        </div>
    </details>

    <details>
        <summary>🗺️ Départements</summary>
        <div class="dbf-detail-body">
        <div class="dbf-form-row"><label>Couleur du trait</label><input id="dbfDepStroke" type="color" value="#b20000"></div>
        <div class="dbf-form-row"><label>Épaisseur</label><input id="dbfDepStrokeWidth" type="number" min="1" max="20" value="5"></div>
        <div class="dbf-form-row"><label>Couleur du texte</label><input id="dbfDepFontColor" type="color" value="#b20000"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfDepFontSize" type="number" min="8" max="40" value="24"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfDepFontBold" type="checkbox" checked></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfDepOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfDepOutlineWidth" type="number" min="0" max="12" value="4"></div>
        </div>
    </details>

    <details>
        <summary>📍 Adresses BAN</summary>
        <div class="dbf-detail-body">
        <div class="dbf-form-row"><label>Trait vérifié</label><input id="dbfBanVerifiedStroke" type="color" value="#00dd00"></div>
        <div class="dbf-form-row"><label>Trait non vérifié</label><input id="dbfBanUnverifiedStroke" type="color" value="#ff8000"></div>
        <div class="dbf-form-row"><label>Texte manquant</label><input id="dbfBanTextMissing" type="color" value="#ff0000"></div>
        <div class="dbf-form-row"><label>Texte existant</label><input id="dbfBanTextExisting" type="color" value="#0000ff"></div>
        <div class="dbf-form-row"><label>Épaisseur du point</label><input id="dbfBanStrokeWidth" type="number" min="1" max="25" value="10"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfBanFontSize" type="number" min="8" max="30" value="12"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfBanFontBold" type="checkbox"></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfBanOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfBanOutlineWidth" type="number" min="0" max="12" value="4"></div>
        </div>
    </details>

    <details>
        <summary>🏗️ Équipements</summary>
        <div class="dbf-detail-body">
        <div class="dbf-form-row"><label>Couleur (point/trait)</label><input id="dbfEquipStroke" type="color" value="#2d792d"></div>
        <div class="dbf-form-row"><label>Épaisseur</label><input id="dbfEquipStrokeWidth" type="number" min="1" max="25" value="10"></div>
        <div class="dbf-form-row"><label>Couleur texte</label><input id="dbfEquipFontColor" type="color" value="#33ff33"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfEquipFontSize" type="number" min="8" max="30" value="12"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfEquipFontBold" type="checkbox"></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfEquipOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfEquipOutlineWidth" type="number" min="0" max="12" value="3"></div>
        </div>
    </details>

    <details>
        <summary>🏢 Établissements</summary>
        <div class="dbf-detail-body">
        <div class="dbf-form-row"><label>Couleur (point/trait)</label><input id="dbfEtablStroke" type="color" value="#690069"></div>
        <div class="dbf-form-row"><label>Épaisseur</label><input id="dbfEtablStrokeWidth" type="number" min="1" max="25" value="10"></div>
        <div class="dbf-form-row"><label>Couleur texte</label><input id="dbfEtablFontColor" type="color" value="#ff77ff"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfEtablFontSize" type="number" min="8" max="30" value="12"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfEtablFontBold" type="checkbox"></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfEtablOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfEtablOutlineWidth" type="number" min="0" max="12" value="3"></div>
        </div>
    </details>

    <details>
        <summary>📸 Radars</summary>
        <div class="dbf-detail-body">
        <div class="dbf-form-row"><label>Couleur (point/trait)</label><input id="dbfRadarStroke" type="color" value="#ff0000"></div>
        <div class="dbf-form-row"><label>Épaisseur du point</label><input id="dbfRadarStrokeWidth" type="number" min="1" max="25" value="10"></div>
        <div class="dbf-form-row"><label>Couleur texte</label><input id="dbfRadarFontColor" type="color" value="#ffff00"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfRadarFontSize" type="number" min="8" max="30" value="12"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfRadarFontBold" type="checkbox"></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfRadarOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfRadarOutlineWidth" type="number" min="0" max="12" value="3"></div>
        </div>
    </details>

    <details>
        <summary>🛣️ Points routiers</summary>
        <div class="dbf-detail-body">
        <div class="dbf-form-row"><label>Couleur (point/trait)</label><input id="dbfPrStroke" type="color" value="#3380ff"></div>
        <div class="dbf-form-row"><label>Épaisseur du point</label><input id="dbfPrStrokeWidth" type="number" min="1" max="25" value="10"></div>
        <div class="dbf-form-row"><label>Couleur texte</label><input id="dbfPrFontColor" type="color" value="#33ffee"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfPrFontSize" type="number" min="8" max="30" value="12"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfPrFontBold" type="checkbox"></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfPrOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfPrOutlineWidth" type="number" min="0" max="12" value="3"></div>
        </div>
    </details>

    <details>
        <summary>🪧 Panneaux routiers</summary>
        <div class="dbf-detail-body">
        <div class="dbf-form-row"><label>Échelle panneaux</label><div class="dbf-input-group"><input id="dbfRsScale" type="number" min="50" max="200" value="100"><span class="dbf-unit">%</span></div></div>
        </div>
    </details>

    <details>
        <summary>⏬ Ralentisseurs OSM</summary>
        <div class="dbf-detail-body">
        <p style="margin:0 0 8px; font-size:11px; color:#6b7280;">Données © contributeurs OpenStreetMap, licence ODbL.</p>
        <div class="dbf-form-row"><label>Couleur remplissage</label><input id="dbfBumpFillColor" type="color" value="#ff00ff"></div>
        <div class="dbf-form-row"><label>Couleur trait</label><input id="dbfBumpStrokeColor" type="color" value="#ff00ff"></div>
        <div class="dbf-form-row"><label>Opacité remplissage</label><div class="dbf-input-group"><input id="dbfBumpFillOpacity" type="number" min="0" max="100" value="35"><span class="dbf-unit">%</span></div></div>
        <div class="dbf-form-row"><label>Épaisseur trait</label><input id="dbfBumpStrokeWidth" type="number" min="1" max="20" value="2"></div>
        <div class="dbf-form-row"><label>Taille point</label><input id="dbfBumpPointRadius" type="number" min="2" max="30" value="6"></div>
        <div class="dbf-form-row"><label>Couleur texte</label><input id="dbfBumpFontColor" type="color" value="#000000"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfBumpFontSize" type="number" min="6" max="30" value="10"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfBumpFontBold" type="checkbox"></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfBumpOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfBumpOutlineWidth" type="number" min="0" max="12" value="3"></div>
        </div>
    </details>

    <details>
        <summary>🚦 Feux tricolores (OSM)</summary>
        <div class="dbf-detail-body">
        <p style="margin:0 0 8px; font-size:11px; color:#6b7280;">Données © contributeurs OpenStreetMap, licence ODbL.</p>
        <div class="dbf-form-row"><label>Couleur remplissage</label><input id="dbfSigFillColor" type="color" value="#00ccff"></div>
        <div class="dbf-form-row"><label>Couleur trait</label><input id="dbfSigStrokeColor" type="color" value="#00ccff"></div>
        <div class="dbf-form-row"><label>Opacité remplissage</label><div class="dbf-input-group"><input id="dbfSigFillOpacity" type="number" min="0" max="100" value="35"><span class="dbf-unit">%</span></div></div>
        <div class="dbf-form-row"><label>Épaisseur trait</label><input id="dbfSigStrokeWidth" type="number" min="1" max="20" value="2"></div>
        <div class="dbf-form-row"><label>Taille point</label><input id="dbfSigPointRadius" type="number" min="2" max="30" value="6"></div>
        <div class="dbf-form-row"><label>Couleur texte</label><input id="dbfSigFontColor" type="color" value="#000000"></div>
        <div class="dbf-form-row"><label>Taille du texte</label><div class="dbf-input-group"><input id="dbfSigFontSize" type="number" min="6" max="30" value="10"><span class="dbf-unit">px</span></div></div>
        <div class="dbf-form-row"><label>Texte en gras</label><input id="dbfSigFontBold" type="checkbox"></div>
        <div class="dbf-form-row"><label>Contour du texte</label><input id="dbfSigOutlineColor" type="color" value="#ffffff"></div>
        <div class="dbf-form-row"><label>Épaisseur contour</label><input id="dbfSigOutlineWidth" type="number" min="0" max="12" value="3"></div>
        </div>
    </details>

    <details>
        <summary>📖 Dictionnaire d'abréviations</summary>
        <div class="dbf-detail-body">
        <p style="margin-bottom: 8px; font-size: 11px; color: #4b5563;">Définissez vos propres règles de correction pour la BAN :</p>
        <div id="dbfBanDictContainer"></div>
        <button type="button" id="dbfAddDictRow" style="margin-top: 8px; padding: 4px 10px; cursor: pointer; border-radius: 6px; border: 1px solid var(--dbf-border, #d1d5db); background: var(--dbf-card-bg, #f9fafb); font-size: 12px; transition: background 0.2s;">+ Ajouter une règle</button>
        </div>
    </details>

    <div id="dbf-custom-actions">
        <wz-button id="dbfCustomApply" color="secondary">✅ Appliquer</wz-button>
        <wz-button id="dbfCustomReset" color="secondary">🔄 Réinitialiser</wz-button>
    </div>
    <hr style="margin:12px 0; border:none; border-top:1px solid var(--dbf-border, #e5e7eb);">
    <div style="padding:0 0 8px;">
        <div style="font-size:11px; font-weight:600; margin-bottom:8px; color:#555;">💾 Sauvegarde des paramètres</div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <wz-button id="dbfExportSettings" color="secondary" size="sm">📤 Exporter</wz-button>
            <wz-button id="dbfImportSettings" color="secondary" size="sm">📥 Importer</wz-button>
        </div>
        <input type="file" id="dbfImportFile" accept=".json" style="display:none">
        <div id="dbfImportStatus" style="font-size:10px; color:#888; margin-top:4px;"></div>
    </div>
</div>
`;

        var DBFaddon = document.createElement('section');
        DBFaddon.id = "sidepanel-DrawBordersFR";
        DBFaddon.className = 'tab-pane';

        DBFaddon.innerHTML =
            "<ul class='dbf-nav' id='dbf-subtabs' style='margin:0 0 10px 0;'>"
            + "<li class='dbf-nav-item active'><a data-pane='dbf-pane-settings'>Paramètres</a></li>"
            + "<li class='dbf-nav-item'><a data-pane='dbf-pane-custom'>Personnalisation</a></li>"
            + "</ul>"
            + "<div class='dbf-tab-content'>"
            + "<div class='dbf-tab-pane active' id='dbf-pane-settings'>" + DBFcontent + "</div>"
            + "<div class='dbf-tab-pane' id='dbf-pane-custom'>" + CustomContent + "</div>"
            + "</div>";

        if (DBF_sdkTabPane) {
            DBFaddon.className = '';
            DBF_sdkTabPane.appendChild(DBFaddon);
        } else if (DBFhandleClass2) {
            DBFhandleClass2.appendChild(DBFaddon);
        } else {
            console.error('[DBF] Aucun panneau sidebar disponible');
            return;
        }

        (function () {
            var tabs = DBFaddon.querySelector('#dbf-subtabs');
            if (!tabs) return;
            tabs.addEventListener('click', function (ev) {
                var a = ev.target.closest('a[data-pane]');
                if (!a) return;

                ev.preventDefault();
                ev.stopPropagation();

                var paneId = a.getAttribute('data-pane');

                if (paneId !== 'dbf-pane-signs') {
                    var cont = DBFaddon.querySelector('#rsLegendContainer');
                    var status = DBFaddon.querySelector('#rsLegendStatus');
                    if (cont) cont.innerHTML = '';
                    if (status) status.textContent = '';
                }

                var customActions = DBFaddon.querySelector('#dbf-custom-actions');
                if (paneId !== 'dbf-pane-custom') {
                    if (customActions) customActions.style.display = 'none';
                }

                Array.from(tabs.querySelectorAll('.dbf-nav-item')).forEach(function (li) {
                    li.classList.remove('active');
                });

                DBFaddon.querySelectorAll('.dbf-tab-content .dbf-tab-pane').forEach(function (p) {
                    p.classList.remove('active');
                    p.style.display = 'none';
                });

                a.parentElement.classList.add('active');
                var pane = DBFaddon.querySelector('#' + paneId);
                if (pane) {
                    pane.classList.add('active');
                    pane.style.display = 'block';
                }

                if (paneId === 'dbf-pane-custom' && customActions) {
                    customActions.style.display = 'flex';
                }

                if (paneId === 'dbf-pane-signs') RS_renderLegend();

            }, false);
        })();

        function RS_renderLegend() {
            var cont = document.getElementById("rsLegendContainer");
            var status = document.getElementById("rsLegendStatus");
            if (!cont) return;
            cont.innerHTML = "";
            if (status) status.textContent = "Génération…";

            const items = [
                { code: "EB10", label: "EB10 (entrée agglo – vierge)" },
                { code: "EB20", label: "EB20 (sortie agglo – vierge)" },
                { code: "B14", value: "30", label: "B14-30" },
                { code: "B14", value: "50", label: "B14-50" },
                { code: "B14", value: "70", label: "B14-70" },
                { code: "B31", label: "B31 (fin d’interdictions)" },
                { code: "B33", value: "70", label: "B33-70 (fin de limitation)" },
                { code: "C107", label: "C107 (route réglementée – début)" },
                { code: "C108", label: "C108 (route réglementée – fin)" },
                { code: "C207", label: "C207 (début autoroute)" },
                { code: "C208", label: "C208 (fin autoroute)" },

                { code: "M1", value: "350", label: "M1 – 350 m" },
                { code: "M1", value: "1200", label: "M1 – 1,2 km" },
                { code: "M2", value: "500", label: "M2 – étendue 500 m" },
                { code: "M2", value: "2000", label: "M2 – étendue 2 km" },

                { code: "M3A", value: "droite", label: "M3a – flèche à droite" },
                { code: "M3A", value: "gauche", label: "M3a – flèche à gauche" },
                { code: "M3D", label: "M3d – flèche vers le bas (voie)" },

                { code: "M4A", label: "M4a – voiture (≤ 3,5 t)" },
                { code: "M4B", label: "M4b – bus / TC" },
                { code: "M4C", label: "M4c – moto" },
                { code: "M4F", value: "3.5", label: "M4f – masse 3,5 t" },
                { code: "M4F", value: "≤ 7.5", label: "M4f – masse ≤ 7,5 t" },
                { code: "M4G", label: "M4g – marchandises (camion)" },
                { code: "M4K", label: "M4k – matières inflammables" },
                { code: "M4L", label: "M4l – matières polluantes" },
                { code: "M4M", label: "M4m – matières dangereuses (ADR)" },
                { code: "M4X", label: "M4x – remorque > 250 kg" },

                { code: "M9Z", label: "M9z – RAPPEL" }
            ];

            items.forEach(function (it) {
                var card = document.createElement("div");
                card.style.cssText = "border:1px solid #e2e4e7;border-radius:8px;padding:8px;background:#fff;";

                var title = document.createElement("div");
                title.style.cssText = "font-weight:600;font-size:12px;margin-bottom:6px;word-break:break-word;";
                title.textContent = it.label || (it.code + (it.value ? (" " + it.value) : ""));
                card.appendChild(title);

                var prev = document.createElement("div");
                prev.style.cssText = "display:flex;align-items:center;justify-content:center;min-height:84px;margin-bottom:6px;";
                var icon = null;
                try {

                    if (/^M/i.test(it.code)) icon = RS_buildPanonceau(it.code, it.value, 120);
                    else icon = RS_buildIcon(it.code, it.value);
                } catch (e) { console.error("[RS] RS_buildIcon error", it, e); }
                if (icon && icon.uri) {
                    var img = document.createElement("img");
                    img.src = icon.uri;
                    img.width = Math.min(icon.w || 80, 100);
                    img.height = Math.min(icon.h || 80, 100);
                    img.alt = title.textContent;
                    prev.appendChild(img);
                } else {
                    prev.innerHTML = "<span style='color:#c00;font-size:12px;'>Erreur rendu</span>";
                }
                card.appendChild(prev);

                var meta = document.createElement("div");
                meta.style.cssText = "font-family:monospace;font-size:11px;color:#444;margin-bottom:2px;";
                meta.textContent = "code: " + it.code + (it.value ? (" | value: " + it.value) : "");
                card.appendChild(meta);

                var spacer = document.createElement("div");
                spacer.style.cssText = "height:0;";
                card.appendChild(spacer);

                cont.appendChild(card);
            });

            if (status) status.textContent = "OK (" + items.length + " panneaux)";
        }

        document.addEventListener('click', function (e) {
            if (e.target && e.target.id === 'rsLegendRefresh') RS_renderLegend();
        }, true);
        document.addEventListener('click', function (e) {
            if (e.target && e.target.id === 'dbfCheckSignalement') {
                DBF_runSelectedSignalementCheck();
                return;
            }
            if (e.target && e.target.id === 'dbfCopyMail') {
                if (!window.DBF_currentSignalementData) return;

                const text = DBF_buildMailTemplate(window.DBF_currentSignalementData);

                navigator.clipboard.writeText(text).then(() => {
                    e.target.textContent = "✅ Modèle copié";
                    setTimeout(() => {
                        e.target.textContent = "📋 Copier le modèle de mail";
                    }, 2000);
                }).catch(() => {
                    alert("Impossible de copier le texte automatiquement.");
                });
            }
        }, true);
        document.addEventListener('change', function (e) {
            if (e.target && e.target.id === 'dbfSignalementSelect') {
                const val = e.target.value;
                const box = document.getElementById('dbfSignalementResult');
                if (!val || !box) return;

                DBF_clearEl(box);
                var loadChip = DBF_el("div", { className: "dbf-chip loading" });
                var loadA = DBF_el("a");
                loadA.appendChild(document.createTextNode("Vérification… "));
                loadA.appendChild(DBF_el("span", { className: "dbf-spinner" }));
                loadChip.appendChild(loadA);
                box.appendChild(loadChip);

                checkSignalement(val, result => {
                    renderResult(box, result);
                });
            }
        }, true);

        setTimeout(function () {
            var pane = DBFaddon.querySelector('#dbf-pane-signs');
            if (pane && pane.classList.contains('active')) RS_renderLegend();
        }, 300);

        RS_initFilters();
        DBF_initBanSearch();

        var settings = JSON.parse(localStorage.DBFsettings);
        var _el;
        _el = getId('optionDBF0'); if (_el) _el.checked = (settings.optionDBF0 === true);
        _el = getId('optionDBF1'); if (_el) _el.checked = (settings.optionDBF1 === true);
        _el = getId('optionDBF2'); if (_el) _el.checked = (settings.optionDBF2 === true);
        _el = getId('optionDBF3'); if (_el) _el.checked = (settings.optionDBF3 === true);
        _el = getId('optionDBF4'); if (_el) _el.checked = (settings.optionDBF4 === true);
        _el = getId('optionDBF5'); if (_el) _el.checked = (settings.optionDBF5 === true);
        _el = getId('optionDBF6'); if (_el) _el.checked = (settings.optionDBF6 === true);
        _el = getId('optionDBF7'); if (_el) _el.checked = (settings.optionDBF7 === true);
        _el = getId('optionDBF8'); if (_el) _el.checked = (settings.optionDBF8 === true);
        _el = getId('optionDBF9'); if (_el) _el.checked = (settings.optionDBF9 === true);
        _el = getId('optionDBF10'); if (_el) _el.checked = (settings.optionDBF10 === true);
        _el = getId('optionDBF11'); if (_el) _el.checked = (settings.optionDBF11 !== false);

        ['optionDBF0', 'optionDBF1', 'optionDBF2', 'optionDBF3', 'optionDBF4',
            'optionDBF5', 'optionDBF6', 'optionDBF7', 'optionDBF8', 'optionDBF9', 'optionDBF10', 'optionDBF11'].forEach(function (id) {
                var el = getId(id);
                if (!el) return;
                el.addEventListener('click', function () {
                    var a = JSON.parse(localStorage.DBFsettings);
                    a[id] = !!getId(id)?.checked;

                    if (id === 'optionDBF7' && a.optionDBF7) { a.optionDBF8 = false; var tmp8 = getId('optionDBF8'); if (tmp8) tmp8.checked = false; }
                    if (id === 'optionDBF8' && a.optionDBF8) { a.optionDBF7 = false; var tmp7 = getId('optionDBF7'); if (tmp7) tmp7.checked = false; }
                    localStorage.setItem('DBFsettings', JSON.stringify(a));
                    load_ban();
                });
            });
        var _elBanVisib = getId('layerBanVisib');
        if (_elBanVisib) _elBanVisib.addEventListener('click', function () {
            DBF_toggleBanFromPanel();
        });
        var _elHNVisib = getId('layerHNVisib');
        if (_elHNVisib) _elHNVisib.addEventListener('click', function () {
            DBF_toggleHnFromPanel();
        });
        var _elZoomBan = getId('zoomBanValue');
        if (_elZoomBan) {
            _elZoomBan.title = "Cliquez pour zoomer au niveau 19";
            _elZoomBan.addEventListener('click', function () {
                DBF_setZoomLevel(19);
                var _zbv = getId('zoomBanValue');
                if (_zbv) {
                    _zbv.innerHTML = "Zoom: 19";
                    _zbv.style.backgroundColor = '#bbffcc';
                }
                load_ban();
            });
        }
        var _elZoomMisc = getId('zoomMiscValue');
        if (_elZoomMisc) {
            _elZoomMisc.title = "Cliquez pour zoomer au niveau 13";
            _elZoomMisc.style.cursor = "pointer";
            _elZoomMisc.addEventListener('click', function () {
                DBF_setZoomLevel(13);
                var _zmv = getId('zoomMiscValue');
                if (_zmv) {
                    _zmv.innerHTML = "Zoom: 13";
                    _zmv.style.backgroundColor = '#bbffcc';
                }
                show_border();
            });
        }
        var _elSelectRoad = getId('DBFselectRoad');
        if (_elSelectRoad) _elSelectRoad.addEventListener('change', function () { load_ban(); });

        var _zoomNow = DBF_getZoom();
        var zoomBanInit = getId('zoomBanValue');
        if (zoomBanInit && _zoomNow != null) {
            zoomBanInit.innerHTML = "Zoom: " + _zoomNow;
            zoomBanInit.style.backgroundColor = _zoomNow < 19 ? '#fac3c3' : '#bbffcc';
        }

        var zoomMiscInit = getId('zoomMiscValue');
        if (zoomMiscInit && _zoomNow != null) {
            zoomMiscInit.innerHTML = "Zoom: " + _zoomNow;
            zoomMiscInit.style.backgroundColor = _zoomNow < 13 ? '#fac3c3' : '#bbffcc';
        }

        DBF_syncBanPill(Ban_Layer?.visibility === true);
        DBF_refreshHnPill();
        try { DBF_renderOfficialSourcesCite(); } catch (e) { if (debug) console.warn('[DBF] sources cite:', e); }
        DBF_initCustomPanel();

    }
    function setCheck(id, value) {
        var el = document.getElementById(id);
        if (el) el.checked = !!value;
    }

    function DBF_initCustomPanel() {
        var styles = DBF_getStyles();

        var FIELDS = [

            { id: "dbfCityStroke", sec: "city", key: "strokeColor", type: "val" },
            { id: "dbfCityStrokeWidth", sec: "city", key: "strokeWidth", type: "val" },
            { id: "dbfCityFontColor", sec: "city", key: "fontColor", type: "val" },
            { id: "dbfCityFontSize", sec: "city", key: "fontSize", type: "val" },
            { id: "dbfCityShowLabel", sec: "city", key: "showLabel", type: "chk" },
            { id: "dbfCityFontBold", sec: "city", key: "fontBold", type: "chk" },
            { id: "dbfCityOutlineColor", sec: "city", key: "labelOutlineColor", type: "val" },
            { id: "dbfCityOutlineWidth", sec: "city", key: "labelOutlineWidth", type: "val" },

            { id: "dbfDepStroke", sec: "dep", key: "strokeColor", type: "val" },
            { id: "dbfDepStrokeWidth", sec: "dep", key: "strokeWidth", type: "val" },
            { id: "dbfDepFontColor", sec: "dep", key: "fontColor", type: "val" },
            { id: "dbfDepFontSize", sec: "dep", key: "fontSize", type: "val" },
            { id: "dbfDepFontBold", sec: "dep", key: "fontBold", type: "chk" },
            { id: "dbfDepOutlineColor", sec: "dep", key: "labelOutlineColor", type: "val" },
            { id: "dbfDepOutlineWidth", sec: "dep", key: "labelOutlineWidth", type: "val" },

            { id: "dbfBanVerifiedStroke", sec: "ban", key: "verifiedStroke", type: "val" },
            { id: "dbfBanUnverifiedStroke", sec: "ban", key: "unverifiedStroke", type: "val" },
            { id: "dbfBanTextMissing", sec: "ban", key: "textMissing", type: "val" },
            { id: "dbfBanTextExisting", sec: "ban", key: "textExisting", type: "val" },
            { id: "dbfBanStrokeWidth", sec: "ban", key: "strokeWidth", type: "val" },
            { id: "dbfBanFontSize", sec: "ban", key: "fontSize", type: "val" },
            { id: "dbfBanFontBold", sec: "ban", key: "fontBold", type: "chk" },
            { id: "dbfBanOutlineColor", sec: "ban", key: "labelOutlineColor", type: "val" },
            { id: "dbfBanOutlineWidth", sec: "ban", key: "labelOutlineWidth", type: "val" },

            { id: "dbfEquipStroke", sec: "equip", key: "strokeColor", type: "val" },
            { id: "dbfEquipStrokeWidth", sec: "equip", key: "strokeWidth", type: "val" },
            { id: "dbfEquipFontColor", sec: "equip", key: "fontColor", type: "val" },
            { id: "dbfEquipFontSize", sec: "equip", key: "fontSize", type: "val" },
            { id: "dbfEquipFontBold", sec: "equip", key: "fontBold", type: "chk" },
            { id: "dbfEquipOutlineColor", sec: "equip", key: "labelOutlineColor", type: "val" },
            { id: "dbfEquipOutlineWidth", sec: "equip", key: "labelOutlineWidth", type: "val" },

            { id: "dbfEtablStroke", sec: "etabl", key: "strokeColor", type: "val" },
            { id: "dbfEtablStrokeWidth", sec: "etabl", key: "strokeWidth", type: "val" },
            { id: "dbfEtablFontColor", sec: "etabl", key: "fontColor", type: "val" },
            { id: "dbfEtablFontSize", sec: "etabl", key: "fontSize", type: "val" },
            { id: "dbfEtablFontBold", sec: "etabl", key: "fontBold", type: "chk" },
            { id: "dbfEtablOutlineColor", sec: "etabl", key: "labelOutlineColor", type: "val" },
            { id: "dbfEtablOutlineWidth", sec: "etabl", key: "labelOutlineWidth", type: "val" },

            { id: "dbfRadarStroke", sec: "radar", key: "strokeColor", type: "val" },
            { id: "dbfRadarStrokeWidth", sec: "radar", key: "strokeWidth", type: "val" },
            { id: "dbfRadarFontColor", sec: "radar", key: "fontColor", type: "val" },
            { id: "dbfRadarFontSize", sec: "radar", key: "fontSize", type: "val" },
            { id: "dbfRadarFontBold", sec: "radar", key: "fontBold", type: "chk" },
            { id: "dbfRadarOutlineColor", sec: "radar", key: "labelOutlineColor", type: "val" },
            { id: "dbfRadarOutlineWidth", sec: "radar", key: "labelOutlineWidth", type: "val" },

            { id: "dbfPrStroke", sec: "pr", key: "strokeColor", type: "val" },
            { id: "dbfPrStrokeWidth", sec: "pr", key: "strokeWidth", type: "val" },
            { id: "dbfPrFontColor", sec: "pr", key: "fontColor", type: "val" },
            { id: "dbfPrFontSize", sec: "pr", key: "fontSize", type: "val" },
            { id: "dbfPrFontBold", sec: "pr", key: "fontBold", type: "chk" },
            { id: "dbfPrOutlineColor", sec: "pr", key: "labelOutlineColor", type: "val" },
            { id: "dbfPrOutlineWidth", sec: "pr", key: "labelOutlineWidth", type: "val" },

            { id: "dbfRsScale", sec: "rs", key: "scale", type: "pct", fallback: 1 },

            { id: "dbfBumpFillColor", sec: "bump", key: "fillColor", type: "val" },
            { id: "dbfBumpStrokeColor", sec: "bump", key: "strokeColor", type: "val" },
            { id: "dbfBumpFillOpacity", sec: "bump", key: "fillOpacity", type: "pct", fallback: 0.35 },
            { id: "dbfBumpStrokeWidth", sec: "bump", key: "strokeWidth", type: "val" },
            { id: "dbfBumpPointRadius", sec: "bump", key: "pointRadius", type: "val" },
            { id: "dbfBumpFontColor", sec: "bump", key: "fontColor", type: "val" },
            { id: "dbfBumpFontSize", sec: "bump", key: "fontSize", type: "val" },
            { id: "dbfBumpFontBold", sec: "bump", key: "fontBold", type: "chk" },
            { id: "dbfBumpOutlineColor", sec: "bump", key: "labelOutlineColor", type: "val" },
            { id: "dbfBumpOutlineWidth", sec: "bump", key: "labelOutlineWidth", type: "val" },

            { id: "dbfSigFillColor", sec: "signals", key: "fillColor", type: "val" },
            { id: "dbfSigStrokeColor", sec: "signals", key: "strokeColor", type: "val" },
            { id: "dbfSigFillOpacity", sec: "signals", key: "fillOpacity", type: "pct", fallback: 0.35 },
            { id: "dbfSigStrokeWidth", sec: "signals", key: "strokeWidth", type: "val" },
            { id: "dbfSigPointRadius", sec: "signals", key: "pointRadius", type: "val" },
            { id: "dbfSigFontColor", sec: "signals", key: "fontColor", type: "val" },
            { id: "dbfSigFontSize", sec: "signals", key: "fontSize", type: "val" },
            { id: "dbfSigFontBold", sec: "signals", key: "fontBold", type: "chk" },
            { id: "dbfSigOutlineColor", sec: "signals", key: "labelOutlineColor", type: "val" },
            { id: "dbfSigOutlineWidth", sec: "signals", key: "labelOutlineWidth", type: "val" }
        ];

        FIELDS.forEach(function (f) {
            var val = styles[f.sec] ? styles[f.sec][f.key] : undefined;
            if (f.type === "chk") {
                setCheck(f.id, val);
            } else if (f.type === "pct") {
                setVal(f.id, Math.round((val || f.fallback) * 100));
            } else {
                setVal(f.id, val);
            }
        });

        function setVal(id, value) {
            var el = document.getElementById(id);
            if (el && value !== undefined && value !== null) el.value = value;
        }
        function num(id, def) {
            var el = document.getElementById(id);
            var v = el ? Number(el.value) : NaN;
            return isNaN(v) ? def : v;
        }
        function col(id, def) {
            var el = document.getElementById(id);
            return el && el.value ? el.value : def;
        }
        function chk(id, def) {
            var el = document.getElementById(id);
            return el ? !!el.checked : !!def;
        }

        var dictContainer = document.getElementById('dbfBanDictContainer');
        var btnAddRow = document.getElementById('dbfAddDictRow');

        function addDictRow(abbr, full) {
            abbr = abbr || ''; full = full || '';
            if (!dictContainer) return;
            var row = document.createElement('div');
            row.style.cssText = 'display:flex;gap:4px;margin-bottom:4px;align-items:center;';
            row.innerHTML =
                '<input type="text" class="dbf-dict-abbr" value="' + abbr.replace(/"/g, '&quot;') + '" placeholder="Ex: bd" style="width:55px;padding:2px 4px;border:1px solid var(--dbf-border,#d1d5db);border-radius:4px;font-size:12px;">'
                + '<span style="color:#6b7280;">=</span>'
                + '<input type="text" class="dbf-dict-full" value="' + full.replace(/"/g, '&quot;') + '" placeholder="Ex: boulevard" style="flex:1;padding:2px 4px;border:1px solid var(--dbf-border,#d1d5db);border-radius:4px;font-size:12px;">'
                + '<button type="button" class="dbf-dict-del" style="cursor:pointer;color:#ef4444;background:none;border:none;font-weight:bold;font-size:14px;padding:0 4px;" title="Supprimer cette r\u00e8gle">&times;</button>';
            row.querySelector('.dbf-dict-del').addEventListener('click', function () { row.remove(); });
            dictContainer.appendChild(row);
        }

        var defaultDict = "mal =mar\u00e9chal \nav =avenue \nbd =boulevard \nr =rue \npl =place \nch =chemin \nimp =impasse \nrte =route \n st = saint-\n saint = saint-\n sainte = sainte-\nza =zone artisanale \nzi =zone industrielle ";
        var dictString = (typeof styles.banDict === 'string') ? styles.banDict : defaultDict;
        dictString.split('\n').forEach(function (line) {
            if (line.includes('=')) {
                var parts = line.split('=');
                addDictRow(parts[0], parts.slice(1).join('='));
            }
        });

        if (btnAddRow) {
            btnAddRow.addEventListener('click', function () { addDictRow(); });
        }

        var btnApply = document.getElementById("dbfCustomApply");
        if (btnApply) {
            btnApply.addEventListener("click", function () {
                var s = DBF_getStyles();
                FIELDS.forEach(function (f) {
                    if (!s[f.sec]) s[f.sec] = {};
                    if (f.type === "chk") {
                        s[f.sec][f.key] = chk(f.id, s[f.sec][f.key]);
                    } else if (f.type === "pct") {
                        s[f.sec][f.key] = num(f.id, (f.fallback || 1) * 100) / 100.0;
                    } else if (f.key === "strokeWidth" || f.key === "fontSize" || f.key === "labelOutlineWidth" || f.key === "pointRadius") {
                        s[f.sec][f.key] = num(f.id, s[f.sec][f.key]);
                    } else {
                        s[f.sec][f.key] = col(f.id, s[f.sec][f.key]);
                    }
                });

                var newDictLines = [];
                var dictRows = document.querySelectorAll('#dbfBanDictContainer > div');
                if (debug) console.log('[DBF] Apply: trouvé', dictRows.length, 'lignes dans le dictionnaire');
                dictRows.forEach(function (row) {
                    var a = row.querySelector('.dbf-dict-abbr');
                    var f = row.querySelector('.dbf-dict-full');
                    if (a && f && a.value.trim() && f.value.trim()) {
                        newDictLines.push(a.value + '=' + f.value);
                        if (debug) console.log('[DBF] Règle dict:', JSON.stringify(a.value), '→', JSON.stringify(f.value));
                    }
                });
                s.banDict = newDictLines.join('\n');

                DBF_saveStyles(s);
                DBF_applyLiveUpdates();
            });
        }

        var btnReset = document.getElementById("dbfCustomReset");
        if (btnReset) {
            btnReset.addEventListener("click", function () {
                if (confirm("Réinitialiser tous les styles aux valeurs par défaut ?")) {
                    localStorage.removeItem("DBFstyles");
                    location.reload();
                }
            });
        }

        var btnExport = document.getElementById("dbfExportSettings");
        if (btnExport) {
            btnExport.addEventListener("click", function () {
                try {
                    var data = {
                        _dbf_export: true,
                        _version: (typeof SCRIPT_VERSION !== 'undefined') ? SCRIPT_VERSION : 'unknown',
                        _date: new Date().toISOString(),
                        DBFsettings: JSON.parse(localStorage.getItem('DBFsettings') || '{}'),
                        DBFstyles: JSON.parse(localStorage.getItem('DBFstyles') || '{}'),
                        dbf_rs_filters: JSON.parse(localStorage.getItem('dbf_rs_filters') || '{}'),
                        dbf_ban_dict: JSON.parse(localStorage.getItem('dbf_ban_dict') || '{}')
                    };
                    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    var url = URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = 'dbf-settings-' + new Date().toISOString().slice(0, 10) + '.json';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);

                    var status = document.getElementById('dbfImportStatus');
                    if (status) { status.textContent = '✅ Export réussi !'; status.style.color = '#00c853'; }
                } catch (e) {
                    console.error('[DBF] Export error:', e);
                    var status = document.getElementById('dbfImportStatus');
                    if (status) { status.textContent = '❌ Erreur export'; status.style.color = '#f44336'; }
                }
            });
        }

        var btnImport = document.getElementById("dbfImportSettings");
        var fileInput = document.getElementById("dbfImportFile");
        if (btnImport && fileInput) {
            btnImport.addEventListener("click", function () {
                fileInput.click();
            });
            fileInput.addEventListener("change", function (e) {
                var file = e.target.files[0];
                if (!file) return;
                var status = document.getElementById('dbfImportStatus');

                var reader = new FileReader();
                reader.onload = function (ev) {
                    try {
                        var data = JSON.parse(ev.target.result);
                        if (!data._dbf_export) {
                            if (status) { status.textContent = '❌ Fichier invalide (pas un export DBF)'; status.style.color = '#f44336'; }
                            return;
                        }

                        if (data.DBFsettings) localStorage.setItem('DBFsettings', JSON.stringify(data.DBFsettings));
                        if (data.DBFstyles) localStorage.setItem('DBFstyles', JSON.stringify(data.DBFstyles));
                        if (data.dbf_rs_filters) localStorage.setItem('dbf_rs_filters', JSON.stringify(data.dbf_rs_filters));
                        if (data.dbf_ban_dict) localStorage.setItem('dbf_ban_dict', JSON.stringify(data.dbf_ban_dict));

                        if (status) { status.textContent = '✅ Import réussi ! Rechargement…'; status.style.color = '#00c853'; }
                        setTimeout(function () { location.reload(); }, 800);
                    } catch (err) {
                        console.error('[DBF] Import error:', err);
                        if (status) { status.textContent = '❌ Erreur lecture du fichier'; status.style.color = '#f44336'; }
                    }
                };
                reader.readAsText(file);
                fileInput.value = '';
            });
        }
    }

    function DBF_applyLiveUpdates() {
        if (debug) console.log("[DBF] Mise à jour des styles");

        ["__WME_Draw_Border_Cty","__WME_Draw_Border_Dpt","__WME_Draw_Border_Ban","__WME_Draw_Border_Equip","__WME_Draw_Border_Etabl","__WME_Draw_Border_Cam","__WME_Draw_Border_PR","__WME_Draw_Border_RS"].forEach(function (un) {
            var layer = DBF_getLayer(un);
            if (layer && typeof layer.redraw === "function") {
                try { layer.redraw(); } catch (e) { if (debug) console.error("Erreur redraw:", un, e); }
            }
        });

        if (debug) console.log("[DBF] Styles mis à jour immédiatement !");
    }

    function show_border() {

        var zoomMiscEl = getId('zoomMiscValue');
        if (zoomMiscEl) {
            zoomMiscEl.innerHTML = "Zoom: " + DBF_getZoom();
            zoomMiscEl.style.backgroundColor = DBF_getZoom() < 13 ? '#fac3c3' : '#bbffcc';
        }
        if (DBF_getZoom() < 13) return;

        var Cty_Layer = DBF_getLayer("__WME_Draw_Border_Cty");
        var Dpt_Layer = DBF_getLayer("__WME_Draw_Border_Dpt");
        var PR_Layer = DBF_getLayer("__WME_Draw_Border_PR");
        var Cam_Layer = DBF_getLayer("__WME_Draw_Border_Cam");
        var Equip_Layer = DBF_getLayer("__WME_Draw_Border_Equip");
        var Etabl_Layer = DBF_getLayer("__WME_Draw_Border_Etabl");
        var RS_Layer = DBF_getLayer("__WME_Draw_Border_RS");

        var _c = DBF_getCenter() || { lon: 0, lat: 0 };
        let pt = { lon: _c.lon, lat: _c.lat, x: _c.lon, y: _c.lat };
        var clat = pt.lat;
        var clon = pt.lon;
        var zoomLevel = DBF_getZoom();
        if (!clat || !clon || !zoomLevel) {
            console.error("Latitude, longitude ou zoomLevel manquant");
            return;
        }

        if (Cty_Layer && Cty_Layer.visibility === true) {

            var extent = DBF_getMapExtent();
            var minLon = extent.left !== undefined ? extent.left : extent[0];
            var minLat = extent.bottom !== undefined ? extent.bottom : extent[1];
            var maxLon = extent.right !== undefined ? extent.right : extent[2];
            var maxLat = extent.top !== undefined ? extent.top : extent[3];

            var bbox = [
                Number(minLon.toFixed(6)),
                Number(minLat.toFixed(6)),
                Number(maxLon.toFixed(6)),
                Number(maxLat.toFixed(6))
            ];

            var zoomLevel = DBF_getZoom();

            var isZoomChange = (Cty_LastZoom !== null && zoomLevel !== Cty_LastZoom);
            Cty_LastZoom = zoomLevel;

            if (debug) {
                console.log("[COMMUNES DEBUG] Zoom:", zoomLevel, "isZoomChange:", isZoomChange);
                console.log("[COMMUNES DEBUG] BBOX:", bbox);
            }

            if (zoomLevel < 13) {
                if (debug) console.log("[COMMUNES DEBUG] Zoom < 13, pas de requête communes CARTO.");
            } else if (JSON.stringify(Cty_BboxOld) === JSON.stringify(bbox)) {
                if (debug) console.log("WME Draw Borders France: BBOX inchangée, pas de nouvelle requête communes");
            } else {
                Cty_BboxOld = bbox.slice();
                var ctyReq = ++_ctyWfsAbort;

                try {
                    var _lmdc1 = getId('loadMiscData'); if (_lmdc1) _lmdc1.style.backgroundColor = '#bbffcc';
                    if (debug) console.log("[COMMUNES DEBUG] WFS ADMINEXPRESS-COG-CARTO", bbox);

                    DBF_fetchCommunesWfs(bbox).then(function (data) {
                        if (ctyReq !== _ctyWfsAbort) return;
                                var temp_city = "", c = 0;

                                if (!isZoomChange) {
                                    if (debug) console.log("[COMMUNES DEBUG] PAN détecté → cleanupLayer()");
                                    DBF_cleanupLayer(Cty_Layer);
                        } else if (debug) {
                            console.log("[COMMUNES DEBUG] ZOOM détecté → on conserve les communes existantes");
                                }

                                for (var i = 0; i < data.length; i++) {
                            Cty_Borders_DrawBorder(data[i].name, data[i].coord, data[i].code_insee);
                                    c++;
                            if (debug) temp_city = temp_city + data[i].name + ", ";
                                }

                                if (debug) {
                            console.log("WME Draw Borders France: " + c + " communes (COG-CARTO) pour la BBOX", temp_city);
                                }
                                var _lmdc2 = getId('loadMiscData'); if (_lmdc2) _lmdc2.style.backgroundColor = '#ffffff';
                    }).catch(function (error) {
                        if (ctyReq !== _ctyWfsAbort) return;
                        console.error("Erreur WFS communes COG-CARTO :", error);
                            var _lmdc4 = getId('loadMiscData'); if (_lmdc4) _lmdc4.style.backgroundColor = '#fac3c3';
                    });
                } catch (ex) {
                    console.error(`${SCRIPT_NAME} communes WFS bbox:`, ex);
                }
            }
        }

        if (Dpt_Layer && Dpt_Layer.visibility === true && wmeSDK && wmeSDK.DataModel && wmeSDK.DataModel.States) {
            var statesApi = wmeSDK.DataModel.States;
            var statesPromise = (typeof statesApi.getAllWithoutDefault === "function")
                ? DBF_await(statesApi.getAllWithoutDefault())
                : DBF_await(statesApi.getAll());
            var countryPromise = (wmeSDK.DataModel.Countries && typeof wmeSDK.DataModel.Countries.getTopCountry === "function")
                ? DBF_await(wmeSDK.DataModel.Countries.getTopCountry())
                : Promise.resolve(null);

            Promise.all([statesPromise, countryPromise]).then(function (results) {
                var sdkStates = results[0] || [];
                var topCountry = results[1];
                var countryId = topCountry && (topCountry.id != null ? topCountry.id
                    : (topCountry.attributes && topCountry.attributes.id));
                var countryAbbr = topCountry && (topCountry.abbr
                    || (topCountry.attributes && topCountry.attributes.abbr)
                    || topCountry.name || (topCountry.attributes && topCountry.attributes.name));
                if (topCountry && countryId != null && String(countryId) !== "73"
                    && String(countryAbbr || "").toUpperCase() !== "FR"
                    && String(countryAbbr || "").toUpperCase() !== "FRANCE") {
                    if (debug) console.log("[DBF] Hors France, skip départements", countryId, countryAbbr);
                    return;
                }

                var States = [];
                var needApi = [];
                var drawnSdk = 0;
                for (var si = 0; si < sdkStates.length; si++) {
                    var stObj = sdkStates[si];
                    var attrs = stObj.attributes || stObj;
                    var stName = attrs.name || stObj.name;
                    if (!stName) continue;
                    var norm = String(stName).replace(/[èé]/g, "e").replace(/[ô]/g, "o").replace(/'/g, "_").replace(/ /g, "_");
                    var geom = attrs.geometry || stObj.geometry || null;
                    States.push({ name: norm });
                    if (geom && (geom.type === "Polygon" || geom.type === "MultiPolygon")) {
                        Dpt_Borders_DrawGeometry(norm, geom);
                        drawnSdk++;
                    } else {
                        needApi.push({ name: norm });
                    }
                }

                if (!States.length) {
                    if (debug) console.warn("[DBF] Aucun State SDK chargé pour les départements");
                    return;
                }
                if (JSON.stringify(StatesOld) === JSON.stringify(States) && !needApi.length) {
                    if (debug) console.log("WME Draw Borders France: Pas de nouveaux Départements détectés");
                    return;
                }
                if (!needApi.length) {
                    StatesOld = States;
                    if (debug) console.log("WME Draw Borders France: " + drawnSdk + " départements (géométrie SDK)");
                    return;
                }

                            StatesOld = States;
                if (debug) console.log("[DBF] départements : " + drawnSdk + " SDK (repli /dep commenté, " + needApi.length + " manquants)");
                return;

            }).catch(function (e) { console.warn('[DBF] States SDK:', e); });
        }

        if (Cam_Layer && Cam_Layer.visibility === true) {
            var listCam = localStorage.speedCamList;
            if (listCam) {
                var a = JSON.parse(listCam);
                if (debug) { console.log(a); }
                for (var i = 0; i < a.length; i++) { Cam_Borders_DrawBorder(a[i].typeLabel, a[i].lng, a[i].lat); }
            }
        }
    }

    function load_radar() {

        var zoomMiscEl = getId('zoomMiscValue');
        if (zoomMiscEl) {
            zoomMiscEl.innerHTML = "Zoom: " + DBF_getZoom();
            zoomMiscEl.style.backgroundColor = DBF_getZoom() < 13 ? '#fac3c3' : '#bbffcc';
        }
        if (DBF_getZoom() < 13) return;

        var listCam = localStorage.speedCamList;

        var _lmdr = getId('loadMiscData'); if (_lmdr) _lmdr.style.backgroundColor = '#bbffcc';
        try {
            var ret = GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://radars.securite-routiere.gouv.fr/radars/all?_format=json',
                onload: function (response) {
                    if (response.status === 200) {
                        try {
                            if (_.isEqual(JSON.parse(listCam), JSON.parse(response.responseText)) !== true && response.responseText) {
                                if (debug) console.log("WME Draw Borders France: Mise à jour de la liste des radars");
                                localStorage.setItem('speedCamList', response.responseText);
                            }
                            var _lmdr2 = getId('loadMiscData'); if (_lmdr2) _lmdr2.style.backgroundColor = '#ffffff';
                        } catch (e) { console.warn("Erreur parsing Radars", e); }
                    } else {
                        var _lmdr3 = getId('loadMiscData'); if (_lmdr3) _lmdr3.style.backgroundColor = '#fac3c3';
                    }
                },
                onerror: function (error) {
                    console.error("Erreur réseau :", error);
                }
            });
        } catch (ex) { console.error(`${SCRIPT_NAME}:`, ex); }
    }

    var DBF_APOSTROPHE_RE = /[\u0027\u2018\u2019\u00B4\u02BC\u0060\u2032\u02BB\u201B]/g;

    function DBF_normalizeApostrophes(text) {
        return (text || "").replace(DBF_APOSTROPHE_RE, "'");
    }

    function DBF_normalizeBanText(text) {
        return DBF_normalizeApostrophes(text || "")
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/\u0153/g, 'oe')
            .replace(/\u00e6/g, 'ae');
    }

    function DBF_getBanCorrections() {
        var correction = {
            "mal ": "marechal ",
            "av ": "avenue ",
            "bd ": "boulevard ",
            "r ": "rue ",
            "pl ": "place ",
            "ch ": "chemin ",
            "imp ": "impasse ",
            "rte ": "route ",
            " st ": " saint-",
            " saint ": " saint-",
            " sainte ": " sainte-",
            "za ": "zone artisanale ",
            "zi ": "zone industrielle "
        };
        try {
            var userStyles = DBF_getStyles();
            if (typeof userStyles.banDict === 'string') {
                userStyles.banDict.split('\n').forEach(function (line) {
                    if (line.includes('=')) {
                        var parts = line.split('=');
                        var k = parts[0];
                        var v = parts.slice(1).join('=');
                        if (k && v) correction[k] = v;
                    }
                });
            }
        } catch (e) { }
        return correction;
    }

    function DBF_extractCityName(rawCity) {
        var cityName = DBF_normalizeBanText(rawCity).toLowerCase();
        if (cityName.indexOf("(") > 0) { cityName = cityName.substring(cityName.indexOf("(") + 1).replace(")", ""); }
        return cityName.trim();
    }

    function DBF_normalizeStreetPart(text, correction) {
        var out = DBF_normalizeApostrophes(text || "").toLowerCase();
        Object.keys(correction).forEach(function (key) {
            var esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            var re = new RegExp('(^|\\s)' + esc, 'g');
            out = out.replace(re, function (m, p) { return p + correction[key]; });
        });
        out = DBF_normalizeBanText(out);
        return out;
    }

    function DBF_buildBanKeyFromParts(numero, rep, nomVoie, nomCommune, opts) {
        opts = opts || {};
        var correction = opts.correction || DBF_getBanCorrections();
        var stripLieuxDits = !!opts.stripLieuxDits;
        var numPart = (numero != null ? String(numero) : "") + (rep != null ? rep : "");
        var nomRueBan = numPart + (nomVoie ? " " + nomVoie : "");
        var nomRueCorr = DBF_normalizeStreetPart(nomRueBan, correction);

        var nomCommuneBAN = (opts.ancienneCommune && String(opts.ancienneCommune).trim())
            || nomCommune
            || "";
        Object.keys(correction).forEach(function (key) {
            var esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            var re = new RegExp('(^|\\s)' + esc, 'g');
            nomCommuneBAN = nomCommuneBAN.replace(re, function (m, p) { return p + correction[key]; });
        });
        if (stripLieuxDits && nomRueCorr.search(" - ") !== -1) {
            nomRueCorr = nomRueCorr.substring(0, nomRueCorr.search(" - "));
        }
        return nomRueCorr + " " + DBF_extractCityName(nomCommuneBAN);
    }

    function DBF_banKeysForAddress(adresse, opts) {
        var keys = [];
        var k1 = DBF_buildBanKeyFromParts(adresse.numero, adresse.rep, adresse.nom_voie, adresse.nom_commune, opts);
        keys.push(k1);
        if (adresse.nom_ancienne_commune) {
            var kAnc = DBF_buildBanKeyFromParts(adresse.numero, adresse.rep, adresse.nom_voie, adresse.nom_commune, Object.assign({}, opts, {
                ancienneCommune: adresse.nom_ancienne_commune
            }));
            if (keys.indexOf(kAnc) === -1) keys.push(kAnc);
        }
        return keys;
    }

    function DBF_hnListHasAny(HNdone, keys) {
        for (var i = 0; i < keys.length; i++) {
            if (HNdone.indexOf(keys[i]) !== -1) return true;
        }
        return false;
    }

    function DBF_pushHNdoneEntry(HNdone, number, streetName, cityRaw, opts) {
        if (number == null || number === "" || !streetName) return;
        var key = DBF_buildBanKeyFromParts(number, "", streetName, cityRaw, opts);
        if (HNdone.indexOf(key) === -1) HNdone.push(key);
    }

    async function DBF_streetCityNames(streetId) {
        if (streetId == null || !wmeSDK) return null;
        try {
            var street = await DBF_await(wmeSDK.DataModel.Streets.getById({ streetId: streetId }));
            if (!street) return null;
            var name = street.name || (street.attributes && street.attributes.name);
            var cityId = street.cityId != null ? street.cityId : (street.attributes && street.attributes.cityID);
            if (!name || cityId == null) return null;
            var city = await DBF_await(wmeSDK.DataModel.Cities.getById({ cityId: cityId }));
            if (!city) return null;
            var cityName = city.name || (city.attributes && city.attributes.name);
            if (!cityName) return null;
            return { streetName: name, cityName: cityName };
        } catch (e) { return null; }
    }

    async function DBF_pushSegmentStreetEntries(HNdone, number, segment, opts) {
        if (!segment) return;
        var seen = {};
        async function pushStreet(streetId) {
            if (streetId == null || seen[streetId]) return;
            seen[streetId] = true;
            var sc = await DBF_streetCityNames(streetId);
            if (!sc) return;
            DBF_pushHNdoneEntry(HNdone, number, sc.streetName, sc.cityName, opts);
        }
        function pushNamed(streetName, cityName, streetId) {
            if (!streetName || !cityName) return;
            if (streetId != null) {
                if (seen[streetId]) return;
                seen[streetId] = true;
            }
            DBF_pushHNdoneEntry(HNdone, number, streetName, cityName, opts);
        }
        var primary = segment.primaryStreetId != null ? segment.primaryStreetId
            : (segment.attributes && segment.attributes.primaryStreetID);
        await pushStreet(primary);

        var attrs = segment.attributes || {};
        var streetIDs = segment.alternateStreetIds
            || segment.streetIds
            || attrs.alternateStreetIds
            || attrs.streetIDs
            || [];
        if (!Array.isArray(streetIDs)) streetIDs = [];
        for (var j = 0; j < streetIDs.length; j++) await pushStreet(streetIDs[j]);

        try {
            var segId = segment.id != null ? segment.id : (segment.getID && segment.getID());
            var getAddr = wmeSDK.DataModel.Segments && wmeSDK.DataModel.Segments.getAddress;
            if (segId == null || typeof getAddr !== 'function') return;
            var addr = await DBF_await(getAddr.call(wmeSDK.DataModel.Segments, { segmentId: segId }));
            if (!addr || addr.isEmpty) return;
            var cityFromAddr = addr.city && (addr.city.name || (addr.city.attributes && addr.city.attributes.name));
            if (addr.street) {
                var sidP = addr.street.id != null ? addr.street.id
                    : (addr.street.attributes && addr.street.attributes.id);
                var snP = addr.street.name || (addr.street.attributes && addr.street.attributes.name);
                if (snP && cityFromAddr) pushNamed(snP, cityFromAddr, sidP);
                else await pushStreet(sidP);
            }
            var alts = addr.altStreets || addr.alternateStreets || [];
            for (var a = 0; a < alts.length; a++) {
                var alt = alts[a];
                if (!alt) continue;

                var stObj = alt.street || alt;
                var cityAlt = (alt.city && (alt.city.name || (alt.city.attributes && alt.city.attributes.name)))
                    || cityFromAddr;
                var snAlt = stObj.name || (stObj.attributes && stObj.attributes.name);
                var sidAlt = stObj.id != null ? stObj.id : (stObj.attributes && stObj.attributes.id);
                if (snAlt && cityAlt) pushNamed(snAlt, cityAlt, sidAlt);
                else await pushStreet(sidAlt);
            }
        } catch (eAddrSeg) {
            if (debug) console.warn('[DBF] Segments.getAddress (alt):', eAddrSeg);
        }
    }

    function DBF_rememberLocalHn(number, segmentId) {
        if (number == null || number === "" || segmentId == null) return;
        _dbfLocalHn[DBF_hnSegKey(segmentId, number)] = { number: number, segmentId: segmentId };
    }

    function DBF_forgetLocalHn(number, segmentId) {
        if (number == null || segmentId == null) return;
        delete _dbfLocalHn[DBF_hnSegKey(segmentId, number)];
    }

    function DBF_readLegacySegmentHouseNumbers() {
        var out = [];
        var seen = Object.create(null);
        for (var k in _dbfLocalHn) {
            if (!_dbfLocalHn[k]) continue;
            seen[k] = true;
            out.push(_dbfLocalHn[k]);
        }
        try {
            var W = DBF_pageWindow && typeof DBF_pageWindow.W !== 'undefined' ? DBF_pageWindow.W : null;
            var store = W && W.model && W.model.segmentHouseNumbers;
            var objs = store && store.objects;
            if (!objs) return out;
            for (var id in objs) {
                if (!Object.prototype.hasOwnProperty.call(objs, id)) continue;
                var hn = objs[id];
                var attrs = hn && (hn.attributes || hn);
                if (!attrs) continue;
                var number = attrs.number;
                var segId = attrs.segID != null ? attrs.segID
                    : (attrs.segmentId != null ? attrs.segmentId : attrs.segId);
                if (number == null || number === "" || segId == null) continue;
                var sk = DBF_hnSegKey(segId, number);
                if (seen[sk]) continue;
                seen[sk] = true;
                out.push({ number: number, segmentId: segId });
            }
        } catch (e) {  }
        return out;
    }

    function DBF_hnSegKey(segmentId, number) {
        return String(segmentId) + "|" + String(number);
    }

    async function DBF_buildHNdone() {
        var HNdone = [];
        var hnOpts = {
            correction: DBF_getBanCorrections(),
            stripLieuxDits: getId('optionDBF9')?.checked === true
        };
        if (!wmeSDK || !wmeSDK.DataModel) return HNdone;

        try {
            var segments = await DBF_await(wmeSDK.DataModel.Segments.getAll()) || [];
            var segById = Object.create(null);
            var segIds = [];
            segments.forEach(function (s) {
                var id = s.id != null ? s.id : (s.getID && s.getID());
                if (id == null) return;
                segById[id] = s;
                segIds.push(id);
            });

            var legacyHns = DBF_readLegacySegmentHouseNumbers();

            var seenHn = Object.create(null);
            async function ingestHn(number, segId) {
                if (number == null || number === "" || segId == null) return;
                var key = DBF_hnSegKey(segId, number);
                if (seenHn[key]) return;
                var segment = segById[segId];
                if (!segment) return;
                seenHn[key] = true;
                await DBF_pushSegmentStreetEntries(HNdone, number, segment, hnOpts);
            }

            var chunkSize = 80;
            for (var i = 0; i < segIds.length; i += chunkSize) {
                var chunk = segIds.slice(i, i + chunkSize);
                var hns = [];
                try {
                    hns = await DBF_await(wmeSDK.DataModel.HouseNumbers.fetchHouseNumbers({ segmentIds: chunk })) || [];
                } catch (e) { if (debug) console.warn('[DBF] fetchHouseNumbers:', e); }
                for (var h = 0; h < hns.length; h++) {
                    var hn = hns[h];
                    var segId = hn.segmentId != null ? hn.segmentId : (hn.attributes && hn.attributes.segID);
                    var number = hn.number != null ? hn.number : (hn.attributes && hn.attributes.number);
                    await ingestHn(number, segId);
                }
            }

            for (var L = 0; L < legacyHns.length; L++) {
                await ingestHn(legacyHns[L].number, legacyHns[L].segmentId);
            }

            var venues = await DBF_await(wmeSDK.DataModel.Venues.getAll()) || [];
            for (var v = 0; v < venues.length; v++) {
                var venue = venues[v];
                if (!venue) continue;
                var isRes = venue.isResidential === true
                    || venue.residential === true
                    || !!(venue.attributes && venue.attributes.residential);
                if (!isRes) continue;

                var houseNumber = null;
                var streetName = null;
                var cityName = null;
                var streetId = null;

                try {
                    var address = await DBF_await(wmeSDK.DataModel.Venues.getAddress({ venueId: String(venue.id) }));
                    if (address && !address.isEmpty) {
                        houseNumber = address.houseNumber;
                        if (address.street) {
                            streetName = address.street.name || (address.street.attributes && address.street.attributes.name);
                            streetId = address.street.id != null ? address.street.id
                                : (address.street.attributes && address.street.attributes.id);
                        }
                        if (address.city) {
                            cityName = address.city.name || (address.city.attributes && address.city.attributes.name);
                        }
                    }
                } catch (eAddr) {
                    if (debug) console.warn('[DBF] Venues.getAddress:', eAddr);
                }

                if (houseNumber == null || houseNumber === "") {
                    houseNumber = venue.houseNumber != null ? venue.houseNumber
                        : (venue.attributes && venue.attributes.houseNumber);
                }
                if (streetId == null) {
                    streetId = venue.streetId != null ? venue.streetId
                        : (venue.attributes && venue.attributes.streetID);
                }
                if (!streetName || !cityName) {
                var sc = await DBF_streetCityNames(streetId);
                    if (sc) {
                        if (!streetName) streetName = sc.streetName;
                        if (!cityName) cityName = sc.cityName;
                    }
                }
                if (!streetName || !cityName || houseNumber == null || houseNumber === "") continue;
                DBF_pushHNdoneEntry(HNdone, houseNumber, streetName, cityName, hnOpts);
            }
        } catch (e) {
            console.warn('[DBF] DBF_buildHNdone SDK error:', e);
        }
        return HNdone;
    }

    async function DBF_paintBanLayer(addresses, lieuxDits) {
        var Ban_Layer = DBF_getLayer("__WME_Draw_Border_Ban");
        if (!Ban_Layer || Ban_Layer.visibility !== true) return false;

        var correction = DBF_getBanCorrections();
        var stripLieuxDits = getId('optionDBF9')?.checked === true;
        var HNdone = await DBF_buildHNdone();
        var selectedRoadEl = getId('selectedRoad');
        var selectRoadEl = getId('DBFselectRoad');
        var a = addresses || [];
        var b = lieuxDits || [];

        Ban_Layer.destroyFeatures();
        DBF_clearFeatureIndex(Ban_Layer);

        var _banStatCertified = 0, _banStatOnWME = 0;

        var _banDrawQueue = [];
        for (var i = 0; i < a.length; i++) {
            var adresse = a[i];
            if (adresse.numero == '99999') continue;
            var nomRueBan = adresse.numero + (adresse.rep != null ? adresse.rep : "") + " " + adresse.nom_voie;
            var NumeroRue = adresse.numero + (adresse.rep != null ? adresse.rep : "");
            var nomCommuneBAN = adresse.nom_commune;

            var keyOpts = { correction: correction, stripLieuxDits: stripLieuxDits };
            var banKeys = DBF_banKeysForAddress(adresse, keyOpts);
            var banKey = banKeys[0];
            var state, Ville = nomCommuneBAN;
            state = DBF_hnListHasAny(HNdone, banKeys) ? 'yes' : 'no';
            if (adresse.certification_commune === '1' || adresse.certification_commune == 1) _banStatCertified++;
            if (state === 'yes') _banStatOnWME++;

            if (getId('optionDBF0')?.checked == true && state == 'yes') { continue; }
            if (getId('optionDBF1')?.checked == true && adresse.certification_commune !== '1' && adresse.certification_commune != 1) { continue; }
            if (getId('optionDBF2')?.checked == true && adresse.nom_ancienne_commune != null) { Ville = "\n" + adresse.nom_ancienne_commune + ' (' + nomCommuneBAN + ')'; }
            if (getId('optionDBF3')?.checked == true && adresse.date_ajout_modif != null) { Ville = Ville + '\n' + deltaDate(adresse.date_ajout_modif); }
            if (getId('optionDBF5')?.checked == true && ((selectedRoadEl && selectedRoadEl.innerHTML != "") || (selectRoadEl && selectRoadEl.value != ""))) {
                if (selectedRoadEl && selectedRoadEl.innerHTML != "") { var selectedRoad = selectedRoadEl.innerHTML; }
                else if (selectRoadEl && selectRoadEl.value != "") { var selectedRoad = selectRoadEl.value; }
                var adres = DBF_normalizeBanText(adresse.nom_voie).toLowerCase();
                var selectRoad = DBF_normalizeBanText(selectedRoad).toLowerCase();
                if (selectRoad != adres) { continue; }
            }
            if (getId('optionDBF7')?.checked === true) continue;
            var labelTxt;
            if (getId('optionDBF8')?.checked == true) labelTxt = NumeroRue;
            else if (getId('optionDBF6')?.checked == true) labelTxt = nomRueBan;
            else labelTxt = nomRueBan + "\n" + Ville;
            _banDrawQueue.push({
                label: labelTxt,
                lon: adresse.lon,
                lat: adresse.lat,
                state: state,
                verif: adresse.certification_commune,
                banKey: banKey
            });
        }
        _banDrawQueue.sort(function (p, q) {

            if (p.state === q.state) return 0;
            return p.state === 'yes' ? -1 : 1;
        });
        for (var qi = 0; qi < _banDrawQueue.length; qi++) {
            var q = _banDrawQueue[qi];
            Ban_Borders_DrawBorder(q.label, q.lon, q.lat, q.state, q.verif, q.banKey);
        }

        DBF_updateBanStats(a.length, _banStatCertified, _banStatOnWME);

        for (var j = 0; j < b.length; j++) {
            var lieux = b[j];
            var lieudit = lieux.nom_lieu_dit;
            Object.keys(correction).forEach(function (key) {
                lieudit = lieudit.replaceAll(key, correction[key]);
            });
            var lieudit2 = DBF_normalizeBanText(lieudit).toLowerCase();
            var VilleLd = getId('optionDBF6')?.checked == true ? "" : "\n" + (lieux.nom_commune || "");
            var stateLd;
            ((HNdone.indexOf(lieudit2) === -1) ? stateLd = 'no' : stateLd = 'yes');
            if (getId('optionDBF0')?.checked == true && stateLd == 'yes') { continue; }
            if (getId('optionDBF8')?.checked !== true) { Ban_Borders_DrawBorder(lieudit + VilleLd, lieux.lon, lieux.lat, stateLd, "", lieudit2); }
        }

        return true;
    }

    function DBF_redrawBanLayerFromCache() {
        if (!_banDrawCache || !_banDrawCache.addresses) return false;
        DBF_paintBanLayer(_banDrawCache.addresses, _banDrawCache.lieux_dits || []).catch(function (e) {
            console.warn('[DBF] redraw cache:', e);
        });
        return true;
    }

    async function DBF_refreshBanStates() {
        var Ban_Layer = DBF_getLayer("__WME_Draw_Border_Ban");
        if (!Ban_Layer || !Ban_Layer.visibility || !Ban_Layer.features || Ban_Layer.features.length === 0) return;

        var hideOnWme = getId('optionDBF0')?.checked === true;
        if (hideOnWme) {
            if (DBF_redrawBanLayerFromCache()) return;
            debounced_load_ban();
            return;
        }

        var HNdone = await DBF_buildHNdone();
        var s = DBF_getStyles().ban;
        var colorExisting = s.textExisting || "#0000ff";
        var colorMissing = s.textMissing || "#ff0000";
        var changed = false;

        for (var i = 0; i < Ban_Layer.features.length; i++) {
            var feat = Ban_Layer.features[i];
            if (!feat.attributes || !feat.attributes.banKey) continue;

            var prevState = feat.attributes.banState;
            var newState = (HNdone.indexOf(feat.attributes.banKey) !== -1) ? 'yes' : 'no';
            if (newState === prevState) continue;

            feat.attributes.banState = newState;
            var newColor = (newState === 'yes') ? colorExisting : colorMissing;
            var newZ = (newState === 'yes') ? 5 : 20;
            feat.attributes.fontColor = newColor;
            feat.attributes.graphicZIndex = newZ;
            if (feat.properties) {
                feat.properties.banState = newState;
                feat.properties.fontColor = newColor;
                feat.properties.graphicZIndex = newZ;
            }
            if (!feat.style) feat.style = {};
            feat.style.fontColor = newColor;
            feat.style.graphicZIndex = newZ;
            changed = true;
            if (debug) console.log("[DBF] BAN refresh:", feat.attributes.banKey, feat.attributes.banState === 'yes' ? '→ ✅ trouvé' : '→ ❌ manquant');
        }

        if (changed) {
            Ban_Layer.redraw();
            if (debug) console.log("[DBF] BAN states rafraîchis (redraw ciblé)");

            var total = 0, onWME = 0, certified = 0;
            for (var j = 0; j < Ban_Layer.features.length; j++) {
                var f = Ban_Layer.features[j];
                if (!f.attributes || !f.attributes.banKey) continue;
                total++;
                if (f.attributes.banState === 'yes') onWME++;
                if (f.attributes.banCertified) certified++;
            }
            DBF_updateBanStats(total, certified, onWME);
        }
    }

    function DBF_updateBanStats(total, certified, onWME) {
        var statsEl = getId('dbf-ban-stats');
        if (!statsEl) return;
        if (total === 0) { statsEl.style.display = 'none'; return; }
        statsEl.style.display = 'block';

        var certPct = Math.round((certified / total) * 100);
        var wmePct = Math.round((onWME / total) * 100);
        var missing = total - onWME;

        var el = function (id) { return document.getElementById(id); };
        if (el('banStatCertified')) el('banStatCertified').textContent = certified;
        if (el('banStatCertifiedPct')) el('banStatCertifiedPct').textContent = certPct;
        if (el('banStatOnWME')) el('banStatOnWME').textContent = onWME;
        if (el('banStatOnWMEPct')) el('banStatOnWMEPct').textContent = wmePct;
        if (el('banStatMissing')) el('banStatMissing').textContent = missing;

        var bar = el('banStatBar');
        if (bar) {
            bar.style.width = wmePct + '%';
            if (wmePct >= 80) bar.style.background = 'linear-gradient(90deg, #00c853, #69f0ae)';
            else if (wmePct >= 50) bar.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
            else bar.style.background = 'linear-gradient(90deg, #f44336, #ff7043)';
        }
        if (el('banStatBarPct')) el('banStatBarPct').textContent = wmePct;
    }

    function load_ban() {

        var Ban_Layer = DBF_getLayer("__WME_Draw_Border_Ban");
        DBF_syncBanPill(Ban_Layer && Ban_Layer.visibility === true);
        DBF_refreshHnPill();

        var zoomBanEl = getId('zoomBanValue');
        if (zoomBanEl) {
            zoomBanEl.innerHTML = "Zoom: " + DBF_getZoom();
            zoomBanEl.style.backgroundColor = DBF_getZoom() < 19 ? '#fac3c3' : '#bbffcc';
        }
        if (DBF_getZoom() < 19) return;

        if (Ban_Layer && Ban_Layer.visibility === true) {
            if (getId('optionDBF4')?.checked) { DBF_cleanupLayer(Ban_Layer); checklayer("__WME_Draw_Border_Ban"); }
            else { Ban_Layer.redraw(); }

            var _lbd1 = getId('loadBanData'); if (_lbd1) _lbd1.style.backgroundColor = '#bbffcc';

            var selectRoadEl = getId('DBFselectRoad');
            var selectedRoadEl = getId('selectedRoad');
            var tmpRoad = selectRoadEl ? selectRoadEl.value : "";
            (async function DBF_fillStreetSelect() {
                try {
                    var streetList = [];
                    var sdkStreets = await DBF_await(wmeSDK.DataModel.Streets.getAll()) || [];
                    for (var si = 0; si < sdkStreets.length; si++) {
                        var streetName = sdkStreets[si].name
                            || (sdkStreets[si].attributes && sdkStreets[si].attributes.name) || "";
                        if (streetName && streetList.indexOf(streetName) === -1) streetList.push(streetName);
                    }
                    streetList.sort();
                    if (selectRoadEl) {
                        while (selectRoadEl.firstChild) selectRoadEl.removeChild(selectRoadEl.firstChild);
                        var opt0 = document.createElement('wz-option');
                        opt0.value = "";
                        opt0.textContent = "---";
                        selectRoadEl.appendChild(opt0);
                        if (tmpRoad) {
                            var optT = document.createElement('wz-option');
                            optT.value = tmpRoad;
                            optT.textContent = tmpRoad;
                            selectRoadEl.appendChild(optT);
                        }
                        for (var k = 0; k < streetList.length; k++) {
                            if (tmpRoad === streetList[k]) continue;
                            var opt = document.createElement('wz-option');
                            opt.value = streetList[k];
                            opt.textContent = streetList[k];
                            selectRoadEl.appendChild(opt);
                        }
                    }
                    var sel = await DBF_await(wmeSDK.Editing.getSelection());
                    if (sel && sel.ids && sel.ids.length && (sel.objectType === 'segment' || sel.type === 'segment')) {
                        var seg = await DBF_await(wmeSDK.DataModel.Segments.getById({ segmentId: sel.ids[0] }));
                        var primaryId = seg && (seg.primaryStreetId != null ? seg.primaryStreetId
                            : (seg.attributes && seg.attributes.primaryStreetID));
                        var sc = await DBF_streetCityNames(primaryId);
                        if (selectedRoadEl) selectedRoadEl.textContent = sc ? sc.streetName : "";
                    } else if (selectedRoadEl) {
                        selectedRoadEl.textContent = "";
                    }
                } catch (e) { if (debug) console.warn('[DBF] fillStreetSelect:', e); }
            })();

            var _c = DBF_getCenter() || { lon: 0, lat: 0 };
            let pt = { lon: _c.lon, lat: _c.lat };
            var clat = pt.lat;
            var clon = pt.lon;
            var extent = DBF_getMapExtent();
            if (!extent) return;
            var minLon = extent.left;
            var minLat = extent.bottom;
            var maxLon = extent.right;
            var maxLat = extent.top;
            var bbox = [minLon, minLat, maxLon, maxLat];
            var zoomLevel = DBF_getZoom();
            if (!clat || !clon || !zoomLevel) {
                console.error("Latitude, longitude ou zoomLevel manquant");
                return;
            }

            var reqId = ++_banWfsAbort;
            if (debug) console.log("[BAN DEBUG] WFS BAN.DATA.GOUV:ban bbox=", bbox, "zoom=", zoomLevel);
            try {
                DBF_fetchBanWfs(bbox).then(function (adresses) {
                    if (reqId !== _banWfsAbort) return null;
                    return DBF_enrichBanFromBal(adresses);
                }).then(function (adresses) {
                    if (!adresses || reqId !== _banWfsAbort) return;

                    var a = adresses.info_ban || [];
                            var b = adresses.lieux_dits || [];
                            _banDrawCache = { addresses: a, lieux_dits: b };

                    var _bq = getId('banQty');
                    if (_bq) {
                        _bq.textContent = String(a.length) + (adresses.truncated ? '+' : '');
                        _bq.title = adresses.truncated
                            ? ('Viewport tronqué : ' + a.length + ' / ~' + adresses.matched + ' (max ' + DBF_WFS_MAX + ')')
                            : (a.length + ' adresses BAN (WFS officiel) + lieux-dits BAL');
                    }
                    adresses_list = a.map(function (x) {
                        return {
                                id_raw: x.id,
                            id_signalement: String(x.id || '').split('_').slice(0, 3).join('_'),
                            numero: x.numero + (x.rep || ''),
                                voie: x.nom_voie,
                                commune: x.nom_commune,
                                lon: x.lon,
                                lat: x.lat
                        };
                    });
                            setTimeout(DBF_initBanSearch, 0);
                    var _bq2 = getId('banQty');
                    if (_bq2) _bq2.style.color = adresses.truncated ? 'red' : 'black';

                    var firstInsee = a[0] && a[0].code_insee;
                    if (firstInsee) {
                        DBF_banLookup(firstInsee).then(DBF_renderOfficialSourcesCite).catch(function () { });
                    }

                    return DBF_paintBanLayer(a, b);
                }).then(function () {
                    if (reqId !== _banWfsAbort) return;
                                var _lbd2 = getId('loadBanData'); if (_lbd2) _lbd2.style.backgroundColor = '#ffffff';
                            }).catch(function (err) {
                    if (reqId !== _banWfsAbort) return;
                    console.warn('[DBF] BAN WFS / paint:', err);
                                var _lbd2e = getId('loadBanData'); if (_lbd2e) _lbd2e.style.backgroundColor = '#fac3c3';
                });
            } catch (ex) { console.error(`${SCRIPT_NAME}:`, ex); }
        }
    }

    function OSM_DrawGeometry(layer, geomType, coords, labelText, style) {
        if (!layer || !geomType || coords == null) return;
        var featureStyle = style || null;

        function makeOsmFeatId(prefix, c) {
            if (Array.isArray(c) && c.length >= 2) {
                if (Array.isArray(c[0])) return (layer.name || "") + "_" + prefix + "_" + c[0][0] + "_" + c[0][1];
                return (layer.name || "") + "_" + prefix + "_" + c[0] + "_" + c[1];
            }
            return null;
        }

        function addGeo(geometry, id) {
            if (id && DBF_hasFeature(layer, id)) return;
            layer.addFeatures([{
                id: id,
                geometry: geometry,
                attributes: { labelText: labelText || "" },
                style: featureStyle
            }]);
        }

        if (geomType === "Point") {
            addGeo({ type: "Point", coordinates: [coords[0], coords[1]] }, makeOsmFeatId(geomType, coords));
        } else if (geomType === "MultiPoint") {
            for (var i = 0; i < coords.length; i++) {
                addGeo({ type: "Point", coordinates: [coords[i][0], coords[i][1]] },
                    (layer.name || "") + "_MP_" + coords[i][0] + "_" + coords[i][1]);
            }
        } else if (geomType === "LineString") {
            addGeo({ type: "LineString", coordinates: coords }, makeOsmFeatId(geomType, coords));
        } else if (geomType === "MultiLineString") {
            for (var j = 0; j < coords.length; j++) {
                addGeo({ type: "LineString", coordinates: coords[j] },
                    (layer.name || "") + "_MLS_" + coords[j][0][0] + "_" + coords[j][0][1]);
            }
        } else if (geomType === "Polygon") {
            addGeo({ type: "Polygon", coordinates: coords }, makeOsmFeatId(geomType, coords));
        } else if (geomType === "MultiPolygon") {
            for (var k = 0; k < coords.length; k++) {
                addGeo({ type: "Polygon", coordinates: coords[k] },
                    (layer.name || "") + "_MPG_" + coords[k][0][0][0] + "_" + coords[k][0][0][1]);
            }
        }
    }

    function checklayer(layer) {

        var names = {
            "__WME_Draw_Border_RS": "Panneaux routiers Icones",
            "__WME_Draw_Border_Cty": "Limites des communes",
            "__WME_Draw_Border_Dpt": "Limites des départements",
            "__WME_Draw_Border_PR": "Points Routiers",
            "__WME_Draw_Border_Cam": "Radars",
            "__WME_Draw_Border_Ban": "Adresses BAN",
            "__WME_Draw_Border_Equip": "Équipements",
            "__WME_Draw_Border_Etabl": "Établissements",
            "__WME_Draw_Border_Bump": "Ralentisseurs OSM",
            "__WME_Draw_Border_Signals": "Feux tricolores OSM"
        };
        var handle = DBF_ensureSdkLayer(layer, names[layer] || layer);
        if (layer === "__WME_Draw_Border_RS") RS_Layer = handle;
        else if (layer === "__WME_Draw_Border_Cty") Cty_Layer = handle;
        else if (layer === "__WME_Draw_Border_Dpt") Dpt_Layer = handle;
        else if (layer === "__WME_Draw_Border_PR") PR_Layer = handle;
        else if (layer === "__WME_Draw_Border_Cam") Cam_Layer = handle;
        else if (layer === "__WME_Draw_Border_Ban") Ban_Layer = handle;
        else if (layer === "__WME_Draw_Border_Equip") Equip_Layer = handle;
        else if (layer === "__WME_Draw_Border_Etabl") Etabl_Layer = handle;
        else if (layer === "__WME_Draw_Border_Bump") Bump_Layer = handle;
        else if (layer === "__WME_Draw_Border_Signals") Signals_Layer = handle;
    }
    function DBF_addStyledFeature(layer, featId, geometry, styleObj, attributes) {
        if (!layer || !geometry) return;
        if (featId && DBF_hasFeature(layer, featId)) return;
        layer.addFeatures([{
            id: featId,
            geometry: geometry,
            attributes: attributes || {},
            style: styleObj || null
        }]);
    }

    function Cty_Borders_DrawBorder(Name, coordinateString, codeInsee) {
        if (debug) console.log("🏙️ [VILLES] Tentative de tracé pour :", Name || "Nom inconnu");
        if (!Cty_Layer) Cty_Layer = DBF_getLayer("__WME_Draw_Border_Cty");
        if (!Cty_Layer) { if (debug) console.warn("   ❌ Cty_Layer introuvable"); return; }
        if (!coordinateString || !coordinateString.trim()) { if (debug) console.warn("   ❌ coordinateString vide pour", Name); return; }

        var featId = "CTY_" + (codeInsee || Name);
        if (DBF_hasFeature(Cty_Layer, featId) || DBF_hasFeature(Cty_Layer, featId + "_0")) {
            if (debug) console.log("   ⏭️ Skip (déjà dessinée) :", Name);
            return;
        }

        var parts = coordinateString.split('|');
        var styleObj = new Cty_Borders_Style(Name);
        if (parts.length > 1) {
            for (var i = 0; i < parts.length; i++) {
                var coords = parts[i].trim();
                if (!coords) continue;
                var geom = Geometrize(Name, coords);
                if (geom) DBF_addStyledFeature(Cty_Layer, featId + "_" + i, geom, styleObj, null);
            }
        } else {
            var geom2 = Geometrize(Name, coordinateString.trim());
            if (geom2) DBF_addStyledFeature(Cty_Layer, featId, geom2, styleObj, null);
        }
    }

    function Dpt_Borders_DrawGeometry(Name, geometry) {
        if (!Dpt_Layer) Dpt_Layer = DBF_getLayer("__WME_Draw_Border_Dpt");
        if (!Dpt_Layer || !geometry) return;
        var featId = "DPT_" + Name;
        if (DBF_hasFeature(Dpt_Layer, featId) || DBF_hasFeature(Dpt_Layer, featId + "_0")) return;
        var styleObj = new Dpt_Borders_Style(Name);
        if (geometry.type === "MultiPolygon" && Array.isArray(geometry.coordinates)) {
            for (var i = 0; i < geometry.coordinates.length; i++) {
                DBF_addStyledFeature(Dpt_Layer, featId + "_" + i, {
                    type: "Polygon",
                    coordinates: geometry.coordinates[i]
                }, styleObj, null);
            }
            DBF_registerFeature(Dpt_Layer, featId);
        } else if (geometry.type === "Polygon") {
            DBF_addStyledFeature(Dpt_Layer, featId, geometry, styleObj, null);
        }
    }
    function Dpt_Borders_DrawBorder(Name, coordinateString) {
        if (!Dpt_Layer) Dpt_Layer = DBF_getLayer("__WME_Draw_Border_Dpt");
        if (!Dpt_Layer || !coordinateString) return;
        var featId = "DPT_" + Name;
        if (DBF_hasFeature(Dpt_Layer, featId) || DBF_hasFeature(Dpt_Layer, featId + "_0")) return;
        var parts = coordinateString.split('|');
        var styleObj = new Dpt_Borders_Style(Name);
        if (parts.length > 1) {
            for (var i = 0; i < parts.length; i++) {
                var coords = parts[i].trim();
                var geom = Geometrize(Name, coords);
                if (geom) DBF_addStyledFeature(Dpt_Layer, featId + "_" + i, geom, styleObj, null);
            }
            DBF_registerFeature(Dpt_Layer, featId);
        } else {
            var geom2 = Geometrize(Name, coordinateString.trim());
            if (geom2) DBF_addStyledFeature(Dpt_Layer, featId, geom2, styleObj, null);
        }
    }
    function PR_Borders_DrawBorder(Name, lon, lat) {
        if (!PR_Layer) PR_Layer = DBF_getLayer("__WME_Draw_Border_PR");
        if (!PR_Layer) return;
        var featId = "PR_" + lon + "_" + lat;
        DBF_addStyledFeature(PR_Layer, featId, Geometrize(Name, lon + ";" + lat), new PR_Borders_Style(Name), null);
    }
    function Cam_Borders_DrawBorder(Name, lon, lat) {
        if (!Cam_Layer) Cam_Layer = DBF_getLayer("__WME_Draw_Border_Cam");
        if (!Cam_Layer) return;
        var featId = "CAM_" + lon + "_" + lat;
        DBF_addStyledFeature(Cam_Layer, featId, Geometrize(Name, lon + ";" + lat), new Cam_Borders_Style(Name), null);
    }
    function Ban_Borders_DrawBorder(Name, lon, lat, status, verif, banKey) {
        if (!Ban_Layer) Ban_Layer = DBF_getLayer("__WME_Draw_Border_Ban");
        if (!Ban_Layer) return;

        var featId = "BAN_" + lon + "_" + lat + "_" + Name;
        if (DBF_hasFeature(Ban_Layer, featId)) return;

        const s = DBF_getStyles().ban;
        var labelColor = (status === "yes") ? (s.textExisting || "#0000ff") : (s.textMissing || "#ff0000");
        var strokeColor = (verif == "1") ? (s.verifiedStroke || "#00dd00") : (s.unverifiedStroke || "#ff8000");
        var strokeWidth = s.strokeWidth || 10;
        var fontSize = s.fontSize || 12;

        var zIndex = (status === "yes") ? 5 : 20;
        var styleObj = new Ban_Borders_Style(Name, labelColor, strokeColor, strokeWidth, fontSize, zIndex);
        var attrs = { banKey: banKey || "", banState: status || "", banCertified: (verif == "1"), graphicZIndex: zIndex };
        DBF_addStyledFeature(Ban_Layer, featId, Geometrize(Name, lon + ";" + lat), styleObj, attrs);
    }
    function Equip_Borders_DrawBorder(Name, lon, lat) {
        if (!Equip_Layer) Equip_Layer = DBF_getLayer("__WME_Draw_Border_Equip");
        if (!Equip_Layer) return;
        DBF_addStyledFeature(Equip_Layer, "EQ_" + lon + "_" + lat, Geometrize(Name, lon + ";" + lat), new Equip_Borders_Style(Name), null);
    }
    function Etabl_Borders_DrawBorder(Name, lon, lat) {
        if (!Etabl_Layer) Etabl_Layer = DBF_getLayer("__WME_Draw_Border_Etabl");
        if (!Etabl_Layer) return;
        DBF_addStyledFeature(Etabl_Layer, "ET_" + lon + "_" + lat, Geometrize(Name, lon + ";" + lat), new Etabl_Borders_Style(Name), null);
    }
    function RS_DrawSignWithPanonceau(main, pano, lon, lat) {
        if (!RS_Layer) RS_Layer = DBF_getLayer("__WME_Draw_Border_RS");
        if (!RS_Layer) return;
        var mainIcon = RS_buildIcon(main.code, main.value);
        var pt = { type: "Point", coordinates: [lon, lat] };
        RS_Layer.addFeatures([{
            id: "RS_" + lon + "_" + lat + "_main",
            geometry: pt,
            style: {
                externalGraphic: mainIcon.uri,
                graphicWidth: mainIcon.w,
                graphicHeight: mainIcon.h,
                graphicXOffset: -mainIcon.w / 2,
                graphicYOffset: -mainIcon.h / 2,
                graphicOpacity: 1.0
            }
        }]);
        if (pano && pano.code) {
            var mIcon = RS_buildPanonceau(pano.code, pano.value, mainIcon.w);
            RS_Layer.addFeatures([{
                id: "RS_" + lon + "_" + lat + "_pano",
                geometry: { type: "Point", coordinates: [lon, lat] },
                style: {
                    externalGraphic: mIcon.uri,
                    graphicWidth: mIcon.w,
                    graphicHeight: mIcon.h,
                    graphicXOffset: -mIcon.w / 2,
                    graphicYOffset: 6,
                    graphicOpacity: 1.0
                }
            }]);
        }
    }

    function Cty_Borders_Style(Name) {
        const s = DBF_getStyles().city;

        this.fill = false;
        this.stroke = true;
        this.strokeColor = s.strokeColor;
        this.strokeWidth = s.strokeWidth;
        this.strokeDashstyle = "solid";

        if (s.showLabel) {
            this.label = Name;
            this.fontSize = (s.fontSize || 12) + "px";
            this.fontColor = s.fontColor;
            this.fontWeight = s.fontBold ? "bold" : "normal";

            this.labelOutlineColor = s.labelOutlineColor || "#ffffff";
            this.labelOutlineWidth = (typeof s.labelOutlineWidth === "number") ? s.labelOutlineWidth : 4;
        } else {
            this.label = "";
        }
    }

    function Dpt_Borders_Style(Name) {
        const s = DBF_getStyles().dep;

        this.fill = false;
        this.stroke = true;
        this.strokeColor = s.strokeColor;
        this.strokeWidth = s.strokeWidth;
        this.strokeDashstyle = "solid";

        this.label = Name.replace(/_/g, "'");
        this.fontSize = (s.fontSize || 24) + "px";
        this.fontColor = s.fontColor;
        this.fontWeight = s.fontBold ? "bold" : "normal";

        this.labelOutlineColor = s.labelOutlineColor || "#ffffff";
        this.labelOutlineWidth = (typeof s.labelOutlineWidth === "number") ? s.labelOutlineWidth : 4;
    }

    function PR_Borders_Style(Name) {
        const s = DBF_getStyles().pr;

        this.fill = false;
        this.stroke = true;
        this.strokeColor = s.strokeColor;
        this.strokeWidth = s.strokeWidth;
        this.strokeDashstyle = "solid";

        this.label = "PR" + Name;
        this.labelYOffset = 10;
        this.fontSize = (s.fontSize || 12) + "px";
        this.fontColor = s.fontColor;
        this.fontWeight = s.fontBold ? "bold" : "normal";

        this.labelOutlineColor = s.labelOutlineColor || s.strokeColor;
        this.labelOutlineWidth = (typeof s.labelOutlineWidth === "number") ? s.labelOutlineWidth : 3;
    }

    function Cam_Borders_Style(Name) {
        const s = DBF_getStyles().radar;

        this.stroke = true;
        this.strokeColor = s.strokeColor;
        this.strokeWidth = s.strokeWidth;
        this.strokeDashstyle = "solid";

        this.label = Name;
        this.labelYOffset = 13;
        this.fontSize = (s.fontSize || 12) + "px";
        this.fontColor = s.fontColor;
        this.fontWeight = s.fontBold ? "bold" : "normal";

        this.labelOutlineColor = s.labelOutlineColor || s.strokeColor;
        this.labelOutlineWidth = (typeof s.labelOutlineWidth === "number") ? s.labelOutlineWidth : 3;
    }

    function Ban_Borders_Style(Name, labelColor, strokeColor, strokeWidth, fontSize, graphicZIndex) {
        const s = DBF_getStyles().ban;

        this.fill = false;
        this.stroke = true;
        this.strokeColor = strokeColor;
        this.strokeWidth = strokeWidth;
        this.strokeDashstyle = "solid";

        this.label = Name;
        this.labelYOffset = 22;
        this.fontSize = fontSize + "px";
        this.fontColor = labelColor;
        this.fontWeight = s.fontBold ? "bold" : "normal";

        this.labelOutlineColor = s.labelOutlineColor || "#ffffff";
        this.labelOutlineWidth = (typeof s.labelOutlineWidth === "number") ? s.labelOutlineWidth : 4;
        this.graphicZIndex = (typeof graphicZIndex === "number") ? graphicZIndex : 10;
    }

    function Equip_Borders_Style(Name) {
        const s = DBF_getStyles().equip;

        this.fill = false;
        this.stroke = true;
        this.strokeColor = s.strokeColor;
        this.strokeWidth = s.strokeWidth;
        this.strokeDashstyle = "solid";

        this.label = Name;
        this.labelYOffset = 10;
        this.fontSize = (s.fontSize || 12) + "px";
        this.fontColor = s.fontColor;
        this.fontWeight = s.fontBold ? "bold" : "normal";

        this.labelOutlineColor = s.labelOutlineColor || s.strokeColor;
        this.labelOutlineWidth = (typeof s.labelOutlineWidth === "number") ? s.labelOutlineWidth : 3;
    }

    function Etabl_Borders_Style(Name) {
        const s = DBF_getStyles().etabl;

        this.fill = false;
        this.stroke = true;
        this.strokeColor = s.strokeColor;
        this.strokeWidth = s.strokeWidth;
        this.strokeDashstyle = "solid";

        this.label = Name;
        this.labelYOffset = 10;
        this.fontSize = (s.fontSize || 12) + "px";
        this.fontColor = s.fontColor;
        this.fontWeight = s.fontBold ? "bold" : "normal";

        this.labelOutlineColor = s.labelOutlineColor || s.strokeColor;
        this.labelOutlineWidth = (typeof s.labelOutlineWidth === "number") ? s.labelOutlineWidth : 3;
    }
    function RS_getScale() {
        try {
            var s = DBF_getStyles().rs;
            return s.scale || 1.0;
        } catch (e) {
            return 1.0;
        }
    }

    function Geometrize(Name, coordinateString) {

        if (!coordinateString) return null;
        var tempVector = coordinateString.split(" ").filter(Boolean);
        var ring = [];
        for (var i = 0; i < tempVector.length; i++) {
            var coordinateVector = tempVector[i].split(";");
            var lon = parseFloat(coordinateVector[0]);
            var lat = parseFloat(coordinateVector[1]);
            if (isNaN(lon) || isNaN(lat)) {
                if (debug) console.warn("[Geometrize] coord invalide", Name, tempVector[i]);
                continue;
            }
            ring.push([lon, lat]);
        }
        if (ring.length === 0) return null;
        if (ring.length === 1) {
            return { type: "Point", coordinates: ring[0] };
        }

        var first = ring[0], last = ring[ring.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1]) ring.push([first[0], first[1]]);
        return { type: "Polygon", coordinates: [ring] };
    }
    function RS_buildIcon(code, value) {
        code = (code || "").toUpperCase();
        function uri(svg) { return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22"); }

        if (code === "B14" || code.startsWith("B14")) {

            var v = (value && value !== "NULL") ? String(value) : "";
            if (!v) {
                var m = code.match(/^B14[\s\-_]?(\d{1,3})$/i);
                if (m) v = m[1];
            }
            v = (v || "").replace(/[^\d]/g, "");

            var s = 32;
            var svg =
                '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 100 100">'
                + '<circle cx="50" cy="50" r="46" fill="#fff" stroke="#d81e05" stroke-width="12"/>'
                + (v ? '<text x="50" y="63" font-family="Arial,Helvetica" font-size="44" font-weight="700" text-anchor="middle" fill="#000">' + v + '</text>' : '')
                + '</svg>';

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }

        if (code === "B33" || code.startsWith("B33")) {
            let v = (value && value !== "NULL") ? String(value) : "";
            if (!v) {
                const m = code.match(/^B33[\s\-_]?(\d{1,3})$/i);
                if (m) v = m[1];
            }
            v = (v || "").replace(/[^\d]/g, "");

            const s = 32;
            const bandAngle = -35;
            const bandWidth = 18;
            const halo = 8;

            const svg =
                '<svg xmlns="http://www.w3.org/2000/svg" width="' + s + '" height="' + s + '" viewBox="0 0 100 100">'
                + '<circle cx="50" cy="50" r="46" fill="#fff" stroke="#000" stroke-width="4"/>'
                + '<defs><clipPath id="b33clip"><circle cx="50" cy="50" r="42"/></clipPath></defs>'
                + '<g clip-path="url(#b33clip)">'
                + '<g transform="translate(50,50) rotate(' + bandAngle + ') translate(-50,-50)">'
                + '<line x1="-20" y1="50" x2="120" y2="50" stroke="#000" stroke-width="' + bandWidth + '" stroke-linecap="butt"/>'
                + '</g>'
                + '</g>'
                + (v ? '<text x="50" y="63" text-anchor="middle" font-family="Arial Narrow, Arial, Helvetica, sans-serif" font-weight="700" font-size="44" fill="none" stroke="#fff" stroke-width="' + halo + '" stroke-linejoin="round" paint-order="stroke"><tspan>' + v + '</tspan></text>' : '')
                + (v ? '<text x="50" y="63" text-anchor="middle" font-family="Arial Narrow, Arial, Helvetica, sans-serif" font-weight="700" font-size="44" fill="#000"><tspan>' + v + '</tspan></text>' : '')
                + '</svg>';

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }

        if (code === "B31") {
            var s = 32;
            var svg = ''
                + '<svg xmlns="http://www.w3.org/2000/svg" width="576" height="576" viewBox="-0.944 -0.944 576 576">'
                + '  <circle stroke="#000000" stroke-width="0.1764" stroke-linecap="round" stroke-linejoin="round" cx="287.056" cy="287.056" r="286.968"/>'
                + '  <path fill="#FFFFFF" stroke="#000000" stroke-width="0.1764" stroke-linecap="round" stroke-linejoin="round"'
                + '        d="M125.736,378.429 l218.521-218.53 l98.938-97.348 C334.725,-12.889,187.828,0.014,94.169,93.208 C0.51,186.403,-13.123,333.233,61.777,442.078 L125.736,378.429z"/>'
                + '  <path fill="#FFFFFF" stroke="#000000" stroke-width="0.1764" stroke-linecap="round" stroke-linejoin="round"'
                + '        d="M511.886,131.385 l-71.274,71.385 L228.789,414.754 l-97.521,97.053 c108.646,75.308,255.606,62.118,349.105,-31.333 C573.873,387.023,587.139,240.069,511.886,131.385z"/>'
                + '</svg>';

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }

        if (code === "EB10") {
            var s = 60;
            var svg = ''
                + '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="177.07678" viewBox="0 0 500 177.07678">'
                + '  <path fill="#ffffff" stroke="#000000" stroke-width="0.85" d="M29.004,0.425c-15.681,0-28.579,12.898-28.579,28.579v119.069c0,15.681,12.898,28.579,28.579,28.579h441.992c15.681,0,28.579-12.898,28.579-28.579V29.004c0-15.681-12.898-28.579-28.579-28.579H29.004z"/>'
                + '  <path fill="#ff0000" d="M29.004,9.212h441.992c10.965,0,19.792,8.827,19.792,19.792v119.069c0,10.965-8.827,19.792-19.792,19.792H29.004c-10.965,0-19.792-8.827-19.792-19.792V29.004c0-10.965,8.827-19.792,19.792-19.792z"/>'
                + '  <rect x="31" y="29.85" width="438" height="117.38" fill="#ffffff"/>'
                + '</svg>';

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }

        if (code === "EB20") {
            var s = 60;
            var svg = ''
                + '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="177.07678" viewBox="0 0 500 177.07678">'
                + '  <path fill="#ffffff" stroke="#000000" stroke-width="0.85" d="M29.004,0.425c-15.681,0-28.579,12.898-28.579,28.579v119.069c0,15.681,12.898,28.579,28.579,28.579h441.992c15.681,0,28.579-12.898,28.579-28.579V29.004c0-15.681-12.898-28.579-28.579-28.579H29.004z"/>'
                + '  <path fill="#000000" d="M29.004,9.213c-10.965,0-19.792,8.827-19.792,19.792v119.068c0,10.965,8.827,19.792,19.792,19.792h441.992c10.965,0,19.792-8.827,19.792-19.792V29.004c0-10.965-8.827-19.792-19.792-19.792H29.004z"/>'
                + '  <rect x="30.1" y="23.8" width="440" height="124" fill="#ffffff"/>'
                + '  <path fill="#ff0000" d="M410.97,23.8L24.39,149.62c0.93,2.24,3.14,3.81,5.71,3.81h58.48L475.66,27.45c-0.97-2.14-3.1-3.65-5.61-3.65H410.97z"/>'
                + '</svg>';

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }
        if (code === "C107") {
            var s = 32;
            var svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="574.93799" height="574.93799" viewBox="0 0 574.93799 574.93799">
        <path d="m 41.496,574.438 h 491.947 c 10.872,0 21.3,-4.318 28.988,-12.007 7.688,-7.688 12.007,-18.115 12.007,-28.988 V 41.496 c 0,-10.873 -4.319,-21.3 -12.007,-28.988 C 554.742,4.819 544.314,0.5 533.442,0.5 H 41.496 C 30.623,0.5 20.196,4.819 12.508,12.507 4.819,20.195 0.5,30.623 0.5,41.496 v 491.947 c 0,10.873 4.319,21.3 12.007,28.988 7.688,7.688 18.116,12.007 28.989,12.007 z"
            style="fill:#ffffff;stroke:#000000;stroke-linecap:round;stroke-linejoin:round"/>
        <path d="m 544.919,529.72 c 0,6.744 -5.468,12.214 -12.214,12.214 H 42.659 c -6.746,0 -12.214,-5.47 -12.214,-12.214 V 41.173 c 0,-6.746 5.468,-12.214 12.214,-12.214 h 490.046 c 6.746,0 12.214,5.469 12.214,12.214 V 529.72 z"
            style="fill:#0000ff;stroke:#000000"/>
        <path d="m 438.34344,248.84928 -28.56671,-101.00762 -9.81224,-5.31619 -217.50475,-1.77206 -13.083,7.08825 -34.95775,101.00762 c -14.48636,2.2568 -19.97153,9.01419 -23.91899,16.54043 l 0,96.87161 27.80135,0 0,72.65461 49.06123,0 0,-72.65461 201.15102,0 0,74.42667 49.06122,0 0,-74.42667 22.89524,0 0,-95.69141 c -4.43579,-11.03152 -12.36985,-16.71902 -22.12662,-17.72063 z m -270.66095,0 24.59276,-81.51492 196.2449,3.54412 19.37264,77.9708 -240.2103,0 z"
            style="fill:#ffffff;stroke:#ffffff;stroke-width:6;stroke-linejoin:round;"/>
        <circle cx="164.735" cy="301.609" r="18.57" fill="#0000ff"/>
        <circle cx="366.497" cy="301.609" r="18.57" fill="#0000ff"/>
    </svg>
    `;

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }
        if (code === "C108") {
            var s = 32;
            var svg = ''
                + '<svg xmlns="http://www.w3.org/2000/svg" width="574.938" height="574.938" viewBox="0 0 574.938 574.938">'
                + '  <path fill="#FFFFFF" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
                + '        d="M41.496,574.438h491.945c10.872,0,21.3-4.318,28.988-12.007c7.688-7.688,12.007-18.115,12.007-28.988V41.496'
                + '           c0-10.873-4.319-21.302-12.007-28.988C554.74,4.819,544.314,0.5,533.442,0.5H41.496c-10.873,0-21.302,4.317-28.988,12.007'
                + '           C4.819,20.195,0.5,30.623,0.5,41.496v491.945c0,10.873,4.317,21.3,12.007,28.988C20.195,570.117,30.623,574.438,41.496,574.438z"/>'
                + '  <path fill="#0000FF" d="M42.659,28.959c-6.746,0-12.216,5.468-12.216,12.214v456.786l477.582-469H42.659z"/>'
                + '  <path fill="#0000FF" stroke="#000000" d="M80.775,541.934h451.929c6.746,0,12.216-5.47,12.216-12.214V79.202L80.775,541.934z"/>'
                + '  <path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"'
                + '        d="M438.343,248.849l-28.566-101.007l-9.813-5.316l-217.504-1.771l-13.083,7.089L134.419,248.85'
                + '           c-14.486,2.257-19.973,9.015-23.919,16.541v96.871h27.801v72.653h49.062v-72.653h201.15v74.427h49.062v-74.427h22.896V266.57'
                + '           C456.033,255.538,448.1,249.851,438.343,248.849L438.343,248.849z M167.683,248.849l24.593-81.515l196.244,3.544'
                + '           l19.373,77.971H167.683z"/>'
                + '  <circle fill="#0000FF" cx="165.063" cy="300.662" r="18.56"/>'
                + '  <circle fill="#0000FF" cx="410.595" cy="300.131" r="18.56"/>'
                + '  <rect x="180.636" y="427.969" fill="#0000FF" width="18" height="16.667"/>'
                + '  <path fill="#FF0000" d="M544.919,41.173c0-6.745-5.47-12.214-12.216-12.214h-24.678l-477.582,469v31.761'
                + '        c0,6.744,5.47,12.214,12.216,12.214h38.115L544.919,79.202V41.173z"/>'
                + '</svg>';

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }

        if (code === "C207") {
            var s = 32;
            var svg = ''
                + '<svg xmlns="http://www.w3.org/2000/svg" width="575.1" height="575.1" viewBox="-0.322 -0.549 575.09998 575.09998">'
                + '  <rect x="0.728" y="0.501" width="573" height="573" rx="40.973" ry="40.973"'
                + '        fill="#ffffff" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                + '  <rect x="28.177" y="27.95" width="518.102" height="518.102" rx="13.524" ry="13.524" fill="#0056a4"/>'
                + '  <g transform="matrix(1.1017437,0,0,1.1017437,-1225.6245,-409.94628)" fill="#ffffff">'
                + '    <path d="m1512.8729,845.14553-38.8177-234.10417h-74.1146l4.6875,234.10417z" />'
                + '    <path d="m1461.3208,532.80699-18.4479-112.78124h-46.4844l2.1927,112.78124z" />'
                + '    <path d="m1233.1854,845.14553 38.7812-234.10417h74.151l-4.7239,234.10417z" />'
                + '    <path d="m1284.7374,532.80699 18.4063-112.78124h46.526l-2.2291,112.78124z" />'
                + '    <path d="m1373.102,590.97366h114.6719c8.6563,0.11453,19.2031,5.55729,20.6771,14.58854l5.1406,44.90104h32.125V605.7497'
                + '             c-0.3021-8.92187,3.3229-14.77604,18.5937-14.85416l24.2292,0.0781v-29.63022h-430.7916v29.63021l24.1875-0.0781'
                + '             c15.2708,0.0781,18.8958,5.9323,18.6354,14.85416v44.71355h32.125l5.1041-44.90104'
                + '             c1.5105-9.03125,12.0157-14.47396,20.6719-14.58855z" />'
                + '  </g>'
                + '</svg>';

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }

        if (code === "C208") {
            var s = 32;
            var svg = ''
                + '<svg xmlns="http://www.w3.org/2000/svg" width="575.1" height="575.1" viewBox="-0.322 -0.549 575.09998 575.09998">'
                + '  <rect x="0.728" y="0.501" width="573" height="573" rx="40.973" ry="40.973"'
                + '        fill="#ffffff" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
                + '  <rect x="28.177" y="27.95" width="518.102" height="518.102" rx="13.524" ry="13.524" fill="#0056a4"/>'
                + '  <g transform="matrix(1.1017437,0,0,1.1017437,-1225.6245,-409.94628)" fill="#ffffff">'
                + '    <path d="m1512.8729,845.14553-38.8177-234.10417h-74.1146l4.6875,234.10417z" />'
                + '    <path d="m1461.3208,532.80699-18.4479-112.78124h-46.4844l2.1927,112.78124z" />'
                + '    <path d="m1233.1854,845.14553 38.7812-234.10417h74.151l-4.7239,234.10417z" />'
                + '    <path d="m1284.7374,532.80699 18.4063-112.78124h46.526l-2.2291,112.78124z" />'
                + '    <path d="m1373.102,590.97366h114.6719c8.6563,0.11453,19.2031,5.55729,20.6771,14.58854l5.1406,44.90104h32.125V605.7497'
                + '             c-0.3021-8.92187,3.3229-14.77604,18.5937-14.85416l24.2292,0.0781v-29.63022h-430.7916v29.63021l24.1875-0.0781'
                + '             c15.2708,0.0781,18.8958,5.9323,18.6354,14.85416v44.71355h32.125l5.1041-44.90104'
                + '             c1.5105-9.03125,12.0157-14.47396,20.6719-14.58855z" />'
                + '  </g>'
                + '  <path fill="#d40000" d="M -374.64375 -335.11506 L -374.64375 334.79404 L -396.47843 356.62872 C -401.77646 361.92675 -410.30681 361.92813 -415.60484 356.6301 L -437.43814 334.7968 L -437.43814 -335.11782 L -415.60484 -356.95113 C -410.30681 -362.24916 -401.77646 -362.24778 -396.47843 -356.94975 L -374.64375 -335.11506 z "'
                + '        transform="matrix(-0.70710678,-0.70710678,-0.70710678,0.70710678,0,0)"/>'
                + '</svg>';

            var scale = RS_getScale();
            return { uri: uri(svg), w: s * scale, h: s * scale };
        }

    }
    function RS_buildPanonceau(code, value, refWidth) {
        code = (code || "").toUpperCase().trim();
        value = (value || "").trim();

        function uri(svg) {
            return "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(svg).replace(/'/g, "%27").replace(/"/g, "%22");
        }

        function fmtDistance(v) {
            if (!v) return "";
            const s = String(v).replace(",", ".").replace(/\s+/g, "");
            const m = s.match(/^([\d.]+)\s*(km|m)?$/i);
            if (!m) return v;
            let num = parseFloat(m[1]);
            const unit = (m[2] || "m").toLowerCase();
            if (unit === "km") return (num + "").replace(".", ",") + " km";
            if (num >= 1000) return (Math.round(num) / 1000 + "").replace(".", ",") + " km";
            return Math.round(num) + " m";
        }

        const baseW = Math.max(84, Math.min(refWidth || 120, 140));
        const baseH = 26;
        let w = baseW, h = baseH, txt = "";

        if (code === "M9Z") txt = "RAPPEL";

        else if (code === "M1") {
            txt = fmtDistance(value || "");
            h = 32;
            const fs = 18, pad = 14, ff = "Arial Narrow, Arial, Helvetica, sans-serif";
            const emW = fs * 0.62;
            w = Math.max(84, Math.round(pad * 2 + emW * (txt.length || 4)));
            const r = 6;
            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
                `<rect x="1.5" y="1.5" rx="${r}" ry="${r}" width="${w - 3}" height="${h - 3}" fill="#fff" stroke="#000" stroke-width="3"/>` +
                `<text x="${w / 2}" y="${h / 2 + fs * 0.38}" font-family="${ff}" font-size="${fs}" font-weight="700" text-anchor="middle" fill="#000">${txt}</text>` +
                `</svg>`;
            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M3A") {
            const dir = String(value || "droite").trim().toLowerCase();
            const isLeft = ["gauche", "2", "left", "l"].includes(dir);

            const w = 32, h = 32;
            const r = 6, stroke = 3;

            const officialPathD =
                "m -38.631499,-5.8489465 12.908216,0.125613 -0.125661,-12.9081605 -3.139567,-3.139567 0.03919,9.625895 -14.84153,-14.84153 -3.195849,3.195848 14.841531,14.8415213 -9.625897,-0.03918 z";

            const margin = 4;
            const innerW = w - margin * 2;
            const innerH = h - margin * 2;

            const vbW = 27.289993, vbH = 27.289966;

            const s = Math.min(innerW / vbW, innerH / vbH);

            const preTranslateX = 50;
            const preTranslateY = 30;

            const arrowGroupRight =
                `<g transform="translate(${margin},${margin}) scale(${s}) translate(${preTranslateX},${preTranslateY})">` +
                `<path d="${officialPathD}" fill="#000" stroke="none"/>` +
                `</g>`;

            const arrowGroup = isLeft
                ? `<g transform="translate(${w},0) scale(-1,1)">${arrowGroupRight}</g>`
                : arrowGroupRight;

            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
                `<rect x="1.5" y="1.5" rx="${r}" ry="${r}" width="${w - 3}" height="${h - 3}" fill="#fff" stroke="#000" stroke-width="${stroke}"/>` +
                arrowGroup +
                `</svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M2") {
            const txt = fmtDistance(value || "");
            const h = 32, fs = 18, ff = "Arial Narrow, Arial, Helvetica, sans-serif";
            const pad = 14, emW = fs * 0.62, arrowSpace = 26;
            let w = Math.max(100, Math.round(pad * 2 + Math.max(4, txt.length) * emW + arrowSpace * 2));
            const r = 6, leftX = 18, rightX = w - 18, shaftTop = 9, shaftBot = h - 6, headW = 7, headY = shaftTop;
            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
                `<rect x="1.5" y="1.5" rx="${r}" ry="${r}" width="${w - 3}" height="${h - 3}" fill="#fff" stroke="#000" stroke-width="3"/>` +
                `<line x1="${leftX}" y1="${shaftBot}" x2="${leftX}" y2="${shaftTop}" stroke="#000" stroke-width="3" stroke-linecap="round"/>` +
                `<path d="M ${leftX - headW},${shaftTop + 8} L ${leftX},${headY} L ${leftX + headW},${shaftTop + 8} Z" fill="#000"/>` +
                `<line x1="${rightX}" y1="${shaftBot}" x2="${rightX}" y2="${shaftTop}" stroke="#000" stroke-width="3" stroke-linecap="round"/>` +
                `<path d="M ${rightX - headW},${shaftTop + 8} L ${rightX},${headY} L ${rightX + headW},${shaftTop + 8} Z" fill="#000"/>` +
                `<text x="${w / 2}" y="${h / 2 + fs * 0.38}" font-family="${ff}" font-size="${fs}" font-weight="700" text-anchor="middle" fill="#000">${txt}</text>` +
                `</svg>`;
            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M3D") {
            const w = 32;
            const h = 32;
            const r = 6;
            const stroke = 3;

            const centerX = w / 2;
            const shaftTop = 6;
            const shaftBot = h - 10;
            const headLen = 7;
            const headHalf = 6;
            const yHead = h - 6;

            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
                `<rect x="1.5" y="1.5" rx="${r}" ry="${r}" width="${w - 3}" height="${h - 3}" fill="#fff" stroke="#000" stroke-width="${stroke}"/>` +

                `<line x1="${centerX}" y1="${shaftTop}" x2="${centerX}" y2="${shaftBot}" stroke="#000" stroke-width="${stroke}" stroke-linecap="round"/>` +

                `<polygon points="
            ${centerX - headHalf},${yHead - headLen}
            ${centerX},${yHead}
            ${centerX + headHalf},${yHead - headLen}
        " fill="#000"/>` +
                `</svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4A") {
            const w = 56, h = 32;
            const r = 6, stroke = 3;

            const srcW = 739, srcH = 300;
            const layerShiftY = -752.36218;

            const margin = 4;
            const innerW = w - margin * 2;
            const innerH = h - margin * 2;

            const s = Math.min(innerW / srcW, innerH / srcH);

            const carBody = `M 117.77367,953.22223
        c -5.15811,-0.32025 -10.06219,-1.08759 -10.58836,-9.56006
        v -29.85149
        c 0.53272,-8.53723 6.95609,-13.44232 14.0008,-13.97577
        l 122.69341,-11.06439 80.17858,-80.17858 h 200.07085
        l 76.34743,76.34744 h 20.70822
        c 7.09313,0.25401 9.58524,2.5844 10.57946,10.57947
        v 57.75511 H 117.77367 Z`;

            const window1 = `M 412.68588,884.31495 H 289.74518
        c -6.72863,-0.28913 -8.14501,-4.1394 -5.65759,-8.45926
        l 49.06428,-49.06428 h 79.53401 z`;

            const window2 = `M 428.55051,884.31495 H 536.46337
        c 5.90615,-0.28913 7.1494,-10.08864 4.96602,-14.4085
        l -43.06683,-43.11504 h -69.81205 z`;

            const wheelsGroup =
                `<g transform="matrix(1.2606884,0,0,1.2606884,-9.4267,524.78681)">
        <path d="m 186.54661,371.66315
                    c 0,16.41058 -13.3034,29.71398 -29.71398,29.71398
                    -16.41058,0 -29.71399,-13.3034 -29.71399,-29.71398
                    0,-16.41058 13.30341,-29.71399 29.71399,-29.71399
                    16.41058,0 29.71398,13.30341 29.71398,29.71399 z"
                transform="matrix(1.1818181,0,0,1.1818181,-24.860346,-98.719168)"
                fill="#000" stroke="#ffffff" stroke-width="2.53846169"/>
        <path d="m 186.54661,371.66315
                    c 0,16.41058 -13.3034,29.71398 -29.71398,29.71398
                    -16.41058,0 -29.71399,-13.3034 -29.71399,-29.71398
                    0,-16.41058 13.30341,-29.71399 29.71399,-29.71399
                    16.41058,0 29.71398,13.30341 29.71398,29.71399 z"
                transform="matrix(1.1818181,0,0,1.1818181,261.38805,-97.289084)"
                fill="#000" stroke="#ffffff" stroke-width="2.53846169"/>
        </g>`;

            const pictogram =
                `<g transform="translate(${margin},${margin})
                    scale(${s})
                    translate(0,${layerShiftY})">
        <path d="${carBody}" fill="#000" stroke="#000" stroke-width="1.26068842"/>
        <path d="${window1}" fill="#ffffff" stroke="none"/>
        <path d="${window2}" fill="#ffffff" stroke="none"/>
        ${wheelsGroup}
        </g>`;

            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg"
            width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <rect x="1.5" y="1.5" rx="${r}" ry="${r}"
                width="${w - 3}" height="${h - 3}"
                fill="#fff" stroke="#000" stroke-width="${stroke}"/>
        ${pictogram}
        </svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4B") {
            const w = 56, h = 32;
            const r = 6, stroke = 3;

            const srcW = 739, srcH = 300;
            const layerShiftY = -752.36218;
            const margin = 4;
            const innerW = w - margin * 2;
            const innerH = h - margin * 2;

            const s = Math.min(innerW / srcW, innerH / srcH);

            const busBody = `
        m 65.006101,994.17227
        c -13.360978,-1.705 -27.614236,-6.09796 -26.665427,-26.64158
        l 0,-52.43286
        c 2.117675,-15.55105 12.575772,-17.836 19.573551,-20.40632
        l 18.004892,-67.13505
        c 0.503673,-1.75637 -1.051869,-2.91108 -4.993629,-2.8805
        l -5.919387,0 0,-39.10151
        609.356929,0
        c 16.27003,1.27046 15.11737,11.16552 15.29477,15.2811
        l 0,193.31672 z`;

            const frontWhite = `
        m 86.58393,823.54872
        33.267,0
        c 3.86906,-0.18291 5.41985,1.55363 5.2863,5.384
        l 0,58.58648
        c -0.0773,4.91784 -3.24827,6.66062 -6.74699,6.87169
        l -45.49008,0
        c -4.581395,-0.10657 -6.502362,-0.60194 -6.051431,-6.16327
        6.701842,-21.63965 17.089221,-63.46302 19.735201,-64.6789 z`;

            const winRects = [
                { x: 137.76866, y: 823.8363, w: 124.95871, h: 70.855232, ry: 6.1679206 },
                { x: 275.42181, y: 823.8363, w: 124.95871, h: 70.855232, ry: 6.1679206 },
                { x: 411.58569, y: 823.8363, w: 124.95871, h: 70.855232, ry: 6.1679206 },
                { x: 548.0332, y: 823.8363, w: 124.95871, h: 70.855232, ry: 6.1679206 },
            ];

            const wheelsGroup = `
        <g transform="matrix(1.2623691,0,0,1.2612398,-13.855469,526.51775)">
        <path
            d="m 186.54661,371.66315
            c 0,16.41058 -13.3034,29.71398 -29.71398,29.71398
                -16.41058,0 -29.71399,-13.3034 -29.71399,-29.71398
            0,-16.41058 13.30341,-29.71399 29.71399,-29.71399
            16.41058,0 29.71398,13.30341 29.71398,29.71399 z"
            transform="matrix(1.4211617,0,0,1.4211617,-58.328645,-166.65405)"
            fill="#000" stroke="#ffffff" stroke-width="2.53846169"/>
        <path
            d="m 186.54661,371.66315
            c 0,16.41058 -13.3034,29.71398 -29.71398,29.71398
                -16.41058,0 -29.71399,-13.3034 -29.71399,-29.71398
            0,-16.41058 13.30341,-29.71399 29.71399,-29.71399
            16.41058,0 29.71398,13.30341 29.71398,29.71399 z"
            transform="matrix(1.4211617,0,0,1.4211617,204.52558,-168.45783)"
            fill="#000" stroke="#ffffff" stroke-width="2.53846169"/>
        </g>`;

            let windowsSvg = winRects.map(r =>
                `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" ry="${r.ry}" fill="#ffffff" stroke="none"/>`
            ).join("");

            const pictogram =
                `<g transform="translate(${margin},${margin}) scale(${s}) translate(0,${layerShiftY})">
        <path d="${busBody}" fill="#000" stroke="none"/>
        ${windowsSvg}
        <path d="${frontWhite}" fill="#ffffff" stroke="none"/>
        ${wheelsGroup}
        </g>`;

            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <rect x="1.5" y="1.5" rx="${r}" ry="${r}"
                width="${w - 3}" height="${h - 3}"
                fill="#fff" stroke="#000" stroke-width="${stroke}"/>
        ${pictogram}
        </svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4C") {
            const w = 56, h = 32;
            const r = 6, stroke = 3;

            const srcW = 430, srcH = 175;
            const layerShiftY = -877.36219;

            const margin = 4;
            const innerW = w - margin * 2;
            const innerH = h - margin * 2;

            const s = Math.min(innerW / srcW, innerH / srcH);

            const motoGroup = `
        <g transform="matrix(0.70621469,0,0,0.70621469,276.36309,364.04201)">
        <path d="m -205.64013,832.76137 c -29.961,0 -54.25,23.617 -54.25,52.75 0,29.133 24.289,52.75 54.25,52.75 29.961,0 54.25,-23.617 54.25,-52.75 0,-29.133 -24.289,-52.75 -54.25,-52.75 z m 0,89 c -20.297,0 -36.75,-16.175 -36.75,-36.13 0,-19.954 16.453,-36.13 36.75,-36.13 20.297,0 36.75,16.176 36.75,36.13 0,19.955 -16.453,36.13 -36.75,36.13 z"
                fill="#000"/>
        <path d="m 24.35987,833.76137 c -29.961,0 -54.25,23.617 -54.25,52.75 0,29.133 24.289,52.75 54.25,52.75 29.961,0 54.25,-23.617 54.25,-52.75 0,-29.133 -24.289,-52.75 -54.25,-52.75 z m 0,89 c -20.297,0 -36.75,-16.175 -36.75,-36.13 0,-19.954 16.453,-36.13 36.75,-36.13 20.297,0 36.75,16.176 36.75,36.13 0,19.955 -16.453,36.13 -36.75,36.13 z"
                fill="#000"/>
        <!-- (les deux ellipses ci-dessous ont un stroke rouge dans le fichier ; on les supprime ou on met noir pour cohérence) -->
        <!-- Elles ne sont pas indispensables au pictogramme ; on peut les omettre. -->

        <polygon transform="translate(-374.35913,563.79237)"
                points="217.469,234.969 167.469,311.969 177.969,318.469 234.969,242.469"
                fill="#000"/>
        <path d="m -108.70513,893.75737 c 3.17,1.29 19.07,0.916 22.788,-0.996 l 60.027,0 59.5,-91 -129.5,0 0,43.116 c -0.823,-0.074 -1.656,-0.116 -2.5,-0.116 -14.636,0 -26.5,11.417 -26.5,25.5 0,10.562 6.674,19.625 16.185,23.496"
                fill="#000"/>
        <rect x="-17.390137" y="880.76135" width="104" height="13.5" fill="#000"/>
        <polygon transform="translate(-374.35913,563.79237)"
                points="389.969,274.969 375.969,281.969 389.469,310.469 401.469,307.469"
                fill="#000"/>
        <polygon transform="translate(-374.35913,563.79237)"
                points="192.469,225.969 194.469,219.469 198.469,215.969 209.969,216.469 217.969,220.469 224.469,225.969 227.969,221.469 232.969,209.469 236.969,204.469 240.969,202.969 246.969,201.469 253.469,200.469 264.469,198.469 267.969,200.969 269.469,204.969 242.969,211.969 238.469,219.469 249.969,224.469 276.969,226.469 286.469,227.469 294.969,230.469 303.969,235.969 309.969,244.969 265.469,290.969 255.969,287.469 255.469,279.969 249.469,278.969 241.969,278.469 234.469,275.469 228.969,270.469 221.969,258.469 217.469,251.969 212.469,249.469 198.469,249.969 193.969,244.469 191.969,237.969 191.969,231.469"
                fill="#000"/>
        <polygon transform="translate(-374.35913,563.79237)"
                points="407.219,237.969 412.719,262.969 423.219,266.469 430.219,270.469 436.719,274.969 443.719,281.969 448.219,287.969 452.719,298.469 453.719,303.969 439.219,305.969 402.719,277.969 378.719,279.469 367.219,248.469 399.219,239.469"
                fill="#000"/>
        <rect x="-101.89014" y="836.26135" width="19.5" height="15" fill="#000"/>
        <rect x="-105.64014" y="881.26135" width="95" height="12.75" fill="#000"/>
        </g>`;

            const pictogram =
                `<g transform="translate(${margin},${margin}) scale(${s}) translate(0,${layerShiftY})">
        ${motoGroup}
        </g>`;

            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <rect x="1.5" y="1.5" rx="${r}" ry="${r}"
                width="${w - 3}" height="${h - 3}"
                fill="#fff" stroke="#000" stroke-width="${stroke}"/>
        ${pictogram}
        </svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4F") {
            const raw = String(value || "").trim();

            function fmtTonnage(s) {
                if (!s) return "> 3,5 t";
                const m = s.replace(/\s+/g, "")
                    .match(/^([<>]=?|≤|≥)?\s*([\d.,]+)\s*(t|tonnes?)?$/i);
                if (!m) {
                    const withT = /t\b/i.test(s) ? s : (s + " t");
                    return withT.replace(/\./g, ",").replace(/\s*t\b/i, " t");
                }
                let op = m[1] || "";
                let num = m[2] || "";
                if (op === "<=") op = "≤";
                if (op === ">=") op = "≥";
                num = num.replace(",", ".");
                const n = isNaN(parseFloat(num)) ? num : String(parseFloat(num));
                const withComma = n.replace(".", ",");
                return (op ? op + " " : "") + withComma + " t";
            }

            const txt = fmtTonnage(raw);

            const h = 32;
            const fs = 18;
            const ff = "Arial Narrow, Arial, Helvetica, sans-serif";
            const pad = 14;
            const emW = fs * 0.62;
            let w = Math.max(84, Math.round(pad * 2 + emW * Math.max(4, txt.length)));
            const r = 6;

            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
                `<rect x="1.5" y="1.5" rx="${r}" ry="${r}" width="${w - 3}" height="${h - 3}" fill="#fff" stroke="#000" stroke-width="3"/>` +
                `<text x="${w / 2}" y="${h / 2 + fs * 0.38}" font-family="${ff}" font-size="${fs}" font-weight="700" text-anchor="middle" fill="#000">${txt}</text>` +
                `</svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4G") {
            const w = 56, h = 32;
            const r = 6, stroke = 3;

            const srcW = 430.79999, srcH = 300;
            const layerShiftY = -752.36218;

            const margin = 3;
            const innerW = w - margin * 2;
            const innerH = h - margin * 2;

            const s = Math.min(innerW / srcW, innerH / srcH);

            const truckGroup = `
        <g transform="matrix(1.2622928,0,0,1.2622928,291.45569,962.24437)">
        <path
            id="path3854"
            d="m 73.980186,7.1260033 -269.173716,0 0,-13.92117 4.89407,0 0,-34.2130303 c -1.01195,-5.5112 8.30559,-8.29403 9.34322,-6.84261 l 3.91487,-37.595009 c 0.15177,-4.079433 1.30083,-7.765569 8.78241,-8.074555 l 32.23916,0 0,-27.003639 c -0.31061,-7.22221 4.15984,-8.92065 8.58958,-8.58958 l 194.205856,0 c 7.20455,0 7.37569,5.73912 7.20455,7.20455 z"
            style="fill:#000000;stroke:none"/>
        <path
            id="path3862"
            d="m -133.35497,-46.395227 0,-36.246535 c -0.15336,-1.375633 0.31576,-2.952489 -2.75822,-2.764563 l -27.73547,0 c -1.80037,-0.117556 -5.33706,1.004371 -5.2866,5.29875 l -2.98807,33.712348 z"
            style="fill:#ffffff;stroke:none"/>
        <g transform="translate(-232.92973,-137.90311)" id="g3850">
            <path
            d="m 235.36017,128.13559 c 0,15.72607 -12.74851,28.47458 -28.47458,28.47458 -15.72608,0 -28.47458,-12.74851 -28.47458,-28.47458 0,-15.72608 12.7485,-28.474577 28.47458,-28.474577 15.72607,0 28.47458,12.748497 28.47458,28.474577 z"
            transform="matrix(1.0966518,0,0,1.0966518,-135.87723,4.4701928)"
            style="fill:#000000;stroke:#ffffff;stroke-width:3"/>
            <path
            d="m 235.36017,128.13559 c 0,15.72607 -12.74851,28.47458 -28.47458,28.47458 -15.72608,0 -28.47458,-12.74851 -28.47458,-28.47458 0,-15.72608 12.7485,-28.474577 28.47458,-28.474577 15.72607,0 28.47458,12.748497 28.47458,28.474577 z"
            transform="matrix(1.0966518,0,0,1.0966518,23.227608,4.4701928)"
            style="fill:#000000;stroke:#ffffff;stroke-width:3"/>
        </g>
        </g>`;

            const pictogram =
                `<g transform="translate(${margin},${margin}) scale(${s}) translate(0,${layerShiftY})">
        ${truckGroup}
        </g>`;

            const svg =
                `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <rect x="1.5" y="1.5" rx="${r}" ry="${r}"
                width="${w - 3}" height="${h - 3}"
                fill="#fff" stroke="#000" stroke-width="${stroke}"/>
        ${pictogram}
        </svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4K") {
            const w = 64, h = 24;
            const r = 6, stroke = 3;

            const srcW = 300, srcH = 304.54999;
            const layerShiftY = -747.81217;

            const margin = 4;
            const innerW = w - margin * 2;
            const innerH = h - margin * 2;

            const s = Math.min(innerW / srcW, innerH / srcH);

            const pictogram = `
        <g transform="translate(${margin},${margin}) scale(${s}) translate(0,${layerShiftY})">
        <g transform="matrix(0.54883723,0,0,0.54883723,-507.16318,1051.4543)">
            <g transform="translate(449.10268,-577.25898)">
            <path style="fill:#000000;stroke:none"
                d="m 606.35593,366.10169 47.80225,12.80882 -24.54791,23.3145 77.60084,-19.04195 15.54478,43.92573 17.23397,-25.76397 12.4964,30.9989 10.95914,-33.50898 19.31855,27.65167 6.05407,-42.68482 80.04472,22.07894 -36.89062,-26.55914 64.21432,-13.2197 0,90.88984 c 0.77768,11.64719 -7.77725,18.79831 -16.84322,21.61016 l 0,49.25848 c -0.0479,9.74322 -2.28104,10.63087 -6.05484,10.48729 l -22.22906,0 c -2.75466,-0.0245 -8.24106,-0.0433 -8.26271,-8.26271 l 0,-51.48306 -180.82627,0 0,50.21187 c 0.0938,7.11842 -2.54828,9.24216 -5.5044,9.5339 l -25.79857,0 c -3.09648,-0.21747 -4.00256,0.82064 -5.56144,-5.56144 l 0,-54.18433 c -11.15662,-0.56558 -17.9871,-10.1699 -18.75,-18.75 z" />
            <g transform="translate(451.66094,0.00652086)">
                <circle fill="#ffffff" r="19.9" cx="191.9" cy="431.7"/>
                <circle fill="#ffffff" r="19.9" cx="402.8" cy="431.7"/>
            </g>
            </g>
            <path fill="#ff0000" stroke="none"
            d="m 1175.927,-406.93856 26.2976,-105.66737 27.9661,109.87817 19.3856,-24.70868 2.2245,30.19068 53.7077,-60.69916 -23.517,60.06356 63.8771,-19.06779 -43.5381,47.66949 30.5085,-1.27119 -49.5763,40.04238 79.1314,-7.62712 -68.1674,52.91313 67.5318,-20.49788 -77.5424,62.92373 84.5339,17.16102 -107.733,24.47033 17.7966,11.75848 -47.6695,-14.30085 -5.0848,32.41526 -15.2542,-21.61017 -9.8517,22.88135 -12.3941,-20.97457 -14.6186,22.24576 -13.9831,-35.27543 -51.8008,12.71187 13.3474,-8.58051 -97.5635,-28.2839 76.7592,-9.70409 -57.3736,-24.61794 50.2118,-6.99153 -33.3686,-28.91949 39.7246,6.99153 -61.3348,-62.28814 74.2361,22.04033 -66.609,-100.21829 85.1695,38.13559 -18.1144,-28.6017 36.2288,19.70339 -5.0847,-58.15678 z"/>
        </g>
        </g>`;

            const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <rect x="1.5" y="1.5" rx="${r}" ry="${r}"
                width="${w - 3}" height="${h - 3}"
                fill="#fff" stroke="#000" stroke-width="${stroke}"/>
        ${pictogram}
        </svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4L") {
            const w = 64, h = 24;
            const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="304.55" viewBox="0 0 300 304.55">
    <g transform="translate(0,-747.81217)">
        <g transform="matrix(0.50372367,0,0,0.50372367,-427.73823,976.95041)">
        <rect ry="65.451103" y="-452.08929" x="851.85663" height="599.09375" width="590.15643"
                style="fill:#ffffff;stroke:#000000;stroke-width:5.40820599;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
        <g transform="translate(847.16351,-429.66106)">
            <g>
            <path d="m 78.425932,402.36217 c 5.965599,-0.45215 18.557406,-3.56983 29.315738,-2.18131 32.54649,4.20062 62.42662,15.14849 88.02104,15.23024 33.82733,2.06358 63.57905,-17.52909 95.00108,-16.13215 46.10819,-0.0985 50.15768,17.07323 102.68963,16.73849 21.94807,0.943 54.65605,-9.06431 82.43011,-15.06238 13.1364,-2.83693 23.22253,-1.42985 37.29645,0.11064 3.68767,0.40364 10.91423,0.34143 10.91423,0.34143"
                    style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
            <path d="m 77.801453,449.16774 c 5.965599,-0.45215 18.557406,-3.56983 29.315737,-2.18131 32.54649,4.20062 62.42662,15.14849 88.02104,15.23024 33.82733,2.06358 63.57905,-17.52909 95.00108,-16.13215 46.10819,-0.0985 50.15768,17.07323 102.68963,16.73849 21.94807,0.943 54.65605,-9.06431 82.43011,-15.06238 13.1364,-2.83693 23.22253,-1.42985 37.29645,0.11064 3.68767,0.40364 10.91423,0.34143 10.91423,0.34143"
                    style="fill:none;stroke:#000000;stroke-width:15;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
            <path d="m 142.69068,348.30508 315.73093,0"
                    style="fill:none;stroke:#000000;stroke-width:7;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none"/>
            <path d="m 154.13136,338.76749 c 0.19183,3.67259 1.52419,6.3136 3.58825,6.21504 l 20.59265,0 c 1.59917,0.16968 4.19409,-1.37571 5.05638,-5.05639 l 0,-24.03631 97.41418,0 c 12.92078,22.43128 32.34204,12.43435 38.87589,0 l 96.01926,0 0,23.55181 c 0.28625,2.73868 2.83775,5.87619 5.7537,5.7537 l 18.1131,0 c 2.05269,0.15662 6.32225,-1.37103 6.95947,-6.95947 l 0,-66.88322 c 0.13288,-1.95421 -1.38941,-5.05082 -5.28083,-5.28083 l -20.77951,0 c -1.8143,-0.0933 -4.9887,1.55761 -4.76593,4.76593 l 0,21.85293 -48.04237,0 0,-15.57204 -135.72854,0 0,15.57204 -48.53842,0 0,-21.22567 -5.39319,-5.39319 -17.52813,0 -6.31596,6.31596 z"
                    style="fill:#000000;stroke:none"/>
            </g>
            <!-- ellipse rouge officielle (chemin elliptique transformé) -->
            <path d="m 446.50426,249.494 c 0,23.85687 -65.4499,43.19668 -146.18645,43.19668 -80.73655,0 -146.18645,-19.33981 -146.18645,-43.19668 0,-23.85686 65.4499,-43.19667 146.18645,-43.19667 80.73655,0 146.18645,19.33981 146.18645,43.19667 z"
                style="fill:#ff0000;stroke:none"
                transform="matrix(0.99999995,0,0,1.9676022,4.6167523e-6,-283.20814)"/>
        </g>
        </g>
    </g>
    </svg>`.trim();

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4M") {
            const w = 64, h = 24;
            const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <!-- Created with Inkscape (http://www.inkscape.org/) -->
    <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="430" height="366" id="svg3864" version="1.1" inkscape:version="0.91 r13725" sodipodi:docname="France_road_sign_M4m.svg">
        <defs id="defs3866"/>
        <sodipodi:namedview id="base" pagecolor="#ffffff" bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:zoom="0.6871719" inkscape:cx="-7.8266119" inkscape:cy="57.852457" inkscape:document-units="px" inkscape:current-layer="layer1" showgrid="false" inkscape:snap-bbox="true" inkscape:bbox-paths="true" inkscape:bbox-nodes="true" inkscape:snap-bbox-edge-midpoints="true" inkscape:snap-bbox-midpoints="true" inkscape:object-paths="true" inkscape:snap-intersection-paths="true" inkscape:object-nodes="true" inkscape:snap-smooth-nodes="true" inkscape:snap-midpoints="true" inkscape:snap-object-midpoints="true" inkscape:snap-center="true" inkscape:snap-page="true" showguides="true" inkscape:guide-bbox="true" inkscape:window-width="1440" inkscape:window-height="788" inkscape:window-x="0" inkscape:window-y="1" inkscape:window-maximized="1"/>
        <metadata id="metadata3869">
            <rdf:RDF>
                <cc:Work rdf:about="">
                    <dc:format>image/svg+xml</dc:format>
                    <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                    <dc:title/>
                </cc:Work>
            </rdf:RDF>
        </metadata>
        <g inkscape:label="Calque 1" inkscape:groupmode="layer" id="layer1" transform="translate(0,-686.36219)">
            <rect style="fill:#ffffff;stroke:#000000;stroke-width:2.209692;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" id="rect2995" width="427.79013" height="363.79031" x="1.1049371" y="687.46704" ry="64.742134"/>
            <g id="g4285" transform="matrix(1.384742,0,0,1.384742,965.48278,2.0987819)">
                <polygon transform="translate(-829.3453,340.32404)" id="polygon4244" points="328.114,357.475 335.096,356.991 335.096,351.176 340.085,345.361 354.383,345.361 359.371,351.176 359.371,393.329 354.716,399.143 340.085,399.627 335.428,394.298 335.096,387.999 328.114,387.999 328.114,376.371 293.531,378.309 285.883,382.186 277.237,378.793 243.32,375.886 243.32,387.999 236.004,387.999 236.004,393.813 232.347,398.659 215.721,399.143 212.396,393.813 212.728,351.661 216.385,345.848 231.682,345.848 236.004,350.691 236.336,356.991 243.652,357.475 243.652,368.619 277.57,366.682 284.885,362.805 293.531,366.195 328.114,368.619 " style="stroke:#000000;stroke-width:0.17640001;stroke-linecap:round;stroke-linejoin:round"/>
                <rect id="rect4246" height="4.8449998" width="167.925" y="667.27502" x="-625.92828" style="stroke:#000000;stroke-width:5;stroke-linecap:round;stroke-linejoin:round"/>
                <polygon transform="translate(-829.3453,340.32404)" id="polygon4248" points="341.393,298.614 234.724,299.831 234.724,189.119 341.393,189.119 " style="fill:none;stroke:#ffff00;stroke-width:0.17640001;stroke-linecap:round;stroke-linejoin:round"/>
                <polygon transform="translate(-829.3453,340.32404)" id="polygon4250" points="363.061,314.43 212.223,313.213 224.724,175.736 350.56,175.736 " style="stroke:#000000;stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/>
                <rect id="rect4252" height="121" width="112" y="524.38104" x="-598.28827" style="fill:#f17e01"/>
            </g>
        </g>
    </svg>`;

            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else if (code === "M4X") {
            const w = 64, h = 24;
            const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="430" height="160" version="1.1">
    <g transform="translate(0,-892.36219)">
        <rect style="fill:#ffffff;stroke:#000000;stroke-width:1.46001;stroke-miterlimit:4;stroke-dasharray:none"
            width="428.53983" height="158.53999" x="0.73009604" y="893.0921" ry="28.214649"/>
        <g transform="matrix(0.73971716,0,0,0.73971716,228.63796,270.88608)">
        <path d="m 251.93691,931.63933 c 0,-37.371 -49.1,-67.667 -109.667,-67.667 -60.567,0 -109.667,30.295 -109.667,67.667 0,0.223 0.01,0.444 0.014,0.667 l -0.013,0 0,72.66697 84.358,0 c 0.536,-13.34297 11.732,-23.99997 25.476,-23.99997 13.741,0 24.938,10.657 25.474,23.99997 l 84.025,0 0,-72.66697 -0.014,0 c 0.004,-0.222 0.014,-0.444 0.014,-0.667 z m -126.334,13.082 0,0.085 -54,0 0,-0.214 c -9.042,-1.309 -16,-9.134 -16,-18.62 0,-9.486 6.958,-17.311 16,-18.62 l 0,-0.214 54,0 0,0.085 c 9.527,0.852 17.001,8.915 17.001,18.749 0,9.834 -7.474,17.898 -17.001,18.749 z m 102.667,30.419 c 0,9.572 -8.581,17.333 -19.166,17.333 -10.523,0 -19.059,-7.672 -19.158,-17.167 l -0.009,0 0,-53.333 c 0,-9.573 8.581,-17.333 19.167,-17.333 10.585,0 19.166,7.76 19.166,17.333 0,0.736 -0.067,1.458 -0.166,2.169 l 0,48.827 c 0.098,0.714 0.166,1.434 0.166,2.171 z"
                style="fill:#000000;stroke:none"/>
        <ellipse ry="13.667" rx="14" cy="924.47333" cx="209.10394" style="fill:#000000;stroke:none"/>
        <ellipse ry="23" rx="22.875" cy="1006.9733" cx="142.5199" style="fill:#000000;stroke:none"/>
        <rect height="10" width="30" y="994.97333" x="9.7698994" style="fill:#000000;stroke:none"/>
        <path d="m -282.33616,1004.6011 c -2.97667,-0.1849 -5.80674,-0.6277 -6.11039,-5.51703 l 0,-17.22687 c 0.30743,-4.92671 4.01426,-7.75737 8.07967,-8.06522 l 70.80463,-6.3851 46.26993,-46.26993 115.458067,0 44.0590258,44.05903 11.9504218,0 c 4.0933454,0.14659 5.5315064,1.49142 6.1052574,6.10526 l 0,33.32966 -280.661362,0 z"
                style="fill:#000000;stroke:#000000;stroke-width:0.72752553px;stroke-linecap:butt;stroke-linejoin:miter"/>
        <circle cx="-238.98311" cy="1005.0933" r="26.5" style="fill:#ffffff;stroke:none"/>
        <circle cx="-30.730089" cy="1006.1337" r="26.5" style="fill:#ffffff;stroke:none"/>
        <circle r="23.5" cy="1005.0933" cx="-238.98311" style="fill:#000000;stroke:none"/>
        <circle r="23.5" cy="1006.1337" cx="-30.730089" style="fill:#000000;stroke:none"/>
        <path d="m -112.14648,964.83563 -70.94734,0 c -3.883,-0.16685 -4.70037,-2.38879 -3.26492,-4.88172 l 28.31431,-28.3143 45.89795,0 z"
                style="fill:#ffffff;stroke:none"/>
        <path d="m -102.99122,964.83563 62.274987,0 c 3.408356,-0.16685 4.125818,-5.82201 2.86582,-8.31494 l -24.85326,-24.88108 -40.287547,0 z"
                style="fill:#ffffff;stroke:none"/>
        </g>
    </g>
    </svg>`;
            var scale = RS_getScale();
            return { uri: uri(svg), w: w * scale, h: h * scale };
        }

        else txt = (code + (value && value !== "NULL" ? " " + value : ""));

        const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
            '<rect x="1.5" y="1.5" rx="4" ry="4" width="' + (w - 3) + '" height="' + (h - 3) + '" fill="#fff" stroke="#000" stroke-width="3"/>' +
            '<text x="' + (w / 2) + '" y="' + (h / 2 + 6) + '" font-family="Arial,Helvetica" font-size="14" font-weight="700" text-anchor="middle" fill="#000">' + (txt || "") + '</text>' +
            '</svg>';

        var scale = RS_getScale();
        return { uri: uri(svg), w: w * scale, h: h * scale };
    }

    function RS_getSignFamily(code) {
        code = (code || "").toUpperCase();
        if (code.startsWith('EB')) return 'EB';
        if (code.startsWith('C2')) return 'C2';
        if (code.startsWith('C1')) return 'C1';
        if (code.startsWith('B')) return 'B';
        if (code.startsWith('M')) return 'M';
        return 'OTHER';
    }

    function RS_isSignAllowed(code) {
        var family = RS_getSignFamily(code);
        var el = document.getElementById('rsFilter' + family);

        if (!el) return true;
        return el.checked;
    }

    function RS_loadFilterState() {
        try {
            var saved = JSON.parse(localStorage.getItem('dbf_rs_filters') || '{}');
            ['B', 'EB', 'C1', 'C2', 'M'].forEach(function (f) {
                var cb = document.getElementById('rsFilter' + f);
                if (cb && saved[f] !== undefined) cb.checked = saved[f];
            });
            RS_syncFilterAll();
        } catch (e) {  }
    }

    function RS_saveFilterState() {
        var state = {};
        ['B', 'EB', 'C1', 'C2', 'M'].forEach(function (f) {
            var cb = document.getElementById('rsFilter' + f);
            if (cb) state[f] = cb.checked;
        });
        localStorage.setItem('dbf_rs_filters', JSON.stringify(state));
    }

    function RS_syncFilterAll() {
        var allCb = document.getElementById('rsFilterAll');
        if (!allCb) return;
        var cbs = document.querySelectorAll('.rsFilterCb');
        var allChecked = true;
        cbs.forEach(function (cb) { if (!cb.checked) allChecked = false; });
        allCb.checked = allChecked;
    }

    function RS_initFilters() {
        RS_loadFilterState();

        var allCb = document.getElementById('rsFilterAll');
        if (allCb) {
            allCb.addEventListener('change', function () {
                var checked = this.checked;
                document.querySelectorAll('.rsFilterCb').forEach(function (cb) { cb.checked = checked; });
                RS_saveFilterState();
                debounced_show_border();
            });
        }

        document.querySelectorAll('.rsFilterCb').forEach(function (cb) {
            cb.addEventListener('change', function () {
                RS_syncFilterAll();
                RS_saveFilterState();
                debounced_show_border();
            });
        });
    }

    function RS_queueSign(main, pano, lon, lat) {
        var mainIcon = RS_buildIcon(main.code, main.value);
        var panoIcon = (pano && pano.code) ? RS_buildPanonceau(pano.code, pano.value, mainIcon.w) : null;

        var cosLat = Math.cos((lat * Math.PI) / 180);
        RS_pending.push({
            mx: lon * 111320 * cosLat,
            my: lat * 110540,
            pt4326: { lon: lon, lat: lat },
            mainIcon: mainIcon,
            panoIcon: panoIcon,
            mainCode: main && main.code,
            mainValue: main && main.value
        });
    }

    function RS_renderClusters() {
        if (!RS_Layer) RS_Layer = DBF_getLayer("__WME_Draw_Border_RS");
        if (!RS_Layer) return;

        DBF_cleanupLayer(RS_Layer);
        DBF_clearFeatureIndex(RS_Layer);

        var clusters = [];
        RS_pending.forEach(function (item) {
            var found = null;
            for (var ci = 0; ci < clusters.length; ci++) {
                var c = clusters[ci];
                var dx = item.mx - c.anchor.x;
                var dy = item.my - c.anchor.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d <= RS_CLUSTER_THRESH_M) { found = c; break; }
            }
            if (!found) {
                clusters.push({
                    anchor: { x: item.mx, y: item.my },
                    lon: item.pt4326.lon,
                    lat: item.pt4326.lat,
                    items: [item]
                });
            } else {
                found.items.push(item);
                var n = found.items.length;
                found.anchor.x = (found.anchor.x * (n - 1) + item.mx) / n;
                found.anchor.y = (found.anchor.y * (n - 1) + item.my) / n;
                found.lon = (found.lon * (n - 1) + item.pt4326.lon) / n;
                found.lat = (found.lat * (n - 1) + item.pt4326.lat) / n;
            }
        });

        clusters.forEach(function (c, idx) {
            var composite = RS_buildCompositeSVG(c.items);
            RS_Layer.addFeatures([{
                id: "RS_CL_" + idx + "_" + c.lon + "_" + c.lat,
                geometry: { type: "Point", coordinates: [c.lon, c.lat] },
                style: {
                    externalGraphic: composite.uri,
                    graphicWidth: composite.w,
                    graphicHeight: composite.h,
                    graphicXOffset: -composite.w / 2,
                    graphicYOffset: -composite.h / 2,
                    graphicOpacity: 1.0
                }
            }]);
        });

        var speedGen = ++_rsSpeedGen;
        RS_clearSpeedLabels();
        RS_markSpeedMismatches(clusters, speedGen);

        RS_pending = [];
    }

    function RS_buildCompositeSVG(items) {
        var pad = 6;
        var vpad = 4;
        var parts = [];
        var x = 0, maxH = 0;

        items.forEach(it => {
            var m = it.mainIcon;
            var p = it.panoIcon;

            var cellW = Math.max(m.w, p ? p.w : 0);
            var cellH = m.h + (p ? (vpad + p.h) : 0);

            var mX = x + (cellW - m.w) / 2;
            var mY = 0;

            var pTag = "";
            if (p) {
                var pX = x + (cellW - p.w) / 2;
                var pY = m.h + vpad;
                pTag = '<image x="' + pX + '" y="' + pY + '" width="' + p.w + '" height="' + p.h + '" href="' + p.uri + '"/>';
            }

            parts.push(
                '<image x="' + mX + '" y="' + mY + '" width="' + m.w + '" height="' + m.h + '" href="' + m.uri + '"/>' + pTag
            );

            x += cellW + pad;
            if (cellH > maxH) maxH = cellH;
        });

        var totalW = Math.max(1, x - pad);
        var totalH = Math.max(1, maxH);

        var svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="' + totalW + '" height="' + totalH + '" viewBox="0 0 ' + totalW + ' ' + totalH + '">'
            + parts.join('')
            + '</svg>';

        return {
            uri: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
            w: totalW,
            h: totalH
        };
    }

    function DBF_distPointToLine(lon, lat, coordinates) {
        if (!coordinates || coordinates.length < 2) return Infinity;
        var cos = Math.cos(lat * Math.PI / 180);
        var best = Infinity;
        for (var i = 1; i < coordinates.length; i++) {
            var a = coordinates[i - 1];
            var b = coordinates[i];
            if (!a || !b || typeof a[0] !== "number" || typeof b[0] !== "number") continue;
            var bx = (b[0] - a[0]) * 111320 * cos;
            var by = (b[1] - a[1]) * 110540;
            var px = (lon - a[0]) * 111320 * cos;
            var py = (lat - a[1]) * 110540;
            var len2 = bx * bx + by * by;
            var t = len2 ? Math.max(0, Math.min(1, (px * bx + py * by) / len2)) : 0;
            var dx = px - t * bx;
            var dy = py - t * by;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < best) best = d;
        }
        return best;
    }

    function DBF_b14Speed(code, value) {
        if (!/^B14$/i.test(String(code || "").trim())) return null;
        var n = parseInt(String(value == null ? "" : value).replace(/[^\d]/g, ""), 10);
        if (!isFinite(n) || n < 5 || n > 130) return null;
        return n;
    }

    function DBF_segmentLimitNumbers(seg) {
        var out = [];
        [seg && seg.fwdSpeedLimit, seg && seg.revSpeedLimit].forEach(function (v) {
            if (typeof v === "number" && isFinite(v)) out.push(v);
            else if (v != null && v !== "" && isFinite(Number(v))) out.push(Number(v));
        });
        return out;
    }

    function DBF_nearestDrivableSegment(lon, lat, segments) {
        var best = null;
        var bestD = RS_SPEED_MAX_M;
        for (var i = 0; i < segments.length; i++) {
            var seg = segments[i];
            if (!seg || seg.isDrivable === false || !seg.geometry) continue;
            var geom = seg.geometry;
            var lines = geom.type === "MultiLineString" ? geom.coordinates : [geom.coordinates];
            if (!lines) continue;
            for (var li = 0; li < lines.length; li++) {
                var d = DBF_distPointToLine(lon, lat, lines[li]);
                if (d < bestD) {
                    bestD = d;
                    best = seg;
                }
            }
        }
        return best;
    }

    function RS_clearSpeedLabels() {
        if (!RS_Layer || !RS_Layer.features) return;
        var old = RS_Layer.features.filter(function (f) {
            return f && typeof f.id === "string" && f.id.indexOf("RS_SPD_") === 0;
        });
        if (old.length) RS_Layer.removeFeatures(old);
    }

    async function RS_markSpeedMismatches(clusters, gen) {
        var statusEl = document.getElementById("rsSpeedCheck");
        var signs = [];
        (clusters || []).forEach(function (c) {
            (c.items || []).forEach(function (it) {
                var speed = DBF_b14Speed(it.mainCode, it.mainValue);
                if (speed == null || !it.pt4326) return;
                signs.push({ lon: it.pt4326.lon, lat: it.pt4326.lat, speed: speed });
            });
        });
        if (!signs.length) {
            if (statusEl && gen === _rsSpeedGen) statusEl.textContent = "";
            return;
        }
        if (!wmeSDK || !wmeSDK.DataModel || !wmeSDK.DataModel.Segments) return;
        var segments = [];
        try {
            segments = await DBF_await(wmeSDK.DataModel.Segments.getAll()) || [];
        } catch (e) {
            return;
        }
        if (gen !== _rsSpeedGen || !RS_Layer) return;
        var features = [];
        var diffs = 0;
        var unsets = 0;
        signs.forEach(function (s, idx) {
            var seg = DBF_nearestDrivableSegment(s.lon, s.lat, segments);
            if (!seg) return;
            var speeds = DBF_segmentLimitNumbers(seg);
            if (speeds.indexOf(s.speed) !== -1) return;
            var label;
            var color;
            if (!speeds.length) {
                unsets++;
                label = s.speed + " · sans limite";
                color = "#b45309";
            } else {
                diffs++;
                var uniq = speeds.filter(function (v, i) { return speeds.indexOf(v) === i; });
                label = s.speed + " ≠ " + uniq.join("/");
                color = "#b00020";
            }
            features.push({
                id: "RS_SPD_" + idx + "_" + s.lon.toFixed(5) + "_" + s.lat.toFixed(5),
                geometry: { type: "Point", coordinates: [s.lon, s.lat] },
                style: {
                    pointRadius: 0,
                    fillOpacity: 0,
                    strokeOpacity: 0,
                    label: label,
                    fontColor: color,
                    fontWeight: "bold",
                    fontSize: "11px",
                    labelOutlineColor: "#ffffff",
                    labelOutlineWidth: 3,
                    labelYOffset: -22
                }
            });
        });
        if (gen !== _rsSpeedGen || !RS_Layer) return;
        if (features.length) RS_Layer.addFeatures(features);
        if (statusEl) {
            if (!diffs && !unsets) statusEl.textContent = "B14 : limites du segment alignées (" + signs.length + "). Lecture seule.";
            else statusEl.textContent = "B14 : " + diffs + " écart" + (diffs > 1 ? "s" : "") + ", " + unsets + " sans limite. Lecture seule, rien n’est enregistré.";
        }
    }

    var _banSearchGen = 0;

    function DBF_clearBanSearchHit() {
        _banSearchGen++;
        var layer = DBF_getLayer("__WME_Draw_Border_Search");
        if (!layer) return;
        layer.destroyFeatures();
        layer.setVisibility(false);
    }

    async function DBF_showBanSearchHit(hit) {
        if (!hit) return;
        var lon = Number(hit.lon);
        var lat = Number(hit.lat);
        if (!isFinite(lon) || !isFinite(lat)) return;
        var gen = ++_banSearchGen;
        var zoom = DBF_getZoom();
        DBF_setMapCenter(lon, lat, zoom >= 19 ? zoom : 19);
        var layer = DBF_ensureSdkLayer("__WME_Draw_Border_Search", "Recherche BAN");
        if (!layer || gen !== _banSearchGen) return;
        layer.setVisibility(true);
        layer.features = [];
        if (layer._ids) layer._ids.clear();
        if (wmeSDK && wmeSDK.Map) {
            try {
                await DBF_await(wmeSDK.Map.removeAllFeaturesFromLayer({ layerName: layer.layerName }));
            } catch (e) { }
        }
        if (gen !== _banSearchGen) return;
        var label = [hit.numero, hit.voie].filter(function (part) { return !!part; }).join(" ");
        layer.addFeatures([{
            id: "DBF_BAN_SEARCH_HIT",
            geometry: { type: "Point", coordinates: [lon, lat] },
            style: {
                strokeColor: "#4f46e5",
                strokeWidth: 3,
                fillColor: "#818cf8",
                fillOpacity: 0.9,
                pointRadius: 9,
                label: label,
                fontColor: "#1e1b4b",
                fontWeight: "bold",
                fontSize: "12px",
                labelOutlineColor: "#ffffff",
                labelOutlineWidth: 3,
                labelYOffset: 16
            }
        }]);
    }

    function getSignalementId(banId) {
        if (!banId) return null;
        return banId.split('_').slice(0, 3).join('_');
    }

    function DBF_inseeFromBanId(banId) {
        if (!banId) return null;
        var head = String(banId).split('_')[0] || '';
        return head ? head.toUpperCase() : null;
    }

    async function DBF_fetchMairieEmails(codeInsee) {
        var code = String(codeInsee || '').toUpperCase();
        if (!code) return [];
        if (_mairieMailCache[code]) return _mairieMailCache[code];

        var where = 'code_insee_commune="' + code + '" AND search(nom,"Mairie")';
        var url = ANNUAIRE_API
            + '?where=' + encodeURIComponent(where)
            + '&limit=5&select=nom,adresse_courriel,code_insee_commune';
        try {
            var res = await DBF_gmGet(url, 15000, 1);
            var data = JSON.parse(res.responseText || '{}');
            var emails = [];
            var rows = data.results || [];
            for (var i = 0; i < rows.length; i++) {
                var mail = rows[i] && rows[i].adresse_courriel;
                if (mail && emails.indexOf(mail) === -1) emails.push(mail);
            }
            _mairieMailCache[code] = emails;
            return emails;
        } catch (e) {
            if (debug) console.warn('[DBF] annuaire mairie:', e && e.message);
            _mairieMailCache[code] = [];
            return [];
        }
    }

    async function DBF_fetchCommuneSignalementStatus(codeInsee) {
        var code = String(codeInsee || '').toUpperCase();
        if (!code) return null;
        if (_signalementStatusCache[code]) return _signalementStatusCache[code];
        var url = BAN_SIGNALEMENT_API + '/settings/commune-status/' + encodeURIComponent(code);
        var res = await DBF_gmGet(url, 15000, 2);
        var data = JSON.parse(res.responseText || '{}');
        _signalementStatusCache[code] = data;
        return data;
    }

    function checkSignalement(banId, callback) {
        const id = getSignalementId(banId);
        if (!id) return;
        var insee = DBF_inseeFromBanId(id);
        if (!insee) {
            callback({ accepted: false, error: true, id: id });
            return;
        }

        (async function () {
            try {
                var status = await DBF_fetchCommuneSignalementStatus(insee);
                var accepted = !!(status && status.disabled === false);
                var emails = [];
                if (!accepted) {
                    emails = await DBF_fetchMairieEmails(insee);
                }
                callback({
                    id: id,
                    insee: insee,
                    accepted: accepted,
                    mode: status && status.mode,
                    message: status && status.message,
                    emails: emails,
                    error: false
                });
            } catch (e) {
                if (debug) console.warn('[DBF] signalement status:', e && e.message);
                callback({ accepted: false, error: true, id: id, insee: insee });
            }
        })();
    }

    function renderResult(container, data) {
        if (!container) return;
        DBF_clearEl(container);
        if (data.error) {
            container.appendChild(document.createTextNode("❌ Erreur lors de la vérification"));
            return;
        }

        window.DBF_currentSignalementData = {
            id: data.id,
            numero: data.numero,
            voie: data.voie,
            commune: data.commune
        };

        var actions = document.getElementById('dbfSignalementActions');
        if (actions) actions.style.display = 'block';

        if (data.accepted) {
            var okTxt = "✅ Commune participante";
            if (data.mode) okTxt += " (" + data.mode + ")";
            container.appendChild(document.createTextNode(okTxt));
            container.appendChild(document.createElement("br"));
            var sid = encodeURIComponent(String(data.id || ""));
            var link = DBF_el("a", {
                href: "https://signalement.adresse.data.gouv.fr/#/" + sid,
                target: "_blank",
                rel: "noopener noreferrer",
                text: "✏️ Modifier / Demander suppression"
            });
            container.appendChild(link);
        } else {
            container.appendChild(document.createTextNode("❌ Signalements désactivés"));
            if (data.message) {
                container.appendChild(document.createElement("br"));
                container.appendChild(document.createTextNode(data.message));
            }
            container.appendChild(document.createElement("br"));
            var mail = (data.emails && data.emails.length) ? DBF_safeMailto(data.emails[0]) : null;
            if (mail) {
                container.appendChild(DBF_el("a", { href: mail, text: "📧 Contacter la mairie" }));
            } else {
                container.appendChild(document.createTextNode("📧 Contact mairie indisponible"));
            }
        }
    }

    var _banSearchTimer = null;
    var _banSearchReq = 0;
    var _banSearchSelected = null;

    function DBF_mapBanSearchRow(r) {
        if (!r) return null;
        var lon = Number(r.lon);
        var lat = Number(r.lat);
        if (!isFinite(lon) || !isFinite(lat)) return null;
        return {
            id_raw: r.id || '',
            numero: r.numero || '',
            voie: r.nom_voie || '',
            commune: r.nom_commune || '',
            label: r.label || '',
            lon: lon,
            lat: lat
        };
    }

    function DBF_setBanSearchSelection(hit) {
        _banSearchSelected = hit || null;
        window.DBF_currentSignalementData = null;

        var selectedEl = document.getElementById('dbfBanSelected');
        var checkWrap = document.getElementById('dbfSignalementCheckWrap');
        var resultEl = document.getElementById('dbfSignalementResult');
        var actions = document.getElementById('dbfSignalementActions');

        if (resultEl) DBF_clearEl(resultEl);
        if (actions) actions.style.display = 'none';

        if (!_banSearchSelected) {
            if (selectedEl) {
                selectedEl.style.display = 'none';
                DBF_clearEl(selectedEl);
            }
            if (checkWrap) checkWrap.style.display = 'none';
            return;
        }

        var label = _banSearchSelected.label
            || ((_banSearchSelected.numero ? _banSearchSelected.numero + ' – ' : '')
                + (_banSearchSelected.voie || '')
                + (_banSearchSelected.commune ? ' (' + _banSearchSelected.commune + ')' : ''));
        if (selectedEl) {
            DBF_setText(selectedEl, 'Sélection : ' + label);
            selectedEl.style.display = 'block';
        }
        if (checkWrap) checkWrap.style.display = _banSearchSelected.id_raw ? 'block' : 'none';
    }

    function DBF_runSelectedSignalementCheck() {
        if (!_banSearchSelected || !_banSearchSelected.id_raw) return;
        var box = document.getElementById('dbfSignalementResult');
        if (!box) return;

        DBF_clearEl(box);
        var loadChip = DBF_el("div", { className: "dbf-chip loading" });
        var loadA = DBF_el("a");
        loadA.appendChild(document.createTextNode("Vérification… "));
        loadA.appendChild(DBF_el("span", { className: "dbf-spinner" }));
        loadChip.appendChild(loadA);
        box.appendChild(loadChip);

        var adresseInfo = {
            numero: _banSearchSelected.numero,
            voie: _banSearchSelected.voie,
            commune: _banSearchSelected.commune
        };
        checkSignalement(_banSearchSelected.id_raw, function (r) {
            r.numero = adresseInfo.numero;
            r.voie = adresseInfo.voie;
            r.commune = adresseInfo.commune;
            renderResult(box, r);
        });
    }

    function DBF_renderBanSearchHits(box, input, hits) {
        DBF_clearEl(box);
        if (!hits.length) {
            box.appendChild(DBF_msgEl('Aucun résultat.'));
            box.style.display = 'block';
            return;
        }
        hits.forEach(function (a) {
            var d = document.createElement('div');
            d.className = 'dbf-item';
            d.textContent = a.label || ((a.numero ? a.numero + ' – ' : '') + a.voie + (a.commune ? ' (' + a.commune + ')' : ''));
            d.title = 'Centrer la carte sur cette adresse';
            d.onclick = function () {
                input.value = d.textContent;
                box.style.display = 'none';
                DBF_showBanSearchHit(a);
                DBF_setBanSearchSelection(a);
            };
            box.appendChild(d);
        });
        box.style.display = 'block';
    }

    function DBF_queryBanFrance(q, reqId, box, input) {
        DBF_geocodeSearch(q, 15).then(function (hits) {
                    if (reqId !== _banSearchReq) return;
            if (!hits.length) {
                        DBF_clearEl(box);
                box.appendChild(DBF_msgEl('Aucun résultat.'));
                            box.style.display = 'block';
                            return;
                        }
                        DBF_renderBanSearchHits(box, input, hits);
        }).catch(function (err) {
                    if (reqId !== _banSearchReq) return;
                    DBF_clearEl(box);
            box.appendChild(DBF_msgEl('Erreur géocodeur IGN : ' + (err && err.message ? err.message : 'réseau')));
                    box.style.display = 'block';
            });
    }

    function DBF_initBanSearch() {
        var input = document.getElementById('dbf-ban-search');
        var box = document.getElementById('dbf-ban-results');

        if (!input || !box || input._dbfBound) return;
        input._dbfBound = true;

        input.addEventListener('input', function () {
            var q = String(input.value || '').trim();
            if (_banSearchTimer) clearTimeout(_banSearchTimer);
            _banSearchReq++;

            if (!q) {
                box.style.display = 'none';
                DBF_clearEl(box);
                DBF_clearBanSearchHit();
                DBF_setBanSearchSelection(null);
                return;
            }
            if (q.length < 3) {
                DBF_clearEl(box);
                box.appendChild(DBF_msgEl('Saisissez au moins 3 caractères…'));
                box.style.display = 'block';
                return;
            }

            DBF_clearEl(box);
            box.appendChild(DBF_msgEl('Recherche en France…'));
            box.style.display = 'block';

            var reqId = _banSearchReq;
            _banSearchTimer = setTimeout(function () {
                DBF_queryBanFrance(q, reqId, box, input);
            }, 450);
        });
    }

    function DBF_buildMailTemplate(data) {
        return `Objet : Signalement d’une anomalie d’adresse – ${data.commune}

    Madame, Monsieur,

    Je me permets de vous contacter en tant qu’éditeur bénévole de la carte Waze,
    utilisée quotidiennement par de nombreux usagers (automobilistes, services de secours,
    livraisons, transports, etc.).

    Dans le cadre d’un travail d’amélioration de la précision cartographique sur votre commune,
    j’ai identifié une anomalie concernant une adresse référencée dans la Base Adresse Nationale (BAN).

    Adresse concernée :
    – Identifiant BAN : ${data.id}
    – Adresse : ${data.numero} ${data.voie}
    – Commune : ${data.commune}

    Cette incohérence peut entraîner des erreurs de guidage ou de localisation pour les usagers.
    N’ayant pas la possibilité de soumettre un signalement directement via la plateforme nationale
    pour votre commune, je me permets donc de vous en informer par ce message.

    Je reste bien entendu à votre disposition pour tout complément d’information utile
    (coordonnées, capture d’écran, contexte d’usage, etc.).

    Je vous remercie par avance pour l’attention portée à ce signalement.

    Cordialement,

    [Votre nom]
    Éditeur bénévole Waze
    `;
    }

    window.DBF_USER_CAN_AUTOFILL = false;
    window.DBF_USER_CAN_AUTOFILL_ADDRESS = false;
    window.DBF_USER_RANK = null;
    waitRank();

    function DBF_isVisibleEl(el) {
        if (!el) return false;
        if (el.offsetParent !== null) return true;
        try {
            var r = el.getBoundingClientRect();
            return !!(r && r.width > 0 && r.height > 0);
        } catch (e) { return false; }
    }

    function DBF_findHouseNumberTarget() {
        var activeEl = document.activeElement;
        if (activeEl && activeEl.tagName === "INPUT") {
            if ((activeEl.classList.contains("number") || activeEl.closest(".house-number")) && DBF_isVisibleEl(activeEl)) {
                return { input: activeEl, wz: null };
            }
        }

        try {
            if (activeEl && activeEl.getRootNode) {
                var root = activeEl.getRootNode();
                var host = root && root.host;
                if (host && /text-input/i.test(host.tagName || "") && host.closest && host.closest(".house-number")) {
                    return { input: activeEl.tagName === "INPUT" ? activeEl : null, wz: host };
                }
            }
        } catch (e) { }

        var selectors = [
            ".house-number.is-active input.number",
            "div.house-number.is-active input.number",
            ".house-number.is-active input",
            "div.house-number.is-active input",
            ".content.active input.number",
            ".house-number.is-active wz-text-input",
            "div.house-number.is-active wz-text-input",
            "wz-text-input.house-number",
            ".house-number wz-text-input"
        ];
        for (var i = 0; i < selectors.length; i++) {
            var el = document.querySelector(selectors[i]);
            if (!el || !DBF_isVisibleEl(el)) continue;
            if (el.tagName === "INPUT") return { input: el, wz: null };
            var deep = DBF_findDeepInput(el, 6);
            if (deep) return { input: deep, wz: el };
            return { input: null, wz: el };
        }
        return { input: null, wz: null };
    }

    function DBF_applyHouseNumberToTarget(houseNumber, target) {
        var filled = false;
        if (target.wz && typeof DBF_setWzTextInputValue === "function") {
            filled = DBF_setWzTextInputValue(target.wz, houseNumber);
        }
        if (!filled && target.input) {
            var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value");
            nativeSetter = nativeSetter && nativeSetter.set;
            if (nativeSetter) nativeSetter.call(target.input, houseNumber);
            else target.input.value = houseNumber;
            target.input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
            target.input.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
            filled = true;
        }
        return filled;
    }

    function DBF_autofillHouseNumber() {
        if (!window.DBF_USER_CAN_AUTOFILL) {
            DBF_notify("Autofill n° réservé aux éditeurs L2 et plus.");
            return false;
        }
        if (!lastMouseLL || !DBF_mouseIsFresh()) {
            DBF_notify("Position souris indisponible : survolez la carte puis réessayez Ctrl+M.");
            return false;
        }

        var target = DBF_findHouseNumberTarget();
        if (!target.input && !target.wz) {
            DBF_notify("Ouvrez un numéro de rue WME avant Ctrl+M.");
            return false;
        }

        function finishWithNumber(houseNumber) {
            if (!houseNumber) {
            DBF_notify("Aucun numéro BAN proche de la souris.");
            return false;
        }
            if (!DBF_applyHouseNumberToTarget(houseNumber, target)) {
            DBF_notify("Impossible d'écrire dans le champ numéro WME.");
            return false;
        }
        if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
        try { DBF_onBanModelChange(); } catch (e) { }
            return true;
        }

        var nearestAddress = (adresses_list && adresses_list.length)
            ? pickNearestFromList(adresses_list, lastMouseLL, 50)
            : null;
        if (nearestAddress && nearestAddress.numero) {
            return finishWithNumber(nearestAddress.numero);
        }

        DBF_notify("Recherche BAN officielle au point…");
        DBF_geocodeReverse(lastMouseLL.lon, lastMouseLL.lat, 1).then(function (hits) {
            var hit = hits && hits[0];
            finishWithNumber(hit && hit.numero);
        }).catch(function () {
            DBF_notify("Aucun numéro BAN proche de la souris.");
        });
        return true;
    }

    function DBF_isCtrlM(event, wantShift) {
        if (!event || !event.ctrlKey || event.altKey || event.metaKey) return false;
        if (!!event.shiftKey !== !!wantShift) return false;
        var k = (event.key || "").toLowerCase();
        return k === "m" || event.code === "KeyM";
    }

    document.addEventListener("keydown", function (event) {
        if (!DBF_isCtrlM(event, false)) return;
        if (DBF_runAutofillOnce(DBF_autofillHouseNumber)) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);

    function DBF_findDeepInput(root, maxDepth) {
        if (!root || maxDepth <= 0) return null;

        var inputs = root.querySelectorAll ? root.querySelectorAll('input') : [];
        for (var i = 0; i < inputs.length; i++) {
            var inp = inputs[i];

            if (inp.type === 'hidden') continue;
            if (inp.style && inp.style.display === 'none') continue;
            if (inp.style && inp.style.visibility === 'hidden') continue;
            return inp;
        }

        if (root.shadowRoot) {
            var fromShadow = DBF_findDeepInput(root.shadowRoot, maxDepth - 1);
            if (fromShadow) return fromShadow;
        }

        var children = root.querySelectorAll ? root.querySelectorAll('*') : [];
        for (var j = 0; j < children.length; j++) {
            if (children[j].shadowRoot) {
                var fromChild = DBF_findDeepInput(children[j].shadowRoot, maxDepth - 1);
                if (fromChild) return fromChild;
            }
        }

        return null;
    }

    function DBF_setWzTextInputValue(wzTextEl, value) {
        if (!wzTextEl || value === undefined || value === null) return false;
        var strValue = String(value);

        var innerInput = null;
        if (wzTextEl.shadowRoot) {
            innerInput = wzTextEl.shadowRoot.querySelector('input');
        }

        if (!innerInput) {
            innerInput = wzTextEl.querySelector('input:not([style*="display: none"])');
        }

        if (!innerInput) {
            var inputs = wzTextEl.querySelectorAll('input');
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].style.display !== 'none') { innerInput = inputs[i]; break; }
            }
        }

        if (innerInput) {
            var nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
            if (nativeSetter) {
                nativeSetter.call(innerInput, strValue);
            } else {
                innerInput.value = strValue;
            }
            innerInput.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
            innerInput.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
            return true;
        }

        try {
            wzTextEl.value = strValue;
            wzTextEl.dispatchEvent(new Event("input", { bubbles: true }));
            wzTextEl.dispatchEvent(new Event("change", { bubbles: true }));
            return true;
        } catch (e) {
            console.warn("[DBF] Impossible d'injecter dans wz-text-input", e);
            return false;
        }
    }

    const _VM_URL_API = 'https://api.github.com/repos/Electrochock1974/drawborderfrance/contents/version-min.json?ref=main';
    const _VM_URL = 'https://raw.githubusercontent.com/Electrochock1974/drawborderfrance/main/version-min.json';
    const _VM_URL_FALLBACK = 'https://cdn.jsdelivr.net/gh/Electrochock1974/drawborderfrance@main/version-min.json';
    const _VM_MAJ = 'https://greasyfork.org/scripts/8138';
    const _VM_AUTEURS = [0x5c67ddf5, 0x15d80e62];

    const _vmCmp = function (a, b) {
        var x = String(a).split('.').map(Number);
        var y = String(b).split('.').map(Number);
        var n = Math.max(x.length, y.length);
        for (var i = 0; i < n; i++) {
            var d = (x[i] || 0) - (y[i] || 0);
            if (d) return d < 0 ? -1 : 1;
        }
        return 0;
    };

    const _vmLatest = function (empreintes) {
        var best = null;
        if (!empreintes || typeof empreintes !== 'object') return null;
        Object.keys(empreintes).forEach(function (k) {
            if (!/^\d+(\.\d+)*$/.test(k)) return;
            if (best === null || _vmCmp(k, best) > 0) best = k;
        });
        return best;
    };
    const _vmHx = function (t) {
        var x = 0x811c9dc5;
        for (var i = 0; i < t.length; i++) {
            x ^= t.charCodeAt(i);
            x = Math.imul(x, 0x01000193) >>> 0;
        }
        return x >>> 0;
    };
    const _vmParsePayload = function (text, fromApi) {
        if (!text) return null;
        try {
            if (fromApi) {
                var meta = JSON.parse(text);
                if (meta && typeof meta.content === 'string' && typeof atob === 'function') {
                    return JSON.parse(atob(meta.content.replace(/\s/g, '')));
                }
                return null;
            }
            return JSON.parse(text);
        } catch (e) { return null; }
    };
    const _vmFetchJson = function (url, opts) {
        opts = opts || {};
        return new Promise(function (res) {
            var done = false;
            var finish = function (v) {
                if (done) return;
                done = true;
                res(v);
            };
            setTimeout(function () { finish(null); }, 6000);
            try {
                var u = url
                    + (String(url).indexOf('?') >= 0 ? '&' : '?')
                    + 'nocache=' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
                var headers = {
                    'Cache-Control': 'no-cache, no-store, max-age=0',
                    'Pragma': 'no-cache'
                };
                if (opts.accept) headers['Accept'] = opts.accept;
            GM_xmlhttpRequest({
                method: 'GET',
                    url: u,
                    timeout: 5000,
                    headers: headers,
                    onload: function (r) {
                        finish(r.status === 200 ? _vmParsePayload(r.responseText, !!opts.githubApi) : null);
                    },
                    onerror: function () { finish(null); },
                    ontimeout: function () { finish(null); }
                });
            } catch (e) { finish(null); }
        });
    };
    const _vmJson = async function () {
        var j = await _vmFetchJson(_VM_URL_API, { githubApi: true, accept: 'application/vnd.github+json' });
        if (j && typeof j === 'object' && j.empreintes) return j;
        j = await _vmFetchJson(_VM_URL);
        if (j && typeof j === 'object') return j;
        return _vmFetchJson(_VM_URL_FALLBACK);
    };

    const _vmAuteur = async function () {
        var estAuteur = function (n) {
            return !!n && _VM_AUTEURS.indexOf(_vmHx(String(n).toLowerCase())) >= 0;
        };
        try {
            var w = DBF_pageWindow;
            if (typeof w.getWmeSdk !== 'function') return false;
            var sdkVm = w.getWmeSdk({
                scriptId: SCRIPT_ID + '-vm',
                scriptName: String(SCRIPT_NAME) + ' (version)',
                mode: 'async'
            });
            for (var i = 0; i < 20; i++) {
                var u = null;
                try { u = await sdkVm.State.getUserInfo(); } catch (e) { u = null; }
                if (u && u.userName) return estAuteur(u.userName);
                await new Promise(function (r) { setTimeout(r, 500); });
            }
        } catch (e) {  }
        return false;
    };
    const _vmEmpreinte = async function (src) {
        var t = String(src).replace(/\r\n/g, '\n').split('\n')
            .filter(function (l) { return !/^\/\/ @(downloadURL|updateURL)\b/.test(l); })
            .join('\n');
        var h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
        return Array.prototype.map.call(new Uint8Array(h), function (b) {
            return b.toString(16).padStart(2, '0');
        }).join('');
    };

    const _vmLogMainteneur = function (msg) {
        Promise.resolve(_vmAuteur()).then(function (ok) {
            if (ok) console.info(msg);
        }).catch(function () {  });
    };

    const _vmVerdict = async function () {
        var src = '';
        try { src = _wmeIntegre.toString(); } catch (e) { src = ''; }
        var h = '';
        if (typeof src === 'string' && src.length) {
            try { h = await _vmEmpreinte(src); } catch (e) { h = ''; }
        }
        var j = await _vmJson();
        if (!j || typeof j !== 'object') return null;
        var v = String(VERSION);
        var num = /^\d+(\.\d+)*$/;
        if (num.test(v) && typeof j.min === 'string' && num.test(j.min) && _vmCmp(v, j.min) < 0) {
            return { motif: 'retiree', min: j.min };
        }
        if (!j.empreintes || typeof j.empreintes !== 'object') return null;

        var latest = _vmLatest(j.empreintes);
        if (num.test(v) && latest && _vmCmp(v, latest) < 0) {
            return { motif: 'retiree', min: latest };
        }
        var attendue = j.empreintes[v];
        if (!attendue) {

            if (await _vmAuteur()) {
                console.info(
                    '[' + SCRIPT_NAME + '] version non publiée — démarrage mainteneur. '
                    + 'Coller dans version-min.json → empreintes["' + v + '"] = "' + (h || '') + '"'
                );
                return null;
            }
            return { motif: 'inconnue' };
        }
        if (typeof src !== 'string' || !src.length) return null;
        if (!h) return null;
        if (h === String(attendue).toLowerCase()) {
            _vmLogMainteneur('[' + SCRIPT_NAME + ' v' + v + '] empreinte OK ' + h);
            return null;
        }

        if (await _vmAuteur()) {
            console.warn('[' + SCRIPT_NAME + '] empreinte invalide — attendu ' + attendue + ', local ' + h);
        }
        return { motif: 'modifiee' };
    };
    const _vmBandeau = function (j) {
        var ident = 'vm-' + _vmHx(_VM_URL).toString(36);
        if (document.getElementById(ident)) return;
        var n = String(SCRIPT_NAME);
        var v = String(VERSION);
        var m = j.min;
        var msgs = {
            retiree: n + ' v' + v + ' est obsolète : la v' + m + ' (ou plus récente) est publiée. Le script ne démarre pas tant qu’il n’est pas mis à jour (Tampermonkey ▸ Rechercher des mises à jour).',
            modifiee: n + ' v' + v + ' ne correspond pas au code publié (copie modifiée ou abîmée). Le script ne démarre pas : réinstallez-le depuis sa page officielle GreasyFork.',
            inconnue: n + ' v' + v + ' n’est pas une version publiée. Le script ne démarre pas : installez-le depuis sa page officielle GreasyFork.'
        };
        var d = document.createElement('div');
        d.id = ident;
        d.setAttribute('role', 'alert');
        d.style.cssText = 'position:fixed;top:56px;left:50%;transform:translateX(-50%);z-index:100000;max-width:560px;padding:10px 14px;' +
            'background:#ffebee;color:#b71c1c;border:1px solid #c62828;border-radius:8px;font:600 12px/1.5 Rubik,Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.25)';
        var p = document.createElement('div');
        p.textContent = msgs[j.motif] || msgs.inconnue;
        d.appendChild(p);
        var a = document.createElement('a');
        a.href = _VM_MAJ;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = (j.motif === 'retiree' ? 'Mettre à jour' : 'Page officielle') + ' ↗';
        a.style.cssText = 'display:inline-block;margin-top:6px;padding:3px 10px;border-radius:50px;background:#c62828;color:#fff;text-decoration:none';
        var x = document.createElement('button');
        x.type = 'button';
        x.textContent = '×';
        x.setAttribute('aria-label', 'Fermer');
        x.style.cssText = 'position:absolute;top:2px;inset-inline-end:6px;border:0;background:none;color:#b71c1c;font-size:16px;cursor:pointer';
        x.onclick = function () { d.remove(); };
        d.appendChild(a);
        d.appendChild(x);
        (document.body || document.documentElement).appendChild(d);
    };
    const _vmBloque = async function () {
        var j = await _vmVerdict();
        if (j) { _vmBandeau(j); return true; }
        return false;
    };

    async function DBF_bootstrap() {
        try {
            if (await _vmBloque()) return;
            DBF_start();
                        } catch (e) {
            console.error('[DBF] bootstrap / intégrité:', e);
            try { DBF_start(); } catch (e2) { console.error('[DBF] DBF_start:', e2); }
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { DBF_bootstrap(); }, { once: true });
    } else {
        DBF_bootstrap();
    }
})();
