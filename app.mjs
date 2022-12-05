import express from 'express';
import log from '@ajar/marker';
import morgan from 'morgan';

const { PORT = 3030, HOST = "localhost"} = process.env;

const app = express()

const logger = (req,res,next) =>{
    morgan('dev');
    next();
}

app.use( logger )
app.use(express.json())

app.get('/',  (req, res) => {
    res.status(200).send('Hello Express!!!')
})

app.get('/html', (req, res) => {
    let name = req.query?.name;
    let age = req.query?.age;

    const markup = `<h1>HTML markup response</h1>
                    <h2>With your name : ${name} and age : ${age} from Querystring</h2>
                    `;

    res.status(200).set('Content-Type', 'text/html').send(markup)
})

app.get('/:FirstParam/:SecondParam', (req, res) => {
    res.status(200).json(req.params)
})

app.post("/post", (req, res) => {
    res.status(200).json(req.body?.name + req.body?.age);
})

// '/search?food=burger&town=ashdod'
app.use("*", (req,res) => {
    res.status(404).send("Page not found")
})

app.listen(PORT, HOST,  ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});


//------------------------------------------
//         Express Echo Server
//------------------------------------------
/* challenge instructions

     - install another middleware - morgan
        configuring app middleware like so:
        app.use( morgan('dev') );

    -  define more routing functions that use

        - req.query - access the querystring part of the request url
        - req.params - access dynamic parts of the url
        - req.body - access the request body of a POST request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

    - return api json response
    - return html markup response

    - return 404 status with a custom response to unsupported routes


*/
