from djongo.base import DatabaseWrapper as DjongoDatabaseWrapper

class CustomDatabaseWrapper(DjongoDatabaseWrapper):
    def _close(self):
        """
        Closes the client connection to the database.
        """
        if self.connection is not None:  # Fix the connection check
            with self.wrap_database_errors:
                self.connection.client.close()
                logger.debug('MongoClient connection closed')
