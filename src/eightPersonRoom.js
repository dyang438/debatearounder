export default class EightPersonRoom {
    constructor(
        pairOne,
        pairTwo,
        pairThree,
        pairFour
    ) {
        this.pairOne = pairOne;
        this.pairTwo = pairTwo;
        this.pairThree = pairThree;
        this.pairFour = pairFour;
    }

    getPartnerships () {
        return [this.pairOne, this.pairTwo, this.pairThree, this.pairFour];
    }


}