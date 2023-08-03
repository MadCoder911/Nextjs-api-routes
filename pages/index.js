import Link from "next/link";
import { useRef, useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const email = useRef();
  const feedbackInput = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    //Values
    const emailValue = email.current.value;
    const inputVal = feedbackInput.current.value;

    const reqbody = { email: emailValue, text: inputVal };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqbody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  const loadFeedbackHandler = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbackItems(data.feedback));
  };

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" name="email" id="email" ref={email} />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea name="feedback" rows="5" ref={feedbackInput}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item, id) => {
          return (
            <ul key={id}>
              <li>id: {item.id}</li>
              <li>email: {item.email}</li>
              <li>message: {item.text}</li>
              <hr />
            </ul>
          );
        })}
      </ul>
      <Link href={"/feedback"}>Feedback Page</Link>
    </div>
  );
}

export default HomePage;
