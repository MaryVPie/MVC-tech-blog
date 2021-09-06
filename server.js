const path = require('path');
const express = require('express');
const routes = require('./controllers');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
// const swaggerDocument = require('./swagger.json');

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "E-commerce API",
      description: "Internet retail, also known as e-commerce, is the largest sector of the electronics industry, generating an estimated $29 trillion in 2019. E-commerce platforms like Shopify and WooCommerce provide a suite of services to businesses of all sizes. It describes the aforementioned API",
      contact: {
        name: "MVPie"
      },
      servers: [`http://localhost:${PORT}`]
    }
  },
  apis: ["routes/api/*-routes.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 1*1000*60*20 // 1*1000(1sec)*60(1 min)*20 (20min) = 20 min for session.
  },
  resave: false,
  rolling: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);
// Force false so data doesn't get dropped on every sync
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
