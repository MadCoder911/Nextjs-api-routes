import Link from "next/link";
import { buildFeecbackPath, extractFeedback } from "../api/feedback";
import { useState } from "react";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeedbackData(data.feedback);
      });
  };
  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedback.map((item) => {
          return (
            <li key={item.id}>
              {item.text}
              <button onClick={() => loadFeedbackHandler(item.id)}>
                Show Details
              </button>
            </li>
          );
        })}
      </ul>
      <Link href={"/"}>Back to home</Link>
    </>
  );
};

export const getStaticProps = async () => {
  const filePath = buildFeecbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedback: data,
    },
  };
};

export default FeedbackPage;
