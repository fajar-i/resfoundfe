"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSurveys, updateSurvey } from "./../../../app/api/survey";
import { getPublish, updatePublish } from "./../../../app/api/publish";
import { getProfile, updateProfile } from "./../../../app/api/profile";

export default function EditSurvey() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    user: "",
    opening_time: "",
    closing_time: "",
    total_price: "",
    status: false,
  });
  const [publishData, setPublishData] = useState({
    survey: "",
    token_debit: "",
    limit: "",
  });
  const [ProfileData, setProfileData] = useState({
    respoint: "",
  });

  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitDisabled = parseInt(publishData.token_debit) > parseInt(ProfileData.respoint);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const survey = await getSurveys(id);
        setFormData({
          title: survey.title || "",
          description: survey.description || "",
          user: survey.user || "",
          opening_time: survey.opening_time ? survey.opening_time.split("T")[0] : "",
          closing_time: survey.closing_time ? survey.closing_time.split("T")[0] : "",
          total_price: survey.total_price || "",
          status: survey.status || false,
        });
      } catch (error) {
        setError(`Failed to retrieve survey: ${error.message}`);
      }
    };
    fetchSurvey();

    const fetchPublish = async () => {
      try {
        const publish = await getPublish(id);
        setPublishData({
          survey: publish.survey || id,
          token_debit: publish.token_debit || "",
          limit: publish.limit || "",
        });
      } catch (error) {
        setError(`Failed to retrieve Publish Data: ${error.message}`);
      }
    };
    fetchPublish();

    const fetchProfile = async () => {
      try {
        const profile = await getProfile(formData.user);
        setProfileData({
          respoint: profile.respoint || 0,
        });
      } catch (error) {
        setError(`Failed to retrieve Profile Data: ${error.message}`);
      }
    };
    fetchProfile();

  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate that token_debit does not exceed respoint
    if (parseInt(publishData.token_debit) > parseInt(ProfileData.respoint)) {
      setError("Token debit cannot exceed your available Respoints.");
      setIsLoading(false);
      return;
    }

    try {
      await updateSurvey(id, formData);
      await updatePublish(formData.user, publishData);
      console.log(formData.user)
      window.location.href = "http://127.0.0.1:8000/list_my_survey/";
    } catch (error) {
      setError(`Failed to update survey: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Publish Survey</h2>
      <h2 className="mb-4">Respoint : {ProfileData.respoint}</h2>
      <h2 className="mb-4">Survey Price : {formData.total_price}</h2>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            required
            name="title"
            className="form-control"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            required
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="opening_time" className="form-label">Opening Time</label>
          <input
            required
            type="date"
            name="opening_time"
            className="form-control"
            value={formData.opening_time}
            onChange={(event) =>
              setFormData({ ...formData, opening_time: event.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="closing_time" className="form-label">Closing Time</label>
          <input
            required
            type="date"
            name="closing_time"
            className="form-control"
            value={formData.closing_time}
            onChange={(event) =>
              setFormData({ ...formData, closing_time: event.target.value })
            }
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="status"
            className="form-check-input"
            id="status"
            checked={formData.status}
            onChange={(event) =>
              setFormData({ ...formData, status: event.target.checked })
            }
          />
          <label htmlFor="status" className="form-check-label">Status</label>
        </div>
        <div className="mb-3">
          <label htmlFor="token_debit" className="form-label">Token Debit</label>
          <input
            required
            type="text"
            name="token_debit"
            className="form-control"
            value={publishData.token_debit}
            onChange={(event) =>
              setPublishData({ ...publishData, token_debit: event.target.value })
            }
          />
          {parseInt(publishData.token_debit) > parseInt(ProfileData.respoint) && (
            <div className="text-danger">
              Token debit exceeds available Respoints.
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="limit" className="form-label">Limit</label>
          <input
            required
            type="text"
            name="limit"
            className="form-control"
            value={publishData.limit}
            onChange={(event) =>
              setPublishData({ ...publishData, limit: event.target.value })
            }
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        <button
          disabled={isLoading || isSubmitDisabled}
          className="btn btn-primary"
          type="submit"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div >
  );
}
