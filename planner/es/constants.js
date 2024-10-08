// ACTIONS project
export var NEW_PROJECT = 'NEW_PROJECT';
export var LOAD_PROJECT = 'LOAD_PROJECT';
export var SAVE_PROJECT = 'SAVE_PROJECT';
export var OPEN_CATALOG = 'OPEN_CATALOG';
export var SELECT_TOOL_EDIT = 'SELECT_TOOL_EDIT';
export var UNSELECT_ALL = 'UNSELECT_ALL';
export var SET_PROPERTIES = 'SET_PROPERTIES';
export var SET_PROPERTIES_ALL = 'SET_PROPERTIES_ALL';
export var SET_ITEMS_ATTRIBUTES = 'SET_ITEMS_ATTRIBUTES';
export var SET_CAMERAS_ATTRIBUTES = 'SET_CAMERAS_ATTRIBUTES';
export var SET_CAMERAS360_ATTRIBUTES = 'SET_CAMERAS360_ATTRIBUTES';
export var SET_LINES_ATTRIBUTES = 'SET_LINES_ATTRIBUTES';
export var SET_HOLES_ATTRIBUTES = 'SET_HOLES_ATTRIBUTES';
export var REMOVE = 'REMOVE';
export var UNDO = 'UNDO';
export var ROLLBACK = 'ROLLBACK';
export var SET_PROJECT_PROPERTIES = 'SET_PROJECT_PROPERTIES';
export var INIT_CATALOG = 'INIT_CATALOG';
export var UPDATE_MOUSE_COORDS = 'UPDATE_MOUSE_COORDS';
export var UPDATE_ZOOM_SCALE = 'UPDATE_ZOOM_SCALE';
export var TOGGLE_SNAP = 'TOGGLE_SNAP';
export var CHANGE_CATALOG_PAGE = 'CHANGE_CATALOG_PAGE';
export var GO_BACK_TO_CATALOG_PAGE = 'GO_BACK_TO_CATALOG_PAGE';
export var THROW_ERROR = 'THROW_ERROR';
export var THROW_WARNING = 'THROW_WARNING';
export var COPY_PROPERTIES = 'COPY_PROPERTIES';
export var PASTE_PROPERTIES = 'PASTE_PROPERTIES';
export var PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY = 'PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY';
export var ALTERATE_STATE = 'ALTERATE_STATE';
export var SET_MODE = 'SET_MODE';
export var ADD_HORIZONTAL_GUIDE = 'ADD_HORIZONTAL_GUIDE';
export var ADD_VERTICAL_GUIDE = 'ADD_VERTICAL_GUIDE';
export var ADD_CIRCULAR_GUIDE = 'ADD_CIRCULAR_GUIDE';
export var REMOVE_HORIZONTAL_GUIDE = 'REMOVE_HORIZONTAL_GUIDE';
export var REMOVE_VERTICAL_GUIDE = 'REMOVE_VERTICAL_GUIDE';
export var REMOVE_CIRCULAR_GUIDE = 'REMOVE_CIRCULAR_GUIDE';
export var OPEN_PROJECT_CONFIGURATOR = 'OPEN_PROJECT_CONFIGURATOR';

// ACTIONS viewer2D
export var SELECT_TOOL_ZOOM_IN = 'SELECT_TOOL_ZOOM_IN';
export var SELECT_TOOL_ZOOM_OUT = 'SELECT_TOOL_ZOOM_OUT';
export var SELECT_TOOL_PAN = 'SELECT_TOOL_PAN';
export var UPDATE_2D_CAMERA = 'UPDATE_2D_CAMERA';
export var UPDATE_2D_CAMERA360 = 'UPDATE_2D_CAMERA360';

//ACTIONS viewer3D
export var SELECT_TOOL_3D_VIEW = 'SELECT_TOOL_3D_VIEW';

//ACTIONS items
export var SELECT_TOOL_DRAWING_ITEM = 'SELECT_TOOL_DRAWING_ITEM';
export var UPDATE_DRAWING_ITEM = 'UPDATE_DRAWING_ITEM';
export var END_DRAWING_ITEM = 'END_DRAWING_ITEM';
export var BEGIN_DRAGGING_ITEM = 'BEGIN_DRAGGING_ITEM';
export var UPDATE_DRAGGING_ITEM = 'UPDATE_DRAGGING_ITEM';
export var END_DRAGGING_ITEM = 'END_DRAGGING_ITEM';
export var BEGIN_ROTATING_ITEM = 'BEGIN_ROTATING_ITEM';
export var UPDATE_ROTATING_ITEM = 'UPDATE_ROTATING_ITEM';
export var END_ROTATING_ITEM = 'END_ROTATING_ITEM';
export var BEGIN_RESIZING_ITEM = 'BEGIN_RESIZING_ITEM';
export var UPDATE_RESIZING_ITEM = 'UPDATE_RESIZING_ITEM';
export var END_RESIZING_ITEM = 'END_RESIZING_ITEM';

//ACTIONS camera
export var SELECT_TOOL_DRAWING_CAMERA = 'SELECT_TOOL_DRAWING_CAMERA';
export var UPDATE_DRAWING_CAMERA = 'UPDATE_DRAWING_CAMERA';
export var END_DRAWING_CAMERA = 'END_DRAWING_CAMERA';
export var BEGIN_DRAGGING_CAMERA = 'BEGIN_DRAGGING_CAMERA';
export var UPDATE_DRAGGING_CAMERA = 'UPDATE_DRAGGING_CAMERA';
export var END_DRAGGING_CAMERA = 'END_DRAGGING_CAMERA';
export var BEGIN_ROTATING_CAMERA = 'BEGIN_ROTATING_CAMERA';
export var UPDATE_ROTATING_CAMERA = 'UPDATE_ROTATING_CAMERA';
export var END_ROTATING_CAMERA = 'END_ROTATING_CAMERA';
export var BEGIN_RESIZING_CAMERA = 'BEGIN_RESIZING_CAMERA';
export var UPDATE_RESIZING_CAMERA = 'UPDATE_RESIZING_CAMERA';
export var END_RESIZING_CAMERA = 'END_RESIZING_CAMERA';

//ACTIONS camera 360
export var SELECT_TOOL_DRAWING_CAMERA360 = 'SELECT_TOOL_DRAWING_CAMERA360';
export var UPDATE_DRAWING_CAMERA360 = 'UPDATE_DRAWING_CAMERA360';
export var END_DRAWING_CAMERA360 = 'END_DRAWING_CAMERA360';
export var BEGIN_DRAGGING_CAMERA360 = 'BEGIN_DRAGGING_CAMERA360';
export var UPDATE_DRAGGING_CAMERA360 = 'UPDATE_DRAGGING_CAMERA360';
export var END_DRAGGING_CAMERA360 = 'END_DRAGGING_CAMERA360';
export var BEGIN_ROTATING_CAMERA360 = 'BEGIN_ROTATING_CAMERA360';
export var UPDATE_ROTATING_CAMERA360 = 'UPDATE_ROTATING_CAMERA360';
export var END_ROTATING_CAMERA360 = 'END_ROTATING_CAMERA360';
export var BEGIN_RESIZING_CAMERA360 = 'BEGIN_RESIZING_CAMERA360';
export var UPDATE_RESIZING_CAMERA360 = 'UPDATE_RESIZING_CAMERA360';
export var END_RESIZING_CAMERA360 = 'END_RESIZING_CAMERA360';

//ACTIONS groups
export var ADD_GROUP = 'ADD_GROUP';
export var ADD_GROUP_FROM_SELECTED = 'ADD_GROUP_FROM_SELECTED';
export var SELECT_GROUP = 'SELECT_GROUP';
export var UNSELECT_GROUP = 'UNSELECT_GROUP';
export var ADD_TO_GROUP = 'ADD_TO_GROUP';
export var REMOVE_FROM_GROUP = 'REMOVE_FROM_GROUP';
export var SET_GROUP_PROPERTIES = 'SET_GROUP_PROPERTIES';
export var SET_GROUP_ATTRIBUTES = 'SET_GROUP_ATTRIBUTES';
export var SET_GROUP_BARYCENTER = 'SET_GROUP_BARYCENTER';
export var REMOVE_GROUP = 'REMOVE_GROUP';
export var REMOVE_GROUP_AND_DELETE_ELEMENTS = 'REMOVE_GROUP_AND_DELETE_ELEMENTS';
export var GROUP_TRANSLATE = 'GROUP_TRANSLATE';
export var GROUP_ROTATE = 'GROUP_ROTATE';

//ACTION drawings
export var SELECT_HOLE = 'SELECT_HOLE';
export var SELECT_AREA = 'SELECT_AREA';
export var SELECT_ITEM = 'SELECT_ITEM';
export var SELECT_CAMERA = 'SELECT_CAMERA';
export var SELECT_CAMERA360 = 'SELECT_CAMERA360';
export var SELECT_LINE = 'SELECT_LINE';
export var SELECT_TOOL_DRAWING_LINE = 'SELECT_TOOL_DRAWING_LINE';
export var BEGIN_DRAWING_LINE = 'BEGIN_DRAWING_LINE';
export var UPDATE_DRAWING_LINE = 'UPDATE_DRAWING_LINE';
export var END_DRAWING_LINE = 'END_DRAWING_LINE';
export var SELECT_TOOL_DRAWING_HOLE = 'SELECT_TOOL_DRAWING_HOLE';
export var UPDATE_DRAWING_HOLE = 'UPDATE_DRAWING_HOLE'; //SHOULD BE SLPITTED IN BEGIN_DRAWING_HOLE AND UPDATE_DRAWING_HOLE
export var END_DRAWING_HOLE = 'END_DRAWING_HOLE';
export var BEGIN_DRAGGING_LINE = 'BEGIN_DRAGGING_LINE';
export var UPDATE_DRAGGING_LINE = 'UPDATE_DRAGGING_LINE';
export var END_DRAGGING_LINE = 'END_DRAGGING_LINE';
export var SELECT_TOOL_UPLOAD_IMAGE = 'SELECT_TOOL_UPLOAD_IMAGE';
export var BEGIN_UPLOADING_IMAGE = 'BEGIN_UPLOADING_IMAGE';
export var END_UPLOADING_IMAGE = 'END_UPLOADING_IMAGE';
export var BEGIN_FITTING_IMAGE = 'BEGIN_FITTING_IMAGE';
export var END_FITTING_IMAGE = 'END_FITTING_IMAGE';
export var BEGIN_DRAGGING_HOLE = 'BEGIN_DRAGGING_HOLE';
export var UPDATE_DRAGGING_HOLE = 'UPDATE_DRAGGING_HOLE';
export var END_DRAGGING_HOLE = 'END_DRAGGING_HOLE';

//ACTIONS vertices
export var BEGIN_DRAGGING_VERTEX = 'BEGIN_DRAGGING_VERTEX';
export var UPDATE_DRAGGING_VERTEX = 'UPDATE_DRAGGING_VERTEX';
export var END_DRAGGING_VERTEX = 'END_DRAGGING_VERTEX';

//ACTIONS scene
export var SET_LAYER_PROPERTIES = 'SET_LAYER_PROPERTIES';
export var ADD_LAYER = 'ADD_LAYER';
export var SELECT_LAYER = 'SELECT_LAYER';
export var REMOVE_LAYER = 'REMOVE_LAYER';

//GROUPING ACTIONS
export var PROJECT_ACTIONS = {
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

export var VIEWER2D_ACTIONS = {
    SELECT_TOOL_ZOOM_IN: SELECT_TOOL_ZOOM_IN,
    SELECT_TOOL_ZOOM_OUT: SELECT_TOOL_ZOOM_OUT,
    SELECT_TOOL_PAN: SELECT_TOOL_PAN,
    UPDATE_2D_CAMERA: UPDATE_2D_CAMERA,
    UPDATE_2D_CAMERA360: UPDATE_2D_CAMERA360
};

export var VIEWER3D_ACTIONS = {
    SELECT_TOOL_3D_VIEW: SELECT_TOOL_3D_VIEW
};

export var ITEMS_ACTIONS = {
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

export var CAMERAS_ACTIONS = {
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
export var CAMERAS360_ACTIONS = {
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

export var HOLE_ACTIONS = {
    SELECT_HOLE: SELECT_HOLE,
    SELECT_TOOL_DRAWING_HOLE: SELECT_TOOL_DRAWING_HOLE,
    UPDATE_DRAWING_HOLE: UPDATE_DRAWING_HOLE,
    END_DRAWING_HOLE: END_DRAWING_HOLE,
    BEGIN_DRAGGING_HOLE: BEGIN_DRAGGING_HOLE,
    UPDATE_DRAGGING_HOLE: UPDATE_DRAGGING_HOLE,
    END_DRAGGING_HOLE: END_DRAGGING_HOLE
};

export var LINE_ACTIONS = {
    SELECT_LINE: SELECT_LINE,
    SELECT_TOOL_DRAWING_LINE: SELECT_TOOL_DRAWING_LINE,
    BEGIN_DRAWING_LINE: BEGIN_DRAWING_LINE,
    UPDATE_DRAWING_LINE: UPDATE_DRAWING_LINE,
    END_DRAWING_LINE: END_DRAWING_LINE,
    BEGIN_DRAGGING_LINE: BEGIN_DRAGGING_LINE,
    UPDATE_DRAGGING_LINE: UPDATE_DRAGGING_LINE,
    END_DRAGGING_LINE: END_DRAGGING_LINE
};

export var AREA_ACTIONS = {
    SELECT_AREA: SELECT_AREA
};

export var GROUP_ACTIONS = {
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

export var SCENE_ACTIONS = {
    ADD_LAYER: ADD_LAYER,
    SET_LAYER_PROPERTIES: SET_LAYER_PROPERTIES,
    SELECT_LAYER: SELECT_LAYER,
    REMOVE_LAYER: REMOVE_LAYER
};

export var VERTEX_ACTIONS = {
    BEGIN_DRAGGING_VERTEX: BEGIN_DRAGGING_VERTEX,
    UPDATE_DRAGGING_VERTEX: UPDATE_DRAGGING_VERTEX,
    END_DRAGGING_VERTEX: END_DRAGGING_VERTEX
};

//MODES
export var MODE_IDLE = 'MODE_IDLE';
export var MODE_2D_ZOOM_IN = 'MODE_2D_ZOOM_IN';
export var MODE_2D_ZOOM_OUT = 'MODE_2D_ZOOM_OUT';
export var MODE_2D_PAN = 'MODE_2D_PAN';
export var MODE_3D_VIEW = 'MODE_3D_VIEW';
export var MODE_WAITING_DRAWING_LINE = 'MODE_WAITING_DRAWING_LINE';
export var MODE_DRAGGING_LINE = 'MODE_DRAGGING_LINE';
export var MODE_DRAGGING_VERTEX = 'MODE_DRAGGING_VERTEX';
export var MODE_DRAGGING_ITEM = 'MODE_DRAGGING_ITEM';
export var MODE_DRAGGING_CAMERA = 'MODE_DRAGGING_CAMERA';
export var MODE_DRAGGING_CAMERA360 = 'MODE_DRAGGING_CAMERA360';
export var MODE_DRAGGING_HOLE = 'MODE_DRAGGING_HOLE';
export var MODE_DRAWING_LINE = 'MODE_DRAWING_LINE';
export var MODE_DRAWING_HOLE = 'MODE_DRAWING_HOLE';
export var MODE_DRAWING_ITEM = 'MODE_DRAWING_ITEM';
export var MODE_ROTATING_ITEM = 'MODE_ROTATING_ITEM';
export var MODE_RESIZING_ITEM = 'MODE_RESIZING_ITEM';
export var MODE_DRAWING_CAMERA = 'MODE_DRAWING_CAMERA';
export var MODE_ROTATING_CAMERA = 'MODE_ROTATING_CAMERA';
export var MODE_RESIZING_CAMERA = 'MODE_RESIZING_CAMERA';
export var MODE_DRAWING_CAMERA360 = 'MODE_DRAWING_CAMERA360';
export var MODE_ROTATING_CAMERA360 = 'MODE_ROTATING_CAMERA360';
export var MODE_RESIZING_CAMERA360 = 'MODE_RESIZING_CAMERA360';
export var MODE_UPLOADING_IMAGE = 'MODE_UPLOADING_IMAGE';
export var MODE_FITTING_IMAGE = 'MODE_FITTING_IMAGE';
export var MODE_VIEWING_CATALOG = 'MODE_VIEWING_CATALOG';
export var MODE_CONFIGURING_PROJECT = 'MODE_CONFIGURING_PROJECT';

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

export var MODE_SNAPPING = [MODE_IDLE, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT, MODE_2D_PAN, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAWING_HOLE, MODE_DRAWING_ITEM, MODE_DRAWING_CAMERA, MODE_DRAWING_CAMERA360, MODE_DRAGGING_LINE, MODE_DRAGGING_VERTEX, MODE_DRAGGING_ITEM, MODE_DRAGGING_CAMERA, MODE_DRAGGING_CAMERA360, MODE_DRAGGING_HOLE, MODE_FITTING_IMAGE, MODE_UPLOADING_IMAGE, MODE_ROTATING_ITEM, MODE_RESIZING_ITEM, MODE_ROTATING_CAMERA, MODE_RESIZING_CAMERA, MODE_ROTATING_CAMERA360, MODE_RESIZING_CAMERA360];

//UNITS
export var UNIT_MILLIMETER = 'mm';
export var UNIT_CENTIMETER = 'cm';
export var UNIT_METER = 'm';
export var UNIT_INCH = 'in';
export var UNIT_FOOT = 'ft';
export var UNIT_MILE = 'mi';

// export const UNITS_LENGTH = [UNIT_MILLIMETER, UNIT_CENTIMETER, UNIT_METER, UNIT_INCH, UNIT_FOOT, UNIT_MILE];
export var UNITS_LENGTH = [UNIT_CENTIMETER, UNIT_METER];

export var EPSILON = 1e-6;

export var KEYBOARD_BUTTON_CODE = {
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