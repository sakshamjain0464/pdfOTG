const mongoose = require('mongoose');           // Import mongoose
const bcrypt = require('bcryptjs');             // Import bcrypt for password hashing

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: ''
    },
    googleId: {
        type: String,
        default: null
    },
    githubId: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
    methods:{
        verifyPassword: function(password){
            return bcrypt.compare(password, this.password);
        },
        createPasswordHash: async function(password){
            return await bcrypt.hash(password, 16);
        },
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;