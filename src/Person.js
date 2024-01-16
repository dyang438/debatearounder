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
    getSkill () {
        return this.skill;
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