const mongoose = require('mongoose');
const Schema = mongoose.Schema; // 다른 모델에서 한 것과 일관성을 지키기 위해서
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true //유효성 검사에 제외시킴
    }
});
UserSchema.plugin(passportLocalMongoose); // 불러온 결과를 UserSchema.plugin 전달한다.

module.exports = mongoose.model('User', UserSchema);