# Student Record Management System (SRM)

A blockchain-based system for securely managing student academic records and certificates.

## Features

- **Blockchain Technology**: Immutable and secure record storage
- **Role-Based Access**: Student, Institution, and Admin portals
- **Digital Certificates**: Secure certificate generation and verification
- **Real-time Verification**: Instant validation of academic records
- **User Management**: Complete user administration system

## Tech Stack

- **Frontend**: HTML, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Blockchain**: Custom implementation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/SEN-381-Defense-Project.git
cd SEN-381-Defense-Project
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the application
```bash
npm start
```

## Project Structure

```
src/
├── public/          # Static files
│   ├── dashboards/  # Dashboard UIs
│   ├── styles/      # CSS files
│   └── script/      # Client-side JavaScript
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # Route definitions
├── blockchain/      # Blockchain implementation
└── utils/          # Utility functions
```

## API Endpoints

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/logout` - User logout

### Records
- `POST /records` - Create new record
- `GET /records/verify` - Verify record authenticity
- `GET /records/:studentId` - Get student records
- `GET /certificates/:certificateId` - Verify certificate

### Admin Routes
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## User Roles

### Student
- View academic records
- Access digital certificates
- Share documents securely
- Manage profile

### Institution
- Issue certificates
- Manage student records
- Verify documents
- Track verifications

### Administrator
- User management
- System settings
- Access control
- Audit logging

## Security Features

- JWT Authentication
- Role-based authorization
- Blockchain verification
- Password encryption
- Session management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Blockchain technology implementation
- Security best practices
- User interface design principles
