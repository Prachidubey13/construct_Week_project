// votingSystem.js

class VotingSystem {
    constructor() {
        this.voters = [];        // Array to store registered voter IDs
        this.candidates = [];    // Array to store candidate names
        this.votes = [];         // Array to store votes (objects with voterId and candidateName)
    }

    /**
     * Register a new voter by adding their voterId to the voters array.
     * @param {string} voterId - Unique identifier for the voter.
     */
    registerVoter(voterId) {
        if (!this.voters.includes(voterId)) {
            this.voters.push(voterId);
            console.log(`Voter ${voterId} registered successfully.`);
        } else {
            console.log(`Voter ${voterId} is already registered.`);
        }
    }

    /**
     * Add a new candidate to the election by adding their name to the candidates array.
     * @param {string} candidateName - Name of the candidate.
     */
    addCandidate(candidateName) {
        if (!this.candidates.includes(candidateName)) {
            this.candidates.push(candidateName);
            console.log(`Candidate ${candidateName} added successfully.`);
        } else {
            console.log(`Candidate ${candidateName} is already in the election.`);
        }
    }

    /**
     * Allow a registered voter to cast a vote for a candidate.
     * @param {string} voterId - ID of the voter.
     * @param {string} candidateName - Name of the candidate.
     */
    castVote(voterId, candidateName) {
        // Check if the voter is registered
        if (!this.voters.includes(voterId)) {
            console.log(`Voter ${voterId} is not registered.`);
            return;
        }
        
        // Check if the candidate exists
        if (!this.candidates.includes(candidateName)) {
            console.log(`Candidate ${candidateName} does not exist.`);
            return;
        }

        // Check if the voter has already voted
        if (this.votes.some(vote => vote.voterId === voterId)) {
            console.log(`Voter ${voterId} has already voted.`);
            return;
        }

        // Record the vote
        this.votes.push({ voterId, candidateName });
        console.log(`Vote cast by ${voterId} for ${candidateName}.`);
    }

    /**
     * Tally the votes to determine the number of votes for each candidate and find the winner.
     * @returns {object} - Object with the number of votes per candidate and the winner's name.
     */
    tallyVotes() {
        const voteCounts = this.votes.reduce((counts, vote) => {
            counts[vote.candidateName] = (counts[vote.candidateName] || 0) + 1;
            return counts;
        }, {});

        // Determine the winner
        const winner = Object.keys(voteCounts).reduce((a, b) => voteCounts[a] > voteCounts[b] ? a : b, null);

        return { voteCounts, winner };
    }

    /**
     * Display the election results, including the total votes for each candidate, the winner, and voter turnout.
     * @returns {object} - Object containing the total votes per candidate, the winner, and voter turnout.
     */
    displayResults() {
        const { voteCounts, winner } = this.tallyVotes();
        const totalVotes = this.votes.length;  // Correct total votes calculation
        const voterTurnout = this.votes.length;

        return {
            voteCounts,
            winner,
            totalVotes,
            voterTurnout
        };
    }
}

// Example usage of the VotingSystem class

// Create a new VotingSystem instance
const votingSystem = new VotingSystem();

// Register voters
votingSystem.registerVoter('Voter Prachi');
votingSystem.registerVoter('Voter Shivani');
votingSystem.registerVoter('Voter Aasta');

// Add candidates
votingSystem.addCandidate('Prachi');
votingSystem.addCandidate('Shivani');

// Cast votes
votingSystem.castVote('Voter Prachi', 'Prachi');
votingSystem.castVote('Voter Shivani', 'Shivani');
votingSystem.castVote('Voter Aasta', 'Prachi'); // Corrected voterId for registered voters

// Display results
const results = votingSystem.displayResults();
console.log('Election Results:');
console.log(`Total Votes: ${results.totalVotes}`);
console.log(`Voter Turnout: ${results.voterTurnout}`);
console.log('Vote Counts:', results.voteCounts);
console.log('Winner:', results.winner);
