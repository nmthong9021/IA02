const db = require('../utils/db');

module.exports = {
    all : function(){
        return db('country');
    },

    single: async function(id){
       const result = await db('country').where('country_id', id);

       if(result.length === 0){
           return null;
       }

       return result[0];
    },

    add: function(country){
        return db('country').insert(country);
    },

    update: function(id, newCountry){
       return db('country').where('country_id', id).update(newCountry);
    },

    delete: function(id){
        return db('country').where('country_id', id).del();
    }
}