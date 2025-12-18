# 🌍 Wanderlust Travel Guide - Vercel Deployment

## 🚀 Quick Deploy to Vercel

### **Method 1: One-Command Deploy**
```bash
# Make the deploy script executable and run it
chmod +x deploy.sh
./deploy.sh
```

### **Method 2: Manual Deploy**

#### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
vercel login
```

#### **Step 2: Deploy Backend**
```bash
cd backend
vercel
# Follow prompts, choose settings
```

#### **Step 3: Deploy Frontend**
```bash
cd frontend
# Update .env.production with your backend URL
echo "REACT_APP_API_URL=https://your-backend-url.vercel.app" > .env.production
vercel
```

## 🗄️ Database Setup (MongoDB Atlas)

### **1. Create MongoDB Atlas Account**
- Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a free cluster
- Create database user
- Whitelist IP addresses (0.0.0.0/0 for all)

### **2. Get Connection String**
```
mongodb+srv://username:password@cluster.mongodb.net/travelguide?retryWrites=true&w=majority
```

### **3. Set Environment Variables in Vercel**
Go to your Vercel project dashboard → Settings → Environment Variables:

**Backend Variables:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelguide
JWT_SECRET=your-super-secret-jwt-key-make-it-long-and-random-32-chars-min
NODE_ENV=production
```

**Frontend Variables:**
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

## 🌱 Seed Database

After deployment, seed your database with sample data:
```bash
curl -X POST https://your-backend-url.vercel.app/api/seed
```

## 🎯 Project Structure for Vercel

```
wanderlust-travel-guide/
├── backend/
│   ├── server.js          # Main server file
│   ├── vercel.json        # Backend Vercel config
│   ├── package.json       # Backend dependencies
│   └── ...
├── frontend/
│   ├── package.json       # Frontend dependencies
│   ├── .env.production    # Production environment
│   └── ...
├── vercel.json           # Root Vercel config
├── deploy.sh             # Deployment script
└── README.md
```

## 🔧 Vercel Configuration Files

### **Root vercel.json** (Monorepo)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "backend/server.js" },
    { "src": "/(.*)", "dest": "frontend/$1" }
  ]
}
```

### **Backend vercel.json** (Separate)
```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

## 🧪 Testing Your Deployment

### **1. Test Backend API**
```bash
# Health check
curl https://your-backend-url.vercel.app/api/health

# Test registration
curl -X POST https://your-backend-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test destinations
curl https://your-backend-url.vercel.app/api/destinations
```

### **2. Test Frontend**
- Visit your frontend URL
- Try user registration/login
- Browse destinations
- Create a trip
- Add destinations to trip

## 🎭 Demo Accounts

After seeding, you can use these demo accounts:
- **Email**: `demo@wanderlust.com`
- **Password**: `password123`

## 🐛 Common Issues & Solutions

### **CORS Errors**
```javascript
// backend/server.js - Update CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app'
  ],
  credentials: true
}));
```

### **Environment Variables Not Working**
- Check Vercel dashboard settings
- Redeploy after adding variables
- Ensure variable names match exactly

### **Database Connection Issues**
- Verify MongoDB connection string
- Check IP whitelist (allow 0.0.0.0/0)
- Ensure database user has read/write permissions

### **Build Failures**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

## 🌐 Custom Domain (Optional)

1. **Purchase Domain** (Namecheap, GoDaddy, etc.)
2. **Add to Vercel**:
   - Project Settings → Domains
   - Add your domain
   - Configure DNS records as shown
3. **Update Environment Variables**:
   ```
   REACT_APP_API_URL=https://api.yourdomain.com
   ```

## 📊 Performance Optimization

### **Frontend Optimizations**
- ✅ Code splitting with React.lazy()
- ✅ Image optimization
- ✅ Gzip compression (automatic on Vercel)
- ✅ CDN distribution (automatic on Vercel)

### **Backend Optimizations**
- ✅ Database indexing
- ✅ Response compression
- ✅ Efficient queries with population
- ✅ JWT token optimization

## 🔒 Security Checklist

- ✅ Environment variables secured
- ✅ JWT secret is strong and random
- ✅ CORS properly configured
- ✅ Input validation on all endpoints
- ✅ Password hashing with bcrypt
- ✅ HTTPS enforced (automatic on Vercel)

## 📈 Monitoring & Analytics

### **Vercel Analytics**
- Enable in project settings
- Monitor performance metrics
- Track user engagement

### **Error Monitoring**
```javascript
// Add error tracking (Sentry, LogRocket, etc.)
// Monitor API response times
// Track user authentication flows
```

## 🎉 Success Checklist

After deployment, verify:
- [ ] Frontend loads without errors
- [ ] Backend API responds to health check
- [ ] Database connection works
- [ ] User registration/login works
- [ ] Trip creation and management works
- [ ] All features function correctly
- [ ] Mobile responsiveness works
- [ ] Performance is acceptable

## 🚀 Go Live!

Your travel guide website is now live and ready for users!

**Frontend URL**: `https://your-frontend.vercel.app`
**Backend URL**: `https://your-backend.vercel.app`

Share your amazing travel guide with the world! 🌍✈️

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check browser console for errors
5. Review MongoDB Atlas logs

Happy deploying! 🎉