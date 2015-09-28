'use strict';

import React from 'react-native';

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} = React

const SCREEN_WIDTH = Dimensions.get('window').width;

import webSocketStream from 'rn-websocket-stream';
import dnode from 'dnode';
import MuxDemux from 'mux-demux';
import Model from 'scuttlebutt/model';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wsStatus: 'Connecting...',
      rpcResult: '',
      remoteTimer: '',
    };
  }

  setup() {
    const d = this.d = dnode();
    // Call a rpc method when the remote server reday for that
    d.on('remote', (remote) => {
      this.setState({rpcResult: 'Server is ready'});

      // Add some delay to show the status changing
      setTimeout( () =>
        remote.transform('beep', (s) => this.setState({rpcResult: 'beep => ' + s}))
      , 1e3)
    })

    const mx = this.mx = MuxDemux();
    const timerModel = this.timerModel = new Model();

    // bind rpc and scuttlebutt streams to mx
    const mxStreamForRpc = this.mxStreamForRpc = mx.createStream('rpc');
    mxStreamForRpc.pipe(d).pipe(mxStreamForRpc);
    const mxStreamForTimer = this.mxStreamForTimer = mx.createStream('timer');
    const timerStream = this.timerStream = timerModel.createStream({wrapper:'raw'});
    mxStreamForTimer.pipe(timerStream).pipe(mxStreamForTimer);

    timerStream.on('synced', () => this.setState({remoteTimer: 'Timer Synced' }));
    timerModel.on('change', (key, value) => this.setState({remoteTimer: new Date(value).toTimeString().slice(0, 8) }));
  }

  componentDidMount() {
    this.setup();
    this.conn = webSocketStream('ws://localhost:9999');
    this.conn.pipe(this.mx).pipe(this.conn);
    this.conn.on('connect', () => this.setState({wsStatus: 'Connected'}))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.leftColumn}>
              WebSocket Status:
          </Text>
          <Text style={styles.rightColumn}>
              { this.state.wsStatus }
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftColumn}>
              RPC Result:
          </Text>
          <Text style={styles.rightColumn}>
              { this.state.rpcResult }
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.leftColumn}>
              Time on Server:
          </Text>
          <Text style={styles.rightColumn}>
              { this.state.remoteTimer }
          </Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101010',
  },
  row: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
  },
  leftColumn: {
    fontSize: 20,
    textAlign: 'right',
    color: '#eeeeee',
    flex: 1,
  },
  rightColumn: {
    fontSize: 20,
    textAlign: 'center',
    color: '#eeeeee',
    flex: 1,
  },
});

React.AppRegistry.registerComponent('rnMuxNodeButt', () => App);