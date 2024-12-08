"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSurveys, deleteSurvey } from "./api/survey";

const Surveys = ({id, title, description, onEdit, onDelete }) => {
  return (
    <div className="menu-item" data-id={id}>
      <div className="menu-item-info">
        <div className="menu-item-name">{title}</div>
        <div className="menu-item-description">{description}</div>
      </div>
        
      <div className="menu-item-actions">
        <button className="edit-button" onClick={onEdit}>Edit</button>
        <button className="delete-button"
          onClick={() => {
            deleteSurvey(id).then(() => onDelete(id));
          }}>
          Delete
        </button>

      </div>
    </div>
  );
};

export default function Page() {
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();
  const params = useSearchParams();

  // State for displaying a success message
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState({
    show: false,
    type: "", // either 'add' or 'update'
  });

  // Fetch menu items on component mount
  useEffect(() => {
    const fetchData = async () => {
      try{

        const data = await getSurveys();
        setMenuItems(data);
      } catch (error){
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Detect changes in URL parameters for success messages
  useEffect(() => {
    if (!!params.get("action")) {
      setDisplaySuccessMessage({
        type: params.get("action"),
        show: true,
      });
      router.replace("/");
    }
  }, [params, router]);

  // Automatically hide the success message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (displaySuccessMessage.show) {
        setDisplaySuccessMessage({ show: false, type: "" });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [displaySuccessMessage.show]);

  // Handle deletion of a menu item
  const handleDelete = (id) => {
    setMenuItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <button className="add-button" onClick={() => router.push("/add")}>
        Add
      </button>
      
      {displaySuccessMessage.show && (
        <p className="success-message">
          {displaySuccessMessage.type === "add" ? "Added a" : "Modified a"} menu item.
        </p>
      )}

      {menuItems.length > 0 ? (
        menuItems.map((item) => (
          <Surveys
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            onEdit={() => router.push(`/update/${item.id}`)}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}