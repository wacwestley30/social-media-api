const { User, Thought } = require('../models');

module.exports = {
    // GET all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single Thought by ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // CREATE a new Thought
    async createThought(req, res) {
        try {
            const { username, thoughtText } = req.body;

            // Find the User by username
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this username' });
            }

            // Create the Thought
            const thought = await Thought.create({ username, thoughtText });

            // Add Thought to User
            user.thoughts.push(thought._id);
            await user.save();

            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // UPDATE a Thought by ID
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }

            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE a Thought by ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }

            const user = await User.findOne({ username: thought.username });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this username' });
            }

            user.thoughts = user.thoughts.filter(id => id.toString() !== thought._id.toString());
            await user.save();

            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a Reaction for a Thought
    async createReaction(req, res) {
        try {
            const { username, reactionBody } = req.body;
            const thought = await Thought.findById(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }

            const newReaction = {
                reactionBody,
                username
            };

            thought.reactions.push(newReaction);
            const updatedThought = await thought.save();

            res.status(201).json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove a Reaction from a Thought
    async removeReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const { reactionId } = req.body;

            const thought = await Thought.findByIdAndUpdate(
                thoughtId,
                { $pull: { reactions: { reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};