# Loyalty Points CLI

A simple command-line app to manage customer loyalty points.

## Usage

First, install dependencies and build:

```
npm install
npm run build
```

Then run commands:

```
npm start -- earn <customerId> <points>
npm start -- redeem <customerId> <points>
```

Examples:

```
npm start -- earn user123 100
npm start -- redeem user123 50
```

- If a customer tries to redeem more points than they have, the operation fails.
- If a customer's balance drops below 10 after redemption, a warning is printed. 