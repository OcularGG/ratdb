import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const PrivacyPolicy: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          1. Information We Collect
        </Typography>
        <Typography paragraph>
          We collect information you provide directly to us, including:
          - Email address
          - Profile information
          - Usage data and analytics
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          2. How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use the information we collect to:
          - Provide and maintain our services
          - Respond to your requests and inquiries
          - Send you technical notices and updates
          - Monitor and analyze usage patterns
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          3. Data Security
        </Typography>
        <Typography paragraph>
          We implement appropriate security measures to protect your personal information.
          This includes encryption, secure servers, and regular security assessments.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          4. Your Rights
        </Typography>
        <Typography paragraph>
          You have the right to:
          - Access your personal data
          - Correct inaccurate data
          - Request deletion of your data
          - Object to data processing
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          5. Contact Us
        </Typography>
        <Typography paragraph>
          If you have any questions about this Privacy Policy, please contact us at:
          privacy@yourwebsite.com
        </Typography>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PrivacyPolicy;