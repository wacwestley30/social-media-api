const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { createUser, addFriend } = require('../controllers/userController');
const { createThought, createReaction } = require('../controllers/thoughtController');

const usersData = [
    { username: 'seahorse', email: 'seahorse@gmail.com' },
    { username: 'turkey', email: 'turkey@yahoo.com' },
    { username: 'treestump', email: 'treestump@hotmail.com' },
    { username: 'ladybug', email: 'ladybug@gmail.com' }
];

const thoughtsData = [
    { username: 'seahorse', thoughtText: 'Depth of friendship does not depend on length of acquaintance.' },
    { username: 'seahorse', thoughtText: 'Live as if you were to die tomorrow. Learn as if you were to live forever.' },
    { username: 'seahorse', thoughtText: 'The most difficult thing is the decision to act, the rest is merely tenacity.' },
    { username: 'seahorse', thoughtText: 'Challenges are what make life interesting, and overcoming them is what makes life meaningful.' },
    { username: 'turkey', thoughtText: 'Success is not final, failure is not fatal: It is the courage to continue that counts.' },
    { username: 'turkey', thoughtText: 'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.' },
    { username: 'turkey', thoughtText: 'The only place where success comes before work is in the dictionary.' },
    { username: 'treestump', thoughtText: 'Life is like riding a bicycle. To keep your balance, you must keep moving.' },
    { username: 'treestump', thoughtText: 'The good life is a process, not a state of being. It is a direction not a destination.' },
    { username: 'ladybug', thoughtText: 'Love does not consist in gazing at each other, but in looking outward together in the same direction.' }
];

const reactionsData = [
    { username: 'seahorse', reactionBody: 'Reaction 1' },
    { username: 'turkey', reactionBody: 'Reaction 2' }
];

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    try {
        // Create users
        const users = await User.insertMany(usersData);

        // Add friends
        await addFriend(users[0]._id, users[1]._id);
        await addFriend(users[2]._id, users[3]._id);

        // Create thoughts
        const thoughts = await Thought.insertMany(thoughtsData);

        // Create reactions
        await createReaction(thoughts[0]._id, reactionsData[0]);
        await createReaction(thoughts[1]._id, reactionsData[1]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        connection.close();
    }
});