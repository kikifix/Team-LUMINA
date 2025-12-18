#!/bin/bash

echo "🚀 Deploying Wanderlust Travel Guide to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   sudo npm install -g vercel"
    exit 1
fi

# Check if user is logged in to Vercel
echo "🔐 Checking Vercel authentication..."
if ! vercel whoami &> /dev/null; then
    echo "Please login to Vercel first:"
    vercel login
fi

echo "✅ Vercel CLI ready!"

# Deploy backend first
echo "📦 Deploying backend..."
cd backend

# Create a simple deployment
echo "Deploying backend to Vercel..."
vercel --prod --yes

# Get the deployment URL
echo "Getting backend URL..."
BACKEND_URL=$(vercel ls --scope=$(vercel whoami) | grep backend | head -1 | awk '{print "https://" $2}')

if [ -z "$BACKEND_URL" ]; then
    echo "⚠️  Could not automatically detect backend URL."
    echo "Please check your Vercel dashboard and update frontend/.env.production manually"
    BACKEND_URL="https://your-backend-url.vercel.app"
fi

cd ..

# Update frontend environment
echo "🔧 Updating frontend environment..."
echo "REACT_APP_API_URL=$BACKEND_URL" > frontend/.env.production
echo "GENERATE_SOURCEMAP=false" >> frontend/.env.production

echo "Updated frontend/.env.production with:"
cat frontend/.env.production

# Deploy frontend
echo "🎨 Deploying frontend..."
cd frontend
vercel --prod --yes

# Get frontend URL
FRONTEND_URL=$(vercel ls --scope=$(vercel whoami) | grep frontend | head -1 | awk '{print "https://" $2}')

if [ -z "$FRONTEND_URL" ]; then
    FRONTEND_URL="https://your-frontend-url.vercel.app"
fi

cd ..

echo ""
echo "✅ Deployment complete!"
echo "🌐 Frontend: $FRONTEND_URL"
echo "🔧 Backend: $BACKEND_URL"
echo ""
echo "🗄️ Next steps:"
echo "1. Set up MongoDB Atlas at https://cloud.mongodb.com"
echo "2. Add environment variables in Vercel dashboard:"
echo "   - MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travelguide"
echo "   - JWT_SECRET=your-super-secret-jwt-key-32-chars-minimum"
echo "3. Seed the database: curl -X POST $BACKEND_URL/api/seed"
echo "4. Test your app at: $FRONTEND_URL"
echo ""
echo "🎉 Your travel guide is now live!"