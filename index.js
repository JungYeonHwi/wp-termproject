const mongoose = require('mongoose');

const MONGO_URL = 'mongodb://localhost/mongoose-db'; // 데이터베이스 명은 mongoose-db

mongoose.connect(MONGO_URL);

mongoose.connection.on('error', err => console.error('MongoDB 연결 에러'));
mongoose.connection.on('open', () => console.log('MongoDB 연결 성공'));
mongoose.connection.on('disconnected', () => {
    console.error('MongDB와의 연결이 끊겼습니다. 연결을 재시도합니다.');
    mongoose.connect(MONGO_URL);
});


const http = require('http');
const { PORT } = require('./env');
const app = require('./app');

const server = http.createServer(app);

server.listen(+PORT);
server.on('error', console.error);
server.on('listening', () => console.log(`Server running on ${PORT}`));

// 스키마 정의
const userSchema = new mongoose.Schema({
    username: {
        type: String,     // username 필드의 값은 문자열 타입
        unique: true,     // unique 인덱스 생성(Collection에 username 값이 중복된 문서가 생성될 수 없음)
        required: true,   // mongoose validator: username은 반드시 필요한 필드
    },
    password: String,   // password 필드의 값은 문자열 타입
    email: String,      // email 필드의 값은 문자열 타입
    joinedAt: {
        type: Date,       // joinedAt 필드의 값은 Date 타입
        default: Date.now // 값이 입력되지 않을 경우 기본값은 문서가 생성되는 시점의 시간
    }
});
