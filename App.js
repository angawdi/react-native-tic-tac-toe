import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Board from './Board';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      turnX: true,
      turnCount: 1,
      winner: null,
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
    }
  }

  takeTurn = (row, col) => {
    if(!this.state.winner){
      let newData = [...this.state.tableData]
      newData[row][col] = this.state.turnX ? 'X' : 'O'
      let winner = this.checkWin(newData)

      if(winner){ // Somebody won!
        console.log(winner, 'is the winner')
        this.setState({
          tableData: newData,
          winner: winner
        })
      }
      else if(this.state.turnCount > 8){ // Tie!
        console.log('DRAW - CATS GAME!')
        this.setState({
          tableData: newData,
          winner: 'CAT'
        })
      }
      else { // Game keeps going
        this.setState({
        tableData: newData,
          turnX: !this.state.turnX,
          turnCount: this.state.turnCount + 1
        })
      }
    }
    else {
      Alert.alert(`Chill out, ${this.state.winner} already won!`)
    }
  }

  checkWin = (data) => {
    let squares = [].concat(...data); // flattens our data array!
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  reset = () => {
    this.setState({
      turnX: true,
      turnCount: 1,
      winner: null,
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
    })
  }

  render() {
    let statusView;
    if(this.state.winner){
      statusView = (
        <View style={styles.centered}>
          <Text style={styles.winner}>Congrats {this.state.winner}!</Text>
          <Text style={styles.winner}>You Win!</Text>
          <Button
            title="New Game?"
            color="#7f6dcc"
            onPress={this.reset}
            style={styles.button} />
        </View>
        )
    }
    else {
      statusView = (
        <View style={styles.centered}>
          <Text style={styles.turn}>Turn: {this.state.turnX ? 'X' : 'O'}</Text>
        </View>
        )
    }

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'home', color: '#fff', onPress: () => this.reset() }}
          centerComponent={{ text: 'TIC-TAC-TOE!', style: { color: '#fff' } }}
          outerContainerStyles={{ backgroundColor: '#7f6dcc' }} />
        <View style={styles.centered}>
          <Board takeTurn={this.takeTurn} tableData={this.state.tableData} />
        </View>
        { statusView }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  winner: {
    fontSize: 40,
    color: '#7f6dcc',
  },
  button: {
    marginTop: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#0f0',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  turn: {
    fontSize: 35,
  }
});
