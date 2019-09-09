var _config = require("../../config");

var __DEV__ = _config.__DEV__;

var echarts = require("../../echarts");

var LineDraw = require("../helper/LineDraw");

var EffectLine = require("../helper/EffectLine");

var Line = require("../helper/Line");

var Polyline = require("../helper/Polyline");

var EffectPolyline = require("../helper/EffectPolyline");

var LargeLineDraw = require("../helper/LargeLineDraw");

var _default = echarts.extendChartView({
  type: 'lines',
  init: function () {},
  render: function (seriesModel, ecModel, api) {
    var data = seriesModel.getData();
    var lineDraw = this._lineDraw;
    var hasEffect = seriesModel.get('effect.show');
    var isPolyline = seriesModel.get('polyline');
    var isLarge = seriesModel.get('large') && data.count() >= seriesModel.get('largeThreshold');

    if (hasEffect !== this._hasEffet || isPolyline !== this._isPolyline || isLarge !== this._isLarge) {
      if (lineDraw) {
        lineDraw.remove();
      }

      lineDraw = this._lineDraw = isLarge ? new LargeLineDraw() : new LineDraw(isPolyline ? hasEffect ? EffectPolyline : Polyline : hasEffect ? EffectLine : Line);
      this._hasEffet = hasEffect;
      this._isPolyline = isPolyline;
      this._isLarge = isLarge;
    }

    var zlevel = seriesModel.get('zlevel');
    var trailLength = seriesModel.get('effect.trailLength');
    var zr = api.getZr(); // Avoid the drag cause ghost shadow
    // FIXME Better way ?
    // SVG doesn't support

    var isSvg = zr.painter.getType() === 'svg';

    if (!isSvg) {
      zr.painter.getLayer(zlevel).clear(true);
    } // Config layer with motion blur


    if (this._lastZlevel != null && !isSvg) {
      zr.configLayer(this._lastZlevel, {
        motionBlur: false
      });
    }

    if (hasEffect && trailLength) {
      if (!isSvg) {
        zr.configLayer(zlevel, {
          motionBlur: true,
          lastFrameAlpha: Math.max(Math.min(trailLength / 10 + 0.9, 1), 0)
        });
      }
    }

    this.group.add(lineDraw.group);
    lineDraw.updateData(data);
    this._lastZlevel = zlevel;
  },
  updateLayout: function (seriesModel, ecModel, api) {
    this._lineDraw.updateLayout(seriesModel); // Not use motion when dragging or zooming


    var zr = api.getZr();
    var isSvg = zr.painter.getType() === 'svg';

    if (!isSvg) {
      zr.painter.getLayer(this._lastZlevel).clear(true);
    }
  },
  remove: function (ecModel, api) {
    this._lineDraw && this._lineDraw.remove(api, true); // Clear motion when lineDraw is removed

    var zr = api.getZr();
    var isSvg = zr.painter.getType() === 'svg';

    if (!isSvg) {
      zr.painter.getLayer(this._lastZlevel).clear(true);
    }
  },
  dispose: function () {}
});

module.exports = _default;