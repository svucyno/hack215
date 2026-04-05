const express = require('express');
const { generateREPORT, getREPORTById, downloadREPORTPdf } = require('../controllers/reportController');
const { protect, officer } = require('../middlewares/authMiddleware');

const router = express.Router();

// IMPORTANT: Specific routes must come BEFORE parameterized routes to avoid shadowing
router.post('/generate/:complaintId', protect, generateREPORT);
router.get('/download/:complaintId', protect, downloadREPORTPdf);
router.get('/:complaintId', protect, getREPORTById);

module.exports = router;
