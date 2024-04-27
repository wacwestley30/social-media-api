const { Schema, model } = require('mongoose');

const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return emailRegex.test(v);
                },
                message: props => `${props.value} is not a valid email address`
            }
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought' // check casing ex. thought vs Thought
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User' // check casing ex. user vs User
        }]
    },
    {   // Check to see if virtuals need to be in JSON. School work says yes but does this app need it?
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema); // class work lowercase but why? if TROUBLESHOOTING check this

module.exports = User;