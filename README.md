# blog-backend

## Overview

Blogging has long been a popular way for people to express their passions, experiences and ideas with readers worldwide.This is a Rest Api application for working with a blog.

Modules and libraries used in the project:
    bcrypt
    cors
    cross-env
    dotenv
    express    
    mongodb
    mongoose
    multer
    jsonwebtoken
    
## Routes

The REST API supports the following routes:

#### Registration request

```shell
POST /auth/register
Content-Type: application/json
RequestBody: {    
    "email":"test@gmail.com",
    "password":"********",
    "fullName":"Piter Parker",
    "avatarUrl":"url-icon.com"
}
```

#### Registration success response
```shell
{
    "fullName": "Piter Parker",
    "email": "test@gmail.com",
    "avatarUrl": "https://cdn.icon-icons.com/icons2/582/PNG/512/spy_icon-icons.com_55034.png",
    "_id": "62e02c31902520445d251fef",
    "createdAt": "2022-07-26T18:02:25.157Z",
    "updatedAt": "2022-07-26T18:02:25.157Z",
    "__v": 0,
    "token": "token"
}
```

#### Verification request

```shell
GET /auth/me/
Authorization : Bearer Token
```

#### Verification success response
```shell
{
    "_id": "62e02c31902520445d251fef",
    "fullName": "Piter Parker",
    "email": "test@gmail.com",
    "avatarUrl": "https://cdn.icon-icons.com/icons2/582/PNG/512/spy_icon-icons.com_55034.png",
    "createdAt": "2022-07-26T18:02:25.157Z",
    "updatedAt": "2022-07-26T18:02:25.157Z",
    "__v": 0
}
```



#### Login request

```shell
POST /auth/login
Content-Type: application/json
RequestBody: {
  "email": "test@gmail.com",
  "password": "********"
}
```

#### Login success response

```shell
{
    "_id": "62e02c31902520445d251fef",
    "fullName": "Piter Parker",
    "email": "test@gmail.com",
    "avatarUrl": "url",
    "createdAt": "2022-07-16T12:22:06.437Z",
    "updatedAt": "2022-07-16T12:22:06.437Z",
    "__v": 0,
    "token": "token"
}
```

#### Create post request

```shell
POST /posts
Authorization : Bearer Token
Content-Type: application/json
RequestBody: {
  
    "title":"Why Learn ReactJS?",
    "text":"ReactJS offers graceful solutions to some of front-end programming’s most persistent issues, allowing you to build dynamic and interactive web apps with ease. It’s fast, scalable, flexible, powerful, and has a robust developer community that’s rapidly growing. There’s never been a better time to learn React.",
    "tags": "react"

}
```

#### Create post success response

```shell
{
    "title": "Why Learn ReactJS?",
    "text": "ReactJS offers graceful solutions ...",
    "user": "62c32b36521e63907ff90645",
    "tags": [
        "react"
    ],
    "comments": [],
    "viewsCount": 0,
    "_id": "62e036e9d07b04d0075236c0",
    "createdAt": "2022-07-26T18:48:09.770Z",
    "updatedAt": "2022-07-26T18:48:09.770Z",
    "__v": 0
}
```

#### Get all posts request

```shell
GET /posts

```

#### Get all posts success response

```shell
[
    {
        "_id": "62e036e9d07b04d0075236c0",
        "title": "Why Learn ReactJS?",
        "text": "ReactJS offers graceful ...",
        "user": {
            "_id": "62c32b36521e63907ff90645",
            "fullName": "John Whick",
            "email": "testq@gmail.com",
            "passwordHash": "hash",
            "avatarUrl": "https:...",
            "createdAt": "2022-07-04T18:02:30.684Z",
            "updatedAt": "2022-07-04T18:02:30.684Z",
            "__v": 0
        },
        "tags": [
            "react"
        ],
        "comments": [],
        "viewsCount": 1,
        "createdAt": "2022-07-26T18:48:09.770Z",
        "updatedAt": "2022-07-26T18:48:22.774Z",
        "__v": 0
    },
    {
        "_id": "62e02c71902520445d251ff5",
        "title": "Some text",
        "text": "Some text",
        "user": {
            "_id": "62e02c31902520445d251fef",
            "fullName": "Piter Parker",
            "email": "test@gmail.com",
            "passwordHash": "hash",
            "avatarUrl": "url",
            "createdAt": "2022-07-26T18:02:25.157Z",
            "updatedAt": "2022-07-26T18:02:25.157Z",
            "__v": 0
        },
        "tags": [
            "Some text",
        ],
        "comments": [],
        "viewsCount": 2,
        "imageUrl": "/uploads/a3cb999115.png",
        "createdAt": "2022-07-26T18:03:29.782Z",
        "updatedAt": "2022-07-26T18:30:13.690Z",
        "__v": 0
    },
]
```

#### Get  certain post request

```shell
GET /posts/:id


```

#### Get certain post success response

```shell
{   
    "_id": "62e036e9d07b04d0075236c0",
    "title": "Why Learn ReactJS?",
    "text": "ReactJS offers graceful ...",
    "user": {
        "_id": "62c32b36521e63907ff90645",
        "fullName": "John Whick",
        "email": "testq@gmail.com",
        "passwordHash": "hash",
        "avatarUrl": "url",
        "createdAt": "2022-07-04T18:02:30.684Z",
        "updatedAt": "2022-07-04T18:02:30.684Z",
        "__v": 0
    },
    "tags": ["react"],
    "comments": [],
    "viewsCount": 2,
    "createdAt": "2022-07-26T18:48:09.770Z",
    "updatedAt": "2022-07-26T19:01:40.776Z",
    "__v": 0    
}

```

#### Update certain post request

```shell
PATCH /posts/:id
Authorization : Bearer Token
Content-Type: application/json
RequestBody: {
  
    "title":"Some title",
    "text":"Some text",
    "tags": "some tags"

}
```


#### Update certain post success response

```shell
{  
    "success": "The article has been updated"
}

```
#### Delete certain post request

```shell
DELETE /posts/:id


```

#### Delete certain post success response

```shell
{  
    "success": "The article has been deleted"
}

```

#### Get all comments request

```shell
GET /comments

```

#### Get all comments success response

```shell
[
    {
        "_id": "62e015e6f8109e35cc86a1b5",
        "comments": "Why not",
        "user": {
            "_id": "62d2ad6ebf894c63b88e23a7",
            "fullName": "Piter Parker",
            "email": "test4@gmail.com",
            ...},
        "createdAt": "2022-07-26T16:27:18.070Z",
        "updatedAt": "2022-07-26T16:27:18.070Z",        
    },
    {
        "_id": "62e0305cd6609470e80d01eb",
        "comments": "Some text",
        "user": {
            "_id": "62e02c31902520445d251fef",
            "fullName": "Piter Parker",
            "email": "test@gmail.com",
            ...},
        "createdAt": "2022-07-26T18:20:12.533Z",
        "updatedAt": "2022-07-26T18:20:12.533Z",        
    },
    {
        "_id": "62e0326b60ae3dc3fae7dac6",
        "comments": "Other comment",
        "user": {
            "_id": "62e02c31902520445d251fef",
            "fullName": "Piter Parker",
            "email": "test@gmail.com",
            ...},
        "createdAt": "2022-07-26T18:28:59.345Z",
        "updatedAt": "2022-07-26T18:28:59.345Z",
    },
    {
        "_id": "62e03ee1d07b04d0075236dd",
        "comments": "some comment",
        "user": {
            "_id": "62c32b36521e63907ff90645",
            "fullName": "John Whick",
            "email": "testq@gmail.com",
            ...},
        "createdAt": "2022-07-26T19:22:09.474Z",
        "updatedAt": "2022-07-26T19:22:09.474Z",
    }
]
```

#### Create comments request

```shell
POST /comments/:id
Authorization : Bearer Token
Content-Type: application/json
RequestBody: {
  
    "comments":"Some text"
}

```

#### Create comments success response

```shell
{
    "comments": "Some text",
    "user": {
        "_id": "62e02c31902520445d251fef",
        "fullName": "Piter Parker",
        "email": "test@gmail.com",
        "passwordHash": "hash",
        "avatarUrl": "https://cdn.icon-icons.com/icons2/582/PNG/512/spy_icon-icons.com_55034.png",
        "createdAt": "2022-07-26T18:02:25.157Z",
        "updatedAt": "2022-07-26T18:02:25.157Z",
        "__v": 0
    },
    "_id": "62e0305cd6609470e80d01eb",
    "createdAt": "2022-07-26T18:20:12.533Z",
    "updatedAt": "2022-07-26T18:20:12.533Z",
    "__v": 0
}

```

#### Get comments certain post request

```shell
GET /comments/:id
Authorization : Bearer Token
Content-Type: application/json
RequestBody: {
  
    "comments":"Some text"
}

```

#### Get comments certain post success response

```shell
{
    _id: "62e0305cd6609470e80d01eb",
     comments: "Some text",
    _id: "62e0326b60ae3dc3fae7dac6", 
    comments: "Other comment"
    
}

```

