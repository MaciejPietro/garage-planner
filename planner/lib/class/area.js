'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _export = require('./export');

var _export2 = require('../utils/export');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Area = function () {
    function Area() {
        _classCallCheck(this, Area);
    }

    _createClass(Area, null, [{
        key: 'add',
        value: function add(state, layerID, type, verticesCoords, catalog) {
            var area = void 0;

            var layer = state.getIn(['scene', 'layers', layerID]);

            layer = layer.withMutations(function (layer) {
                var areaID = _export2.IDBroker.acquireID();

                var vertices = verticesCoords.map(function (v) {
                    return _export.Vertex.add(state, layerID, v.x, v.y, 'areas', areaID).vertex.id;
                });

                area = catalog.factoryElement(type, {
                    id: areaID,
                    name: _export2.NameGenerator.generateName('areas', catalog.getIn(['elements', type, 'info', 'title'])),
                    type: type,
                    prototype: 'areas',
                    vertices: vertices
                });

                layer.setIn(['areas', areaID], area);
            });

            state = state.setIn(['scene', 'layers', layerID], layer);

            return { updatedState: state, area: area };
        }
    }, {
        key: 'select',
        value: function select(state, layerID, areaID) {
            state = _export.Layer.select(state, layerID).updatedState;
            state = _export.Layer.selectElement(state, layerID, 'areas', areaID).updatedState;

            return { updatedState: state };
        }
    }, {
        key: 'remove',
        value: function remove(state, layerID, areaID) {
            var area = state.getIn(['scene', 'layers', layerID, 'areas', areaID]);

            if (area.get('selected') === true) state = this.unselect(state, layerID, areaID).updatedState;

            area.vertices.forEach(function (vertexID) {
                state = _export.Vertex.remove(state, layerID, vertexID, 'areas', areaID).updatedState;
            });

            state = state.deleteIn(['scene', 'layers', layerID, 'areas', areaID]);

            state.getIn(['scene', 'groups']).forEach(function (group) {
                return state = _export.Group.removeElement(state, group.id, layerID, 'areas', areaID).updatedState;
            });

            return { updatedState: state };
        }
    }, {
        key: 'unselect',
        value: function unselect(state, layerID, areaID) {
            state = _export.Layer.unselect(state, layerID, 'areas', areaID).updatedState;

            return { updatedState: state };
        }
    }, {
        key: 'setProperties',
        value: function setProperties(state, layerID, areaID, properties) {
            state = state.mergeIn(['scene', 'layers', layerID, 'areas', areaID, 'properties'], properties);

            return { updatedState: state };
        }
    }, {
        key: 'setJsProperties',
        value: function setJsProperties(state, layerID, areaID, properties) {
            return this.setProperties(state, layerID, areaID, (0, _immutable.fromJS)(properties));
        }
    }, {
        key: 'updateProperties',
        value: function updateProperties(state, layerID, areaID, properties) {
            properties.forEach(function (v, k) {
                if (state.hasIn(['scene', 'layers', layerID, 'areas', areaID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'areas', areaID, 'properties', k], v);
            });

            return { updatedState: state };
        }
    }, {
        key: 'updateJsProperties',
        value: function updateJsProperties(state, layerID, areaID, properties) {
            return this.updateProperties(state, layerID, areaID, (0, _immutable.fromJS)(properties));
        }
    }, {
        key: 'setAttributes',
        value: function setAttributes(state) {
            return { updatedState: state };
        }
    }]);

    return Area;
}();

exports.default = Area;