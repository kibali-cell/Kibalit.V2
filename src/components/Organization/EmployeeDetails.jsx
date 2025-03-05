import React from 'react';

function EmployeeDetails() {
  return (
    <div className="bg-appBg">
      <div className="px-16 pt-28 max-md:px-5 max-md:pt-24">
        <h2 className="text-heading-1 text-primaryText font-bold">Add Employee</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-2">
            <label className="text-label-1-medium text-secondaryText">First name</label>
            <span className="text-label-1-medium text-primaryText">Stev</span>
            <label className="text-label-1-medium text-secondaryText">Middle Name</label>
            <span className="text-label-1-medium text-primaryText">J</span>
            <label className="text-label-1-medium text-secondaryText">Last name</label>
            <span className="text-label-1-medium text-primaryText">Carelliana</span>
          </div>
          <div>
            <label className="text-label-1-medium text-secondaryText">Work Email</label>
            <span className="text-label-1-medium text-primaryText">stevcarella@tbt.co</span>
          </div>
          <div>
            <label className="text-label-1-medium text-secondaryText">Passport Type</label>
            <span className="text-label-1-medium text-primaryText">Tanzanian</span>
          </div>
          <div>
            <label className="text-label-1-medium text-secondaryText">Phone number</label>
            <span className="text-label-1-medium text-primaryText">+255 630 776589</span>
          </div>
          <div>
            <label className="text-label-1-medium text-secondaryText">Role</label>
            <span className="text-label-1-medium text-primaryText">Team Lead</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;