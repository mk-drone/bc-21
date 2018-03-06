const mongo = require('mongoose');
const Schema = mongo.Schema;


const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true, default: 'noUsername'},
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.manify = function(next) {
    this.name = `${this.name}-boy`;

    return next(null, this.name);
}

userSchema.pre('save', function(next) {
    const currentDate = new Date();

    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
})

module.exports = userSchema;