mongo hospital --eval "db.dropDatabase()"
mongorestore -d hospital ../hospitalDump
