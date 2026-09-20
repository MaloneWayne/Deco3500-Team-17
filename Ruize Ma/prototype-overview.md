# Early Prototype Overview

## Project

The Weekly Split

## Prototype Goal

This early prototype explores how housemates can negotiate shared expenses in a fairer and less awkward way.

The prototype focuses on the social interaction around shared spending, rather than only calculating who owes money.

The main design question is:

> How can a mobile system help housemates negotiate fairness while reducing direct confrontation?

---

# Prototype Flow

The prototype currently includes six main screens.

## 1. Home

**File:** `01-home.png`

The home screen introduces the weekly settlement process.

Users can start a new session and review previous settlement sessions.

### Purpose

This screen supports the idea of a regular weekly settlement routine instead of unexpected payment requests appearing at random times.

---

## 2. Upload Receipt

**File:** `02-upload-receipt.png`

Users can upload or take a photo of a shared receipt.

The system then identifies the purchased items.

### Purpose

The receipt becomes a shared object that everyone can review together.

For the early prototype, receipt scanning can be simulated because the main focus is the social decision-making process.

---

## 3. Claim or Pass

**File:** `03-claim-or-pass.png`

Each item is shown individually.

Users can choose:

- Claim
- Pass

### Purpose

This interaction allows users to indicate whether they used or benefited from an item without needing to directly argue with another housemate.

This supports flexible item-based splitting.

---

## 4. Item Split Result

**File:** `04-item-split-result.png`

The system shows who claimed the item and how the cost will be divided.

For example, if three people claim a $12 item, each person pays $4.

### Purpose

This screen improves transparency by explaining how the final amount is calculated.

It supports the experience requirement of clear cost explanation.

---

## 5. Review and Veto

**File:** `05-review-and-veto.png`

Before the final split is confirmed, users can review the result.

Users can either:

- Select “Looks Fair”
- Use the Anonymous Veto

### Purpose

The Anonymous Veto provides a low-pressure way to raise concerns.

It allows users to disagree without directly blaming another person.

This feature is designed to reduce social pressure and confrontation.

---

## 6. Final Split Summary

**File:** `06-final-split-summary.png`

The final screen shows the completed settlement.

Users can see:

- Total amount
- Individual amounts
- Settlement status
- Final summary

### Purpose

This screen gives all housemates a shared understanding of the final outcome.

It also helps reduce confusion about who owes what.

---

# Experience Requirements Addressed

The prototype currently focuses on the following requirements:

## R1. Safe Disagreement
Supported through the Anonymous Veto.

## R2. Clear Cost Explanation
Supported through item-level split results.

## R3. Flexible Splitting
Supported through Claim and Pass.

## R4. Shared Awareness
Supported through shared results and settlement status.

## R5. Reduced Confrontation
Supported through app-mediated decision-making.

---

# Prototype Scope

This is an early prototype.

The current prototype does not require:

- Real receipt scanning
- Real payment processing
- Real user accounts
- Real banking integration
- A complete backend system

These functions can be simulated during early testing.

The main focus is to evaluate whether the interaction flow helps housemates discuss and negotiate shared expenses more comfortably.

---

# What We Want to Learn

The prototype will be used to investigate:

1. Whether users understand the Claim and Pass interaction
2. Whether the cost split is easy to understand
3. Whether the Anonymous Veto feels useful and comfortable
4. Whether the process feels fair
5. Whether the prototype could reduce awkward financial conversations between housemates

---

# Next Step

The next step is to test the prototype with users or proxies.

The evaluation will focus on user understanding, perceived fairness, social comfort, and problems in the current interaction flow.
