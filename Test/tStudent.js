'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Student = require('../Entities/student');
const StudentRepository = require('../Repositories/studentRepository')

var mockRepository = sinon.createStubInstance(StudentRepository)
mockRepository.getGrades.returns(_getMockGrades());

/**
 * Makes sure a valid grade is added to the list
 */
it('student_addGrade_addAValidGrade_returns_oneMoreGradeInList', () => {
    // 1) Arrange
    var student = new Student(mockRepository, "ABC123", "Smith", "John");
    const originalNumGrades = student.grades.length;

    // 2) Act
    student.addGrade(100);

    // 3) Assert
    assert.equal(student.grades.length, originalNumGrades + 1);
});

/**
 * Makes sure an invalid grade is not added to the list
 */
it('student_addGrade_addAnInvalidGrade_returns_sameNumberOfGrades', () => {
    // 1) Arrange
    var student = new Student(mockRepository, "ABC123", "Smith", "John");
    const originalNumGrades = student.grades.length;

    // 2) Act
    student.addGrade(1000);

    // 3) Assert
    assert.equal(student.grades.length, originalNumGrades);
});

/**
 * Makes sure the entity says there are unsaved grades when a valid grade is added
 */
it('student_addGrade_addAGrade_returns_hasUnsavedGrades', () => {
    // 1) Arrange
    var student = new Student(mockRepository, "ABC123", "Smith", "John");
    
    // 2) Act
    student.addGrade(100);

    // 3) Assert
    assert.equal(student.hasUnsavedGrades(), true);
});

/**
 * Makes sure the entity says there are no unsaved grades when the entity is saved
 */
it('student_save_saveStudent_returns_noUnsavedGrades', () => {
    // 1) Arrange
    var student = new Student(mockRepository, "ABC123", "Smith", "John");
    student.addGrade(100);

    // 2) Act
    student.save();

    // 3) Assert
    assert.equal(student.hasUnsavedGrades(), false);
});

/**
 * Creates a list of mock grades for testing purposes
 */
function _getMockGrades() {
    var tmpList = new Array();
    tmpList.push(100);
    tmpList.push(0);

    return tmpList;
}