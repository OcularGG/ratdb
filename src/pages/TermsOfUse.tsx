import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TermsOfUse: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Terms of Use
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          1. Acceptance of Terms
        </Typography>
        <Typography paragraph>
          By accessing and using this website, you accept and agree to be bound by the terms
          and provision of this agreement.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          2. Use License
        </Typography>
        <Typography paragraph>
          Permission is granted to temporarily download one copy of the materials on our website
          for personal, non-commercial transitory viewing only.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          3. User Account
        </Typography>
        <Typography paragraph>
          - You are responsible for maintaining the confidentiality of your account
          - You are responsible for all activities under your account
          - You must notify us immediately of any unauthorized use
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          4. Disclaimer
        </Typography>
        <Typography paragraph>
          The materials on our website are provided on an 'as is' basis.
          We make no warranties, expressed or implied, and hereby disclaim and negate
          all other warranties including, without limitation, implied warranties or
          conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property or other violation of rights.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          5. Limitations
        </Typography>
        <Typography paragraph>
          In no event shall we or our suppliers be liable for any damages arising out of
          the use or inability to use the materials on our website.
        </Typography>

        <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TermsOfUse;