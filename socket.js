Socket {
    nsp: Namespace {
        name: '/',
        server: Server {
            nsps: [Object],
            _path: '/socket.io',
            _serveClient: true,
            _adapter: [Function: Adapter],
            _origins: '*:*',
            sockets: [Circular],
            eio: [Object],
            httpServer: [Object],
            engine: [Object]
        },
        sockets: {
            Mu63BidEhEcSqfZhAAAA: [Circular]
        },
        connected: {
            Mu63BidEhEcSqfZhAAAA: [Circular]
        },
        fns: [],
        ids: 0,
        adapter: Adapter {
            nsp: [Circular],
            rooms: [Object],
            sids: [Object],
            encoder: Encoder {}
        },
        _events: {
            connection: [Function]
        },
        _eventsCount: 1
    },
    server: Server {
        nsps: {
            '/': [Object]
        },
        _path: '/socket.io',
        _serveClient: true,
        _adapter: [Function: Adapter],
        _origins: '*:*',
        sockets: Namespace {
            name: '/',
            server: [Circular],
            sockets: [Object],
            connected: [Object],
            fns: [],
            ids: 0,
            adapter: [Object],
            _events: [Object],
            _eventsCount: 1
        },
        eio: Server {
            clients: [Object],
            clientsCount: 1,
            wsEngine: undefined,
            pingTimeout: 60000,
            pingInterval: 25000,
            upgradeTimeout: 10000,
            maxHttpBufferSize: 100000000,
            transports: [Object],
            allowUpgrades: true,
            allowRequest: [Function: bound],
            cookie: 'io',
            cookiePath: false,
            perMessageDeflate: [Object],
            httpCompression: [Object],
            ws: [Object],
            _events: [Object],
            _eventsCount: 1
        },
        httpServer: Server {
            domain: null,
            _events: [Object],
            _eventsCount: 4,
            _maxListeners: undefined,
            _connections: 1,
            _handle: [Object],
            _usingSlaves: false,
            _slaves: [],
            _unref: false,
            allowHalfOpen: true,
            pauseOnConnect: false,
            httpAllowHalfOpen: false,
            timeout: 120000,
            _pendingResponseData: 0,
            _connectionKey: '6::::3000'
        },
        engine: Server {
            clients: [Object],
            clientsCount: 1,
            wsEngine: undefined,
            pingTimeout: 60000,
            pingInterval: 25000,
            upgradeTimeout: 10000,
            maxHttpBufferSize: 100000000,
            transports: [Object],
            allowUpgrades: true,
            allowRequest: [Function: bound],
            cookie: 'io',
            cookiePath: false,
            perMessageDeflate: [Object],
            httpCompression: [Object],
            ws: [Object],
            _events: [Object],
            _eventsCount: 1
        }
    },
    adapter: Adapter {
        nsp: Namespace {
            name: '/',
            server: [Object],
            sockets: [Object],
            connected: [Object],
            fns: [],
            ids: 0,
            adapter: [Circular],
            _events: [Object],
            _eventsCount: 1
        },
        rooms: {
            Mu63BidEhEcSqfZhAAAA: [Object]
        },
        sids: {
            Mu63BidEhEcSqfZhAAAA: [Object]
        },
        encoder: Encoder {}
    },
    id: 'Mu63BidEhEcSqfZhAAAA',
    client: Client {
        server: Server {
            nsps: [Object],
            _path: '/socket.io',
            _serveClient: true,
            _adapter: [Function: Adapter],
            _origins: '*:*',
            sockets: [Object],
            eio: [Object],
            httpServer: [Object],
            engine: [Object]
        },
        conn: Socket {
            id: 'Mu63BidEhEcSqfZhAAAA',
            server: [Object],
            upgrading: false,
            upgraded: false,
            readyState: 'open',
            writeBuffer: [Object],
            packetsFn: [Object],
            sentCallbackFn: [],
            cleanupFn: [Object],
            request: [Object],
            remoteAddress: '::1',
            checkIntervalTimer: null,
            upgradeTimeoutTimer: null,
            pingTimeoutTimer: [Object],
            transport: [Object],
            _events: [Object],
            _eventsCount: 3
        },
        encoder: Encoder {},
        decoder: Decoder {
            reconstructor: null,
            _callbacks: [Object]
        },
        id: 'Mu63BidEhEcSqfZhAAAA',
        request: IncomingMessage {
            _readableState: [Object],
            readable: true,
            domain: null,
            _events: {},
            _eventsCount: 0,
            _maxListeners: undefined,
            socket: [Object],
            connection: [Object],
            httpVersionMajor: 1,
            httpVersionMinor: 1,
            httpVersion: '1.1',
            complete: true,
            headers: [Object],
            rawHeaders: [Object],
            trailers: {},
            rawTrailers: [],
            upgrade: false,
            url: '/socket.io/?transport=polling&b64=1',
            method: 'GET',
            statusCode: null,
            statusMessage: null,
            client: [Object],
            _consuming: false,
            _dumped: true,
            _query: [Object],
            res: [Object],
            cleanup: [Function: cleanup]
        },
        onclose: [Function: bound],
        ondata: [Function: bound],
        onerror: [Function: bound],
        ondecoded: [Function: bound],
        sockets: {
            Mu63BidEhEcSqfZhAAAA: [Circular]
        },
        nsps: {
            '/': [Circular]
        },
        connectBuffer: []
    },
    conn: Socket {
        id: 'Mu63BidEhEcSqfZhAAAA',
        server: Server {
            clients: [Object],
            clientsCount: 1,
            wsEngine: undefined,
            pingTimeout: 60000,
            pingInterval: 25000,
            upgradeTimeout: 10000,
            maxHttpBufferSize: 100000000,
            transports: [Object],
            allowUpgrades: true,
            allowRequest: [Function: bound],
            cookie: 'io',
            cookiePath: false,
            perMessageDeflate: [Object],
            httpCompression: [Object],
            ws: [Object],
            _events: [Object],
            _eventsCount: 1
        },
        upgrading: false,
        upgraded: false,
        readyState: 'open',
        writeBuffer: [
            [Object]
        ],
        packetsFn: [undefined],
        sentCallbackFn: [],
        cleanupFn: [
            [Function],
            [Function]
        ],
        request: IncomingMessage {
            _readableState: [Object],
            readable: true,
            domain: null,
            _events: {},
            _eventsCount: 0,
            _maxListeners: undefined,
            socket: [Object],
            connection: [Object],
            httpVersionMajor: 1,
            httpVersionMinor: 1,
            httpVersion: '1.1',
            complete: true,
            headers: [Object],
            rawHeaders: [Object],
            trailers: {},
            rawTrailers: [],
            upgrade: false,
            url: '/socket.io/?transport=polling&b64=1',
            method: 'GET',
            statusCode: null,
            statusMessage: null,
            client: [Object],
            _consuming: false,
            _dumped: true,
            _query: [Object],
            res: [Object],
            cleanup: [Function: cleanup]
        },
        remoteAddress: '::1',
        checkIntervalTimer: null,
        upgradeTimeoutTimer: null,
        pingTimeoutTimer: Timeout {
            _called: false,
            _idleTimeout: 85000,
            _idlePrev: [Object],
            _idleNext: [Object],
            _idleStart: 14030,
            _onTimeout: [Function],
            _repeat: null
        },
        transport: XHR {
            readyState: 'open',
            discarded: false,
            closeTimeout: 30000,
            maxHttpBufferSize: 100000000,
            httpCompression: [Object],
            supportsBinary: false,
            _events: [Object],
            _eventsCount: 5,
            sid: 'Mu63BidEhEcSqfZhAAAA',
            req: null,
            res: null,
            writable: false
        },
        _events: {
            close: [Object],
            data: [Function: bound],
            error: [Function: bound]
        },
        _eventsCount: 3
    },
    rooms: {},
    acks: {},
    connected: true,
    disconnected: false,
    handshake: {
        headers: {
            host: 'localhost:3000',
            accept: '*/*',
            'accept-language': 'en-us',
            connection: 'keep-alive',
            'accept-encoding': 'gzip, deflate',
            'user-agent': 'PeopleNearBy/1 CFNetwork/808.1.4 Darwin/16.1.0'
        },
        time: 'Sat Nov 12 2016 20:47:21 GMT-0500 (EST)',
        address: '::1',
        xdomain: false,
        secure: false,
        issued: 1479001641021,
        url: '/socket.io/?transport=polling&b64=1',
        query: {
            transport: 'polling',
            b64: '1'
        }
    }
}