# Autocomplete app

To see the app in action you'd need an HTTP server. If you are on MAC OS, you can follow the steps below to get the app up and running -

  - Download the source code from Github
  - Open terminal and navigate to the directory where the code was saved
  - Run ```python -m SimpleHTTPServer 8000 ```
  - Navigate to the URL ```http://localhost:8000``` on your favorite browser

The following use cases have been handled:
  - Limit search results to 10 to keep list manageable
  - Google search style keyword match highlighting
  - Keyboard navigation support to allow users to focus and select results

Future work:
- Better filtering algorithm (Regex match can't always be enough)
- Confidence measure of search results to sort the results from best match to worst
