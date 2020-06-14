import fastify from 'fastify';
import fastifyWebsocket from 'fastify-websocket';
import Insta from 'scraper-instagram';

import config from './config';

// Initialize instagram client
const InstaClient = new Insta();

// Require the framework and instantiate it
const app = fastify({ logger: true });

app.register(fastifyWebsocket, { maxPayload: 1048576 });

// Declare WS route
app.get(`${config.appPath}/websocket/:hashtag/`, { websocket: true }, (conn, req, params) => {
  console.log('Client connected, subscribe:', params.hashtag);

  InstaClient.getHashtag(params.hashtag)
    .then((response) => {
      const posts = response.featuredPosts;
      conn.socket.send(JSON.stringify({ posts }));
    })
    .catch((err) => console.error(err));

  const instaClient = InstaClient.subscribeHashtagPosts(params.hashtag, (post, err) => {
    console.log(post.shortcode, params.hashtag);

    if (post) {
      conn.socket.send(JSON.stringify({ posts: [post] }));
    } else {
      console.error(err);
    }
  }, { interval: 10 });

  conn.socket.on('close', () => {
    instaClient.unsubscribe();

    console.log('Client disconnected, unsubscribe:', params.hashtag);
  });
});

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// Run the server!
const start = async () => {
  try {
    await app.listen(normalizePort(config.appPort), config.appHost);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
