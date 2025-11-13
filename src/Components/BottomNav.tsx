import {FaArrowLeft, FaArrowRight} from "react-icons/fa";


interface next {
    next:string;
}

 const BottomNav=({next}:next)=>(

<div className="flex gap-5 items-center pt-6 border-t border-gray-200">
    <button className="flex items-center gap-2 text-gray-700 bg-gray-100  px-6 py-2 rounded-md hover:bg-gray-300 transition-colors">
        <FaArrowLeft className="w-4 h-4" />
        Back
    </button>
    <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        {  next ? next :"Next" }
        <FaArrowRight className="w-4 h-4" />
    </button>
</div>
);

 export default BottomNav;