class ChallengeEntry {
    constructor(name, points, range = null, uniqueIdentifier = null) {
        this.name = name
        this.points = points
        this.range = range
        this.uniqueIdentifier = uniqueIdentifier
    }
}

export {ChallengeEntry}