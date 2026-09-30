# Citizen Report, Authority & Integration

## Overview

This module is responsible for connecting citizen environmental reports with the authority verification and response workflow in the BlueSentinal project.

Citizens can submit reports containing their location, description, pollution type, and image information. The reports are sent to the existing backend API and stored in the database. Authorities can retrieve these reports, verify or reject them, and update the action status until the issue is resolved.

## Responsibilities

- Connect citizen reports with the backend API.
- Submit citizen environmental reports.
- Retrieve submitted citizen reports.
- Provide authority report management functions.
- Support report verification and rejection.
- Support action status updates.
- Connect citizen reporting with the authority workflow.

## Citizen Report Workflow

```text
Citizen
   ↓
Submit Environmental Report
   ↓
Citizen Report API
   ↓
Backend API
   ↓
Database
   ↓
Authority Review