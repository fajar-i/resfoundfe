/*how to use :
import { getSurveys, createSurvey, updateSurvey, deleteSurvey } from "../api/survey";*/

const API_BASE = "http://127.0.0.1:8000/api/profile/";

export async function getProfile(id) {
  const url = id ? `${API_BASE}${id}` : API_BASE; 
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch Profilees");
  return res.json();
}

export async function updateProfile(id, data) {
  const res = await fetch(`${API_BASE}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update Profile");
  console.log(res.json);
  return res.json();
}