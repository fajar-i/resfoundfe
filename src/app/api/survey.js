/*
how to use :
import { getSurveys, createSurvey, updateSurvey, deleteSurvey } from "../api/survey";
*/

const API_BASE = "http://127.0.0.1:8000/api/survey/";

export async function getSurveys() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch surveys");
  return res.json();
}

export async function createSurvey(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create survey");
  return res.json();
}

export async function updateSurvey(id, data) {
  const res = await fetch(`${API_BASE}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update survey");
  return res.json();
}

export async function deleteSurvey(id) {
  const res = await fetch(`${API_BASE}${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete survey");
  return res.ok;
}
