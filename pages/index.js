import { useEffect, useRef, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "./api/feedback";
import { useRouter } from "next/router";

function HomePage(props) {
  // const [feedbackItems, setFeedbackItems] = useState([]);
  // const [sendItems, setSendItems] = useState([]);
  const router = useRouter();
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  async function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enteredEmail, text: enteredFeedback };

    const rawResponse = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    // const content = await rawResponse.json();
    // setSendItems(content);

    if (rawResponse.status < 300) {
      router.replace(router.asPath);

    }
  }

  // useEffect(() => {
  //   fetch("/api/feedback")
  //     .then((res) => res.json())
  //     .then((data) => setFeedbackItems(data.feedback));
  // }, [sendItems]);
  // console.log(feedbackItems);
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <ul>
        {props.feedbackItems.map((item) => (
          <li>{item?.text}</li>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const filePath = buildFeedbackPath();
  const feedbackItems = extractFeedback(filePath);

  // Pass data to the page via props
  return { props: { feedbackItems: feedbackItems } };
}
export default HomePage;

