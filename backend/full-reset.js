const mongoose = require('mongoose');
const User = require('./models/User');
const Department = require('./models/Department');
const Complaint = require('./models/Complaint');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const performReset = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart_grievance_portal';
    await mongoose.connect(mongoUri);
    console.log('--- CIVIC PORTAL INITIALIZATION START ---');

    console.log('1. Purging existing grievances...');
    await Complaint.deleteMany({});

    console.log('2. Decommissioning municipal accounts...');
    await User.deleteMany({});

    console.log('3. Decommissioning departments...');
    await Department.deleteMany({});

    console.log('4. Initializing Municipal Division Structure...');
    const divisions = [
      { name: 'Sanitation & Waste', categories: ['Garbage Pickup', 'Drainage Blockage', 'Public Toilet Maintenance'] },
      { name: 'Road & Infrastructure', categories: ['Potholes', 'Street Light Failure', 'Footpath Repair'] },
      { name: 'Water Supply', categories: ['No Water Supply', 'Water Leakage', 'Contaminated Water'] },
      { name: 'Electricity Department', categories: ['Frequent Power Cuts', 'Loose Wires', 'Meter Issues'] },
      { name: 'Public Health', categories: ['Vector Control (Mosquitoes)', 'Stray Animal Control', 'Food Safety'] },
      { name: 'Encroachment & Planning', categories: ['Illegal Construction', 'Hawker Menace', 'Park Maintenance'] }
    ];

    for (const div of divisions) {
      await Department.create({
        name: div.name,
        categoriesHandled: div.categories
      });
      console.log(`Initialized Division: ${div.name}`);
    }

    // Ensure Admin & Citizen exist
    const usersToCreate = [
      { name: 'Super Admin', email: 'admin@city.gov', password: 'password123', role: 'ADMIN', phone: '1234567890', dob: new Date('1980-01-01') },
      { name: 'Basheer Citizen', email: 'basheer@gmail.com', password: 'password123', role: 'USER', phone: '5554443332', dob: new Date('2000-01-01') },
      { name: 'Dattu Citizen', email: 'dattu@gmail.com', password: 'password123', role: 'USER', phone: '5554443333', dob: new Date('1995-01-01') },
      { name: 'Mokshith Staff', email: 'mokshithkr@gmail.com', password: 'password123', role: 'STAFF', phone: '9876543210', dob: new Date('1992-01-01'), officerId: 'OFF-1234', rank: 'Senior Staff' }
    ];

    for (const u of usersToCreate) {
      try {
        await User.create(u);
        console.log(`Initialized Account: ${u.email} (${u.role})`);
      } catch (err) {
        console.error(`FAILED to create account ${u.email}:`, err.message);
      }
    }

    console.log('--- CIVIC PORTAL INITIALIZATION COMPLETE ---');
    process.exit();
  } catch (error) {
    console.error('Reset: Error', error);
    process.exit(1);
  }
};

performReset();
