"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSurveys, updateSurvey } from "./../../../app/api/survey";

export default function EditSurvey(){
  const [formData, setFormData] = useState({title:"", description:"", user:"1"});
  const router = useRouter();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const fetchSurvey = async()=>{
      try{
        const survey = await getSurveys(id);
        setFormData({
          title: survey.title || "",
          description: survey.description || "",
          user: "1", // Default user ID
        });
      } catch (error){
        setError(`Failed to retrieve survey: ${err.message}`);
      }
    };
    fetchSurvey();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await updateSurvey(id, formData);
      router.push("/");
    } catch (error){
      setError(`Failed to update survey: ${err.message}`);
    }
  };

  return(
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <label htmlFor="title">Title</label>
        <input
          required
          name="title"
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
      </div>
      <div className="form-item">
        <label htmlFor="description">Description</label>
        <input
          required
          type="text"
          name="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div>
        <button disabled={isLoading} className="add-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

