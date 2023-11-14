'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// ACTIONS project
var NEW_PROJECT = exports.NEW_PROJECT = 'NEW_PROJECT';
var LOAD_PROJECT = exports.LOAD_PROJECT = 'LOAD_PROJECT';
var SAVE_PROJECT = exports.SAVE_PROJECT = 'SAVE_PROJECT';
var OPEN_CATALOG = exports.OPEN_CATALOG = 'OPEN_CATALOG';
var SELECT_TOOL_EDIT = exports.SELECT_TOOL_EDIT = 'SELECT_TOOL_EDIT';
var UNSELECT_ALL = exports.UNSELECT_ALL = 'UNSELECT_ALL';
var SET_PROPERTIES = exports.SET_PROPERTIES = 'SET_PROPERTIES';
var SET_PROPERTIES_ALL = exports.SET_PROPERTIES_ALL = 'SET_PROPERTIES_ALL';
var SET_ITEMS_ATTRIBUTES = exports.SET_ITEMS_ATTRIBUTES = 'SET_ITEMS_ATTRIBUTES';
var SET_CAMERAS_ATTRIBUTES = exports.SET_CAMERAS_ATTRIBUTES = 'SET_CAMERAS_ATTRIBUTES';
var SET_CAMERAS360_ATTRIBUTES = exports.SET_CAMERAS360_ATTRIBUTES = 'SET_CAMERAS360_ATTRIBUTES';
var SET_LINES_ATTRIBUTES = exports.SET_LINES_ATTRIBUTES = 'SET_LINES_ATTRIBUTES';
var SET_HOLES_ATTRIBUTES = exports.SET_HOLES_ATTRIBUTES = 'SET_HOLES_ATTRIBUTES';
var REMOVE = exports.REMOVE = 'REMOVE';
var UNDO = exports.UNDO = 'UNDO';
var ROLLBACK = exports.ROLLBACK = 'ROLLBACK';
var SET_PROJECT_PROPERTIES = exports.SET_PROJECT_PROPERTIES = 'SET_PROJECT_PROPERTIES';
var INIT_CATALOG = exports.INIT_CATALOG = 'INIT_CATALOG';
var UPDATE_MOUSE_COORDS = exports.UPDATE_MOUSE_COORDS = 'UPDATE_MOUSE_COORDS';
var UPDATE_ZOOM_SCALE = exports.UPDATE_ZOOM_SCALE = 'UPDATE_ZOOM_SCALE';
var TOGGLE_SNAP = exports.TOGGLE_SNAP = 'TOGGLE_SNAP';
var CHANGE_CATALOG_PAGE = exports.CHANGE_CATALOG_PAGE = 'CHANGE_CATALOG_PAGE';
var GO_BACK_TO_CATALOG_PAGE = exports.GO_BACK_TO_CATALOG_PAGE = 'GO_BACK_TO_CATALOG_PAGE';
var THROW_ERROR = exports.THROW_ERROR = 'THROW_ERROR';
var THROW_WARNING = exports.THROW_WARNING = 'THROW_WARNING';
var COPY_PROPERTIES = exports.COPY_PROPERTIES = 'COPY_PROPERTIES';
var PASTE_PROPERTIES = exports.PASTE_PROPERTIES = 'PASTE_PROPERTIES';
var PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY = exports.PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY = 'PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY';
var ALTERATE_STATE = exports.ALTERATE_STATE = 'ALTERATE_STATE';
var SET_MODE = exports.SET_MODE = 'SET_MODE';
var ADD_HORIZONTAL_GUIDE = exports.ADD_HORIZONTAL_GUIDE = 'ADD_HORIZONTAL_GUIDE';
var ADD_VERTICAL_GUIDE = exports.ADD_VERTICAL_GUIDE = 'ADD_VERTICAL_GUIDE';
var ADD_CIRCULAR_GUIDE = exports.ADD_CIRCULAR_GUIDE = 'ADD_CIRCULAR_GUIDE';
var REMOVE_HORIZONTAL_GUIDE = exports.REMOVE_HORIZONTAL_GUIDE = 'REMOVE_HORIZONTAL_GUIDE';
var REMOVE_VERTICAL_GUIDE = exports.REMOVE_VERTICAL_GUIDE = 'REMOVE_VERTICAL_GUIDE';
var REMOVE_CIRCULAR_GUIDE = exports.REMOVE_CIRCULAR_GUIDE = 'REMOVE_CIRCULAR_GUIDE';
var OPEN_PROJECT_CONFIGURATOR = exports.OPEN_PROJECT_CONFIGURATOR = 'OPEN_PROJECT_CONFIGURATOR';

// ACTIONS viewer2D
var SELECT_TOOL_ZOOM_IN = exports.SELECT_TOOL_ZOOM_IN = 'SELECT_TOOL_ZOOM_IN';
var SELECT_TOOL_ZOOM_OUT = exports.SELECT_TOOL_ZOOM_OUT = 'SELECT_TOOL_ZOOM_OUT';
var SELECT_TOOL_PAN = exports.SELECT_TOOL_PAN = 'SELECT_TOOL_PAN';
var UPDATE_2D_CAMERA = exports.UPDATE_2D_CAMERA = 'UPDATE_2D_CAMERA';
var UPDATE_2D_CAMERA360 = exports.UPDATE_2D_CAMERA360 = 'UPDATE_2D_CAMERA360';

//ACTIONS viewer3D
var SELECT_TOOL_3D_VIEW = exports.SELECT_TOOL_3D_VIEW = 'SELECT_TOOL_3D_VIEW';

//ACTIONS items
var SELECT_TOOL_DRAWING_ITEM = exports.SELECT_TOOL_DRAWING_ITEM = 'SELECT_TOOL_DRAWING_ITEM';
var UPDATE_DRAWING_ITEM = exports.UPDATE_DRAWING_ITEM = 'UPDATE_DRAWING_ITEM';
var END_DRAWING_ITEM = exports.END_DRAWING_ITEM = 'END_DRAWING_ITEM';
var BEGIN_DRAGGING_ITEM = exports.BEGIN_DRAGGING_ITEM = 'BEGIN_DRAGGING_ITEM';
var UPDATE_DRAGGING_ITEM = exports.UPDATE_DRAGGING_ITEM = 'UPDATE_DRAGGING_ITEM';
var END_DRAGGING_ITEM = exports.END_DRAGGING_ITEM = 'END_DRAGGING_ITEM';
var BEGIN_ROTATING_ITEM = exports.BEGIN_ROTATING_ITEM = 'BEGIN_ROTATING_ITEM';
var UPDATE_ROTATING_ITEM = exports.UPDATE_ROTATING_ITEM = 'UPDATE_ROTATING_ITEM';
var END_ROTATING_ITEM = exports.END_ROTATING_ITEM = 'END_ROTATING_ITEM';
var BEGIN_RESIZING_ITEM = exports.BEGIN_RESIZING_ITEM = 'BEGIN_RESIZING_ITEM';
var UPDATE_RESIZING_ITEM = exports.UPDATE_RESIZING_ITEM = 'UPDATE_RESIZING_ITEM';
var END_RESIZING_ITEM = exports.END_RESIZING_ITEM = 'END_RESIZING_ITEM';

//ACTIONS camera
var SELECT_TOOL_DRAWING_CAMERA = exports.SELECT_TOOL_DRAWING_CAMERA = 'SELECT_TOOL_DRAWING_CAMERA';
var UPDATE_DRAWING_CAMERA = exports.UPDATE_DRAWING_CAMERA = 'UPDATE_DRAWING_CAMERA';
var END_DRAWING_CAMERA = exports.END_DRAWING_CAMERA = 'END_DRAWING_CAMERA';
var BEGIN_DRAGGING_CAMERA = exports.BEGIN_DRAGGING_CAMERA = 'BEGIN_DRAGGING_CAMERA';
var UPDATE_DRAGGING_CAMERA = exports.UPDATE_DRAGGING_CAMERA = 'UPDATE_DRAGGING_CAMERA';
var END_DRAGGING_CAMERA = exports.END_DRAGGING_CAMERA = 'END_DRAGGING_CAMERA';
var BEGIN_ROTATING_CAMERA = exports.BEGIN_ROTATING_CAMERA = 'BEGIN_ROTATING_CAMERA';
var UPDATE_ROTATING_CAMERA = exports.UPDATE_ROTATING_CAMERA = 'UPDATE_ROTATING_CAMERA';
var END_ROTATING_CAMERA = exports.END_ROTATING_CAMERA = 'END_ROTATING_CAMERA';
var BEGIN_RESIZING_CAMERA = exports.BEGIN_RESIZING_CAMERA = 'BEGIN_RESIZING_CAMERA';
var UPDATE_RESIZING_CAMERA = exports.UPDATE_RESIZING_CAMERA = 'UPDATE_RESIZING_CAMERA';
var END_RESIZING_CAMERA = exports.END_RESIZING_CAMERA = 'END_RESIZING_CAMERA';

//ACTIONS camera 360
var SELECT_TOOL_DRAWING_CAMERA360 = exports.SELECT_TOOL_DRAWING_CAMERA360 = 'SELECT_TOOL_DRAWING_CAMERA360';
var UPDATE_DRAWING_CAMERA360 = exports.UPDATE_DRAWING_CAMERA360 = 'UPDATE_DRAWING_CAMERA360';
var END_DRAWING_CAMERA360 = exports.END_DRAWING_CAMERA360 = 'END_DRAWING_CAMERA360';
var BEGIN_DRAGGING_CAMERA360 = exports.BEGIN_DRAGGING_CAMERA360 = 'BEGIN_DRAGGING_CAMERA360';
var UPDATE_DRAGGING_CAMERA360 = exports.UPDATE_DRAGGING_CAMERA360 = 'UPDATE_DRAGGING_CAMERA360';
var END_DRAGGING_CAMERA360 = exports.END_DRAGGING_CAMERA360 = 'END_DRAGGING_CAMERA360';
var BEGIN_ROTATING_CAMERA360 = exports.BEGIN_ROTATING_CAMERA360 = 'BEGIN_ROTATING_CAMERA360';
var UPDATE_ROTATING_CAMERA360 = exports.UPDATE_ROTATING_CAMERA360 = 'UPDATE_ROTATING_CAMERA360';
var END_ROTATING_CAMERA360 = exports.END_ROTATING_CAMERA360 = 'END_ROTATING_CAMERA360';
var BEGIN_RESIZING_CAMERA360 = exports.BEGIN_RESIZING_CAMERA360 = 'BEGIN_RESIZING_CAMERA360';
var UPDATE_RESIZING_CAMERA360 = exports.UPDATE_RESIZING_CAMERA360 = 'UPDATE_RESIZING_CAMERA360';
var END_RESIZING_CAMERA360 = exports.END_RESIZING_CAMERA360 = 'END_RESIZING_CAMERA360';

//ACTIONS groups
var ADD_GROUP = exports.ADD_GROUP = 'ADD_GROUP';
var ADD_GROUP_FROM_SELECTED = exports.ADD_GROUP_FROM_SELECTED = 'ADD_GROUP_FROM_SELECTED';
var SELECT_GROUP = exports.SELECT_GROUP = 'SELECT_GROUP';
var UNSELECT_GROUP = exports.UNSELECT_GROUP = 'UNSELECT_GROUP';
var ADD_TO_GROUP = exports.ADD_TO_GROUP = 'ADD_TO_GROUP';
var REMOVE_FROM_GROUP = exports.REMOVE_FROM_GROUP = 'REMOVE_FROM_GROUP';
var SET_GROUP_PROPERTIES = exports.SET_GROUP_PROPERTIES = 'SET_GROUP_PROPERTIES';
var SET_GROUP_ATTRIBUTES = exports.SET_GROUP_ATTRIBUTES = 'SET_GROUP_ATTRIBUTES';
var SET_GROUP_BARYCENTER = exports.SET_GROUP_BARYCENTER = 'SET_GROUP_BARYCENTER';
var REMOVE_GROUP = exports.REMOVE_GROUP = 'REMOVE_GROUP';
var REMOVE_GROUP_AND_DELETE_ELEMENTS = exports.REMOVE_GROUP_AND_DELETE_ELEMENTS = 'REMOVE_GROUP_AND_DELETE_ELEMENTS';
var GROUP_TRANSLATE = exports.GROUP_TRANSLATE = 'GROUP_TRANSLATE';
var GROUP_ROTATE = exports.GROUP_ROTATE = 'GROUP_ROTATE';

//ACTION drawings
var SELECT_HOLE = exports.SELECT_HOLE = 'SELECT_HOLE';
var SELECT_AREA = exports.SELECT_AREA = 'SELECT_AREA';
var SELECT_ITEM = exports.SELECT_ITEM = 'SELECT_ITEM';
var SELECT_CAMERA = exports.SELECT_CAMERA = 'SELECT_CAMERA';
var SELECT_CAMERA360 = exports.SELECT_CAMERA360 = 'SELECT_CAMERA360';
var SELECT_LINE = exports.SELECT_LINE = 'SELECT_LINE';
var SELECT_TOOL_DRAWING_LINE = exports.SELECT_TOOL_DRAWING_LINE = 'SELECT_TOOL_DRAWING_LINE';
var BEGIN_DRAWING_LINE = exports.BEGIN_DRAWING_LINE = 'BEGIN_DRAWING_LINE';
var UPDATE_DRAWING_LINE = exports.UPDATE_DRAWING_LINE = 'UPDATE_DRAWING_LINE';
var END_DRAWING_LINE = exports.END_DRAWING_LINE = 'END_DRAWING_LINE';
var SELECT_TOOL_DRAWING_HOLE = exports.SELECT_TOOL_DRAWING_HOLE = 'SELECT_TOOL_DRAWING_HOLE';
var UPDATE_DRAWING_HOLE = exports.UPDATE_DRAWING_HOLE = 'UPDATE_DRAWING_HOLE'; //SHOULD BE SLPITTED IN BEGIN_DRAWING_HOLE AND UPDATE_DRAWING_HOLE
var END_DRAWING_HOLE = exports.END_DRAWING_HOLE = 'END_DRAWING_HOLE';
var BEGIN_DRAGGING_LINE = exports.BEGIN_DRAGGING_LINE = 'BEGIN_DRAGGING_LINE';
var UPDATE_DRAGGING_LINE = exports.UPDATE_DRAGGING_LINE = 'UPDATE_DRAGGING_LINE';
var END_DRAGGING_LINE = exports.END_DRAGGING_LINE = 'END_DRAGGING_LINE';
var SELECT_TOOL_UPLOAD_IMAGE = exports.SELECT_TOOL_UPLOAD_IMAGE = 'SELECT_TOOL_UPLOAD_IMAGE';
var BEGIN_UPLOADING_IMAGE = exports.BEGIN_UPLOADING_IMAGE = 'BEGIN_UPLOADING_IMAGE';
var END_UPLOADING_IMAGE = exports.END_UPLOADING_IMAGE = 'END_UPLOADING_IMAGE';
var BEGIN_FITTING_IMAGE = exports.BEGIN_FITTING_IMAGE = 'BEGIN_FITTING_IMAGE';
var END_FITTING_IMAGE = exports.END_FITTING_IMAGE = 'END_FITTING_IMAGE';
var BEGIN_DRAGGING_HOLE = exports.BEGIN_DRAGGING_HOLE = 'BEGIN_DRAGGING_HOLE';
var UPDATE_DRAGGING_HOLE = exports.UPDATE_DRAGGING_HOLE = 'UPDATE_DRAGGING_HOLE';
var END_DRAGGING_HOLE = exports.END_DRAGGING_HOLE = 'END_DRAGGING_HOLE';

//ACTIONS vertices
var BEGIN_DRAGGING_VERTEX = exports.BEGIN_DRAGGING_VERTEX = 'BEGIN_DRAGGING_VERTEX';
var UPDATE_DRAGGING_VERTEX = exports.UPDATE_DRAGGING_VERTEX = 'UPDATE_DRAGGING_VERTEX';
var END_DRAGGING_VERTEX = exports.END_DRAGGING_VERTEX = 'END_DRAGGING_VERTEX';

//ACTIONS scene
var SET_LAYER_PROPERTIES = exports.SET_LAYER_PROPERTIES = 'SET_LAYER_PROPERTIES';
var ADD_LAYER = exports.ADD_LAYER = 'ADD_LAYER';
var SELECT_LAYER = exports.SELECT_LAYER = 'SELECT_LAYER';
var REMOVE_LAYER = exports.REMOVE_LAYER = 'REMOVE_LAYER';

//GROUPING ACTIONS
var PROJECT_ACTIONS = exports.PROJECT_ACTIONS = {
    NEW_PROJECT: NEW_PROJECT,
    LOAD_PROJECT: LOAD_PROJECT,
    SAVE_PROJECT: SAVE_PROJECT,
    OPEN_CATALOG: OPEN_CATALOG,
    SELECT_TOOL_EDIT: SELECT_TOOL_EDIT,
    UNSELECT_ALL: UNSELECT_ALL,
    SET_PROPERTIES: SET_PROPERTIES,
    SET_PROPERTIES_ALL: SET_PROPERTIES_ALL,
    SET_ITEMS_ATTRIBUTES: SET_ITEMS_ATTRIBUTES,
    SET_CAMERAS_ATTRIBUTES: SET_CAMERAS_ATTRIBUTES,
    SET_CAMERAS360_ATTRIBUTES: SET_CAMERAS360_ATTRIBUTES,
    SET_LINES_ATTRIBUTES: SET_LINES_ATTRIBUTES,
    SET_HOLES_ATTRIBUTES: SET_HOLES_ATTRIBUTES,
    REMOVE: REMOVE,
    UNDO: UNDO,
    ROLLBACK: ROLLBACK,
    SET_PROJECT_PROPERTIES: SET_PROJECT_PROPERTIES,
    INIT_CATALOG: INIT_CATALOG,
    UPDATE_MOUSE_COORDS: UPDATE_MOUSE_COORDS,
    UPDATE_ZOOM_SCALE: UPDATE_ZOOM_SCALE,
    TOGGLE_SNAP: TOGGLE_SNAP,
    CHANGE_CATALOG_PAGE: CHANGE_CATALOG_PAGE,
    GO_BACK_TO_CATALOG_PAGE: GO_BACK_TO_CATALOG_PAGE,
    THROW_ERROR: THROW_ERROR,
    THROW_WARNING: THROW_WARNING,
    COPY_PROPERTIES: COPY_PROPERTIES,
    PASTE_PROPERTIES: PASTE_PROPERTIES,
    PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY: PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY,
    ALTERATE_STATE: ALTERATE_STATE,
    SET_MODE: SET_MODE,
    ADD_HORIZONTAL_GUIDE: ADD_HORIZONTAL_GUIDE,
    ADD_VERTICAL_GUIDE: ADD_VERTICAL_GUIDE,
    ADD_CIRCULAR_GUIDE: ADD_CIRCULAR_GUIDE,
    REMOVE_HORIZONTAL_GUIDE: REMOVE_HORIZONTAL_GUIDE,
    REMOVE_VERTICAL_GUIDE: REMOVE_VERTICAL_GUIDE,
    REMOVE_CIRCULAR_GUIDE: REMOVE_CIRCULAR_GUIDE,
    OPEN_PROJECT_CONFIGURATOR: OPEN_PROJECT_CONFIGURATOR
};

var VIEWER2D_ACTIONS = exports.VIEWER2D_ACTIONS = {
    SELECT_TOOL_ZOOM_IN: SELECT_TOOL_ZOOM_IN,
    SELECT_TOOL_ZOOM_OUT: SELECT_TOOL_ZOOM_OUT,
    SELECT_TOOL_PAN: SELECT_TOOL_PAN,
    UPDATE_2D_CAMERA: UPDATE_2D_CAMERA,
    UPDATE_2D_CAMERA360: UPDATE_2D_CAMERA360
};

var VIEWER3D_ACTIONS = exports.VIEWER3D_ACTIONS = {
    SELECT_TOOL_3D_VIEW: SELECT_TOOL_3D_VIEW
};

var ITEMS_ACTIONS = exports.ITEMS_ACTIONS = {
    SELECT_ITEM: SELECT_ITEM,
    SELECT_TOOL_DRAWING_ITEM: SELECT_TOOL_DRAWING_ITEM,
    UPDATE_DRAWING_ITEM: UPDATE_DRAWING_ITEM,
    END_DRAWING_ITEM: END_DRAWING_ITEM,
    BEGIN_DRAGGING_ITEM: BEGIN_DRAGGING_ITEM,
    UPDATE_DRAGGING_ITEM: UPDATE_DRAGGING_ITEM,
    END_DRAGGING_ITEM: END_DRAGGING_ITEM,
    BEGIN_ROTATING_ITEM: BEGIN_ROTATING_ITEM,
    UPDATE_ROTATING_ITEM: UPDATE_ROTATING_ITEM,
    END_ROTATING_ITEM: END_ROTATING_ITEM,
    BEGIN_RESIZING_ITEM: BEGIN_RESIZING_ITEM,
    UPDATE_RESIZING_ITEM: UPDATE_RESIZING_ITEM,
    END_RESIZING_ITEM: END_RESIZING_ITEM
};

var CAMERAS_ACTIONS = exports.CAMERAS_ACTIONS = {
    SELECT_CAMERA: SELECT_CAMERA,
    SELECT_TOOL_DRAWING_CAMERA: SELECT_TOOL_DRAWING_CAMERA,
    UPDATE_DRAWING_CAMERA: UPDATE_DRAWING_CAMERA,
    END_DRAWING_CAMERA: END_DRAWING_CAMERA,
    BEGIN_DRAGGING_CAMERA: BEGIN_DRAGGING_CAMERA,
    UPDATE_DRAGGING_CAMERA: UPDATE_DRAGGING_CAMERA,
    END_DRAGGING_CAMERA: END_DRAGGING_CAMERA,
    BEGIN_ROTATING_CAMERA: BEGIN_ROTATING_CAMERA,
    UPDATE_ROTATING_CAMERA: UPDATE_ROTATING_CAMERA,
    END_ROTATING_CAMERA: END_ROTATING_CAMERA,
    BEGIN_RESIZING_CAMERA: BEGIN_RESIZING_CAMERA,
    UPDATE_RESIZING_CAMERA: UPDATE_RESIZING_CAMERA,
    END_RESIZING_CAMERA: END_RESIZING_CAMERA
};
var CAMERAS360_ACTIONS = exports.CAMERAS360_ACTIONS = {
    SELECT_CAMERA360: SELECT_CAMERA360,
    SELECT_TOOL_DRAWING_CAMERA360: SELECT_TOOL_DRAWING_CAMERA360,
    UPDATE_DRAWING_CAMERA360: UPDATE_DRAWING_CAMERA360,
    END_DRAWING_CAMERA360: END_DRAWING_CAMERA360,
    BEGIN_DRAGGING_CAMERA360: BEGIN_DRAGGING_CAMERA360,
    UPDATE_DRAGGING_CAMERA360: UPDATE_DRAGGING_CAMERA360,
    END_DRAGGING_CAMERA360: END_DRAGGING_CAMERA360,
    BEGIN_ROTATING_CAMERA360: BEGIN_ROTATING_CAMERA360,
    UPDATE_ROTATING_CAMERA360: UPDATE_ROTATING_CAMERA360,
    END_ROTATING_CAMERA360: END_ROTATING_CAMERA360,
    BEGIN_RESIZING_CAMERA360: BEGIN_RESIZING_CAMERA360,
    UPDATE_RESIZING_CAMERA360: UPDATE_RESIZING_CAMERA360,
    END_RESIZING_CAMERA360: END_RESIZING_CAMERA360
};

var HOLE_ACTIONS = exports.HOLE_ACTIONS = {
    SELECT_HOLE: SELECT_HOLE,
    SELECT_TOOL_DRAWING_HOLE: SELECT_TOOL_DRAWING_HOLE,
    UPDATE_DRAWING_HOLE: UPDATE_DRAWING_HOLE,
    END_DRAWING_HOLE: END_DRAWING_HOLE,
    BEGIN_DRAGGING_HOLE: BEGIN_DRAGGING_HOLE,
    UPDATE_DRAGGING_HOLE: UPDATE_DRAGGING_HOLE,
    END_DRAGGING_HOLE: END_DRAGGING_HOLE
};

var LINE_ACTIONS = exports.LINE_ACTIONS = {
    SELECT_LINE: SELECT_LINE,
    SELECT_TOOL_DRAWING_LINE: SELECT_TOOL_DRAWING_LINE,
    BEGIN_DRAWING_LINE: BEGIN_DRAWING_LINE,
    UPDATE_DRAWING_LINE: UPDATE_DRAWING_LINE,
    END_DRAWING_LINE: END_DRAWING_LINE,
    BEGIN_DRAGGING_LINE: BEGIN_DRAGGING_LINE,
    UPDATE_DRAGGING_LINE: UPDATE_DRAGGING_LINE,
    END_DRAGGING_LINE: END_DRAGGING_LINE
};

var AREA_ACTIONS = exports.AREA_ACTIONS = {
    SELECT_AREA: SELECT_AREA
};

var GROUP_ACTIONS = exports.GROUP_ACTIONS = {
    ADD_GROUP: ADD_GROUP,
    ADD_GROUP_FROM_SELECTED: ADD_GROUP_FROM_SELECTED,
    SELECT_GROUP: SELECT_GROUP,
    UNSELECT_GROUP: UNSELECT_GROUP,
    ADD_TO_GROUP: ADD_TO_GROUP,
    REMOVE_FROM_GROUP: REMOVE_FROM_GROUP,
    SET_GROUP_PROPERTIES: SET_GROUP_PROPERTIES,
    SET_GROUP_ATTRIBUTES: SET_GROUP_ATTRIBUTES,
    SET_GROUP_BARYCENTER: SET_GROUP_BARYCENTER,
    REMOVE_GROUP: REMOVE_GROUP,
    REMOVE_GROUP_AND_DELETE_ELEMENTS: REMOVE_GROUP_AND_DELETE_ELEMENTS,
    GROUP_TRANSLATE: GROUP_TRANSLATE,
    GROUP_ROTATE: GROUP_ROTATE
};

var SCENE_ACTIONS = exports.SCENE_ACTIONS = {
    ADD_LAYER: ADD_LAYER,
    SET_LAYER_PROPERTIES: SET_LAYER_PROPERTIES,
    SELECT_LAYER: SELECT_LAYER,
    REMOVE_LAYER: REMOVE_LAYER
};

var VERTEX_ACTIONS = exports.VERTEX_ACTIONS = {
    BEGIN_DRAGGING_VERTEX: BEGIN_DRAGGING_VERTEX,
    UPDATE_DRAGGING_VERTEX: UPDATE_DRAGGING_VERTEX,
    END_DRAGGING_VERTEX: END_DRAGGING_VERTEX
};

//MODES
var MODE_IDLE = exports.MODE_IDLE = 'MODE_IDLE';
var MODE_2D_ZOOM_IN = exports.MODE_2D_ZOOM_IN = 'MODE_2D_ZOOM_IN';
var MODE_2D_ZOOM_OUT = exports.MODE_2D_ZOOM_OUT = 'MODE_2D_ZOOM_OUT';
var MODE_2D_PAN = exports.MODE_2D_PAN = 'MODE_2D_PAN';
var MODE_3D_VIEW = exports.MODE_3D_VIEW = 'MODE_3D_VIEW';
var MODE_WAITING_DRAWING_LINE = exports.MODE_WAITING_DRAWING_LINE = 'MODE_WAITING_DRAWING_LINE';
var MODE_DRAGGING_LINE = exports.MODE_DRAGGING_LINE = 'MODE_DRAGGING_LINE';
var MODE_DRAGGING_VERTEX = exports.MODE_DRAGGING_VERTEX = 'MODE_DRAGGING_VERTEX';
var MODE_DRAGGING_ITEM = exports.MODE_DRAGGING_ITEM = 'MODE_DRAGGING_ITEM';
var MODE_DRAGGING_CAMERA = exports.MODE_DRAGGING_CAMERA = 'MODE_DRAGGING_CAMERA';
var MODE_DRAGGING_CAMERA360 = exports.MODE_DRAGGING_CAMERA360 = 'MODE_DRAGGING_CAMERA360';
var MODE_DRAGGING_HOLE = exports.MODE_DRAGGING_HOLE = 'MODE_DRAGGING_HOLE';
var MODE_DRAWING_LINE = exports.MODE_DRAWING_LINE = 'MODE_DRAWING_LINE';
var MODE_DRAWING_HOLE = exports.MODE_DRAWING_HOLE = 'MODE_DRAWING_HOLE';
var MODE_DRAWING_ITEM = exports.MODE_DRAWING_ITEM = 'MODE_DRAWING_ITEM';
var MODE_ROTATING_ITEM = exports.MODE_ROTATING_ITEM = 'MODE_ROTATING_ITEM';
var MODE_RESIZING_ITEM = exports.MODE_RESIZING_ITEM = 'MODE_RESIZING_ITEM';
var MODE_DRAWING_CAMERA = exports.MODE_DRAWING_CAMERA = 'MODE_DRAWING_CAMERA';
var MODE_ROTATING_CAMERA = exports.MODE_ROTATING_CAMERA = 'MODE_ROTATING_CAMERA';
var MODE_RESIZING_CAMERA = exports.MODE_RESIZING_CAMERA = 'MODE_RESIZING_CAMERA';
var MODE_DRAWING_CAMERA360 = exports.MODE_DRAWING_CAMERA360 = 'MODE_DRAWING_CAMERA360';
var MODE_ROTATING_CAMERA360 = exports.MODE_ROTATING_CAMERA360 = 'MODE_ROTATING_CAMERA360';
var MODE_RESIZING_CAMERA360 = exports.MODE_RESIZING_CAMERA360 = 'MODE_RESIZING_CAMERA360';
var MODE_UPLOADING_IMAGE = exports.MODE_UPLOADING_IMAGE = 'MODE_UPLOADING_IMAGE';
var MODE_FITTING_IMAGE = exports.MODE_FITTING_IMAGE = 'MODE_FITTING_IMAGE';
var MODE_VIEWING_CATALOG = exports.MODE_VIEWING_CATALOG = 'MODE_VIEWING_CATALOG';
var MODE_CONFIGURING_PROJECT = exports.MODE_CONFIGURING_PROJECT = 'MODE_CONFIGURING_PROJECT';

//Thinking about it...
//https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Proxy
/*
let MODE_DEF = [
  'IDLE',
  '2D_ZOOM_IN',
  '2D_ZOOM_OUT',
  '2D_PAN',
  '3D_VIEW',
  '3D_FIRST_PERSON',
  'WAITING_DRAWING_LINE',
  'DRAGGING_LINE',
  'DRAGGING_VERTEX',
  'DRAGGING_ITEM',
  'DRAGGING_HOLE',
  'DRAWING_LINE',
  'DRAWING_HOLE',
  'DRAWING_ITEM',
  'ROTATING_ITEM',
  'UPLOADING_IMAGE',
  'FITTING_IMAGE',
  'VIEWING_CATALOG',
  'CONFIGURING_PROJECT',
];

export const MODE = new Proxy( MODE_DEF, { get: (target, name) => { return target.indexOf(name) !== -1 ? name : null } } );
*/

var MODE_SNAPPING = exports.MODE_SNAPPING = [MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAWING_CAMERA, MODE_DRAWING_CAMERA360, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_CAMERA, MODE_DRAGGING_CAMERA360, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM, MODE_RESIZING_ITEM, MODE_ROTATING_CAMERA, MODE_RESIZING_CAMERA, MODE_ROTATING_CAMERA360, MODE_RESIZING_CAMERA360];

//UNITS
var UNIT_MILLIMETER = exports.UNIT_MILLIMETER = 'mm';
var UNIT_CENTIMETER = exports.UNIT_CENTIMETER = 'cm';
var UNIT_METER = exports.UNIT_METER = 'm';
var UNIT_INCH = exports.UNIT_INCH = 'in';
var UNIT_FOOT = exports.UNIT_FOOT = 'ft';
var UNIT_MILE = exports.UNIT_MILE = 'mi';

// export const UNITS_LENGTH = [UNIT_MILLIMETER, UNIT_CENTIMETER, UNIT_METER, UNIT_INCH, UNIT_FOOT, UNIT_MILE];
var UNITS_LENGTH = exports.UNITS_LENGTH = [UNIT_CENTIMETER, UNIT_METER];

var EPSILON = exports.EPSILON = 1e-6;

var KEYBOARD_BUTTON_CODE = exports.KEYBOARD_BUTTON_CODE = {
    DELETE: 46,
    BACKSPACE: 8,
    ESC: 27,
    Z: 90,
    ALT: 18,
    C: 67,
    V: 86,
    CTRL: 17,
    ENTER: 13,
    TAB: 9
};