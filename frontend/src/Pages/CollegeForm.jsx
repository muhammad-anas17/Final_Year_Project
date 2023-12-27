import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CollegeForm = () => {
    const { userId } = useParams();
 
 
    // console.log(" College Id is:", { userId })


    const [formFeild, setFormFeild] = useState([
         { CollegeID: userId ,
            Question: "", 
        }
    ])

    const handleChange = (event, index) => {
        console.log("Target name:",index, event.target.name);
        console.log("Target value:",index,event.target.value);
        let data = [...formFeild];
        data[index][event.target.name] = event.target.value;
        setFormFeild(data);
    };

    const AddFeild = () => {
        let object = { CollegeID: userId ,Question: "" }
        setFormFeild([...formFeild, object]);
    };
    const handleClick = async (e) => {
        e.preventDefault();
        console.log(formFeild);
        try{
            const formattedData = formFeild.map(question => [
                question.CollegeID,
                question.Question,
            ]);
    
            await axios.post("http://localhost:8800/form", formattedData);
            // navigate(`/login`);
      
          }catch(err){
            console.log(err);
          }

    }
    const RemoveFeild=(index)=>{
        let data= [...formFeild];
        data.splice(index,1);
        setFormFeild(data);
    }


    return (
        <div>
            <form>
                {formFeild.map((form, index) => {
                    return (
                        <div key={index}>
                            <input name='Question'
                                placeholder='Question'
                                onChange={event => handleChange(event, index)}
                                value={form.Question} ></input>
                                <button onClick={()=> RemoveFeild(index)}>Remove</button>
                        </div>
                    )
                }

                )}
            </form>
            <button onClick={AddFeild}>Add Question</button>
            <button onClick={handleClick}>Submit</button>

        </div>

    )
}

export default CollegeForm
