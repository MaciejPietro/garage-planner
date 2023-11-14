import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Translator from './translator/translator';
import Catalog from './catalog/catalog';
import actions from './actions/export';
import { objectsMap } from './utils/objects-utils';
import {
    ToolbarComponents,
    Content,
    SidebarComponents,
    FooterBarComponents,
} from './components/export';
import { VERSION } from './version';
import * as SharedStyle from './shared-style';
import './styles/app.css';
import { Project } from './class/export';

const { Toolbar } = ToolbarComponents;
const { Sidebar } = SidebarComponents;
const { FooterBar } = FooterBarComponents;

const toolbarW = 50;
const sidebarW = 210;
const footerBarH = 20;

const wrapperStyle = {
    display: 'flex',
    flexFlow: 'row nowrap',
    background: SharedStyle.COLORS.blue,
};

class ReactPlanner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedImage: '',
            imageProperties: '',
            sceneDimensions: '',
        };
    }

    getChildContext() {
        return {
            ...objectsMap(actions, (actionNamespace) => this.props[actionNamespace]),
            translator: this.props.translator,
            catalog: this.props.catalog,
        };
    }

    componentWillMount() {
        let { store } = this.context;
        let {
            projectActions,
            catalog,
            stateExtractor,
            plugins,
            sceneDimensions,
            jsonData,
        } = this.props;
        plugins.forEach((plugin) => plugin(store, stateExtractor));
        projectActions.initCatalog(catalog);

        // AUTO SAVE/LOAD PROJECT
        jsonData && projectActions.loadProject(jsonData);

        // let {projectActions, sceneDimensions} = this.props;
        projectActions.setProjectProperties({
            width: sceneDimensions.width,
            height: sceneDimensions.length,
        });
    }

    componentDidMount() {
        this.registerListener();
    }

    componentWillReceiveProps(nextProps) {
        let { stateExtractor, state, projectActions, catalog, sceneDimensions } =
            nextProps;
        let plannerState = stateExtractor(state);
        let catalogReady = plannerState.getIn(['catalog', 'ready']);
        if (!catalogReady) {
            projectActions.initCatalog(catalog);
        }
    }

    render() {
        let {
            width,
            height,
            state,
            stateExtractor,
            imageGuide,
            svg,
            sceneDimensions,
            ...props
        } = this.props;
        let contentW = width;
        let toolbarH = height - footerBarH;
        let contentH = height;
        let sidebarH = height - footerBarH;

        let extractedState = stateExtractor(state);

        return (
            <div style={{ ...wrapperStyle, height }}>
                <Toolbar
                    width={toolbarW}
                    height={toolbarH}
                    state={extractedState}
                    {...props}
                />
                <Content
                    width={contentW}
                    height={contentH}
                    state={extractedState}
                    imageGuide={imageGuide}
                    sceneDimensions={sceneDimensions}
                    {...props}
                    onWheel={(event) => {
                        event.preventDefault();
                    }}
                />
                <Sidebar
                    width={sidebarW}
                    height={sidebarH}
                    state={extractedState}
                    {...props}
                />
            </div>
        );
    }

    registerListener() {
        window.addEventListener('message', (e) => this.getOnboardingData(e), false);
    }

    getOnboardingData(event) {
        const message = event.data && event.data.message;

        if (message === 'setWallHeight') {
            const { projectActions } = this.props;
            const value = event.data && event.data.value;
            projectActions.setPropertiesAll(parseInt(value));
        }

        if (message === 'clearProject') {
            const { projectActions } = this.props;
            projectActions.newProject();
            projectActions.setProjectProperties({
                width: this.props.sceneDimensions.width,
                height: this.props.sceneDimensions.length,
            });
        }

        if (message === 'startAsyncSave') {
            let extractedState = this.props.stateExtractor(this.props.state);
            extractedState = Project.unselectAll(extractedState).updatedState;
            const threeDScene = extractedState.get('scene').toJS();

            const sceneWidth = threeDScene.width;
            const sceneHeight = threeDScene.height;
            const svgContent = document.querySelector('#svg-drawing-paper').outerHTML;
            const svgWrapper = `<svg width="${sceneWidth}" height="${sceneHeight}" fill="#fff" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
            window.parent.postMessage(
                {
                    message: 'sendToApiData',
                    value: {
                        threeDScene,
                        svg: svgWrapper,
                    },
                },
                '*'
            );
        }
    }
}

ReactPlanner.propTypes = {
    translator: PropTypes.instanceOf(Translator),
    catalog: PropTypes.instanceOf(Catalog),
    allowProjectFileSupport: PropTypes.bool,
    plugins: PropTypes.arrayOf(PropTypes.func),
    autosaveKey: PropTypes.string,
    autosaveDelay: PropTypes.number,
    stateExtractor: PropTypes.func.isRequired,
    toolbarButtons: PropTypes.array,
    sidebarComponents: PropTypes.array,
    footerbarComponents: PropTypes.array,
    customContents: PropTypes.object,
    softwareSignature: PropTypes.string,
    imageGuide: PropTypes.any,
    sceneDimensions: PropTypes.object,
    json: PropTypes.any,
};

ReactPlanner.contextTypes = {
    store: PropTypes.object.isRequired,
};

ReactPlanner.childContextTypes = {
    ...objectsMap(actions, () => PropTypes.object),
    translator: PropTypes.object,
    catalog: PropTypes.object,
};

ReactPlanner.defaultProps = {
    translator: new Translator(),
    catalog: new Catalog(),
    plugins: [],
    allowProjectFileSupport: true,
    softwareSignature: `React-Planner ${VERSION}`,
    toolbarButtons: [],
    sidebarComponents: [],
    footerbarComponents: [],
    customContents: {},
};

//redux connect
function mapStateToProps(reduxState) {
    return {
        state: reduxState,
    };
}

function mapDispatchToProps(dispatch) {
    return objectsMap(actions, (actionNamespace) =>
        bindActionCreators(actions[actionNamespace], dispatch)
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactPlanner);
