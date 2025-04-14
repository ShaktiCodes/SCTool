```
# 🧠 Sentence Construction Tool

An interactive web application built with React + Vite for practicing and improving sentence construction skills. This tool challenges users to complete sentences by choosing the correct words from a given set of options — all within a 30-second time frame per question.

---

## 🚀 Features

- 🧩 Interactive UI: Drag or click to fill in sentence blanks with word options.
- ⏱️ 30-Second Timer: Countdown per question, auto-advances when the time is up.
- 🔄 Unselect Mechanism: Click on a filled blank to remove the word.
- ✅ Next Button Logic: Only enabled when all blanks are filled.
- 📡 Dynamic Data: Fetches sentence questions via **JSON Server**.
- 📝 Feedback Summary: View correct/incorrect answers and score out of 10 at the end.
- 📱 Responsive Design: Works beautifully on mobile, tablet, and desktop.
- 🧠 State Management: Uses React hooks and conditional rendering for flow control.

---

## 🛠 Tech Stack

| Tech              | Purpose                           |
|-------------------|-----------------------------------|
| React + Vite      | Frontend framework & tooling      |
| Tailwind CSS      | Styling and responsive design     |
| JSON Server       | Local backend to serve questions  |
| TypeScript (optional) | Type safety and clarity         |
| shadcn/ui (optional) | UI components for enhanced UX  |

---

## 🧪 How to Run Locally

### 1. Clone the repository

```bash
git clone  https://github.com/ShaktiCodes/SCTool.git
cd SCTool
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start JSON Server

Make sure you have [JSON Server](https://www.npmjs.com/package/json-server) installed globally:

```bash
npm install -g json-server
```

Then start the server with:

```bash
json-server --watch db.json --port 3001
```

### 4. Start the Vite Dev Server

```bash
npm run dev
```

App should now be running at: `http://localhost:5173`

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📊 Feedback Screen

At the end of the test, users will see:
- ✅ Their correct and incorrect answers
- 🔍 Correct answers for mistakes
- 🏆 Final score out of 10

---

## 🧠 Sample JSON Format

```json
{
  "questionId": "uuid",
  "question": "The company's _____________ approach to product development _____________ customer feedback...",
  "questionType": "text",
  "answerType": "options",
  "options": ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
  "correctAnswer": ["User-centric", "Incorporated", "Enhancing", "Cultivating"]
}
```

---

## 🌐 Deployment

This app is deployed on **Vercel**.

To deploy your own version:
1. Push the repo to GitHub
2. Import the repo in [Vercel](https://vercel.com/)
3. Configure build command: `npm run build`

---

## 🙌 Contributing

Feel free to fork this repo, enhance it, and make a PR! Suggestions for features or improvements are always welcome.

---

## 📃 License

MIT License © (https://github.com/shakticodes)

---

## 👏 Acknowledgements

- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [shadcn/ui](https://ui.shadcn.com/)
```

---
