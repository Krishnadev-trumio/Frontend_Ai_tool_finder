# AI Tools Hub - React Frontend

A comprehensive React frontend application for browsing and managing AI tools with admin capabilities.

## Features

### User Features
- 🔍 Browse AI tools with detailed information
- 🎯 Filter tools by category, pricing type, and rating
- ⭐ View approved reviews for each tool
- ✍️ Submit reviews (pending admin approval)
- 📱 Fully responsive design

### Admin Features
- 🔐 Secure authentication with JWT
- ➕ Add new AI tools to the platform
- 👀 View pending reviews
- ✅ Approve reviews
- 📊 View dashboard with statistics
- 🔄 Recalculate tool ratings

## Tech Stack

- **React** - Frontend framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling with modern design

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Backend URL:**
   - The application is configured to connect to backend at `http://localhost:8080`
   - You can modify this in `src/services/api.js` if your backend runs on a different port

3. **Start the development server:**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   └── ProtectedRoute.js # Route protection
├── context/            # Context providers
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── ToolsList.js    # Browse tools page
│   ├── ToolDetails.js  # Tool details & reviews
│   ├── AdminLogin.js   # Admin login
│   ├── AdminRegister.js # Admin registration
│   ├── AdminDashboard.js # Admin dashboard
│   └── AddTool.js      # Add new tool
├── services/           # API services
│   └── api.js          # Axios configuration & API calls
├── styles/             # CSS modules
│   ├── Navbar.css
│   ├── Home.css
│   ├── ToolsList.css
│   ├── ToolDetails.css
│   ├── Auth.css
│   ├── AdminDashboard.css
│   └── AddTool.css
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # Entry point
```

## API Endpoints Used

### Authentication
- `POST /auth/admin/register` - Register new admin
- `POST /auth/admin/login` - Admin login

### User Endpoints
- `GET /user/getAll` - Get all AI tools
- `GET /user/tools` - Get filtered tools
- `GET /user/user/reviews/approved/:id` - Get approved reviews
- `POST /user/user/reviews/add/:id` - Submit a review

### Admin Endpoints (Protected)
- `GET /admin/aitools` - Get all tools (admin view)
- `POST /admin/aitools/add` - Add new tool
- `GET /admin/reviews/pending/:id` - Get pending reviews
- `PUT /admin/reviews/approve/:id` - Approve review
- `PUT /admin/aitools/:id/recalculate-rating` - Recalculate rating

## Environment Variables

You can create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080
```

## Usage Guide

### For Users
1. Visit the homepage to learn about AI Tools Hub
2. Click "Browse Tools" to see all available AI tools
3. Use filters to narrow down tools by category, pricing, or rating
4. Click on any tool to view detailed information
5. Submit reviews for tools you've used

### For Admins
1. Register a new admin account or login
2. Access the admin dashboard to see all your tools
3. Add new AI tools using the "Add Tool" button
4. View and approve pending reviews
5. Recalculate ratings after approving reviews

## Design Features

- 🎨 Modern gradient design with purple theme
- 📱 Fully responsive for mobile, tablet, and desktop
- ⚡ Fast and smooth animations
- 🎯 Intuitive user interface
- 🔒 Secure authentication flow
- ✨ Clean and professional layouts

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is created for educational purposes.

## Support

For issues or questions, please create an issue in the repository.

