import { FaSpinner } from "react-icons/fa";

const LoadingButtonUniversal = ({text,loading}) => {
    return (
      <div className="flex gap-2 items-center text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled>
        <span className="flex items-center">
          {text}
        </span>
          {loading&&<FaSpinner className="animate-spin origin-center" />}
      </div>
    ); 
};
  
  export default LoadingButtonUniversal;
  