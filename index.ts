import * as fs from 'fs';

// File path for persistent storage
const STORAGE_FILE = 'balances.json';

// Load balances from file or create empty object
function loadBalances(): Record<string, number> {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading balances:', error);
  }
  return {};
}

// Save balances to file
function saveBalances(balances: Record<string, number>) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(balances, null, 2));
  } catch (error) {
    console.error('Error saving balances:', error);
  }
}

// Get current balances
let balances: Record<string, number> = loadBalances();

function earn(customerId: string, points: number) {
  if (!balances[customerId]) balances[customerId] = 0;
  balances[customerId] += points;
  saveBalances(balances);
  console.log(`Customer ${customerId} earned ${points} points. New balance: ${balances[customerId]}`);
}

function redeem(customerId: string, points: number) {
  console.log('Current balances:', balances);
  if (!balances[customerId]) balances[customerId] = 0;
  if (balances[customerId] < points) {
    console.log(`Error: Customer ${customerId} does not have enough points. Current balance: ${balances[customerId]}`);
    return;
  }
  balances[customerId] -= points;
  saveBalances(balances);
  console.log(`Customer ${customerId} redeemed ${points} points. New balance: ${balances[customerId]}`);
  if (balances[customerId] < 10) {
    console.log(`Warning: Customer ${customerId} has a low balance: ${balances[customerId]} points.`);
  }
}

function printUsage() {
  console.log('Usage:');
  console.log('  npm start -- earn <customerId> <points>');
  console.log('  npm start -- redeem <customerId> <points>');
}

function main() {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }
  const [command, customerId, pointsStr] = args;
  const points = parseInt(pointsStr, 10);
  if (!customerId || isNaN(points) || points <= 0) {
    printUsage();
    process.exit(1);
  }
  if (command === 'earn') {
    earn(customerId, points);
  } else if (command === 'redeem') {
    redeem(customerId, points);
  } else {
    printUsage();
    process.exit(1);
  }
}

main(); 