import app from './app.js';	// import app
import { connectDB } from './db.js';	// import db

connectDB();	// connect to db

app.listen(4000);

console.log('Server running on port 4000');