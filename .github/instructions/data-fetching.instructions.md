---
description: read this file to understand how to fetch data in the project.
---
# Data Fetching Guidelines
This document outlines the best practices for fetching data in our project. Adhering to these guidelines will ensure that our codebase remains consistent, efficient, and maintainable.

## 1. Use server components for data fetching
In Next.js, ALWAYS use server components for data fetching. NEVER use client components to fetch data. 

## 2. Data fetching Methods
ALWAYS use the helper furnctions in the /data directory to fetch data. NEVER fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database instructions.
