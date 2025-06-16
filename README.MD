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

**Return the whole JSON file with pagination**

`127.0.0.1/plants?page=1&limit=10`

**Return specific plant**

`127.0.0.1/plants/:id`

**Return a specific image url**

`127.0.0.1/plants/img/:id`

**Return all image url's**

`127.0.0.1/plants/url/all`
