import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'immutable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MyCatalog from './catalog/mycatalog';
import {
    Models as PlannerModels,
    reducer as PlannerReducer,
    ReactPlanner,
    Plugins as PlannerPlugins,
} from 'react-planner';
import ContainerDimensions from 'react-container-dimensions';
import ReactPlannerWrapper from './components/ReactPlannerWrapper';

//define state
let AppState = Map({
    'react-planner': new PlannerModels.State(),
});

//define reducer
let reducer = (state, action) => {
    state = state || AppState;
    state = state.update('react-planner', (plannerState) =>
        PlannerReducer(plannerState, action)
    );
    return state;
};

let store = createStore(reducer, null);

let plugins = [
    PlannerPlugins.Keyboard(),
    PlannerPlugins.Autosave('react-planner_v0'),
    PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [];

ReactDOM.render(
    <Provider store={store}>
        <ContainerDimensions>
            {({ width, height }) => (
                <ReactPlannerWrapper
                    children={
                        <ReactPlanner
                            catalog={MyCatalog}
                            plugins={plugins}
                            width={width}
                            height={height}
                            toolbarButtons={toolbarButtons}
                            stateExtractor={(state) => state.get('react-planner')}
                        />
                    }
                />
            )}
        </ContainerDimensions>
    </Provider>,
    document.getElementById('app')
);
