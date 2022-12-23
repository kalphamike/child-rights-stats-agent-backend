const jwt = require('jsonwebtoken');
const  mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
 	name: {type: String, require: true},
	nid: {type: String, require: true},
	phone: {type: String, require: true},
	email: {type: String, require: true},
	province: {type: String, require: true},
	district: {type: String, require: true},
	sector: {type: String, require: true},
	cell: {type: String, require: true},
	role: {type: String, require: true},
	password: {type: String, require: true}
});

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({_id: this.id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'})
	return token;
}

const User = mongoose.model('User',userSchema);
module.exports = User;

    
    




