import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Modal } from 'react-native';
import Touchable from '../components/Touchable';
import Image from '../components/Image';
import Icon from '../components/Icon';
import Toolbar from '../components/Toolbar';
import Container from '../components/Container';
import { ListItemGroup } from '../components/List';
import Navigator from '../Navigation';


class SelectPlayerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Spieler wählen',
            items: [],
            selected: {},
            selection: 1,
            ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        };
    }

    setItems(items) {
          if (this.listView) {
            this.listView.scrollTo({ x: 0, y: 0, animated: false});
        }
        this.setState({
            items: items,
            selected: {}
        });
    }

    setSelection(selection) {
        if (typeof selection !== 'number') {
            throw 'selection must be number';
        }
        this.setState({
            selection: selection
        });
    }

    setTitle(title) {
        this.setState({ title });
    }

    onPress(data, idx) {
        const selected = {...this.state.selected };
        if (selected[idx]) {
            delete selected[idx];
        } else {
            selected[idx] = true;
        }
        this.setState({
            selected: selected
        });
        console.tron.log(""+idx);
        console.tron.log(data);
        if (Object.values(selected).length === this.state.selection && this.result) {
            console.tron.log('return results');
            const result = [];
            for (let itemIdx in selected) {
                result.push(this.state.items[itemIdx]);
            }

            setTimeout(() => { // wait animation is done
                this.result(result);
            }, 50);

        }
    }

    renderItem(data, idx) {
        const color = this.state.selected[idx] ?
            this.props.settings.color : '#666';
        return (
            <Touchable key={data.id} onPress={() => { this.onPress(data, idx); }}>
                <View style={style.listItem}>
                    <Image url={data.image} height={40} width={40} />
                    <Text>{ `${data.name} ${data.surname}` }</Text>
                    <View style={{flex:1}} />
                    <Icon name={this.state.selected[idx] ? 'checkbox' : 'square-outline'}
                          color={color}
                          size={24}  />
                </View>
            </Touchable>
        );
    }

    renderItems() {
        return (
            <Container>
                <ListItemGroup>
                    { this.state.items.map( (item, idx) => {
                        return this.renderItem(item, idx);
                        })
                    }
                </ListItemGroup>
            </Container>
        );
        
    }

    render() {
        return (
            <Modal 
                visible={this.props.dialog.player}
                animationType='slide'
                onRequestClose={() => { this.props.hidePlayerDialog(); }}>
                <Navigator 
                    closeModal={this.props.hidePlayerDialog.bind(this)}
                    renderScene={this.renderItems.bind(this)}
                    initialRoute={{ title: this.state.title }}
                    />                
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    listItem: {
        height: 62,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

SelectPlayerModal.propTypes = {
    hidePlayerDialog: React.PropTypes.func,
    settings: React.PropTypes.object,
    dialog: React.PropTypes.object
};

export default SelectPlayerModal;