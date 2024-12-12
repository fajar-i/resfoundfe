"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function SurveyResponsesPage() {
    const router = useRouter();
    const { surveyId } = router.query;

    const [survey, setSurvey] = useState(null);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!surveyId) return; // Wait for surveyId to be defined

        const fetchSurveyResponses = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/survey/${surveyId}/responses/`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch responses: ${response.statusText}`);
                }
                const data = await response.json();
                console.log("Response data:", data); // Debugging log
                setSurvey(data.survey);
                setResponses(data.responses);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };        

        fetchSurveyResponses();
    }, [surveyId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{survey?.title}</h1>
            <p>{survey?.description}</p>
            <h2>Responses</h2>
            {responses.length === 0 ? (
                <p>No responses yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Respondent</th>
                            <th>Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responses.map((response) => (
                            <tr key={response.respondent_id}>
                                <td>Respondent {response.respondent_id}</td>
                                <td>
                                    <ul>
                                        {response.answers.map((answer, index) => (
                                            <li key={index}>
                                                <strong>{answer.question_text}:</strong> {answer.answer}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SurveyResponsesPage;