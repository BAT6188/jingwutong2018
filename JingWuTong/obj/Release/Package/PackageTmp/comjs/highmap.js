﻿/*
 Highmaps JS v6.1.4 (2018-09-25)
 Highmaps as a plugin for Highcharts or Highstock.

 (c) 2011-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (w) { "object" === typeof module && module.exports ? module.exports = w : "function" === typeof define && define.amd ? define(function () { return w }) : w(Highcharts) })(function (w) {
    (function (a) {
        var l = a.addEvent, g = a.Axis, k = a.each, e = a.pick; l(g, "getSeriesExtremes", function () { var a = []; this.isXAxis && (k(this.series, function (q, e) { q.useMapGeometry && (a[e] = q.xData, q.xData = []) }), this.seriesXData = a) }); l(g, "afterGetSeriesExtremes", function () {
            var a = this.seriesXData, m, g, r; this.isXAxis && (m = e(this.dataMin, Number.MAX_VALUE), g = e(this.dataMax,
            -Number.MAX_VALUE), k(this.series, function (f, b) { f.useMapGeometry && (m = Math.min(m, e(f.minX, m)), g = Math.max(g, e(f.maxX, g)), f.xData = a[b], r = !0) }), r && (this.dataMin = m, this.dataMax = g), delete this.seriesXData)
        }); l(g, "afterSetAxisTranslation", function () {
            var a = this.chart, m; m = a.plotWidth / a.plotHeight; var a = a.xAxis[0], e; "yAxis" === this.coll && void 0 !== a.transA && k(this.series, function (a) { a.preserveAspectRatio && (e = !0) }); if (e && (this.transA = a.transA = Math.min(this.transA, a.transA), m /= (a.max - a.min) / (this.max - this.min),
            m = 1 > m ? this : a, a = (m.max - m.min) * m.transA, m.pixelPadding = m.len - a, m.minPixelPadding = m.pixelPadding / 2, a = m.fixTo)) { a = a[1] - m.toValue(a[0], !0); a *= m.transA; if (Math.abs(a) > m.minPixelPadding || m.min === m.dataMin && m.max === m.dataMax) a = 0; m.minPixelPadding -= a }
        }); l(g, "render", function () { this.fixTo = null })
    })(w); (function (a) {
        var l = a.addEvent, g = a.Axis, k = a.Chart, e = a.color, q, m = a.each, u = a.extend, r = a.isNumber, f = a.Legend, b = a.LegendSymbolMixin, d = a.noop, n = a.merge, v = a.pick; a.ColorAxis || (q = a.ColorAxis = function () {
            this.init.apply(this,
            arguments)
        }, u(q.prototype, g.prototype), u(q.prototype, {
            defaultColorAxisOptions: { lineWidth: 0, minPadding: 0, maxPadding: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, width: .01, color: "#999999" }, labels: { overflow: "justify", rotation: 0 }, minColor: "#e6ebf5", maxColor: "#003399", tickLength: 5, showInLegend: !0 }, keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(g.prototype.keepProps), init: function (a, c) {
                var h =
                "vertical" !== a.options.legend.layout, b; this.coll = "colorAxis"; b = n(this.defaultColorAxisOptions, { side: h ? 2 : 1, reversed: !h }, c, { opposite: !h, showEmpty: !1, title: null, visible: a.options.legend.enabled }); g.prototype.init.call(this, a, b); c.dataClasses && this.initDataClasses(c); this.initStops(); this.horiz = h; this.zoomEnabled = !1; this.defaultLegendLength = 200
            }, initDataClasses: function (a) {
                var c = this.chart, h, b = 0, p = c.options.chart.colorCount, d = this.options, f = a.dataClasses.length; this.dataClasses = h = []; this.legendItems =
                []; m(a.dataClasses, function (a, t) { a = n(a); h.push(a); a.color || ("category" === d.dataClassColor ? (t = c.options.colors, p = t.length, a.color = t[b], a.colorIndex = b, b++, b === p && (b = 0)) : a.color = e(d.minColor).tweenTo(e(d.maxColor), 2 > f ? .5 : t / (f - 1))) })
            }, setTickPositions: function () { if (!this.dataClasses) return g.prototype.setTickPositions.call(this) }, initStops: function () { this.stops = this.options.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; m(this.stops, function (a) { a.color = e(a[1]) }) }, setOptions: function (a) {
                g.prototype.setOptions.call(this,
                a); this.options.crosshair = this.options.marker
            }, setAxisSize: function () { var a = this.legendSymbol, c = this.chart, h = c.options.legend || {}, b, d; a ? (this.left = h = a.attr("x"), this.top = b = a.attr("y"), this.width = d = a.attr("width"), this.height = a = a.attr("height"), this.right = c.chartWidth - h - d, this.bottom = c.chartHeight - b - a, this.len = this.horiz ? d : a, this.pos = this.horiz ? h : b) : this.len = (this.horiz ? h.symbolWidth : h.symbolHeight) || this.defaultLegendLength }, normalizedValue: function (a) {
                this.isLog && (a = this.val2lin(a)); return 1 - (this.max -
                a) / (this.max - this.min || 1)
            }, toColor: function (a, c) { var h = this.stops, b, p, d = this.dataClasses, f, n; if (d) for (n = d.length; n--;) { if (f = d[n], b = f.from, h = f.to, (void 0 === b || a >= b) && (void 0 === h || a <= h)) { p = f.color; c && (c.dataClass = n, c.colorIndex = f.colorIndex); break } } else { a = this.normalizedValue(a); for (n = h.length; n-- && !(a > h[n][0]) ;); b = h[n] || h[n + 1]; h = h[n + 1] || b; a = 1 - (h[0] - a) / (h[0] - b[0] || 1); p = b.color.tweenTo(h.color, a) } return p }, getOffset: function () {
                var a = this.legendGroup, c = this.chart.axisOffset[this.side]; a && (this.axisParent =
                a, g.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = c)
            }, setLegendColor: function () { var a, c = this.reversed; a = c ? 1 : 0; c = c ? 0 : 1; a = this.horiz ? [a, 0, c, 0] : [0, c, 0, a]; this.legendColor = { linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] }, stops: this.stops } }, drawLegendSymbol: function (a, c) {
                var h = a.padding, b = a.options, d = this.horiz, p = v(b.symbolWidth, d ? this.defaultLegendLength : 12), f = v(b.symbolHeight, d ? 12 : this.defaultLegendLength), n = v(b.labelPadding,
                d ? 16 : 30), b = v(b.itemDistance, 10); this.setLegendColor(); c.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, p, f).attr({ zIndex: 1 }).add(c.legendGroup); this.legendItemWidth = p + h + (d ? b : n); this.legendItemHeight = f + h + (d ? n : 0)
            }, setState: function (a) { m(this.series, function (c) { c.setState(a) }) }, visible: !0, setVisible: d, getSeriesExtremes: function () {
                var a = this.series, c = a.length; this.dataMin = Infinity; for (this.dataMax = -Infinity; c--;) a[c].getExtremes(), void 0 !== a[c].valueMin && (this.dataMin = Math.min(this.dataMin, a[c].valueMin),
                this.dataMax = Math.max(this.dataMax, a[c].valueMax))
            }, drawCrosshair: function (a, c) { var h = c && c.plotX, b = c && c.plotY, d, f = this.pos, p = this.len; c && (d = this.toPixels(c[c.series.colorKey]), d < f ? d = f - 2 : d > f + p && (d = f + p + 2), c.plotX = d, c.plotY = this.len - d, g.prototype.drawCrosshair.call(this, a, c), c.plotX = h, c.plotY = b, this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.cross.attr({ fill: this.crosshair.color }))) },
            getPlotLinePath: function (a, c, h, b, d) { return r(d) ? this.horiz ? ["M", d - 4, this.top - 6, "L", d + 4, this.top - 6, d, this.top, "Z"] : ["M", this.left, d, "L", this.left - 6, d + 6, this.left - 6, d - 6, "Z"] : g.prototype.getPlotLinePath.call(this, a, c, h, b) }, update: function (a, c) {
                var h = this.chart, b = h.legend; m(this.series, function (a) { a.isDirtyData = !0 }); a.dataClasses && b.allItems && (m(b.allItems, function (a) { a.isDataClass && a.legendGroup && a.legendGroup.destroy() }), h.isDirtyLegend = !0); h.options[this.coll] = n(this.userOptions, a); g.prototype.update.call(this,
                a, c); this.legendItem && (this.setLegendColor(), b.colorizeItem(this, !0))
            }, remove: function () { this.legendItem && this.chart.legend.destroyItem(this); g.prototype.remove.call(this) }, getDataClassLegendSymbols: function () {
                var f = this, c = this.chart, h = this.legendItems, t = c.options.legend, n = t.valueDecimals, v = t.valueSuffix || "", e; h.length || m(this.dataClasses, function (p, t) {
                    var q = !0, x = p.from, g = p.to; e = ""; void 0 === x ? e = "\x3c " : void 0 === g && (e = "\x3e "); void 0 !== x && (e += a.numberFormat(x, n) + v); void 0 !== x && void 0 !== g && (e += " - ");
                    void 0 !== g && (e += a.numberFormat(g, n) + v); h.push(u({ chart: c, name: e, options: {}, drawLegendSymbol: b.drawRectangle, visible: !0, setState: d, isDataClass: !0, setVisible: function () { q = this.visible = !q; m(f.series, function (a) { m(a.points, function (a) { a.dataClass === t && a.setVisible(q) }) }); c.legend.colorizeItem(this, q) } }, p))
                }); return h
            }, name: ""
        }), m(["fill", "stroke"], function (b) { a.Fx.prototype[b + "Setter"] = function () { this.elem.attr(b, e(this.start).tweenTo(e(this.end), this.pos), null, !0) } }), l(k, "afterGetAxes", function () {
            var a =
            this.options.colorAxis; this.colorAxis = []; a && new q(this, a)
        }), l(f, "afterGetAllItems", function (b) { var c = [], h = this.chart.colorAxis[0]; h && h.options && h.options.showInLegend && (h.options.dataClasses ? c = h.getDataClassLegendSymbols() : c.push(h), m(h.series, function (c) { a.erase(b.allItems, c) })); for (h = c.length; h--;) b.allItems.unshift(c[h]) }), l(f, "afterColorizeItem", function (a) { a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor }) }), l(f, "afterUpdate", function (a, c, b) {
            this.chart.colorAxis[0] &&
            this.chart.colorAxis[0].update({}, b)
        }))
    })(w); (function (a) {
        var l = a.defined, g = a.each, k = a.noop, e = a.seriesTypes; a.colorPointMixin = { isValid: function () { return null !== this.value && Infinity !== this.value && -Infinity !== this.value }, setVisible: function (a) { var e = this, q = a ? "show" : "hide"; e.visible = !!a; g(["graphic", "dataLabel"], function (a) { if (e[a]) e[a][q]() }) }, setState: function (e) { a.Point.prototype.setState.call(this, e); this.graphic && this.graphic.attr({ zIndex: "hover" === e ? 1 : 0 }) } }; a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"], optionalAxis: "colorAxis", trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], getSymbol: k, parallelArrays: ["x", "y", "value"], colorKey: "value", pointAttribs: e.column.prototype.pointAttribs, translateColors: function () { var a = this, e = this.options.nullColor, k = this.colorAxis, l = this.colorKey; g(this.data, function (f) { var b = f[l]; if (b = f.options.color || (f.isNull ? e : k && void 0 !== b ? k.toColor(b, f) : f.color || a.color)) f.color = b }) }, colorAttribs: function (a) {
                var e = {}; l(a.color) && (e[this.colorProp ||
                "fill"] = a.color); return e
            }
        }
    })(w); (function (a) {
        function l(a) { a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0) } function g(a) { this.init(a) } var k = a.addEvent, e = a.Chart, q = a.doc, m = a.each, u = a.extend, r = a.merge, f = a.pick; g.prototype.init = function (a) { this.chart = a; a.mapNavButtons = [] }; g.prototype.update = function (b) {
            var d = this.chart, n = d.options.mapNavigation, e, p, c, h, t, x = function (a) { this.handler.call(d, a); l(a) }, g = d.mapNavButtons; b && (n = d.options.mapNavigation = r(d.options.mapNavigation,
            b)); for (; g.length;) g.pop().destroy(); f(n.enableButtons, n.enabled) && !d.renderer.forExport && a.objectEach(n.buttons, function (a, b) {
                e = r(n.buttonOptions, a); p = e.theme; p.style = r(e.theme.style, e.style); h = (c = p.states) && c.hover; t = c && c.select; a = d.renderer.button(e.text, 0, 0, x, p, h, t, 0, "zoomIn" === b ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({ width: e.width, height: e.height, title: d.options.lang[b], padding: e.padding, zIndex: 5 }).add(); a.handler = e.onclick; a.align(u(e, {
                    width: a.width, height: 2 *
                    a.height
                }), null, e.alignTo); k(a.element, "dblclick", l); g.push(a)
            }); this.updateEvents(n)
        }; g.prototype.updateEvents = function (a) {
            var b = this.chart; f(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || k(b.container, "dblclick", function (a) { b.pointer.onContainerDblClick(a) }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick()); f(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || k(b.container, void 0 === q.onmousewheel ?
            "DOMMouseScroll" : "mousewheel", function (a) { b.pointer.onContainerMouseWheel(a); l(a); return !1 }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        }; u(e.prototype, {
            fitToBox: function (a, d) { m([["x", "width"], ["y", "height"]], function (b) { var f = b[0]; b = b[1]; a[f] + a[b] > d[f] + d[b] && (a[b] > d[b] ? (a[b] = d[b], a[f] = d[f]) : a[f] = d[f] + d[b] - a[b]); a[b] > d[b] && (a[b] = d[b]); a[f] < d[f] && (a[f] = d[f]) }); return a }, mapZoom: function (a, d, e, g, p) {
                var c = this.xAxis[0], h = c.max - c.min, b = f(d, c.min + h / 2), n = h * a, h = this.yAxis[0], q =
                h.max - h.min, m = f(e, h.min + q / 2), q = q * a, b = this.fitToBox({ x: b - n * (g ? (g - c.pos) / c.len : .5), y: m - q * (p ? (p - h.pos) / h.len : .5), width: n, height: q }, { x: c.dataMin, y: h.dataMin, width: c.dataMax - c.dataMin, height: h.dataMax - h.dataMin }), n = b.x <= c.dataMin && b.width >= c.dataMax - c.dataMin && b.y <= h.dataMin && b.height >= h.dataMax - h.dataMin; g && (c.fixTo = [g - c.pos, d]); p && (h.fixTo = [p - h.pos, e]); void 0 === a || n ? (c.setExtremes(void 0, void 0, !1), h.setExtremes(void 0, void 0, !1)) : (c.setExtremes(b.x, b.x + b.width, !1), h.setExtremes(b.y, b.y + b.height, !1));
                this.redraw()
            }
        }); k(e, "beforeRender", function () { this.mapNavigation = new g(this); this.mapNavigation.update() })
    })(w); (function (a) {
        var l = a.extend, g = a.pick, k = a.Pointer; a = a.wrap; l(k.prototype, {
            onContainerDblClick: function (a) {
                var e = this.chart; a = this.normalize(a); e.options.mapNavigation.enableDoubleClickZoomTo ? e.pointer.inClass(a.target, "highcharts-tracker") && e.hoverPoint && e.hoverPoint.zoomTo() : e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop) && e.mapZoom(.5, e.xAxis[0].toValue(a.chartX), e.yAxis[0].toValue(a.chartY),
                a.chartX, a.chartY)
            }, onContainerMouseWheel: function (a) { var e = this.chart, g; a = this.normalize(a); g = a.detail || -(a.wheelDelta / 120); e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop) && e.mapZoom(Math.pow(e.options.mapNavigation.mouseWheelSensitivity, g), e.xAxis[0].toValue(a.chartX), e.yAxis[0].toValue(a.chartY), a.chartX, a.chartY) }
        }); a(k.prototype, "zoomOption", function (a) {
            var e = this.chart.options.mapNavigation; g(e.enableTouchZoom, e.enabled) && (this.chart.options.chart.pinchType = "xy"); a.apply(this, [].slice.call(arguments,
            1))
        }); a(k.prototype, "pinchTranslate", function (a, g, m, k, l, f, b) { a.call(this, g, m, k, l, f, b); "map" === this.chart.options.chart.type && this.hasZoom && (a = k.scaleX > k.scaleY, this.pinchTranslateDirection(!a, g, m, k, l, f, b, a ? k.scaleX : k.scaleY)) })
    })(w); (function (a) {
        var l = a.colorPointMixin, g = a.each, k = a.extend, e = a.isNumber, q = a.map, m = a.merge, u = a.noop, r = a.pick, f = a.isArray, b = a.Point, d = a.Series, n = a.seriesType, v = a.seriesTypes, p = a.splat; n("map", "scatter", {
            allAreas: !0, animation: !1, nullColor: "#f7f7f7", borderColor: "#cccccc", borderWidth: 1,
            marker: null, stickyTracking: !1, joinBy: "hc-key", dataLabels: { formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, turboThreshold: 0, tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}\x3cbr/\x3e" }, states: { normal: { animation: !0 }, hover: { halo: null, brightness: .2 }, select: { color: "#cccccc" } }
        }, m(a.colorSeriesMixin, {
            type: "map", getExtremesFromAll: !0, useMapGeometry: !0, forceDL: !0, searchPoint: u, directTouch: !0, preserveAspectRatio: !0, pointArrayMap: ["value"],
            getBox: function (c) {
                var b = Number.MAX_VALUE, d = -b, f = b, p = -b, n = b, m = b, k = this.xAxis, v = this.yAxis, q; g(c || [], function (c) {
                    if (c.path) {
                        "string" === typeof c.path && (c.path = a.splitPath(c.path)); var h = c.path || [], t = h.length, g = !1, k = -b, x = b, v = -b, A = b, l = c.properties; if (!c._foundBox) {
                            for (; t--;) e(h[t]) && (g ? (k = Math.max(k, h[t]), x = Math.min(x, h[t])) : (v = Math.max(v, h[t]), A = Math.min(A, h[t])), g = !g); c._midX = x + (k - x) * r(c.middleX, l && l["hc-middle-x"], .5); c._midY = A + (v - A) * r(c.middleY, l && l["hc-middle-y"], .5); c._maxX = k; c._minX = x; c._maxY =
                            v; c._minY = A; c.labelrank = r(c.labelrank, (k - x) * (v - A)); c._foundBox = !0
                        } d = Math.max(d, c._maxX); f = Math.min(f, c._minX); p = Math.max(p, c._maxY); n = Math.min(n, c._minY); m = Math.min(c._maxX - c._minX, c._maxY - c._minY, m); q = !0
                    }
                }); q && (this.minY = Math.min(n, r(this.minY, b)), this.maxY = Math.max(p, r(this.maxY, -b)), this.minX = Math.min(f, r(this.minX, b)), this.maxX = Math.max(d, r(this.maxX, -b)), k && void 0 === k.options.minRange && (k.minRange = Math.min(5 * m, (this.maxX - this.minX) / 5, k.minRange || b)), v && void 0 === v.options.minRange && (v.minRange =
                Math.min(5 * m, (this.maxY - this.minY) / 5, v.minRange || b)))
            }, getExtremes: function () { d.prototype.getExtremes.call(this, this.valueData); this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data); this.valueMin = this.dataMin; this.valueMax = this.dataMax; this.dataMin = this.minY; this.dataMax = this.maxY }, translatePath: function (a) {
                var c = !1, b = this.xAxis, d = this.yAxis, f = b.min, p = b.transA, b = b.minPixelPadding, n = d.min, g = d.transA, d = d.minPixelPadding, k, m = []; if (a) for (k = a.length; k--;) e(a[k]) ? (m[k] = c ? (a[k] - f) * p + b :
                (a[k] - n) * g + d, c = !c) : m[k] = a[k]; return m
            }, setData: function (c, b, n, k) {
                var h = this.options, t = this.chart.options.chart, v = t && t.map, x = h.mapData, l = h.joinBy, r = null === l, u = h.keys || this.pointArrayMap, z = [], w = {}, y = this.chart.mapTransforms; !x && v && (x = "string" === typeof v ? a.maps[v] : v); r && (l = "_i"); l = this.joinBy = p(l); l[1] || (l[1] = l[0]); c && g(c, function (b, d) {
                    var p = 0; if (e(b)) c[d] = { value: b }; else if (f(b)) {
                        c[d] = {}; !h.keys && b.length > u.length && "string" === typeof b[0] && (c[d]["hc-key"] = b[0], ++p); for (var t = 0; t < u.length; ++t, ++p) u[t] &&
                        void 0 !== b[p] && (0 < u[t].indexOf(".") ? a.Point.prototype.setNestedProperty(c[d], b[p], u[t]) : c[d][u[t]] = b[p])
                    } r && (c[d]._i = d)
                }); this.getBox(c); (this.chart.mapTransforms = y = t && t.mapTransforms || x && x["hc-transform"] || y) && a.objectEach(y, function (a) { a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation)) }); if (x) {
                    "FeatureCollection" === x.type && (this.mapTitle = x.title, x = a.geojson(x, this.type, this)); this.mapData = x; this.mapMap = {}; for (y = 0; y < x.length; y++) t = x[y], v = t.properties, t._i = y, l[0] && v && v[l[0]] &&
                    (t[l[0]] = v[l[0]]), w[t[l[0]]] = t; this.mapMap = w; c && l[1] && g(c, function (a) { w[a[l[1]]] && z.push(w[a[l[1]]]) }); h.allAreas ? (this.getBox(x), c = c || [], l[1] && g(c, function (a) { z.push(a[l[1]]) }), z = "|" + q(z, function (a) { return a && a[l[0]] }).join("|") + "|", g(x, function (a) { l[0] && -1 !== z.indexOf("|" + a[l[0]] + "|") || (c.push(m(a, { value: null })), k = !1) })) : this.getBox(z)
                } d.prototype.setData.call(this, c, b, n, k)
            }, drawGraph: u, drawDataLabels: u, doFullTranslate: function () {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML ||
                !this.baseTrans
            }, translate: function () { var a = this, b = a.xAxis, d = a.yAxis, f = a.doFullTranslate(); a.generatePoints(); g(a.data, function (c) { c.plotX = b.toPixels(c._midX, !0); c.plotY = d.toPixels(c._midY, !0); f && (c.shapeType = "path", c.shapeArgs = { d: a.translatePath(c.path) }) }); a.translateColors() }, pointAttribs: function (a, b) { b = v.column.prototype.pointAttribs.call(this, a, b); b["stroke-width"] = r(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit"); return b }, drawPoints: function () {
                var a =
                this, b = a.xAxis, d = a.yAxis, f = a.group, p = a.chart, e = p.renderer, n, k, m, l, q = this.baseTrans, r, u, w, E, F; a.transformGroup || (a.transformGroup = e.g().attr({ scaleX: 1, scaleY: 1 }).add(f), a.transformGroup.survive = !0); a.doFullTranslate() ? (p.hasRendered && g(a.points, function (b) { b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill) }), a.group = a.transformGroup, v.column.prototype.drawPoints.apply(a), a.group = f, g(a.points, function (a) {
                    a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()),
                    a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
                }), this.baseTrans = { originX: b.min - b.minPixelPadding / b.transA, originY: d.min - d.minPixelPadding / d.transA + (d.reversed ? 0 : d.len / d.transA), transAX: b.transA, transAY: d.transA }, this.transformGroup.animate({ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 })) : (n = b.transA / q.transAX, k = d.transA / q.transAY, m = b.toPixels(q.originX, !0), l = d.toPixels(q.originY, !0), .99 < n && 1.01 > n && .99 < k && 1.01 > k && (k = n = 1, m = Math.round(m),
                l = Math.round(l)), r = this.transformGroup, p.renderer.globalAnimation ? (u = r.attr("translateX"), w = r.attr("translateY"), E = r.attr("scaleX"), F = r.attr("scaleY"), r.attr({ animator: 0 }).animate({ animator: 1 }, { step: function (a, b) { r.attr({ translateX: u + (m - u) * b.pos, translateY: w + (l - w) * b.pos, scaleX: E + (n - E) * b.pos, scaleY: F + (k - F) * b.pos }) } })) : r.attr({ translateX: m, translateY: l, scaleX: n, scaleY: k })); f.element.setAttribute("stroke-width", (a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] || 1) /
                (n || 1)); this.drawMapDataLabels()
            }, drawMapDataLabels: function () { d.prototype.drawDataLabels.call(this); this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect) }, render: function () { var a = this, b = d.prototype.render; a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () { b.call(a) }) : b.call(a) }, animate: function (a) {
                var b = this.options.animation, c = this.group, d = this.xAxis, f = this.yAxis, p = d.pos, e = f.pos; this.chart.renderer.isSVG && (!0 === b && (b = { duration: 1E3 }), a ? c.attr({
                    translateX: p + d.len / 2, translateY: e +
                    f.len / 2, scaleX: .001, scaleY: .001
                }) : (c.animate({ translateX: p, translateY: e, scaleX: 1, scaleY: 1 }, b), this.animate = null))
            }, animateDrilldown: function (a) {
                var b = this.chart.plotBox, c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], d = c.bBox, f = this.chart.options.drilldown.animation; a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = { scaleX: a, scaleY: a, translateX: d.x, translateY: d.y }, g(this.points, function (a) {
                    a.graphic && a.graphic.attr(c.shapeArgs).animate({
                        scaleX: 1, scaleY: 1, translateX: 0,
                        translateY: 0
                    }, f)
                }), this.animate = null)
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, animateDrillupFrom: function (a) { v.column.prototype.animateDrillupFrom.call(this, a) }, animateDrillupTo: function (a) { v.column.prototype.animateDrillupTo.call(this, a) }
        }), k({
            applyOptions: function (a, d) { a = b.prototype.applyOptions.call(this, a, d); d = this.series; var c = d.joinBy; d.mapData && ((c = void 0 !== a[c[1]] && d.mapMap[a[c[1]]]) ? (d.xyFromShape && (a.x = c._midX, a.y = c._midY), k(a, c)) : a.value = a.value || null); return a }, onMouseOver: function (c) {
                a.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) b.prototype.onMouseOver.call(this, c); else this.series.onMouseOut(c)
            }, zoomTo: function () { var a = this.series; a.xAxis.setExtremes(this._minX, this._maxX, !1); a.yAxis.setExtremes(this._minY, this._maxY, !1); a.chart.redraw() }
        }, l))
    })(w); (function (a) {
        var l = a.seriesType, g = a.seriesTypes; l("mapline", "map", { lineWidth: 1, fillColor: "none" }, {
            type: "mapline", colorProp: "stroke", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, pointAttribs: function (a,
            e) { a = g.map.prototype.pointAttribs.call(this, a, e); a.fill = this.options.fillColor; return a }, drawLegendSymbol: g.line.prototype.drawLegendSymbol
        })
    })(w); (function (a) {
        var l = a.merge, g = a.Point; a = a.seriesType; a("mappoint", "scatter", { dataLabels: { enabled: !0, formatter: function () { return this.point.name }, crop: !1, defer: !1, overflow: !1, style: { color: "#000000" } } }, { type: "mappoint", forceDL: !0 }, {
            applyOptions: function (a, e) {
                a = void 0 !== a.lat && void 0 !== a.lon ? l(a, this.series.chart.fromLatLonToPoint(a)) : a; return g.prototype.applyOptions.call(this,
                a, e)
            }
        })
    })(w); (function (a) {
        var l = a.arrayMax, g = a.arrayMin, k = a.Axis, e = a.color, q = a.each, m = a.isNumber, u = a.noop, r = a.pick, f = a.pInt, b = a.Point, d = a.Series, n = a.seriesType, v = a.seriesTypes; n("bubble", "scatter", {
            dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" },
            turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", bubblePadding: !0, zoneAxis: "z", directTouch: !0, pointAttribs: function (a, b) { var c = this.options.marker.fillOpacity; a = d.prototype.pointAttribs.call(this, a, b); 1 !== c && (a.fill = e(a.fill).setOpacity(c).get("rgba")); return a }, getRadii: function (a, b, d, f) {
                var c, h, e, p = this.zData, n = [], g = this.options, t = "width" !== g.sizeBy, k = g.zThreshold, l = b - a; h = 0; for (c = p.length; h <
                c; h++) e = p[h], g.sizeByAbsoluteValue && null !== e && (e = Math.abs(e - k), b = l = Math.max(b - k, Math.abs(a - k)), a = 0), m(e) ? e < a ? e = d / 2 - 1 : (e = 0 < l ? (e - a) / l : .5, t && 0 <= e && (e = Math.sqrt(e)), e = Math.ceil(d + e * (f - d)) / 2) : e = null, n.push(e); this.radii = n
            }, animate: function (a) { !a && this.points.length < this.options.animationLimit && (q(this.points, function (a) { var b = a.graphic, c; b && b.width && (c = { x: b.x, y: b.y, width: b.width, height: b.height }, b.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }), b.animate(c, this.options.animation)) }, this), this.animate = null) },
            translate: function () { var b, c = this.data, d, f, e = this.radii; v.scatter.prototype.translate.call(this); for (b = c.length; b--;) d = c[b], f = e ? e[b] : 0, m(f) && f >= this.minPxSize / 2 ? (d.marker = a.extend(d.marker, { radius: f, width: 2 * f, height: 2 * f }), d.dlBox = { x: d.plotX - f, y: d.plotY - f, width: 2 * f, height: 2 * f }) : d.shapeArgs = d.plotY = d.dlBox = void 0 }, alignDataLabel: v.column.prototype.alignDataLabel, buildKDTree: u, applyZones: u
        }, {
            haloPath: function (a) { return b.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a) },
            ttBelow: !1
        }); k.prototype.beforePadding = function () {
            var b = this, c = this.len, d = this.chart, e = 0, n = c, k = this.isXAxis, v = k ? "xData" : "yData", u = this.min, w = {}, A = Math.min(d.plotWidth, d.plotHeight), C = Number.MAX_VALUE, D = -Number.MAX_VALUE, z = this.max - u, B = c / z, y = []; q(this.series, function (c) {
                var e = c.options; !c.bubblePadding || !c.visible && d.options.chart.ignoreHiddenSeries || (b.allowZoomOutside = !0, y.push(c), k && (q(["minSize", "maxSize"], function (a) { var b = e[a], c = /%$/.test(b), b = f(b); w[a] = c ? A * b / 100 : b }), c.minPxSize = w.minSize, c.maxPxSize =
                Math.max(w.maxSize, w.minSize), c = a.grep(c.zData, a.isNumber), c.length && (C = r(e.zMin, Math.min(C, Math.max(g(c), !1 === e.displayNegative ? e.zThreshold : -Number.MAX_VALUE))), D = r(e.zMax, Math.max(D, l(c))))))
            }); q(y, function (a) { var c = a[v], d = c.length, f; k && a.getRadii(C, D, a.minPxSize, a.maxPxSize); if (0 < z) for (; d--;) m(c[d]) && b.dataMin <= c[d] && c[d] <= b.dataMax && (f = a.radii[d], e = Math.min((c[d] - u) * B - f, e), n = Math.max((c[d] - u) * B + f, n)) }); y.length && 0 < z && !this.isLog && (n -= c, B *= (c + Math.max(0, e) - Math.min(n, c)) / c, q([["min", "userMin",
            e], ["max", "userMax", n]], function (a) { void 0 === r(b.options[a[0]], b[a[1]]) && (b[a[0]] += a[2] / B) }))
        }
    })(w); (function (a) {
        var l = a.merge, g = a.Point, k = a.seriesType, e = a.seriesTypes; e.bubble && k("mapbubble", "bubble", { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}" } }, { xyFromShape: !0, type: "mapbubble", pointArrayMap: ["z"], getMapData: e.map.prototype.getMapData, getBox: e.map.prototype.getBox, setData: e.map.prototype.setData }, {
            applyOptions: function (a, k) {
                return a && void 0 !== a.lat && void 0 !== a.lon ? g.prototype.applyOptions.call(this,
                l(a, this.series.chart.fromLatLonToPoint(a)), k) : e.map.prototype.pointClass.prototype.applyOptions.call(this, a, k)
            }, isValid: function () { return "number" === typeof this.z }, ttBelow: !1
        })
    })(w); (function (a) {
        var l = a.colorPointMixin, g = a.each, k = a.merge, e = a.noop, q = a.pick, m = a.Series, u = a.seriesType, r = a.seriesTypes; u("heatmap", "scatter", {
            animation: !1, borderWidth: 0, nullColor: "#f7f7f7", dataLabels: { formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, marker: null,
            pointRange: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e" }, states: { hover: { halo: !1, brightness: .2 } }
        }, k(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"], hasPointSpecificOptions: !0, getExtremesFromAll: !0, directTouch: !0, init: function () { var a; r.scatter.prototype.init.apply(this, arguments); a = this.options; a.pointRange = q(a.pointRange, a.colsize || 1); this.yAxis.axisPointRange = a.rowsize || 1 }, translate: function () {
                var a = this.options, b = this.xAxis, d = this.yAxis, e = a.pointPadding || 0, k = function (a,
                b, d) { return Math.min(Math.max(b, a), d) }; this.generatePoints(); g(this.points, function (f) {
                    var c = (a.colsize || 1) / 2, h = (a.rowsize || 1) / 2, n = k(Math.round(b.len - b.translate(f.x - c, 0, 1, 0, 1)), -b.len, 2 * b.len), c = k(Math.round(b.len - b.translate(f.x + c, 0, 1, 0, 1)), -b.len, 2 * b.len), g = k(Math.round(d.translate(f.y - h, 0, 1, 0, 1)), -d.len, 2 * d.len), h = k(Math.round(d.translate(f.y + h, 0, 1, 0, 1)), -d.len, 2 * d.len), l = q(f.pointPadding, e); f.plotX = f.clientX = (n + c) / 2; f.plotY = (g + h) / 2; f.shapeType = "rect"; f.shapeArgs = {
                        x: Math.min(n, c) + l, y: Math.min(g,
                        h) + l, width: Math.abs(c - n) - 2 * l, height: Math.abs(h - g) - 2 * l
                    }
                }); this.translateColors()
            }, drawPoints: function () { r.column.prototype.drawPoints.call(this); g(this.points, function (a) { a.graphic.attr(this.colorAttribs(a)) }, this) }, animate: e, getBox: e, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, alignDataLabel: r.column.prototype.alignDataLabel, getExtremes: function () { m.prototype.getExtremes.call(this, this.valueData); this.valueMin = this.dataMin; this.valueMax = this.dataMax; m.prototype.getExtremes.call(this) }
        }), a.extend({
            haloPath: function (a) {
                if (!a) return [];
                var b = this.shapeArgs; return ["M", b.x - a, b.y - a, "L", b.x - a, b.y + b.height + a, b.x + b.width + a, b.y + b.height + a, b.x + b.width + a, b.y - a, "Z"]
            }
        }, l))
    })(w); (function (a) {
        function l(a, b) { var d, f, e, g = !1, c = a.x, h = a.y; a = 0; for (d = b.length - 1; a < b.length; d = a++) f = b[a][1] > h, e = b[d][1] > h, f !== e && c < (b[d][0] - b[a][0]) * (h - b[a][1]) / (b[d][1] - b[a][1]) + b[a][0] && (g = !g); return g } var g = a.Chart, k = a.each, e = a.extend, q = a.format, m = a.merge, u = a.win, r = a.wrap; g.prototype.transformFromLatLon = function (f, b) {
            if (void 0 === u.proj4) return a.error(21), { x: 0, y: null };
            f = u.proj4(b.crs, [f.lon, f.lat]); var d = b.cosAngle || b.rotation && Math.cos(b.rotation), e = b.sinAngle || b.rotation && Math.sin(b.rotation); f = b.rotation ? [f[0] * d + f[1] * e, -f[0] * e + f[1] * d] : f; return { x: ((f[0] - (b.xoffset || 0)) * (b.scale || 1) + (b.xpan || 0)) * (b.jsonres || 1) + (b.jsonmarginX || 0), y: (((b.yoffset || 0) - f[1]) * (b.scale || 1) + (b.ypan || 0)) * (b.jsonres || 1) - (b.jsonmarginY || 0) }
        }; g.prototype.transformToLatLon = function (f, b) {
            if (void 0 === u.proj4) a.error(21); else {
                f = {
                    x: ((f.x - (b.jsonmarginX || 0)) / (b.jsonres || 1) - (b.xpan || 0)) / (b.scale ||
                    1) + (b.xoffset || 0), y: ((-f.y - (b.jsonmarginY || 0)) / (b.jsonres || 1) + (b.ypan || 0)) / (b.scale || 1) + (b.yoffset || 0)
                }; var d = b.cosAngle || b.rotation && Math.cos(b.rotation), e = b.sinAngle || b.rotation && Math.sin(b.rotation); b = u.proj4(b.crs, "WGS84", b.rotation ? { x: f.x * d + f.y * -e, y: f.x * e + f.y * d } : f); return { lat: b.y, lon: b.x }
            }
        }; g.prototype.fromPointToLatLon = function (e) {
            var b = this.mapTransforms, d; if (b) {
                for (d in b) if (b.hasOwnProperty(d) && b[d].hitZone && l({ x: e.x, y: -e.y }, b[d].hitZone.coordinates[0])) return this.transformToLatLon(e, b[d]);
                return this.transformToLatLon(e, b["default"])
            } a.error(22)
        }; g.prototype.fromLatLonToPoint = function (e) { var b = this.mapTransforms, d, f; if (!b) return a.error(22), { x: 0, y: null }; for (d in b) if (b.hasOwnProperty(d) && b[d].hitZone && (f = this.transformFromLatLon(e, b[d]), l({ x: f.x, y: -f.y }, b[d].hitZone.coordinates[0]))) return f; return this.transformFromLatLon(e, b["default"]) }; a.geojson = function (a, b, d) {
            var f = [], g = [], l = function (a) { var b, c = a.length; g.push("M"); for (b = 0; b < c; b++) 1 === b && g.push("L"), g.push(a[b][0], -a[b][1]) };
            b = b || "map"; k(a.features, function (a) { var c = a.geometry, d = c.type, c = c.coordinates; a = a.properties; var n; g = []; "map" === b || "mapbubble" === b ? ("Polygon" === d ? (k(c, l), g.push("Z")) : "MultiPolygon" === d && (k(c, function (a) { k(a, l) }), g.push("Z")), g.length && (n = { path: g })) : "mapline" === b ? ("LineString" === d ? l(c) : "MultiLineString" === d && k(c, l), g.length && (n = { path: g })) : "mappoint" === b && "Point" === d && (n = { x: c[0], y: -c[1] }); n && f.push(e(n, { name: a.name || a.NAME, properties: a })) }); d && a.copyrightShort && (d.chart.mapCredits = q(d.chart.options.credits.mapText,
            { geojson: a }), d.chart.mapCreditsFull = q(d.chart.options.credits.mapTextFull, { geojson: a })); return f
        }; r(g.prototype, "addCredits", function (a, b) { b = m(!0, this.options.credits, b); this.mapCredits && (b.href = null); a.call(this, b); this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull }) })
    })(w); (function (a) {
        function l(a, b, e, f, c, g, k, l) {
            return ["M", a + c, b, "L", a + e - g, b, "C", a + e - g / 2, b, a + e, b + g / 2, a + e, b + g, "L", a + e, b + f - k, "C", a + e, b + f - k / 2, a + e - k / 2, b + f, a + e - k, b + f, "L", a + l, b + f, "C", a + l / 2, b + f, a, b + f - l / 2, a, b + f -
            l, "L", a, b + c, "C", a, b + c / 2, a + c / 2, b, a + c, b, "Z"]
        } var g = a.Chart, k = a.defaultOptions, e = a.each, q = a.extend, m = a.merge, u = a.pick, r = a.Renderer, f = a.SVGRenderer, b = a.VMLRenderer; q(k.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" }); k.mapNavigation = {
            buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: { fontSize: "15px", fontWeight: "bold" }, theme: { "stroke-width": 1, "text-align": "center" } }, buttons: {
                zoomIn: { onclick: function () { this.mapZoom(.5) }, text: "+", y: 0 }, zoomOut: {
                    onclick: function () { this.mapZoom(2) },
                    text: "-", y: 28
                }
            }, mouseWheelSensitivity: 1.1
        }; a.splitPath = function (a) { var b; a = a.replace(/([A-Za-z])/g, " $1 "); a = a.replace(/^\s*/, "").replace(/\s*$/, ""); a = a.split(/[ ,]+/); for (b = 0; b < a.length; b++) /[a-zA-Z]/.test(a[b]) || (a[b] = parseFloat(a[b])); return a }; a.maps = {}; f.prototype.symbols.topbutton = function (a, b, e, f, c) { return l(a - 1, b - 1, e, f, c.r, c.r, 0, 0) }; f.prototype.symbols.bottombutton = function (a, b, e, f, c) { return l(a - 1, b - 1, e, f, 0, 0, c.r, c.r) }; r === b && e(["topbutton", "bottombutton"], function (a) {
            b.prototype.symbols[a] =
            f.prototype.symbols[a]
        }); a.Map = a.mapChart = function (b, e, f) {
            var d = "string" === typeof b || b.nodeName, c = arguments[d ? 1 : 0], h = { endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1 }, k, l = a.getOptions().credits; k = c.series; c.series = null; c = m({ chart: { panning: "xy", type: "map" }, credits: { mapText: u(l.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'), mapTextFull: u(l.mapTextFull, "{geojson.copyright}") }, tooltip: { followTouchMove: !1 }, xAxis: h, yAxis: m(h, { reversed: !0 }) },
            c, { chart: { inverted: !1, alignTicks: !1 } }); c.series = k; return d ? new g(b, c, f) : new g(c, e)
        }
    })(w)
});
//# sourceMappingURL=map.js.map