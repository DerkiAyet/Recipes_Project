# Recipes App

A recipe-sharing platform where food lovers can discover, share, rate, and save recipes, available in **English, French, and Arabic** (with RTL support).

## Features

- **Authentication:** sign up, log in, secure sessions
- **Browse recipes:** scroll through a feed of recipes shared by the community
- **Search:** find recipes quickly by name or keyword
- **Full recipe view:** ingredients, step-by-step method, and nutrition information
- **Share your own recipes:** publish a recipe with its ingredients, method, and nutrition details
- **Comment and rate:** give feedback on any recipe
- **Save recipes:** build your own collection of favorites
- **Profiles:** update your profile and visit other users' profiles
- **Multilingual:** switch between English, French, and Arabic on the fly

## Tech Stack

**Frontend:** React, react-i18next
**Backend:** Node.js, Express
**Database:** MongoDB (Mongoose)

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/DerkiAyet/Recipes_Project.git
cd Recipes_Project

# Backend
cd server
npm install
cp .env     # fill in your values
npm start

# Frontend (in a new terminal)
cd client
npm install
npm start
```

### Environment variables

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
PORT=5000
```

## Possible Improvements

- Shopping list from a recipe's ingredients
- Image upload to a cloud provider

## Author

**Ayet Halima Derki** · [GitHub](https://github.com/DerkiAyet) · [LinkedIn](https://www.linkedin.com/in/derki-ayet-35999931a)
