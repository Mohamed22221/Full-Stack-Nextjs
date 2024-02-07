import { buildFeedbackPath, extractFeedback } from "./feedback";

const handelIdFeedback = (req , res) =>{
    const feedbackId = req.query.feedbackID
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    const filterData = data.find((item) => item.id === feedbackId)
    res.status(200).json({ feedback: filterData });
}
export default handelIdFeedback;