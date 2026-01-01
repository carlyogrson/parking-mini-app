# Parking MiniApp - Super Qi Integration

A React-based parking management MiniApp integrated with Super Qi payment and authentication system.

## Features

- **Authentication**: Integration with Super Qi using hylid-bridge for MiniApp authentication
- **Payment Processing**: Secure payment processing using Super Qi's tradePay API
- **Session Management**: Track parking sessions with time-based pricing
- **Modern UI**: Built with React and Vite for fast development and performance

## Tech Stack

- React + Vite
- React Router for navigation
- hylid-bridge for MiniApp integration
- Tailwind CSS (via CDN)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## API Integration

### Authentication
- Endpoint: `https://its.mouamle.space/api/auth-with-superQi`
- Uses `my.getAuthCode()` from hylid-bridge to get auth code
- Stores token in localStorage for subsequent requests

### Payment
- Endpoint: `https://its.mouamle.space/api/payment`
- Uses `my.tradePay()` from hylid-bridge for payment processing

## Project Structure

```
src/
  ├── components/     # React components
  ├── lib/           # Utility functions and API calls
  │   ├── api.js     # API integration functions
  │   ├── session.js # Session management
  │   └── hostToken.js # Token handling
  └── styles/        # CSS styles
```

## License

MIT
