import { FaArrowRight, FaEdit, FaRegCheckCircle } from 'react-icons/fa';
import { MdArrowOutward } from "react-icons/md";

const pastAndUnsolvedIssues = [
  {
    title: 'Change Details',
    solved: true,
    date: '14 Jun, 12:30pm'
  },
  {
    title: 'Change Details',
    solved: true,
    date: '14 Jun, 12:30pm'
  },
  {
    title: 'Cancel Trip',
    solved: false,
    date: '14 Jun, 12:30pm'
  },
  {
    title: 'Add Luggage',
    solved: false,
    date: '14 Jun, 12:30pm'
  },
  {
    title: 'Change Details',
    solved: true,
    date: '14 Jun, 12:30pm'
  },
  {
    title: 'Add Luggage',
    solved: false,
    date: '14 Jun, 12:30pm'
  }
];

const raiseNewIssueOptions = [
  {
    title: 'Cancelling trip'
  },
  {
    title: 'Modifying trip details'
  },
  {
    title: 'Add Luggage'
  },
  {
    title: 'Request Demo/Others'
  }
];

const HelpAndSupport = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Policy Guides section */}
        
          <div className="flex items-center justify-between cursor-pointer hover:bg-sectionBg px-4 py-4 rounded-md bg-black" >
            <span className="text-label-1 text-appBg ">Policy Guides</span>
            <MdArrowOutward size={24} className="text-white" />
          </div>
        

        {/* Past and Unsolved Issues section */}
        <div className="  ">
          <h2 className="text-heading-2 text-primaryText mb-4">Past and Unsolved Issues</h2>
          <div className='bg-sectionBg rounded-md p-8'>
          {pastAndUnsolvedIssues.map((issue, index) => (
            <div key={index} className="flex items-center justify-between mb-4 bg-white px-4 py-1 rounded-md cursor-pointer hover:bg-sectionBg/80 transition duration-200 ease-in-out">
              <div className="flex items-center space-x-4 ">
                <FaEdit/>
                <div className='flex flex-col'>
                <span className="text-label-1-medium text-primaryText">{issue.title}</span>
                {issue.solved ? (
                  <div className='flex text-green-400 items-center gap-1'>
                  <FaRegCheckCircle /><span >Solved</span>

                  </div>
                ) : (
                  <span>Cancelled</span>
                )}
                
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-label-2-medium text-secondaryText">{issue.date}</span>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Raise New Issue section */}
        <div>
          <h2 className="text-heading-2 text-primaryText mb-4">Raise New Issue</h2>
          <div className="space-y-4 p-4 bg-sectionBg rounded-md">
            {raiseNewIssueOptions.map((option, index) => (
              <div key={index} className="flex items-center justify-between bg-white px-4 py-4 rounded-md cursor-pointer hover:bg-sectionBg/80 transition duration-200 ease-in-out">
                <span className="text-label-1-medium text-primaryText">{option.title}</span>
                <FaArrowRight className="text-secondaryText" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
