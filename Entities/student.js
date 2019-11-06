'use strict';

module.exports = class Student {
    /**
     * Gets the student's system ID
     */
    get id() { return this._id; }

    /**
     * Gets the student's last name
     */
    get surname() { return this._surname; }
    /**
     * Sets the student's last name
     */
    set surname(surname) { this.surname = surname; }

    /**
     * Gets the student's first name
     */
    get givenName() { return this._givenName; }
    /**
     * Sets the student's first name
     */
    set givenName(givenName) { this._givenName = givenName; }

    /**
     * Gets the student's grades
     */
    get grades() {
        this._getGrades();

        var tmpGrades = new Array();
        this._grades.forEach(function(grade) {
            tmpGrades.push(grade.value);
        });
        
        return tmpGrades;
    }

    /**
     * Gets the student's GPS
     */
    get gradeAverage() {
        this._getGrades();

        var sum = 0;
        this._grades.forEach(function(grade) {
            sum += grade.value;
        })

        return sum / this._grades.length;
    }

    /**
     * Constructor
     * @param {object} studentRepository The repository used for data system interaction
     * @param {string} id The student's system ID
     * @param {string} surname The student's last name
     * @param {string} givenName The student's first name
     */
    constructor(studentRepository, id, surname, givenName){
        this._studentRepository = studentRepository;
        this._id = id;
        this._surname = surname;
        this._givenName = givenName;
    }

    /**
     * Whether or not the student has grades not yet saved to the data system
     * @returns Whether or not unsaved grades are present
     */
    hasUnsavedGrades() {
        for(var c = 0; c < this._grades.length; c++) {
            if(this._grades[c].isNew)
                return true;
        }

        return false;
    }

    /**
     * Attempts to add a new grade to the student
     * @param {number} grade The grade to add
     */
    addGrade(grade) {
        this._getGrades();

        if(grade >= 0 && grade <= 100)
            this._grades.push({ isNew: true, value: grade });
    }

    /**
     * Saves all changes made to the data system
     */
    save() {
        this._studentRepository.save(this);

        this._grades.forEach(function(grade) {
            grade.isNew = false;
        });
    }

    /**
     * Gets the student's grades from the data system
     */
    _getGrades() {
        if (this._grades == null) {
            this._grades = new Array();
            
            var _grades = this._grades;
            var tmpGrades = this._studentRepository.getGrades(this._id);
            tmpGrades.forEach(function(grade){
                _grades.push({ isNew: false, value: grade });
            }); 
        }
    }
};