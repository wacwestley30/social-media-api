# Social Media API

[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Description

This project utilizes Express, MongoDB, and Mongoose. Until now, I have been employing Sequelize and MySQL to construct relational databases. With this Social Media API, I successfully developed my inaugural document-based API using MongoDB. Additionally, I acquired insight into how Mongoose generates schemas, enhancing my overall database proficiency.

https://drive.google.com/file/d/1--F6aq2_oGG4vFNs8OQX1TkFzihcdgnN/view?usp=sharing

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Users](#users)
  - [Thoughts](#thoughts)
- [License](#license)
- [Questions](#questions)

## Installation

To install, first run the command `npm i` and the versions specified in the `package.json` file will be installed.

## Usage

Seeds are provided for basic testing. To begin seeding, simply run `npm run seed`, and the database will be populated for testing endpoints.

To start the server, use `npm start`, and it will notify you that it is running on the specified port.

This app allows users to create Thoughts, become friends with other Users, and create Reactions to any Thought. The provided video and subsequent instructions utilize Insomnia to test all the various endpoints and CRUD requests.

### Users

#### /api/users

At this endpoint, sending a `GET` request will retrieve all users and display them in JSON format. Additionally, sending a `POST` request with JSON in the request body will create a new user.

```json
{
  "username": "example",
  "email": "example@example.com"
}
```

#### /api/users/:userId
Here, we can `GET` a single user using their generated `_id`. We can also `DELETE` the user using their `_id`. Lastly, sending a `PUT` request we can update any user using JSON similar to the example provided above.

```json
{
  "username": "example",
  "email": "example@example.com"
}
```

#### /api/users/:userId/friends/:friendId
At this endpoint, we can send `POST` or `DELETE` requests to add or remove a friend from an existing user. We use the user's `_id` to add or remove a friend and the friend's `_id` to specify who is being added or removed. JSON in the request body specifies the friendId.

```json
{
  "friendId": "ExampleId1234567890"
}
```

### Thoughts

#### /api/thoughts
At this endpoint, we can `GET` all thoughts and `POST` to create a new thought using JSON in the request body.

```json
{
  "thoughtText": "Example Thought Text",
  "username": "example"
}
```

#### /api/thoughts/:thoughtId
Here, we can `GET` a single thought by using its `thoughtId`. Sending a `PUT` request allows us to update that thought using JSON in the request body. We only need to include `thoughtText` because we are already using `:thoughtId` in the request parameters.

```json
{
  "thoughtText": "Example Thought Text"
}
```

Lastly, we can `DELETE` a thought by using the username in the request body.

```json
{
  "username": "example"
}
```

#### /api/thoughts/:thoughtId/reactions
Finally, we can send a `POST` request to let a user react to any thought. Using JSON in the request body:

```json
{
    "username": "example",
    "reactionBody": "Example Reaction Text"
}
```

We can also remove any reactions from thoughts using a `DELETE` request with the `reactionId` in the request body.

```json
{
    "reactionId": "ExampleId1234567890"
}
```

## License

Licensed under the MIT license.

[MIT License](https://opensource.org/licenses/MIT)

## Questions

For any questions, please contact WestleyCervantes@gmail.com. Visit [wacwestley30](https://github.com/wacwestley30) for more projects.
