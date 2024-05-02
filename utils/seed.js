const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData, reactionsData } = require('./data');
const { getRandomReactions } = require('./seedFunctions');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    try {
        // Drop existing collections
        await Promise.all([
            User.deleteMany(),
            Thought.deleteMany()
        ]);

        // Create users array
        const users = [];
        for (let userData of usersData) {
            const user = new User(userData);
            users.push(user);
        }
        
        // Add friends
        users[0].friends.push(users[1]._id);
        users[1].friends.push(users[0]._id);
        users[2].friends.push(users[3]._id);
        users[3].friends.push(users[2]._id);
        
        // Insert users
        await User.insertMany(users);

        // Create thoughts array
        const thoughts = await Thought.insertMany(thoughtsData);

        // Seed thoughts to users
        for (const thought of thoughts) {
            // Find the user object corresponding to the thought's username
            const user = users.find(user => user.username === thought.username);
            if (!user) {
                throw new Error(`User not found for thought: ${thought._id}`);
            }

            // Add the thought to the user's thoughts array
            user.thoughts.push(thought._id);

            // Save the updated user
            await user.save();

            // Generate random reactions for the thought
            const randomReactions = getRandomReactions(reactionsData);

            // Add the reactions to the thought
            thought.reactions = randomReactions.map(reactionData => ({
                ...reactionData,
                username: users[Math.floor(Math.random() * users.length)].username
            }));

            // Save the updated thought with reactions
            await thought.save();
        }

        console.log('Users:');
        console.table(users.map(user => user.toObject()));

        console.log('Thoughts:');
        console.table(thoughts.map(thought => thought.toObject()));
        console.info('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        connection.close();
    }
});