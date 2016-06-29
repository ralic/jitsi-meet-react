import React, { Component } from 'react';
import { Text, View } from 'react-native';

import styles from './styles/Styles';

/**
 * The native container rendering the conference view.
 */
export class ConferenceContainer extends Component {
    render() {
        return (
            <View style = { styles.conference }>{ this.props.children }</View>
        );
    }
}
