This is a demo project to show how to use node.js modules in react-native env(only iOS supported).

# Clone and start Server first

```
git clone https://github.com/jacobbubu/mux-dnode-butt.git
cd mux-dnode-butt
npm install
npm start
```

The server will be listening on port 9999.

This server consists of a [dnode](https://github.com/substack/dnode) for rpc and a [scuttlebutt model](https://github.com/dominictarr/scuttlebutt) running on a [multiplexed](https://github.com/dominictarr/mux-demux) [websocket stream](https://github.com/maxogden/websocket-stream).

# Install This Repo.

```
git clone https://github.com/jacobbubu/rnMuxNodeButt.git
cd rnMuxNodeButt
npm install
```

## To Run

```
npm start
```

_This repo. use [react-native-webpack-server](https://github.com/mjohnston/react-native-webpack-server) for code packaging._

And then open `ios/rnMuxNodeButt.xcodeproj` in Xcode, click Run button(cmd+R).

The screenshot in simulator would looks like as following.

![Screenshot](https://github.com/jacobbubu/rnMuxNodeButt/blob/master/docs/Screen%20Shot.png?raw=true)
