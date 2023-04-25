import app from './app';
import './database';

app.listen(app.get('port'), () => {
    console.log(`up on: ${app.get('port')}`)
});
