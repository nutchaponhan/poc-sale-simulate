# POC Sale Simulate

This project is a proof of concept for sales simulation, focusing on calculating insurance plans, riders, and premiums using SQLite as the storage backend.

## Project Structure

```
.
├── data/               # Raw data from original source
│   ├── plan/          # Plan-related data
│   ├── plan-rate/     # Plan rate information
│   ├── raw/           # Original source data
│   ├── rider/         # Rider-related data
│   └── rider-rate/    # Rider rate information
├── script/            # SQL scripts for database operations
│   ├── clear.sql      # Database cleanup script
│   └── setup.sql      # Database initialization script
├── src/               # Source code
│   ├── lib/           # Core computation logic (submodule)
│   ├── modules/       # Application modules
│   └── config/        # Configuration files
└── storage.db         # SQLite database file
```

## Overview

This project serves as a POC for insurance sales simulation with the following key components:

- **Core Logic**: Located in `src/lib/` as a submodule, containing the main computation logic for:
  - PremiumProcessor

- **Data Storage**: Uses SQLite (`storage.db`) to store:
  - Plan information and rates
  - Rider information and rates

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Git (for submodule management)

### Initial Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd poc-sale-simulate
```

2. Install dependencies:
```bash
npm run install
```

3. Install the submodule dependencies:
```bash
npm run install:submodules
```

4. Set up the database:
```bash
# Initialize the database using the setup script
sqlite3 storage.db < script/setup.sql
```

### Development

1. Start the development server:
```bash
npm run start:dev
```

### Useful Commands

- Update submodule to latest version:
```bash
git submodule update --remote
```

- Reset database:
```bash
sqlite3 storage.db < script/clear.sql
sqlite3 storage.db < script/setup.sql
```

- Build the project:
```bash
npm run build
```

## Database Operations

The `script/` directory contains SQL scripts for database management:
- `setup.sql`: Initializes the database schema and loads initial data
- `clear.sql`: Cleans up the database for fresh start

## Notes for New Joiners

1. Make sure to always initialize and update submodules after cloning
2. The `data/` directory contains reference data - do not modify directly
3. All database operations should be performed through the provided scripts
4. Core business logic is in the `src/lib/` submodule - changes there should be made in the original repository
5. Use the development server for testing changes locally

## Contributing

1. Update submodules first
2. Create a new branch for your features
3. Test thoroughly before submitting PRs
4. Ensure database scripts are updated if schema changes