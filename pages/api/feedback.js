import fs from "fs";
import path from "path";

export const buildFeecbackPath = () => {
  // Get path
  return path.join(process.cwd(), "data", "feedback.json");
};
export const extractFeedback = (filePath) => {
  // Read file data using path we got
  const fileData = fs.readFileSync(filePath);
  // Convert JSON data to JS Objects
  const data = JSON.parse(fileData);
  return data;
};
const handler = (req, res) => {
  if (req.method === "POST") {
    const email = req.body.email;
    const text = req.body.text;
    console.log(email, text);
    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: text,
    };
    //Store in a database of file
    // Get path
    const filePath = buildFeecbackPath();
    const data = extractFeedback(filePath);
    // Push Feedback object into the data array
    data.push(newFeedback);
    // Write back the data using the same path, and stringfying the data ARR
    fs.writeFileSync(filePath, JSON.stringify(data));
    // Returning status with message and feedback object
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    const filePath = buildFeecbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
};

export default handler;
