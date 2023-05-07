export default (db) => {
  // AffiliationFaculty
  // db.LevelOfEducation.hasMany(db.AffiliationFaculty);
  // db.AffiliationFaculty.belongsTo(db.LevelOfEducation);

  // db.Department.hasMany(db.LevelOfEducation);
  // db.LevelOfEducation.belongsTo(db.Department);

  db.StudentType.hasMany(db.AffiliationFaculty);
  db.AffiliationFaculty.belongsTo(db.StudentType);

  db.MSubCategoryOfStudentType.hasMany(db.AffiliationFaculty);
  db.AffiliationFaculty.belongsTo(db.MSubCategoryOfStudentType);

  // db.AffiliationFaculty.hasMany(db.User);
  // db.User.belongsTo(db.AffiliationFaculty);
};
