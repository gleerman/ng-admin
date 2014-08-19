define(['lib/config/Configurable'], function (Configurable) {
    'use strict';

    return function(entityName) {
        var name = entityName || 'entity';
        var fields = {};

        var config = {
            label: 'My entity',
            dashboard: 5,
            perPage: 30,
            pagination: false
        };

        /**
         *
         * @constructor
         */
        function Entity() {
        }

        /**
         * Object.name is protected, use a getter for it
         *
         * @returns {string}
         */
        Entity.getName = function() {
            return name;
        };

        /**
         * Add an field to the entity
         * @param {Field} field
         */
        Entity.addField = function(field) {
            fields[field.getName()] = field;

            return this;
        };

        /**
         * Returns all fields
         *
         * @returns {Object}
         */
        Entity.getFields = function() {
            return fields;
        };

        /**
         * Returns all references
         *
         * @returns {Object}
         */
        Entity.getReferences = function() {
            var results = {};

            for(var i in fields) {
                if (!fields.hasOwnProperty(i)) {
                    continue;
                }

                var field = fields[i];
                if (field.name === 'Reference') {
                    results[i] = field;
                }
            }

            return results;
        };

        Configurable(Entity, config);

        return Entity;
    }
});
