<div align="center">
  <img width="1323" alt="Screenshot 2024-10-30 at 19 51 15" src="https://github.com/user-attachments/assets/13c3b3c3-7e20-4531-bb03-f28c00f90430">

  <h1>🤖 I Wanna Be Nadi Nicoco - Backend 🤖</h1>
  <p>
    <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js">
    <img src="https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  </p>
  <p>Backend service for the AI poetry generation project, handling poem creation, storage, and social media integration.</p>
</div>

---

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td align="center">🤖</td>
      <td><strong>AI Integration</strong><br/>OpenAI GPT fine-tuned model</td>
      <td align="center">📊</td>
      <td><strong>Database</strong><br/>PostgreSQL with Prisma ORM</td>
    </tr>
    <tr>
      <td align="center">🔄</td>
      <td><strong>Automated Posts</strong><br/>Daily poem generation</td>
      <td align="center">🔗</td>
      <td><strong>Social Integration</strong><br/>Bluesky API posting</td>
    </tr>
    <tr>
      <td align="center">🛡️</td>
      <td><strong>Content Filtering</strong><br/>Automated content moderation</td>
      <td align="center">🔑</td>
      <td><strong>Security</strong><br/>Protected endpoints</td>
    </tr>
  </table>
</div>

---

## 🛠️ Technical Stack

<div align="center">
  <table>
    <tr>
      <td align="center">⚙️</td>
      <td><strong>Runtime</strong><br/>Node.js with Express</td>
      <td align="center">🗄️</td>
      <td><strong>Database</strong><br/>PostgreSQL + Prisma</td>
    </tr>
    <tr>
      <td align="center">🤖</td>
      <td><strong>AI Model</strong><br/>Fine-tuned GPT-3.5</td>
      <td align="center">📡</td>
      <td><strong>Deployment</strong><br/>Vercel with Cron</td>
    </tr>
  </table>
</div>

## 🚀 API Endpoints

- `GET /` - Fetch latest poems
- `GET /generate-poem` - Generate new poem (protected)
- `GET /poems` - Paginated poem list
- `GET /poem/:token` - Get specific poem
- `GET /count` - Get total poem count

## 📦 Environment Variables

```env
OPENAI_API_KEY=your_openai_key
BLUESKY_IDENTIFIER=your_bluesky_handle
BLUESKY_PASSWORD=your_bluesky_password
```
