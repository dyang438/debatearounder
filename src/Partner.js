export default class Partner {
    //person field should be passed an array
    constructor(personOne, personTwo) {
        this.personOne = personOne;
        this.personTwo = personTwo;
    }

    getNameOne () {
        return this.personOne.getName();
    }
    getNameTwo () {
        return this.personTwo.getName();
    }
    getSkillOne () {
        const skill = this.personOne.getSkill();
        if (skill === "Advanced") {
            return 2;
        }
        if (skill === "Adept") {
            return 1;
        } else {
            return 0;
        }

    }
    getSkillTwo () {

        const skill2 = this.personTwo.getSkill();

        if (skill2 === "Advanced") {
            return 2;
        }
        if (skill2 === "Adept") {
            return 1;
        } else {
            return 0;
        }
    }

    calcSkill () {
        return (this.getSkillTwo() + this.getSkillOne());
    }

}