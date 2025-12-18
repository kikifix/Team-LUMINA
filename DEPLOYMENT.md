# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### **Option 1: Deploy Both Frontend & Backend Together**

1. **Prepare the Project**
   ```bash
   # Make sure all dependencies are installed
   npm run install-deps
   
   # Test locally first
   npm run dev
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy the project
   vercel
   ```

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelguide
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=production
   ```

### **Option 2: Deploy Frontend & Backend Separately (Recommended)**

#### **Deploy Backend First**

1. **Create Backend Repository**
   ```bash
   # Create a new repo for backend only
   mkdir wanderlust-backend
   cp -r backend/* wanderlust-backend/
   cd wanderlust-backend
   git init
   git add .
   git commit -m "Initial backend commit"
   ```

2. **Deploy Backend to Vercel**
   ```bash
   vercel
   # Follow prompts, select the backend directory
   ```

3. **Set Backend Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelguide
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
   NODE_ENV=production
   ```

#### **Deploy Frontend**

1. **Update Frontend API URL**
   ```bash
   # Update frontend/.env.production
   REACT_APP_API_URL=https://your-backend-url.vercel.app
   ```

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

### **Option 3: One-Click Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/wanderlust-travel-guide)

## 🗄️ Database Setup

### **MongoDB Atlas (Recommended)**

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create free cluster
   - Get connection string

2. **Configure Database**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelguide?retryWrites=true&w=majority
   ```

3. **Seed Database**
   ```bash
   # After deployment, seed the database
   curl -X POST https://your-backend-url.vercel.app/api/seed
   ```

## ⚙️ Environment Variables

### **Backend Environment Variables**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelguide
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
NODE_ENV=production
PORT=5000
```

### **Frontend Environment Variables**
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
GENERATE_SOURCEMAP=false
```

## 🔧 Vercel Configuration

### **Root vercel.json** (Full Stack)
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
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

### **Backend-only vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

## 🚀 Deployment Steps

### **Step 1: Prepare Code**
```bash
# Clone or prepare your code
git clone <your-repo>
cd wanderlust-travel-guide

# Install dependencies
npm run install-deps

# Test locally
npm run dev
```

### **Step 2: Setup Database**
```bash
# Create MongoDB Atlas cluster
# Get connection string
# Update environment variables
```

### **Step 3: Deploy Backend**
```bash
cd backend
vercel
# Set environment variables in Vercel dashboard
```

### **Step 4: Deploy Frontend**
```bash
cd frontend
# Update .env.production with backend URL
vercel
```

### **Step 5: Seed Database**
```bash
# Seed the production database
curl -X POST https://your-backend-url.vercel.app/api/seed
```

## 🔍 Testing Deployment

### **Test Backend**
```bash
# Health check
curl https://your-backend-url.vercel.app/api/health

# Test auth
curl -X POST https://your-backend-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### **Test Frontend**
- Visit your frontend URL
- Try registration/login
- Create a trip
- Add destinations

## 🐛 Troubleshooting

### **Common Issues**

1. **CORS Errors**
   ```javascript
   // In backend/server.js, make sure CORS is configured
   app.use(cors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
     credentials: true
   }));
   ```

2. **Environment Variables Not Loading**
   - Check Vercel dashboard settings
   - Redeploy after adding variables
   - Use `process.env.VARIABLE_NAME`

3. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist (allow all: 0.0.0.0/0)
   - Ensure database user has proper permissions

4. **Build Failures**
   ```bash
   # Check build logs in Vercel dashboard
   # Ensure all dependencies are in package.json
   # Check for syntax errors
   ```

## 📱 Custom Domain (Optional)

1. **Add Custom Domain in Vercel**
   - Go to project settings
   - Add your domain
   - Configure DNS records

2. **Update Environment Variables**
   ```env
   REACT_APP_API_URL=https://api.yourdomain.com
   ```

## 🎉 Success!

Your travel guide website should now be live at:
- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.vercel.app`

### **Demo Accounts**
- Email: `demo@wanderlust.com`
- Password: `password123`

### **Features Available**
- ✅ User registration/login
- ✅ Browse destinations
- ✅ Create and manage trips
- ✅ Add experiences to trips
- ✅ Responsive design
- ✅ Secure authentication

Enjoy your deployed travel guide website! 🌍✈️