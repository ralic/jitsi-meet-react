import React, { Component } from 'react';
import { connect } from 'react-redux';

import config from '../../../config';
import {
    destroy,
    init
} from '../../base/connection';
import { FilmStrip } from '../../filmStrip';
import { LargeVideo } from '../../largeVideo';
import { Toolbar } from '../../toolbar';

import { ConferenceContainer } from './ConferenceContainer';

/**
 * The conference page of the application.
 */
class Conference extends Component {

    /**
     * Initializes a new Conference instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props) {
        super(props);

        this.state = { toolbarIsVisible: false };

        // Bind event handlers so they are only bound once for every instance.
        this._onPress = this._onPress.bind(this);
    }

    /**
     * Inits new connection and conference when conference screen is entered.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillMount() {
        this.props.dispatch(init(config, this.props.room));
    }

    /**
     * Destroys connection, conference and local tracks when conference screen
     * is left.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentWillUnmount() {
        this.props.dispatch(destroy());
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <ConferenceContainer onPress={ this._onPress }>
                <LargeVideo/>
                <Toolbar
                    navigator={ this.props.navigator }
                    visible={ this.state.toolbarIsVisible } />
                <FilmStrip
                    visible={ !this.state.toolbarIsVisible } />
            </ConferenceContainer>
        );
    }

    /**
     * Changes the value of the toolbarIsVisible property, thus allowing
     * us to 'switch' between toolbar and filmstrip views and change the
     * visibility of the above.
     *
     * @private
     * @returns {void}
     */
    _onPress() {
        this.setState({ toolbarIsVisible: !this.state.toolbarIsVisible });
    }
}

/**
 * Conference component's property types.
 *
 * Ensure that the application navigator object is passed down via props on
 * mobile.
 *
 * @static
 */
Conference.propTypes = {
    dispatch: React.PropTypes.func,
    navigator: React.PropTypes.object,
    participants: React.PropTypes.object,
    room: React.PropTypes.string
};

/**
 * Maps room property from state to component props.
 *
 * @param {Object} state - Redux state.
 * @returns {{ room: string }}
 */
export const mapStateToProps = state => {
    const stateFeaturesConference = state['features/base/conference'];

    return {
        room: stateFeaturesConference.room
    };
};

export default connect(mapStateToProps)(Conference);
