import { buildFeecbackPath, extractFeedback } from "./feedback";

const handler = (req, res) => {
  console.log(req);
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeecbackPath;
  const feedbackData = extractFeedback(filePath);

  const target = feedbackData.find((feedback) => feedback.id === feedbackId);
  res.status(200).json({ feedback: target });
};
export default handler;
