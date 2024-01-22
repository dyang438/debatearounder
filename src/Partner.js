export default class Partner {
    //person field should be passed an array
    constructor(personOne, personTwo) {
        this.personOne = personOne;
        this.personTwo = personTwo;
    }

    getPersonOne () {
        return this.personOne;
    }

    getPersonTwo () {
        return this.personTwo;
    }

    getNameOne () {
        return this.personOne.getName();
    }

    setPersonOne (newPerson) {
        this.personOne = newPerson
    }

    getNameTwo () {
        return this.personTwo.getName();
    }
    setPersonTwo (newPerson) {
        this.personTwo = newPerson
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