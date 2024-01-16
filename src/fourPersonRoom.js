export default class FourPersonRoom {
    constructor(
        pairOne,
        pairTwo
    ) {
        this.pairOne = pairOne;
        this.pairTwo = pairTwo;
    }

    getPartnerships () {
        return [this.pairOne, this.pairTwo];
    }
}