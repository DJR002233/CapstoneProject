<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Blank Page</title>
    </head>
    <body>
        <div>
            <button id="get" style="margin-top: 50px; margin-bottom: 50px">
                Get Test
            </button>
        </div>
        <div><button id="post">Post Test</button></div>
        <script>
            var getBtn = document.getElementById('get'),
                postBtn = document.getElementById('post');
            getBtn.addEventListener('click', gettest);
            postBtn.addEventListener('click', posttest);

            async function gettest() {
                const url = 'http://127.0.0.1:8000/api/getTestAPI',
                    obj = {
                        token: '11|7C4s98KMlrcSeLM2t3toPRIiKWSl0KQfk0r4rvcyRL5ba08c25',
                    },
                    token = JSON.stringify(obj);
                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json', //'multipart/form-data'
                            Authorization: token,
                            'Access-Control-Allow-Headers': '*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET',
                            'Access-Control-Max-Age': 300, //1hr = 3600 | 24hrs = 86400
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    const json = await response.json();
                    console.log(json);
                } catch (error) {
                    console.error(error.message);
                }
            }

            async function posttest() {
                const formdata = new FormData();
                formdata.append('username', 'steve');
                formdata.append('password', 'lol');
                const url = 'http://127.0.0.1:8000/api/logout',
                    username = 'steve',
                    password = 'lol';
                const obj = { username: username, password: password },
                    obj1 = {
                        token: '11|7C4s98KMlrcSeLM2t3toPRIiKWSl0KQfk0r4rvcyRL5ba08c25',
                    },
                    data = JSON.stringify(obj),
                    token = JSON.stringify(obj1);
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        body: token,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json', //'multipart/form-data'
                            Authorization: token,
                            'Access-Control-Allow-Headers': '*',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST',
                            'Access-Control-Max-Age': 300, //1hr = 3600 | 24hrs = 86400
                        },
                    });
                    if (!response.ok) {
                        throw new Error(`Response status: ${response.status}`);
                    }
                    const json = await response.json();
                    console.log(json);
                } catch (error) {
                    console.error(error.message);
                }
            }
        </script>
    </body>
</html>
