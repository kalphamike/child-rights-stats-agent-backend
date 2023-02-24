const userModel = require('../model/users.model');
const bcrypt = require('bcrypt');

exports.testing =(req, res, next) => {
    res.send('User Router Works well');
}

exports.list = (req, res, next) => {
    userModel.find()
        .then((response) => {
            if(response){
                res.status(200).send(response);
            } else {
                res.status(404).send("No Case avaible")
            }
        })
        .catch(err =>{
            res.status(500).send("Server error:"+ err);
        })
}

exports.signin =  async (req, res, next) => {
    try {
        const user = await userModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(401).send('Invalid email or password.');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {return res.status(401).send('Invalid email or password.')}

        const token = user.generateAuthToken();
        res.status(200).send({
            token:token,
            user: user
        })
    } catch (error) {
        return res.status(500).send('Internal Server Error :'+error)
    }
}

exports.signup =  async (req, res, next) => {
    try {
        const user = await userModel.findOne({email: req.body.email});
        if (user) {return res.status(401).send('Account with this email already exits.')}

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const encPassword = await bcrypt.hash(req.body.password, salt)

        await new userModel({...req.body, password: encPassword}).save();
        res.status(201).send({message: 'Account created'});
    } catch (error) {
        return res.status(500).send('Internal Server Error :'+error)
    }
}

exports.findByProvince = (req, res, next) => {
    userModel.find({province: req.query.province})
        .then((response) => {
            if(response){
                res.status(200).send(response);
            } else {
                res.status(404).send("No user avaible")
            }
        })
        .catch(err =>{
            res.status(500).send("Server error:"+ err);
        })
}

exports.findByDistrict = (req, res, next) => {
    userModel.find({district: req.query.district})
        .then((response) => {
            if(response){
                res.status(200).send(response);
            } else {
                res.status(404).send("No user avaible")
            }
        })
        .catch(err =>{
            res.status(500).send("Server error:"+ err);
        })
}

exports.findBySector = (req, res, next) => {
    userModel.find({sector: req.query.sector})
        .then((response) => {
            if(response){
                res.status(200).send(response);
            } else {
                res.status(404).send("No user avaible")
            }
        })
        .catch(err =>{
            res.status(500).send("Server error:"+ err);
        })
}

exports.findByID = (req, res, next) => {
   	userModel.findById(req.query.id)
    .then((response) => {
        if(response){
            res.status(200).send(response);
        } else {
            res.status(404).send("No Case avaible")
        }
    })
    .catch(err =>{
        res.status(500).send("Server error:"+ err);
    })
}

exports.findByEmail = (req, res, next) => {
    userModel.findOne({ email: req.query.email })
    .then((response) => {
        if(response){
            res.status(201).send(response);
        } else {
            res.status(404).send("No Case avaible")
        }
    })
    .catch(err =>{
        res.status(500).send("Server error:"+ err);
    })
}

exports.update = (req, res, next) => {
    userModel.findByIdAndUpdate(req.query.id,req.body)
        .then((response) => {            
            res.status(201).send({message: 'Account updated ...', case: response});
        })
        .catch(err =>{
            res.status(500).send("Server error:"+ err);
        })
}

exports.removeUser = (req, res, next) => {
    userModel.findByIdAndDelete(rep.query.id)
        .then((response) => {
            res.status(201).send({message: 'User Deleted', case: response});
        })
        .catch(err =>{
            res.status(500).send("Server error:"+ err);
        })
}