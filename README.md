# 🚀 zodify-json

**Instantly transform raw JSON objects into valid, runtime-checked Zod schemas and inferred TypeScript definitions.**

[![Vite](https://img.shields.io/badge/Vite-v5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

---

## 📋 Description

**zodify-json** is a client-side developer utility that takes the pain out of manually writing validation schemas for API responses. By parsing structural JSON patterns entirely in the browser, it dynamically outputs clean, copy-pasteable Zod code.

No server calls. No logging. No complexity. Just pure, local JSON-to-Zod transformation magic. ✨

Whether you're integrating third-party APIs, building type-safe applications, or validating incoming data, zodify-json eliminates boilerplate and accelerates your development workflow.

---

## ✨ Key Features

### 🎯 **Dynamic Schema Generation**
Recursively maps primitives, arrays, nested objects, and null values to chainable Zod types. See your schema update in real-time as you paste new JSON examples.

### 🔒 **Client-Side & Secure**
Zero server interactions or backend logging—data is processed locally in the user's browser, making it **100% secure and free**. Your data never leaves your machine.

### 🛡️ **Resilient Validation**
Gracefully handles malformed JSON inputs with inline structural error messages without crashing. Get instant feedback on what went wrong and why.

### 🚀 **Developer Utilities**
- ✂️ Quick action triggers like "Format/Prettify JSON"
- 📋 "Paste Example Data" for rapid schema exploration
- 📌 "Copy Code" button with instant visual feedback
- 🎨 Beautiful syntax highlighting for generated schemas

---

## 🛠️ Tech Stack Used

| Component | Technology |
|-----------|------------|
| **Framework** | React (JavaScript) |
| **Styling** | Tailwind CSS (Responsive Dark-Mode Aesthetic) |
| **Icons** | Lucide React |
| **Build Tool** | Vite |
| **Deployment** | Vercel |

---

## 🎯 Digital Heroes Evaluation

> ⭐ **Mandatory Deliverables for Reviewer Quick-Links**
>
> - **📦 Live Deployment Link:** [Insert Vercel URL here]
> - **📧 Contact Information:** [Insert Full Name] — [Insert Email Address]
> - **✅ Required Element:** This application features the mandatory "Built for Digital Heroes" portal anchor directly embedded within the interface layout for reviewer verification.

---

## 🚀 Local Setup Instructions

Get zodify-json running locally in minutes:

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Setup Steps

```bash
# 1. Clone the repository
git clone https://github.com/Yogendra-Bisht/zodify-json.git

# 2. Navigate to the project directory
cd zodify-json

# 3. Install project dependencies
npm install

# 4. Launch the local development server
npm run dev
```

Your application will be available at **`http://localhost:5173`** (or the next available port).

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint and format code
npm run lint
```

---

## 📖 How to Use zodify-json

1. **Paste or Import JSON** → Copy-paste any raw JSON object or import from a file
2. **Watch Schema Generate** → See your Zod schema materialize in real-time as the parser analyzes structure
3. **Review & Customize** → Inspect the generated TypeScript types and schema validation logic
4. **Copy & Deploy** → Click "Copy Code" to grab the schema—paste directly into your project

---

## 🎨 Features in Action

### Schema Generation Example

**Input JSON:**
```json
{
  "user": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com",
    "roles": ["admin", "user"],
    "metadata": null
  }
}
```

**Generated Zod Schema:**
```typescript
import { z } from 'zod';

const schema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    roles: z.array(z.string()),
    metadata: z.null()
  })
});

type User = z.infer<typeof schema>;
```

---

## 🔐 Security & Privacy

✅ **100% Client-Side Processing** — No data transmission to servers  
✅ **No Cookies or Tracking** — Your browsing remains private  
✅ **Open Source Ready** — Full transparency in data handling  
✅ **GDPR Compliant** — Zero personal data collection

---

## 🤝 Contributing

We welcome feedback and contributions! If you encounter bugs or have feature requests, please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 📞 Support & Feedback

Have questions? Found a bug? Want to suggest a feature?

- 📧 **Email:** [Insert Contact Email]
- 🐛 **GitHub Issues:** [Report a bug](https://github.com/Yogendra-Bisht/zodify-json/issues)
- ⭐ **Star this repo** if you find zodify-json useful!

---

**Made with ❤️ for developers. Built for Digital Heroes.**
