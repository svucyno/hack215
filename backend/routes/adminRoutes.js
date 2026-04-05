const express = require('express');
const { 
  assignComplaint, 
  getDashboardAnalytics, 
  getOfficers,
  updateOfficerDepartment,
  attachAnalysis
} = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.put('/assign/:id', protect, admin, assignComplaint);
router.get('/analytics', protect, admin, getDashboardAnalytics);
router.get('/staffs', protect, admin, getOfficers);
router.put('/staff/:id/department', protect, admin, updateOfficerDepartment);
router.put('/attach-analysis/:id', protect, admin, attachAnalysis);

module.exports = router;
