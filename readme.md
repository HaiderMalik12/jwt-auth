# Project Setup

## Step 1: Install Dependencies

```
npm install
```

### Step 2: Setup Environment Variables in .env

You have to add these `env` variables

```bash
WEB_TOKEN_SECRET =
PORT =
DATABASE_URL
```

`WEB_TOKEN_SECRET` It could be any token string
`PORT` You have to define your PORT
`DATABSE_URL` You can create a new database at MongoDB Atlas to add your conenct string here

Your MongoDB connection string format should be like that:

```bash
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.4n0f8fw.mongodb.net/<databaseName>?retryWrites=true&w=majority&appName=Cluster0"
```

### Step 3: Generate Prisma Client Bindings

```bash
npx prisma db pull --force
```

This command will sync your prisma models to your Database

### Ste 4: Run the Project

```bash
npm run dev

```
