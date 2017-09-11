import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import httpProxy from 'http-proxy';

import index from './routes/index';
import users from './routes/users';

const app = express();

// API Proxy
const apiProxy = httpProxy.createProxyServer({
	target: 'http://localhost:3001'
})

app.use('/api', (req, res) => apiProxy.web(req,res));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../dist')));

app.use('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
