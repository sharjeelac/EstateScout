# 🚀 EstateScout - Quick Start Guide

## Prerequisites
- Node.js v16+ 
- MongoDB (local or Atlas)
- Cloudinary account
- npm/yarn

---

## ⚡ 5-Minute Setup

### Step 1: Backend Setup (2 minutes)
```bash
cd Backend
npm install
```

Create `.env` file:
```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/estatescout
JWT_ACCESS_TOKEN_SECRET=your_secret_key_here_make_it_long_and_strong
JWT_REFRESH_TOKEN_SECRET=your_refresh_secret_key_here_make_it_long
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
PORT=5000
```

Start backend:
```bash
npm start
# Server runs on http://localhost:5000
```

---

### Step 2: Frontend Setup (2 minutes)
In a new terminal:
```bash
cd Frontend
npm install
npm run dev
# App opens on http://localhost:3000
```

---

### Step 3: Test the App (1 minute)
1. Go to http://localhost:3000
2. Click "Register" 
3. Sign up as an agent or user
4. Try adding a property (if agent)
5. Browse properties
6. View property details

---

## 🎯 Common Tasks

### Add a Property
1. Register as an "Agent"
2. Click "Add Property" in navbar
3. Fill form and upload images
4. Submit

### Browse Properties
1. Click "Properties" in navbar
2. Use filters (type, price, location)
3. Click property card for details
4. Contact agent via email or phone

### Edit Profile
1. Click your name in navbar
2. Click "Edit Profile"
3. Update info and save

### Logout
1. Click name in navbar
2. Click "Logout"

---

## 📁 Important Files

### Backend Configuration
- `server.js` - Main server file
- `config/db.js` - Database connection
- `.env` - Environment variables

### Frontend Configuration
- `src/App.jsx` - Main routes
- `src/services/api.js` - API configuration
- `vite.config.js` - Build config
- `tailwind.config.js` - Style config

---

## 🔌 API Endpoints

### Auth Endpoints
```
POST   /api/auth/register     - Create account
POST   /api/auth/login        - Login
POST   /api/auth/logout       - Logout
POST   /api/auth/refresh      - Get new token
GET    /api/auth/:id          - Get profile
PUT    /api/auth/:id          - Update profile
DELETE /api/auth/:id          - Delete account
```

### Property Endpoints
```
GET    /api/properties        - All properties
GET    /api/properties/:id    - Property details
POST   /api/properties        - Create property (auth required)
PUT    /api/properties/:id    - Update property (auth required)
DELETE /api/properties/:id    - Delete property (auth required)
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Clear node_modules
rm -rf node_modules
npm install
npm start
```

### Frontend Connection Issues
- Check backend is running on port 5000
- Check `src/services/api.js` has correct URL
- Clear browser cache

### MongoDB Connection Error
- Verify MONGO_URI in .env
- Check MongoDB is running
- Check internet connection (for Atlas)

### Image Upload Fails
- Verify Cloudinary credentials in .env
- Check image file size (< 10MB)
- Verify image format (jpg, png, jpeg)

---

## 📱 Features Overview

### User Features
- ✅ Register/Login
- ✅ Browse properties
- ✅ Filter by type, price, location
- ✅ View property details & gallery
- ✅ Contact agents
- ✅ Manage profile

### Agent Features
- ✅ All user features
- ✅ List properties
- ✅ Upload multiple images
- ✅ Set amenities
- ✅ Edit property details
- ✅ Delete listings

### Admin Features
- ✅ All agent features
- ✅ Delete any property
- ✅ Manage users

---

## 🛡️ Security Features
- ✅ Password hashing (bcryptjs)
- ✅ JWT authentication
- ✅ Protected routes
- ✅ CORS enabled
- ✅ HTTP-only cookies
- ✅ Token refresh mechanism

---

## 📊 Database Schema

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  profilePicture: String,
  role: 'user' | 'agent' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Property
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: 'apartment' | 'villa' | 'studio' | 'townhouse' | 'office',
  location: String,
  price: Number,
  area: Number,
  amenities: ['parking', 'pool', ...],
  images: [String], // URLs
  thumbnail: String, // URL
  agent: ObjectId (ref User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Styling Reference

### Colors
- Primary Blue: `#3B82F6`
- Secondary Gray: `#1F2937`
- Accent Amber: `#F59E0B`
- Success Green: `#10B981`
- Danger Red: `#EF4444`

### Tailwind Classes Used
- Grid layouts (grid-cols-1, md:grid-cols-2, lg:grid-cols-3)
- Flexbox utilities
- Spacing (p-4, m-4, space-y-4)
- Responsive prefixes (md:, lg:)
- Hover and transition effects

---

## 📦 Dependencies

### Backend
- express (server)
- mongoose (database)
- jsonwebtoken (auth)
- bcryptjs (password hashing)
- cloudinary (image storage)
- multer (file upload)
- cors (cross-origin)
- cookie-parser (cookies)

### Frontend
- react (UI)
- react-router-dom (routing)
- axios (HTTP)
- tailwindcss (styling)
- lucide-react (icons)

---

## 🌐 Deployment

### Backend (Heroku/Railway)
```bash
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Commit with clear messages
5. Push and create pull request

---

## 📞 Help & Support

### Getting Help
1. Check README.md for full documentation
2. See DEVELOPMENT_SUMMARY.md for detailed info
3. Review .env.example for configuration
4. Check browser console for errors

### Common Issues
- **Blank page**: Check console for errors, verify API connection
- **Can't login**: Verify database connection
- **Images don't upload**: Check Cloudinary credentials
- **Refresh doesn't work**: Check JWT secrets match

---

## ✅ Verification Checklist

- [ ] Node.js installed
- [ ] MongoDB connected
- [ ] Backend running on :5000
- [ ] Frontend running on :3000
- [ ] Can register account
- [ ] Can login
- [ ] Can browse properties
- [ ] Can upload property
- [ ] Can view details
- [ ] Can contact agent

---

## 🎉 You're All Set!

Your EstateScout application is ready to use. Start creating listings and browsing properties!

**Questions?** Check the README.md or DEVELOPMENT_SUMMARY.md files.

Happy coding! 🚀
