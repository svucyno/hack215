import { jsPDF } from 'jspdf';
import { authorityEmblemBase64 } from '../assets/authorityEmblemBase64';

export const exportReport = (complaint) => {
  if (!complaint) return;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  
  const timestamp = new Date().toLocaleString();
  const caseId = complaint.complaintId || 'PENDING-ID';
  
  // Custom Colours
  const primaryBlue = [15, 23, 42]; // Slate 900
  const secondaryGray = [100, 116, 139]; // Slate 500
  const accentBlue = [37, 99, 235]; // Blue 600
  
  // Helper for centering text
  const centerText = (text, y, size, isBold, color = primaryBlue) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(...color);
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, y);
  };

  // 1. EMBLEM (AI Generated Premium Logo)
  try {
     // Emblem removed
  } catch (err) {
     console.error("Failed to load AI Emblem:", err);
  }
  
  // 2. HEADER
  centerText('OFFICIAL CIVIC GRIEVANCE SUMMARY', 45, 16, true);
  centerText('AI-Powered Civic Support & Management System', 52, 10, false, secondaryGray);
  
  // Horizontal Line
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.5);
  doc.line(20, 58, pageWidth - 20, 58);
  
  // Meta Details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryGray);
  doc.text(`CASE REF: ${caseId}`, 20, 65);
  doc.text(`GENERATED: ${timestamp}`, pageWidth - 20, 65, { align: 'right' });
  
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...accentBlue);
  centerText('Auto-Generated via AI Intake Engine', 72, 9, false, accentBlue);
  
  doc.setDrawColor(226, 232, 240);
  doc.line(20, 78, pageWidth - 20, 78);

  let startY = 88;

  // Section Generator Helper
  const createSection = (title, items, y) => {
    // Check page break
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    // Section Title
    doc.setFillColor(248, 250, 252); // Slate 50
    doc.rect(20, y - 6, pageWidth - 40, 10, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryBlue);
    doc.text(`  ${title.toUpperCase()}`, 20, y);
    
    y += 10;
    
    // Items
    doc.setFontSize(10);
    items.forEach(item => {
      // Check page break inside items
      if (y > 280) {
         doc.addPage();
         y = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...secondaryGray);
      doc.text(`${item.label}:`, 25, y);
      
      const labelWidth = doc.getTextWidth(`${item.label}: `);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...primaryBlue);
      
      const splitValue = doc.splitTextToSize(String(item.value || 'Not Provided'), pageWidth - 35 - labelWidth);
      doc.text(splitValue, 25 + labelWidth, y);
      
      y += (splitValue.length * 5) + 3;
    });
    
    return y + 5;
  };

  const getVal = (val) => val ? val : 'Not Provided';
  const getAiVal = Object.keys(complaint.reportData || {}).length > 0;

  // Extract variables with intelligent fallback for both AI_REPORT and REGULAR complaints
  const complainantName = complaint.reportData?.complainant_details?.name || complaint.citizenUserId?.name || 'Not Provided';
  const complainantPhone = complaint.reportData?.complainant_details?.mobile || complaint.citizenUserId?.phone || 'Not Provided';
  const complainantAddress = complaint.reportData?.complainant_details?.address || complaint.address || 'Not Provided';
  
  const caseType = getVal(complaint.category || complaint.reportData?.case_type);
  const severity = getVal(complaint.priority);
  const infoType = getVal(complaint.reportData?.info_type || (complaint.complaintType === 'AI_REPORT' ? 'Voice / Digital Entry' : 'Manual Portal Entry'));
  
  const occTime = getVal(complaint.reportData?.occurrence_details || complaint.reportData?.time);
  
  const locAddress = getVal(complaint.address || complaint.reportData?.occurrence_place || complaint.reportData?.location);
  const locCoords = complaint.latitude ? `Lat: ${complaint.latitude}, Lng: ${complaint.longitude}` : 'Not Provided';

  const actSection = getVal(complaint.reportData?.act_and_section);
  const aiSummary = getVal(complaint.reportData?.summary || complaint.reportData?.observations);
  const missingAlert = complaint.reportData?.missingFields?.length > 0 ? complaint.reportData.missingFields.join(', ') : 'None';

  // 1. COMPLAINANT PROFILE
  startY = createSection('1. Complainant Profile', [
    { label: 'Name', value: complainantName },
    { label: 'Contact', value: complainantPhone },
    { label: 'Address', value: complainantAddress }
  ], startY);

  // 2. INCIDENT CLASSIFICATION
  startY = createSection('2. Incident Classification', [
    { label: 'Type of Case', value: caseType },
    { label: 'Severity Level', value: severity },
    { label: 'Nature of Report', value: infoType }
  ], startY);

  // 3. GRIEVANCE TIMELINE
  startY = createSection('3. Grievance Timeline', [
    { label: 'Occurrence Details', value: `${occTime}` },
    { label: 'Reported Timestamp', value: timestamp }
  ], startY);

  // 4. LOCATION INTELLIGENCE
  startY = createSection('4. Location Intelligence', [
    { label: 'Full Address', value: locAddress },
    { label: 'Geo Coordinates', value: locCoords },
    { label: 'Intel Source', value: 'Location intelligence derived using AI-assisted geospatial analysis' }
  ], startY);

  // 5. DETAILED GRIEVANCE STATEMENT
  let rawNarrative = complaint.reportData?.description || complaint.reportData?.report_description || complaint.description || complaint.voiceTranscript || 'Not Provided';
  
  startY = createSection('5. Detailed Grievance Statement', [
    { label: 'Citizen Statement', value: rawNarrative }
  ], startY);

  // 6. AI GRIEVANCE ANALYSIS
  startY = createSection('6. AI Grievance Analysis', [
    { label: 'Issue Category', value: complaint.category || 'General' },
    { label: 'AI Observations', value: aiSummary },
    { label: 'Missing Info Alert', value: missingAlert }
  ], startY);

  // 7. INFRASTRUCTURE & IMPACT DETAILS
  startY = createSection('7. Infrastructure & Impact Details', [
    { label: 'Severity Level', value: severity },
    { label: 'Current Status', value: complaint.status }
  ], startY);
  
  if (startY > 230) {
    doc.addPage();
    startY = 20;
  }

  // 9. DECLARATION SECTION
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryBlue);
  doc.text('9. OFFICIAL DECLARATION', 20, startY + 10);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...secondaryGray);
  const declaration = "This report has been digitally generated based on citizen-provided input and AI-assisted analysis. It is subject to verification and official processing by the concerned authorities. False reports may be subject to legal penalties.";
  const splitDeclaration = doc.splitTextToSize(declaration, pageWidth - 40);
  doc.text(splitDeclaration, 20, startY + 18);

  // 10. SIGNATURE BLOCK
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryBlue);
  
  doc.text('Officer-in-Charge', pageWidth - 60, startY + 45);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...secondaryGray);
  doc.text('(Digital Verification Pending)', pageWidth - 65, startY + 50);

  // Important: Open PDF in new tab instead of raw auto-download per user request "DO NOT auto-download PDF"
  // It opens the PDF embedded viewer directly so they can preview it seamlessly 
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
};
