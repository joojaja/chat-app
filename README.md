# ChatBot README
<img width="1544" height="800" alt="image" src="https://github.com/user-attachments/assets/39f8b2f4-01ac-498a-907c-fb80c76fd38d" />
<img width="1521" height="800" alt="image" src="https://github.com/user-attachments/assets/fb32969b-38f1-4fa0-a7b7-9b1d13bb65c5" />
<img width="1526" height="800" alt="image" src="https://github.com/user-attachments/assets/b7cb78f0-6177-4246-a8d1-1273e551e9ca" />



## ChatBot
[![My Skills](https://skillicons.dev/icons?i=html,css,js,react,tailwind,mongodb,express,nodejs)](https://skillicons.dev)

ChatBot is a bidirectional real-time chat messaging application built with MERN Stack + Socket.io

Tech stack used:
1. MongoDB
2. Express
3. React (Zustand)
4. Node.js
5. Tailwind CSS
6. Socket.io
7. Daisy UI

## What I learnt
- How to use WebSockets and its ability to provide a duplex data transfer between client and browser (Socket.io)
- React state mangement with Zustand

## Features
- Login & Register (JWT Authenticaton)
- Editing of Profile Picture (Profile Page)
- Changing of Chat Colour Theme (Settings Page)
- Real-time Chat Messaging (Text & Images)

## Launching ChatBot
### Web Deployment
Website deployed on Render
[https://chat-app-u1lc.onrender.com/](https://chat-app-u1lc.onrender.com/)

**Login Credentials:**

Email - john@gmail.com
Password - 123456

Email - joojaja@gmail.com
Password - 123456

### Manual Deployment

.env file in /backend
> MONGODB_URI= from mongoDB cloud
> 
> PORT=5001
> 
> JWT_SECRET=anystring
> 
> NODE_ENV=development
> 
> CLOUDINARY_CLOUD_NAME=from cloudinary
> 
> CLOUDINARY_API_KEY=from cloudinary
> 
> CLOUDINARY_API_SECRET=from cloudinary

```bash
cd backend  
npm install  
npm run dev

cd frontend
npm install
npm run dev  
```

### Credits:
[https://www.youtube.com/watch?v=ntKkVrQqBYY](https://www.youtube.com/watch?v=ntKkVrQqBYY)
