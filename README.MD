# Plant Data API

## How to run locally:

1. Clone the repository
```bash
git clone https://github.com/SEVerhaak/plant-data-api.git
```

2. Install dependencies
```bash
npm install
```

3. Remove the .example from the `.env.example` file and add modify the config data if needed

4. Run local server
```bash
npm run dev
```

## API usage

**Return the whole JSON file**

`127.0.0.1/plants`

**Return specific plant**

*ID must be within 1 and 179 and a string (For now)*!

`127.0.0.1/plants/id`

