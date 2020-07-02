# Weather App

## Installation

Clone this repo into your local machine:

```
git clone https://github.com/alikingravi/weather-app.git
```

### Backend

Navigate into the `/server` folder and run the command:  
`make start-app`

This will start all the required docker containers and install all dependencies for the backend.

### Frontend

From the root directory navigate into the `/client` folder and run the command:  
`npm install` followed by `npm run start`.

This should launch the React app on [http://localhost:3000](`http://localhost:3000`)

## Testing

Navigate to `/server/src` folder and run the command `vendor/bin/phpunit` to run the tests.

Note: This will clear our the database tables.

Run `make migration` and `make seed` from the `/server` folder to run the database migrations if needed.
