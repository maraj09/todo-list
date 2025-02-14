# Todo List App

This project allows you to create, manage, view todos.

## Features
- Instant CRUD
- Realtime Update. 

## Prerequisites
- PHP 8.2 or higher
- MySQL database
- Laravel 11
- React
- Nodejs

## Installation
1. Install Composer Packages

```bash
composer install
```

2. Install NPM Packages

```bash
npm install
npm run build
```

2. Create .env file by coping .env.example

*** Already provided Reverb keys and settings

3. Generate App key Using

```bash
php artisan key:generate
```

4. Setup Database Connections in .env file


5. Migrate Database

```bash
php artisan migrate 
```

6. Now Run

```bash
composer run dev

# Run (must for realtime update)
php artisan reverb:start
```

Thanks...
