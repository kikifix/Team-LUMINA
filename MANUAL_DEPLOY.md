# 🚀 Manual Deployment Guide

## Step-by-Step Vercel Deployment

### **Step 1: Login to Vercel**
```bash
vercel login
# Follow the prompts to authenticate
```

### **Step 2: Deploy Backend**
```bash
cd backend
vercel
```

**During backend deployment, choose:**
- Set up and deploy? **Y**
- Which scope? **Your username/team**
- Link to existing project? **N**
- Project name? **wanderlust-backend** (or your choice)
- Directory? **./backend** (current directory)
- Override settings? **N**

**Copy the backend URL** from the output (e.g., `https://wanderlust-backend.vercel.app`)

### **Step 3: Set Backend Environment Variables**

Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your Backend Project → Settings → Environment Variables

Add these variables:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/travelguide
JWT_SECRET = your-super-secret-jwt-key-make-it-32-characters-minimum
NODE_ENV = production
```

**Redeploy backend** after adding variables:
```bash
vercel --prod
```

### **Step 4: Update Frontend Environment**
```bash
cd ../frontend
echo "REACT_APP_API_URL=https://your-backend-url.vercel.app" > .env.production
echo "GENERATE_SOURCEMAP=false" >> .env.production
```

### **Step 5: Deploy Frontend**
```bash
vercel
```

**During frontend deployment, choose:**
- Set up and deploy? **Y**
- Which scope? **Your username/team**
- Link to existing project? **N**
- Project name? **wanderlust-frontend** (or your choice)
- Directory? **./frontend** (current directory)
- Override settings? **N**

### **Step 6: Set Up MongoDB Atlas**

1. **Create Account**: Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Create Cluster**: Choose free tier
3. **Create Database User**: 
   - Username: `wanderlust`
   - Password: Generate strong password
4. **Network Access**: Add IP `0.0.0.0/0` (allow all)
5. **Get Connection String**: 
   ```
   mongodb+srv://wanderlust:password@cluster.mongodb.net/travelguide?retryWrites=true&w=majority
   ```

### **Step 7: Update Environment Variables**

Update your backend environment variables in Vercel dashboard with the real MongoDB URI.

### **Step 8: Seed Database**
```bash
curl -X POST https://your-backend-url.vercel.app/api/seed
```

You should see output like:
```
🌱 Starting database seeding...
✅ Cleared existing data
✅ Inserted 2 demo users
✅ Inserted 14 destinations
✅ Inserted 26 experiences
✅ Inserted 7 sample trips
🎉 Database seeding completed successfully!
```

### **Step 9: Test Your Deployment**

1. **Visit your frontend URL**
2. **Try registration**: Create a new account
3. **Try login**: Use demo account:
   - Email: `demo@wanderlust.com`
   - Password: `password123`
4. **Test features**: Browse destinations, create trips

## 🔧 Alternative: GitHub Integration

### **Option 1: Deploy via GitHub**

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/wanderlust-travel-guide.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub
   - Select your repository

3. **Configure Build Settings**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (for monorepo) or `./frontend` (for frontend only)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

## 🐛 Troubleshooting

### **Common Issues:**

1. **"Command not found: vercel"**
   ```bash
   sudo npm install -g vercel
   ```

2. **CORS Errors**
   - Make sure backend CORS is configured for your frontend URL
   - Update `backend/server.js` CORS settings

3. **Environment Variables Not Working**
   - Check Vercel dashboard settings
   - Redeploy after adding variables
   - Make sure variable names match exactly

4. **Database Connection Failed**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist (0.0.0.0/0)
   - Ensure database user has proper permissions

5. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Check for syntax errors

### **Verification Commands:**

```bash
# Test backend health
curl https://your-backend-url.vercel.app/api/health

# Test destinations endpoint
curl https://your-backend-url.vercel.app/api/destinations

# Test user registration
curl -X POST https://your-backend-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## 🎉 Success!

Your travel guide should now be live at:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`

### **Demo Accounts:**
- Email: `demo@wanderlust.com`
- Password: `password123`

### **Features to Test:**
- ✅ User registration/login
- ✅ Browse destinations
- ✅ Create trips
- ✅ Add destinations to trips
- ✅ Add experiences to destinations
- ✅ Edit trip details

Congratulations! Your travel guide is now live on Vercel! 🌍✈️