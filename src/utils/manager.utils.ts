import type { Grade, Section } from "../type/manager.type";

export const getGradeStats = (grade: Grade) => {
    const totalSections = grade.sections.length;
    const totalStudents = grade.sections.reduce((acc, section) => {
        return acc + (section?.teachers?.length || 0);
    }, 0);
    return { totalSections, totalStudents };
};

export const getUniqueGrades = (sections: Section[]) => {
    const grades = new Map();
    sections.forEach(section => {
      if (section.gradeId && !grades.has(section.gradeId)) {
        grades.set(section.gradeId, {
          gradeId: section.gradeId,
          gradeName: section.gradeName || 'Unknown',
          localGradeNumber: section.localGradeNumber || 0
        });
      }
    });
    return Array.from(grades.values());
  };
