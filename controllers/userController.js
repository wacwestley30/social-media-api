const { User, Thought } = require('../models');

module.exports = {
    // GET all Users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single User
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // CREATE a new User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // UPDATE a User
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId},
                req.body,
                { new: true }
            );

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE a User
    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.params.userId);

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            await user.remove();
            res.json({ message: `User and User's thoughts deleted!` });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Adds a friend to User's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
            // console.log('This is user:', user);

            const friendId = req.params.friendId;

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }

            if (user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'This user is already a friend' });
            }

            user.friends.push(friendId);
            await user.save();
            res.json({ message: 'Friend added successfully' });
        } catch (err) {
            console.error('Error adding friend:', err);
            res.status(500).json({ message: 'An error occurred while adding a friend' });
        }
    },
    // Removes friend from User's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const friendId = req.params.friendId;

            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }

            if (!user.friends.includes(friendId)) {
                return res.status(400).json({ message: 'This user is not a friend' });
            }

            user.friends = user.friends.filter(friend => friend.toString() !== friendId);
            await user.save();
            res.json({ message: 'Friend removed successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};