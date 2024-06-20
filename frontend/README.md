# fydp-polytect-frontend

#### Run Locally
```npx expo start --tunnel```


#### `/classify` POST:
```
{
    "images": [
        {
            "id": "######",
            "blob": "",
        },
        {
            "id": "######",
            "blob": "",
        },
        {
            "id": "######",
            "blob": "",
        }
    ]
}
```

#### `/classify` Response: 
```
[
    {
        "id": "######",
        "s3Path": "",
        "classification": #,
        "confidence": #
    },
    {
        "id": "######",
        "s3Path": "",
        "classification": #,
        "confidence": #
    },
    {
        "id": "######",
        "s3Path": "",
        "classification": #,
        "confidence": #
    },
]
```