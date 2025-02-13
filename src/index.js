require('dotenv').config();
const express = require('express');
const Blockchain = require('./blockchain/Blockchain');
const userController = require('./controllers/userController');
const auth = require('./middleware/auth');
const { validateStudent } = require('./middleware/validator');
const CertificateGenerator = require('./utils/certificateGenerator');
const cors = require('cors');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const path = require('path');

const app = express();
const studentRecords = new Blockchain();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Database connection
connectDB();

// User routes
app.post('/users/register', userController.register);
app.post('/users/login', userController.login);
app.get('/users/logout', userController.logout);

// Protected routes
// Updated record creation with validation and certificate
app.post('/records', [auth, validateStudent], (req, res, next) => {
    try {
        const recordData = {
            studentId: req.body.studentId,
            name: req.body.name,
            course: req.body.course,
            grade: req.body.grade,
            timestamp: Date.now()
        };

        const certificate = CertificateGenerator.generate(recordData);
        recordData.certificate = certificate;

        studentRecords.addBlock(recordData);
        res.json({ 
            message: 'Record added successfully',
            certificate: certificate
        });
    } catch (error) {
        next(error);
    }
});

app.get('/records/verify', auth, (req, res) => {
    res.json({
        isValid: studentRecords.isChainValid(),
        chain: studentRecords.chain
    });
});

// New endpoint to get records by student ID
app.get('/records/:studentId', auth, (req, res) => {
    const records = studentRecords.chain.filter(block => 
        block.data.studentId === req.params.studentId
    );
    res.json(records);
});

// New endpoint for certificate verification
app.get('/certificates/:certificateId', auth, (req, res) => {
    const records = studentRecords.chain.find(block => 
        block.data.certificate && block.data.certificate.id === req.params.certificateId
    );
    
    if (!records) {
        return res.status(404).json({ error: 'Certificate not found' });
    }

    const isValid = CertificateGenerator.verify(records.data.certificate);
    res.json({ 
        isValid,
        certificate: records.data.certificate 
    });
});

// Public certificate verification endpoint
app.get('/verify-certificate/:certificateId', (req, res) => {
    try {
        const certificateId = req.params.certificateId;
        const record = studentRecords.chain.find(block => 
            block.data.certificate && block.data.certificate.id === certificateId
        );
        
        if (!record) {
            return res.status(404).json({ 
                isValid: false,
                error: 'Certificate not found' 
            });
        }

        const isValid = CertificateGenerator.verify(record.data.certificate);
        res.json({ 
            isValid,
            certificate: record.data.certificate 
        });
    } catch (error) {
        res.status(500).json({ 
            isValid: false,
            error: 'Verification failed' 
        });
    }
});

// Search records by various criteria
app.get('/search', auth, (req, res) => {
    const { studentId, name, course } = req.query;
    let records = studentRecords.chain.slice(1); // Skip genesis block

    if (studentId) {
        records = records.filter(block => block.data.studentId === studentId);
    }
    if (name) {
        records = records.filter(block => block.data.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (course) {
        records = records.filter(block => block.data.course.toLowerCase().includes(course.toLowerCase()));
    }

    res.json(records);
});

// Global error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.use('/', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
