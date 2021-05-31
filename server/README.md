# sample-api

$ npm install
$ npm run build
$ npm run dev

open http://localhost:4000/graphql

paste the below request on playground:

{
test_request
}

Response:

{
"data": {
"test_request": {
"status": "success",
"name": "alex",
"title": "intro"
}
}
}

Response Headers :

Access-Control-Allow-Origin \*
x-server-date 2021-05-31T11:05:06.755Z
x-refresh-token this is sample refresh token
Content-Type application/json; charset=utf-8
Content-Length 77
ETag W/"4d-5/sejq9qDyVbe+2ZPXSZWjeStYE"
Date Mon, 31 May 2021 11:05:06 GMT
Connection keep-alive
