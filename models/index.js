var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});


var urlFormatter = function(pageTitle) {
    if(pageTitle) {
       return pageTitle.replace(/\W/g, '').replace(/\s+/g, '_');
    } else {
        return Math.random().toString(36).substring(2,7);
    }
}

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

},
{
  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
        beforeValidate: function(page, options) {
            page.urlTitle = urlFormatter(page.title);
        }
    }
}

);


var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmail: true
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db: db,
  Page: Page,
  User: User
};

