```mermaid
sequenceDiagram
  participant browser
  participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    browser-->>server: fetch HTML document
    server-->>browser:
    browser-->>server: fetch CSS document
    server-->>browser:
    browser-->>server: fetch JS document
    server-->>browser:
    browser-->>server: fetch JSON document
    server-->>browser:

    browser->server: Render Notes list
    deactivate server
```
