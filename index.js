const { pinger, showRequests, api, app, express, cors, http, config } = require('./imports');
const interval = 25 * 60 * 1000;

setInterval(pinger, interval);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(showRequests);

app.use('/', api);
http.listen(process.env.PORT || config.port, function() {
    console.log(`listening on *:${process.env.PORT || config.port}`);
});