import React from "react";
import { useState , useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import Spinner from "./components/Spinner";
import { apiUrl , filterData } from "./data";

const App = () => {
  const [courses,setCourses]= useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] =useState(filterData[0].title);

  async function fetchData(){
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      //output:
      setCourses(output.data);
    }
    catch(error){
      toast.error("Problem in network");
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  }, [])


  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar/>
      </div>

      <div className="bg-bgDark2">
      <div>
        <Filter filterData={filterData}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap  justify-center items-center min-h-[50vh]">{
        loading ? (<Spinner/>) : (<Cards courses={courses}category={category}/>)
      }
        </div>
      </div>

     
    </div>
  );
};
 
export default App;
