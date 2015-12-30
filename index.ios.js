/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView
  } = React;

var BASE_URL = "https://api.github.com/search/repositories?q=";

var GithubFinder = React.createClass({

  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2)=> row1 !== row2
      }),
    }
  },


  onSearchChange: function (event:Object) {
    var searchTerm = event.nativeEvent.text.toLowerCase();
    var queryURL = BASE_URL + encodeURIComponent(searchTerm);
    fetch(queryURL)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.items) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.items),
          });
        }
      })
  },

  renderRow: function (repo:Object) {
    return (
      <View>
        <View style={styles.row}>
          <Text>{repo.name}</Text>
        </View>
        <View style={styles.cellBorder}/>
      </View>
    )
  },

  render: function () {

    var content;
    if (this.state.dataSource.getRowCount() === 0) {
      content = (
        <Text>
          Please enter a search term to see results.
        </Text>
      )
    } else {
      content = (
        <ListView ref="listview"
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  automaticallyAdjustContentInsets={false}
                  keyboardDismissMode="on-drag"
                  keyboardShouldPersistTaps={true}
                  showsVerticalScrollIndicator={true}
          />
      )
    }

    return (
      <View style={styles.container}>
        <TextInput autoCapitalize="none"
                   autoCorrect={false}
                   placeholder="Search for a project ..."
                   style={styles.searchBarInput}
                   onEndEditing={this.onSearchChange}
          />
        {content}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  searchBarInput: {
    marginTop: 30,
    padding: 5,
    fontSize: 15,
    height: 30,
    backgroundColor: "#EAEAEA",
  },
  row: {
    alignItems: 'center',
    backgroundColor: "white",
    flexDirection: "row",
    padding: 5,
  },
  cellBorder: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    marginLeft: 4,
  }
});

AppRegistry.registerComponent('GithubFinder', () => GithubFinder);
