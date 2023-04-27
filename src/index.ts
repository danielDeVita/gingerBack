import app from './app';
import './database';
import connect from './database';

app.listen(app.get('port'), () => {
    connect()
});
