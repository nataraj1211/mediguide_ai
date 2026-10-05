import assert from 'assert';
import { analyzeSymptoms, checkEmergencyIndicators } from '../src/services/aiService.js';
import { getNearbyFacilities, calculateDistanceKm } from '../src/services/mapsService.js';

console.log('========================================================');
console.log('Running MediGuide AI Clinical Safety & API Test Suite');
console.log('========================================================\n');

let passedTests = 0;
let totalTests = 0;

const runTest = async (testName, fn) => {
  totalTests++;
  try {
    await fn();
    console.log(`✅ [PASS] ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`❌ [FAIL] ${testName}:`, err.message);
  }
};

(async () => {
  // Test 1: Case 1 - Headache
  await runTest('Case 1: Tension/Mild Headache Educational Guidance', async () => {
    const res = await analyzeSymptoms({
      text: 'I have a mild throbbing headache and eye strain since working on my laptop.',
      duration: '1 day',
      severity: 'Mild'
    });
    assert.strictEqual(res.isEmergency, false);
    assert.ok(res.possibleCategory.toLowerCase().includes('headache'));
    assert.ok(res.selfCare.length > 0);
    assert.strictEqual(res.relevantSpecialty, 'General Medicine');
  });

  // Test 2: Case 2 - Mild Fever
  await runTest('Case 2: Mild Febrile Symptom / Viral Prodrome', async () => {
    const res = await analyzeSymptoms({
      text: 'Mild fever and body chills since yesterday evening.',
      duration: '24 hours',
      severity: 'Moderate'
    });
    assert.strictEqual(res.isEmergency, false);
    assert.ok(res.possibleCategory.toLowerCase().includes('fever') || res.possibleCategory.toLowerCase().includes('febrile'));
    assert.ok(res.warningSigns.some(s => s.toLowerCase().includes('103')));
    assert.strictEqual(res.relevantSpecialty, 'General Medicine');
  });

  // Test 3: Case 3 - Skin Irritation
  await runTest('Case 3: Skin Rash / Irritation (Example Case from Specification)', async () => {
    const res = await analyzeSymptoms({
      text: 'I have an itchy red skin rash.',
      duration: '2 days',
      severity: 'Mild'
    });
    assert.strictEqual(res.isEmergency, false);
    assert.ok(res.possibleCategory.toLowerCase().includes('skin'));
    assert.ok(res.selfCare.some(c => c.toLowerCase().includes('scratch') || c.toLowerCase().includes('clean')));
    assert.strictEqual(res.relevantSpecialty, 'Dermatology');
  });

  // Test 4: Case 4 - Minor Visible Injury
  await runTest('Case 4: Minor Superficial Cut / Scrape First Aid', async () => {
    const res = await analyzeSymptoms({
      text: 'Small cut and superficial scrape on index finger while cooking, minor bleeding.',
      duration: '30 mins',
      severity: 'Mild'
    });
    assert.strictEqual(res.isEmergency, false);
    assert.ok(res.possibleCategory.toLowerCase().includes('cut') || res.possibleCategory.toLowerCase().includes('injury'));
    assert.strictEqual(res.recommendedLevelOfCare, 'LOW');
  });

  // Test 5: Case 5 - Stomach Discomfort
  await runTest('Case 5: Stomach Discomfort / Mild Indigestion', async () => {
    const res = await analyzeSymptoms({
      text: 'Stomach cramp, bloating and nausea after eating spicy restaurant food.',
      duration: 'Few hours',
      severity: 'Moderate'
    });
    assert.strictEqual(res.isEmergency, false);
    assert.ok(res.possibleCategory.toLowerCase().includes('gastrointestinal') || res.possibleCategory.toLowerCase().includes('stomach'));
  });

  // Test 6: Case 6 - Eye Discomfort
  await runTest('Case 6: Eye Discomfort / Conjunctival Redness', async () => {
    const res = await analyzeSymptoms({
      text: 'Itchy watery eye and mild redness from dust exposure.',
      duration: '1 day',
      severity: 'Mild'
    });
    assert.strictEqual(res.isEmergency, false);
    assert.ok(res.possibleCategory.toLowerCase().includes('ocular') || res.possibleCategory.toLowerCase().includes('eye'));
    assert.strictEqual(res.relevantSpecialty, 'Ophthalmology');
  });

  // Test 7: Case 7 - Dental Discomfort
  await runTest('Case 7: Dental / Tooth Sensitivity Discomfort', async () => {
    const res = await analyzeSymptoms({
      text: 'Toothache and sensitivity when drinking cold water.',
      duration: '2 days',
      severity: 'Moderate'
    });
    assert.strictEqual(res.isEmergency, false);
    assert.ok(res.possibleCategory.toLowerCase().includes('dental') || res.possibleCategory.toLowerCase().includes('gingival'));
    assert.strictEqual(res.relevantSpecialty, 'Dentistry');
  });

  // Test 8: Case 8 - Emergency Scenario
  await runTest('Case 8: Critical Emergency Scenario Detection (Chest Pain & Shortness of Breath)', async () => {
    const emergencyIndicators = checkEmergencyIndicators('Patient experiencing severe chest pain and difficulty breathing');
    assert.strictEqual(emergencyIndicators.isEmergency, true);

    const res = await analyzeSymptoms({
      text: 'Experiencing severe chest pain, pressure, and difficulty breathing.'
    });
    assert.strictEqual(res.isEmergency, true);
    assert.strictEqual(res.recommendedLevelOfCare, 'EMERGENCY');
    assert.strictEqual(res.emergencyNumber, '112');
    assert.ok(res.healthcareRecommendation.toLowerCase().includes('112') || res.healthcareRecommendation.toLowerCase().includes('emergency'));
    assert.strictEqual(res.relevantSpecialty, 'Emergency');
  });

  // Test 9: Safety Logic Verification (No definitive diagnoses or prescriptions)
  await runTest('Safety Policy: No Definitive Diagnosis or Prescriptions in AI Output', async () => {
    const res = await analyzeSymptoms({
      text: 'I have fever, cough and sore throat.'
    });
    const serialized = JSON.stringify(res).toLowerCase();
    assert.ok(!serialized.includes('you definitely have'));
    assert.ok(!serialized.includes('prescribe 500mg'));
    assert.ok(res.disclaimer.includes('educational') || res.disclaimer.includes('informational'));
  });

  // Test 10: Maps & Haversine Distance Calculation
  await runTest('Location & Maps: Haversine Distance Calculation & Search', async () => {
    // Madurai (9.9287, 78.1368) to Dindigul (10.3673, 77.9803) approx ~51 km
    const dist = calculateDistanceKm(9.9287, 78.1368, 10.3673, 77.9803);
    assert.ok(dist >= 45 && dist <= 65, `Distance expected between 45-65km, received: ${dist}`);

    const facilities = await getNearbyFacilities({
      city: 'Madurai',
      specialty: 'Ophthalmology'
    });
    assert.ok(facilities.length > 0);
    assert.ok(facilities.some(f => f.name.includes('Aravind')));
  });

  console.log('\n========================================================');
  console.log(`Test Results: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('========================================================\n');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
