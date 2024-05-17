import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
  return text && text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const MyCourseCard = ({ courseDetails }) => {

  console.log(courseDetails);
  const { thumbnail, courseName , courseDescription } = courseDetails;
  const truncatedDescription = truncateText(courseDescription, 120); // Adjust the desired character limit
  

  return (
    <div className="rounded shadow-lg relative bg-white m-4 transition-transform transform hover:scale-95 pb-5 space-y-3 ">
      <div className="w-full h-72 overflow-hidden space-y-4">
        <div className="w-full h-48 overflow-hidden shadow-lg">
          <img src={thumbnail} alt={courseName} className="w-full h-full object-cover rounded-md" style={{ objectFit: "cover" }} />
        </div>
        <div className="font-bold text-blue-300 text-2xl p-4">{courseName}</div>
      </div>
      <div className="px-6">
        {/* <p className="text-gray-700 text-base mb-2">{subtitle}</p> */}
        <p className="text-pure-greys-600 font-normal text-sm max-h-14 overflow-hidden line-clamp-3">{truncatedDescription}...</p>
      </div>
      <div className="flex justify-left items-center pt-2 flex-wrap">
        <div className="px-6 p-2">
         <Link to={`/view-course/${courseDetails._id}`} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Start Learning</Link>
        </div>
        {/* <div className="text-yellow-500 text-base p-3 font-semibold">Price: INR {price}</div> */}
      </div>
    </div>
  );
};

export default MyCourseCard;
