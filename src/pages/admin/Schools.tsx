import { useState } from 'react';

import Header from '../../components/admin/school/Header';
import SchoolsList from '../../components/admin/school/SchoolsList';
import AddSchoolModal from '../../components/admin/school/modal/AddSchoolModal';

const Schools = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <Header setIsOpen={setIsOpen}/>
      <SchoolsList/>
      <AddSchoolModal setIsOpen={setIsOpen} isOpen={isOpen}/>
    </div>
  );
};

export default Schools;