"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Sends a POST request to create a new menu item.
 * @param {Object} data The menu item data to be sent.
 */
async function createMenu(data) {
    const res = await fetch("http://127.0.0.1:8000/api/survey/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, user: "1" }),
    });
  
    console.log(res);
    if (!res.ok) {
      const error = await res.json();
      console.error("API Error Response:", error);
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  }
  

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", description: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      await createMenu(formData);
      router.replace("/?action=add");
    } catch (err) {
      setError(`Failed to create survey: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <form onSubmit={onFinish}>
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
};

export default Page;
