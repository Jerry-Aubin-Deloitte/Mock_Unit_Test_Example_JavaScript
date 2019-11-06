'use strict';

module.exports = class StudentRepository {
    /**
     * Retrieves grades for a given student
     * @param {string} studentId The student's ID
     * @returns {Array} A list of grades
     */
    getGrades(studentId) {
        throw new Error('Not implemented');
    }

    /**
     * Saves a student entity
     * @param {object} student The student entity to save
     */
    save(student) {
        throw new Error('Not implemented');
    }
};