module.exports = {
// Get random reactions from the reactionsData array
    getRandomReactions(reactionsData) {
        const randomReactions = [];
        const numReactionsToAdd = Math.floor(Math.random() * reactionsData.length) + 1;

        // Shuffle the reactionsData array
        const shuffledReactions = reactionsData.sort(() => Math.random() - 0.5);

        // Add the random reactions to the randomReactions array
        for (let i = 0; i < numReactionsToAdd; i++) {
            randomReactions.push(shuffledReactions[i]);
        }

        return randomReactions;
    }
}