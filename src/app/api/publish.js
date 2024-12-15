/*
how to use :
import { getSurveys, createSurvey, updateSurvey, deleteSurvey } from "../api/survey";
*/

const API_BASE = "http://127.0.0.1:8000/api/publish/";

export async function getPublish(id) {
  const url = id ? `${API_BASE} ${id}` : API_BASE; 
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch publishes");
  return res.json();
}


export async function createPublish(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create publish");
  return res.json();
}

export async function updatePublish(id, data) {
  const res = await fetch(`${API_BASE}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update publish");
  console.log(res.json);
  return res.json();
}

export async function deletePublish(id) {
  const res = await fetch(`${API_BASE}${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete publish");
  return res.ok;
}
