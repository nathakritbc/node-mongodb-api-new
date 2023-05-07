import affiliationFacultyAssociation from "./affiliationFaculty.relationship";

import mAdressAssociation from "./mAdress.association";

export default (db) => {
  //
  // formFileAssociation(db);
  userAssociation(db);
  qRDocumentAssociation(db);
};
