const crypto = require('crypto');

class CertificateGenerator {
    static generate(studentData) {
        const certificate = {
            id: crypto.randomUUID(),
            studentId: studentData.studentId,
            name: studentData.name,
            course: studentData.course,
            issueDate: new Date(),
            signature: this.createDigitalSignature(studentData)
        };
        return certificate;
    }

    static createDigitalSignature(data) {
        const privateKey = process.env.PRIVATE_KEY || 'default-private-key';
        const signature = crypto.createHmac('sha256', privateKey)
                               .update(JSON.stringify(data))
                               .digest('hex');
        return signature;
    }

    static verify(certificate) {
        const originalSignature = certificate.signature;
        const dataToVerify = {
            studentId: certificate.studentId,
            name: certificate.name,
            course: certificate.course
        };
        const newSignature = this.createDigitalSignature(dataToVerify);
        return originalSignature === newSignature;
    }
}

module.exports = CertificateGenerator;
