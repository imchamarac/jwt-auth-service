/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function (db) {
    db.addColumn(
        'users',
        'login_count',
        { type: 'int', notNull: true, defaultValue: 0 },
        callback()
    );
    return null;
};

exports.down = function (db) {
    // db.removeColumn('users', 'login_count', callback());
    db.runSql(`ALTER TABLE users DROP COLUMN login_count;`, callback());
    return null;
};

exports._meta = {
    version: 1,
};

function callback() {
    return null;
}
