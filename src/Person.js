export default class Person {
    constructor(
        personName,
        skill,
        stayingCanDebate,
        debateJudgePreference,
        partner
    ) {
        this.personName = personName;
        this.skill = skill;
        this.stayingCanDebate = stayingCanDebate;
        this.debateJudgePreference = debateJudgePreference;
        this.partner = partner;
    }

    getName () {
        return this.personName;
    }
    setName (newName) {
        this.personName = newName;
    }
    getSkill () {
        return this.skill;
    }
    getSkillNumber () {
        const skill = this.getSkill();
        if (skill === "Advanced") {
            return 2;
        }
        if (skill === "Adept") {
            return 1;
        } else {
            return 0;
        }
    }
    getStaying () {
        return this.stayingCanDebate;
    }
    getDebateJudgePreference () {
        return this.debateJudgePreference;
    }
    getPartner () {
        return this.partner;
    }



}